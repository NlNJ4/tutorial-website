import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  CREATE_AUTH_COOKIE,
  createAccessCookieValue,
  createAuthCookieOptions,
  isCreatorAccessConfigured,
} from "@/lib/create-access";

export async function POST(request: Request) {
  if (!isCreatorAccessConfigured()) {
    return NextResponse.json(
      { error: "Creator password is not configured on the server." },
      { status: 503 }
    );
  }

  let password = "";
  try {
    const body = (await request.json()) as { password?: string };
    password = body.password?.trim() ?? "";
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (password !== process.env.LEARNLY_CREATE_PASSWORD) {
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  }

  const token = createAccessCookieValue();
  if (!token) {
    return NextResponse.json({ error: "Auth is misconfigured." }, { status: 503 });
  }

  const store = await cookies();
  store.set(CREATE_AUTH_COOKIE, token, createAuthCookieOptions());

  return NextResponse.json({ ok: true });
}
