import { prisma } from "@/lib/prisma";

const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 5;

export interface RateLimitStatus {
  limited: boolean;
  retryAfterMinutes: number;
}

export function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();

  const realIp = request.headers.get("x-real-ip");
  if (realIp) return realIp;

  return "unknown";
}

export async function checkLoginRateLimit(ip: string): Promise<RateLimitStatus> {
  const windowStart = new Date(Date.now() - WINDOW_MS);

  const attempts = await prisma.loginAttempt.count({
    where: { ip, createdAt: { gte: windowStart } },
  });

  return {
    limited: attempts >= MAX_ATTEMPTS,
    retryAfterMinutes: Math.ceil(WINDOW_MS / 60_000),
  };
}

export async function recordLoginAttempt(ip: string, success: boolean): Promise<void> {
  await prisma.loginAttempt.create({ data: { ip, success } });
}
