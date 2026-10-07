-- ============ HELPER: is the current user an admin? ============
-- "security definer" lets this check the profiles table without
-- being blocked by that table's own rules.
create or replace function is_admin()
returns boolean
language sql
stable
security definer set search_path = public
as $$
  select exists (
    select 1 from profiles where id = auth.uid() and role = 'admin'
  );
$$;

-- ============ TURN ON RLS (blocks everything until a policy allows it) ============
alter table categories       enable row level security;
alter table profiles         enable row level security;
alter table products         enable row level security;
alter table product_variants enable row level security;
alter table events           enable row level security;
alter table orders           enable row level security;
alter table order_items      enable row level security;

-- ============ CATEGORIES ============
create policy "Anyone can view categories"
  on categories for select using (true);
create policy "Admins manage categories"
  on categories for all using (is_admin()) with check (is_admin());

-- ============ PRODUCTS ============
create policy "Public sees active products"
  on products for select using (is_active or is_admin());
create policy "Admins manage products"
  on products for all using (is_admin()) with check (is_admin());

-- ============ VARIANTS ============
create policy "Anyone can view variants"
  on product_variants for select using (true);
create policy "Admins manage variants"
  on product_variants for all using (is_admin()) with check (is_admin());

-- ============ EVENTS ============
create policy "Public sees published events"
  on events for select using (is_published or is_admin());
create policy "Admins manage events"
  on events for all using (is_admin()) with check (is_admin());

-- ============ PROFILES ============
create policy "Users view own profile"
  on profiles for select using (auth.uid() = id or is_admin());
create policy "Users update own profile"
  on profiles for update using (auth.uid() = id);

-- Customers may only edit name and phone, never their own role.
revoke update on profiles from authenticated;
grant update (full_name, phone) on profiles to authenticated;

-- ============ ORDERS ============
-- No insert policy on purpose: the server saves orders using the
-- service-role key, which bypasses RLS. Browsers can't create orders directly.
create policy "Users view own orders"
  on orders for select using (auth.uid() = user_id or is_admin());
create policy "Admins update orders"
  on orders for update using (is_admin()) with check (is_admin());

-- ============ ORDER ITEMS ============
create policy "Users view own order items"
  on order_items for select using (
    is_admin() or exists (
      select 1 from orders
      where orders.id = order_items.order_id and orders.user_id = auth.uid()
    )
  );

-- ============ IMAGE STORAGE ============
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;

create policy "Anyone can view product images"
  on storage.objects for select using (bucket_id = 'product-images');
create policy "Admins upload product images"
  on storage.objects for insert
  with check (bucket_id = 'product-images' and is_admin());
create policy "Admins update product images"
  on storage.objects for update
  using (bucket_id = 'product-images' and is_admin());
create policy "Admins delete product images"
  on storage.objects for delete
  using (bucket_id = 'product-images' and is_admin());