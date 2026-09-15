import { getIronSession, type SessionOptions } from "iron-session";
import { cookies } from "next/headers";

export type SessionData = {
  userId?: string;
  email?: string;
  isLoggedIn: boolean;
};

export function getSessionOptions(): SessionOptions {
  const password = process.env.SESSION_SECRET;
  if (!password || password.length < 32) {
    throw new Error("SESSION_SECRET must be set and at least 32 characters");
  }

  return {
    password,
    cookieName: "oko_admin_session",
    cookieOptions: {
      httpOnly: true,
      // HTTP VPS preview uses SESSION_SECURE=false; browsers drop Secure cookies on http://
      secure: process.env.SESSION_SECURE === "true",
      sameSite: "lax",
      maxAge: 60 * 60 * 12,
      path: "/",
    },
  };
}

export async function getSession() {
  const cookieStore = await cookies();
  return getIronSession<SessionData>(cookieStore, getSessionOptions());
}

export async function requireAdmin() {
  const session = await getSession();
  if (!session.isLoggedIn || !session.userId) {
    return null;
  }
  return session;
}
