-- Seed lookup tables. Safe to run repeatedly.
insert into sports (name, slug, category) values
  ('Surfing', 'surfing', 'Water'),
  ('Track & Field', 'track-field', 'Athletics'),
  ('Basketball', 'basketball', 'Team'),
  ('Climbing', 'climbing', 'Adventure'),
  ('Football', 'football', 'Team'),
  ('Cycling', 'cycling', 'Endurance'),
  ('Tennis', 'tennis', 'Racquet'),
  ('Swimming', 'swimming', 'Water')
on conflict (slug) do nothing;

insert into industries (name, slug) values
  ('Apparel', 'apparel'),
  ('Nutrition', 'nutrition'),
  ('Technology', 'technology'),
  ('Beverage', 'beverage'),
  ('Fitness', 'fitness'),
  ('Automotive', 'automotive')
on conflict (slug) do nothing;
