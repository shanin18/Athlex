import { createClient as createSupabaseClient } from "@supabase/supabase-js";

let _admin: ReturnType<typeof createSupabaseClient> | null = null;

/**
 * Service-role Supabase client — bypasses RLS. Server-only (webhooks, cron, admin actions).
 * Never import this into client components.
 */
export function createAdminClient() {
  if (_admin) return _admin;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Supabase service role env vars are not set");
  _admin = createSupabaseClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
  return _admin;
}
