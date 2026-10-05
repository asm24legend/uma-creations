export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  category: "jewellery" | "fashion" | "miscellaneous";
  images: string[];
  stock: number;
  is_active: boolean;
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
  image?: string;
};