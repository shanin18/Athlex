-- Auto-provision athlete/sponsor profile + free subscription on signup,
-- so every new user has a usable dashboard immediately.
create or replace function handle_new_user() returns trigger as $$
declare
  v_role user_role;
  v_slug text;
begin
  v_role := coalesce((new.raw_user_meta_data->>'role')::public.user_role, 'athlete');

  insert into public.users (id, email, role)
  values (new.id, new.email, v_role);

  v_slug := lower(regexp_replace(split_part(new.email, '@', 1), '[^a-zA-Z0-9]+', '-', 'g'))
    || '-' || substr(new.id::text, 1, 6);

  if v_role = 'sponsor' then
    insert into public.sponsor_profiles (user_id, slug, company_name)
    values (new.id, v_slug, split_part(new.email, '@', 1));
  else
    insert into public.athlete_profiles (user_id, slug, display_name)
    values (new.id, v_slug, split_part(new.email, '@', 1));
  end if;

  insert into public.subscriptions (user_id, tier)
  values (new.id, 'free');

  return new;
end;
$$ language plpgsql security definer set search_path = public;
