export type Category = {
  id: string;
  slug: string;
  label: string;
  sort_order: number;
};

export type Product = {
  id: string;
  category_id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  compare_at_price: number | null;
  images: string[];
  stock: number;
  is_active: boolean;
  is_featured: boolean;
  created_at: string;
};

export type ProductVariant = {
  id: string;
  product_id: string;
  label: string;
  stock: number;
  price_override: number | null;
};

export type CartItem = {
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  variant?: string;
};

export type Event = {
  id: string;
  title: string;
  slug: string;
  description: string;
  event_date: string;
  location: string;
  image: string | null;
  is_published: boolean;
};

export type Order = {
  id: string;
  order_number: number;
  user_id: string | null;
  customer_name: string;
  email: string;
  phone: string;
  address_line: string;
  city: string;
  state: string;
  pincode: string;
  subtotal: number;
  shipping_fee: number;
  total: number;
  payment_method: "cod" | "upi" | "whatsapp" | "razorpay";
  payment_status: "pending" | "paid" | "failed" | "refunded";
  order_status: "placed" | "confirmed" | "shipped" | "delivered" | "cancelled";
  tracking_number: string | null;
  created_at: string;
};

export type OrderItem = {
  id: string;
  order_id: string;
  product_id: string | null;
  variant_label: string | null;
  name: string;
  price: number;
  quantity: number;
  image: string | null;
};