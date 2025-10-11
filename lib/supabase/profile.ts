"use client";

import { getSupabaseBrowserClient } from "./client";
import type { UserMeta } from "@/types/user-meta";

type UpdateUserResponse = Promise<{
  data: { user: unknown | null };
  error: unknown | null;
}>;

export async function updateProfile(
  metadata: Partial<UserMeta>
): UpdateUserResponse {
  const supabase = getSupabaseBrowserClient();
  // The Supabase client typings for `updateUser` in-browser may not match our
  // local types; limit the `any` to this helper where we handle the result.
  // This keeps the rest of the app strongly typed.
  const res = await (
    supabase.auth as unknown as {
      updateUser: (p: unknown) => UpdateUserResponse;
    }
  ).updateUser({ data: metadata });
  return res;
}
