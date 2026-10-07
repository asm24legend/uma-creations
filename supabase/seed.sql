insert into categories (slug, label, sort_order) values
  ('jewellery', 'Jewellery', 1),
  ('fashion', 'Fashion', 2),
  ('miscellaneous', 'Miscellaneous', 3)
on conflict (slug) do nothing;

insert into products (category_id, name, slug, description, price, stock, is_featured)
values
  ((select id from categories where slug = 'jewellery'),
   'Beaded Floral Necklace', 'beaded-floral-necklace',
   'Handmade glass-bead necklace with a floral pendant.', 799, 10, true),
  ((select id from categories where slug = 'jewellery'),
   'Oxidised Silver Earrings', 'oxidised-silver-earrings',
   'Lightweight handcrafted jhumka-style earrings.', 449, 15, true),
  ((select id from categories where slug = 'fashion'),
   'Hand-Embroidered Kurti', 'hand-embroidered-kurti',
   'Cotton kurti with hand embroidery on the neckline.', 1899, 6, true),
  ((select id from categories where slug = 'miscellaneous'),
   'Macrame Keychain', 'macrame-keychain',
   'Handwoven macrame keychain in assorted colours.', 199, 25, false)
on conflict (slug) do nothing;

insert into events (title, slug, description, event_date, location)
values
  ('Diwali Handmade Market', 'diwali-handmade-market',
   'Visit our stall for festive jewellery and clothing.',
   '2026-10-25 10:00:00+05:30', 'Jodhpur');