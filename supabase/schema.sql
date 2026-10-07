-- ============ CATEGORIES ============
create table if not exists categories (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  label text not null,
  sort_order int not null default 0
);

-- ============ PROFILES (one per signed-up customer) ============
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  phone text,
  role text not null default 'customer' check (role in ('customer', 'admin')),
  created_at timestamptz not null default now()
);

-- ============ PRODUCTS ============
create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  category_id uuid not null references categories(id),
  name text not null,
  slug text unique not null,
  description text not null default '',
  price numeric(10,2) not null check (price >= 0),
  compare_at_price numeric(10,2),            -- old price, for "sale" display
  images text[] not null default '{}',       -- list of image URLs
  stock int not null default 0 check (stock >= 0),
  is_active boolean not null default true,   -- hide without deleting
  is_featured boolean not null default false,-- show on homepage
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists products_category_idx on products(category_id);

-- ============ VARIANTS (optional: sizes, colours) ============
create table if not exists product_variants (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references products(id) on delete cascade,
  label text not null,                       -- e.g. "Size M" or "Gold"
  stock int not null default 0 check (stock >= 0),
  price_override numeric(10,2)               -- leave empty to use product price
);

-- ============ EVENTS ============
create table if not exists events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  description text not null default '',
  event_date timestamptz not null,
  location text not null default '',
  image text,
  is_published boolean not null default true,
  created_at timestamptz not null default now()
);

-- ============ ORDERS ============
create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  order_number bigint generated always as identity (start with 1001),
  user_id uuid references auth.users(id),    -- empty for guest checkout
  customer_name text not null,
  email text not null,
  phone text not null,
  address_line text not null,
  city text not null,
  state text not null,
  pincode text not null,
  subtotal numeric(10,2) not null,
  shipping_fee numeric(10,2) not null default 0,
  total numeric(10,2) not null,
  payment_method text not null default 'cod'
    check (payment_method in ('cod', 'upi', 'whatsapp', 'razorpay')),
  payment_status text not null default 'pending'
    check (payment_status in ('pending', 'paid', 'failed', 'refunded')),
  order_status text not null default 'placed'
    check (order_status in ('placed', 'confirmed', 'shipped', 'delivered', 'cancelled')),
  tracking_number text,
  notes text,
  created_at timestamptz not null default now()
);

create index if not exists orders_user_idx on orders(user_id);

-- ============ ORDER ITEMS ============
-- Name and price are copied at purchase time, so later edits to a
-- product never change past orders.
create table if not exists order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references orders(id) on delete cascade,
  product_id uuid references products(id) on delete set null,
  variant_label text,
  name text not null,
  price numeric(10,2) not null,
  quantity int not null check (quantity > 0),
  image text
);

create index if not exists order_items_order_idx on order_items(order_id);

-- ============ TRIGGER: auto-create a profile on signup ============
create or replace function handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function handle_new_user();

-- ============ TRIGGER: keep products.updated_at fresh ============
create or replace function set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists products_updated_at on products;
create trigger products_updated_at
  before update on products
  for each row execute function set_updated_at();