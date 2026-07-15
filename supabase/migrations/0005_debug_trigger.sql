-- Temporary diagnostic: capture the real error from handle_new_user.
create table if not exists _debug_trigger_errors (
  id bigserial primary key,
  message text,
  created_at timestamptz not null default now()
);
grant select, insert on _debug_trigger_errors to supabase_auth_admin, service_role, anon, authenticated;
grant usage, select on sequence _debug_trigger_errors_id_seq to supabase_auth_admin, service_role;

create or replace function handle_new_user() returns trigger as $$
begin
  begin
    insert into public.users (id, email, role)
    values (
      new.id,
      new.email,
      coalesce((new.raw_user_meta_data->>'role')::user_role, 'athlete')
    );
  exception when others then
    insert into _debug_trigger_errors (message) values (SQLERRM);
  end;
  return new;
end;
$$ language plpgsql security definer;
