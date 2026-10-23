import { createHash } from "node:crypto";

export const CREATE_AUTH_COOKIE = "learnly-create-auth";

const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 30;

export function isCreatorAccessConfigured(): boolean {
  return Boolean(process.env.LEARNLY_CREATE_PASSWORD?.length);
}

export function createAccessCookieValue(): string | null {
  const password = process.env.LEARNLY_CREATE_PASSWORD;
  if (!password) return null;
  return createHash("sha256").update(password, "utf8").digest("hex");
}

export function isCreatorAuthorized(cookieValue: string | undefined): boolean {
  if (!isCreatorAccessConfigured()) return true;
  const expected = createAccessCookieValue();
  return expected !== null && cookieValue === expected;
}

export function createAuthCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: COOKIE_MAX_AGE_SECONDS,
  };
}
