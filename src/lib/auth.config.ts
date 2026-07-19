import type { NextAuthConfig } from "next-auth";

// Edge-safe subset of the Auth.js config: no Prisma or bcrypt imports here,
// since middleware runs on the Edge runtime and the `pg` driver adapter
// Prisma uses does not work there. The full Credentials provider (which
// does need Prisma) is added on top of this in `auth.ts`, which only ever
// runs in the Node.js runtime (API routes, Server Components).
export const authConfig = {
  // Vercel sets this automatically in its own deployments; explicit here so the
  // same config also works for local `next start` / self-hosting, where Auth.js
  // otherwise rejects requests with an "UntrustedHost" error.
  trustHost: true,
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    authorized({ auth, request }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = request.nextUrl.pathname.startsWith("/dashboard");

      if (isOnDashboard) {
        return isLoggedIn;
      }

      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
