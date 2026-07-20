import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { authConfig } from "@/lib/auth.config";
import { credentialsSchema } from "@/lib/validations/auth";
import { prisma } from "@/lib/prisma";
import { checkLoginRateLimit, getClientIp, recordLoginAttempt } from "@/lib/rate-limit";
import { verifyRecaptcha } from "@/lib/recaptcha";
import { RateLimitedError, RecaptchaFailedError } from "@/lib/auth-errors";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
        recaptchaToken: {},
      },
      async authorize(credentials, request) {
        const ip = getClientIp(request);

        // Check the rate limit before doing anything else — an IP that's
        // already over the threshold shouldn't get to spend a reCAPTCHA
        // verification or a bcrypt compare on top of it.
        const { limited } = await checkLoginRateLimit(ip);
        if (limited) {
          throw new RateLimitedError();
        }

        const parsed = credentialsSchema.safeParse(credentials);
        if (!parsed.success) {
          await recordLoginAttempt(ip, false);
          return null;
        }

        const { email, password, recaptchaToken } = parsed.data;

        // reCAPTCHA is verified — and can reject the login — before the
        // password is ever checked, per the task's explicit requirement.
        const recaptcha = await verifyRecaptcha(recaptchaToken, ip);
        if (!recaptcha.success) {
          await recordLoginAttempt(ip, false);
          throw new RecaptchaFailedError();
        }

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
          await recordLoginAttempt(ip, false);
          return null;
        }

        const passwordsMatch = await compare(password, user.passwordHash);
        await recordLoginAttempt(ip, passwordsMatch);
        if (!passwordsMatch) return null;

        return { id: user.id, email: user.email, name: user.name };
      },
    }),
  ],
  callbacks: {
    ...authConfig.callbacks,
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = token.id;
      }
      return session;
    },
  },
});
