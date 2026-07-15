-- Root cause of "Database error creating new user": handle_new_user() cast
-- to the unqualified `user_role` enum, but the connection that fires this
-- trigger (from auth.users, via GoTrue) doesn't have `public` on its
-- search_path, so Postgres can't resolve the type — every signup aborted
-- with `type "user_role" does not exist`.
create or replace function handle_new_user() returns trigger as $$
begin
  insert into public.users (id, email, role)
  values (
    new.id,
    new.email,
    coalesce((new.raw_user_meta_data->>'role')::public.user_role, 'athlete')
  );
  return new;
end;
$$ language plpgsql security definer set search_path = public;
