-- ============================================================
-- Athllo — grant the auth trigger role access to run handle_new_user (0004)
-- GoTrue's supabase_auth_admin role must resolve public.handle_new_user()
-- and its own security-definer target table on every signup.
-- ============================================================

grant usage on schema public to supabase_auth_admin;
grant execute on function public.handle_new_user() to supabase_auth_admin;
grant insert on public.users to supabase_auth_admin;
