-- Remove the temporary diagnostic scaffolding from 0005.
drop table if exists _debug_trigger_errors;

create or replace function handle_new_user() returns trigger as $$
begin
  insert into public.users (id, email, role)
  values (
    new.id,
    new.email,
    coalesce((new.raw_user_meta_data->>'role')::user_role, 'athlete')
  );
  return new;
end;
$$ language plpgsql security definer;
