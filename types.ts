export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price_junior: number;
  price_senior: number;
  price_mega: number;
  category: 'base-tomate' | 'base-creme' | 'sides' | 'desserts' | 'drinks';
  image_url: string;
  is_halal: boolean;
  is_vegetarian: boolean;
  is_spicy?: boolean;
  is_new?: boolean;
  available: boolean;
  allergens?: string[];
}

export interface CartItem {
  id: string; // Unique ID for cart entry (product ID + hash of options)
  menuItem: MenuItem;
  size: 'junior' | 'senior' | 'mega';
  quantity: number;
  customizations: {
    base: string;
    removals: string[];
    extras: string[];
  };
  totalPrice: number;
}

export interface Order {
  id: string;
  order_number: string;
  customer_name: string;
  customer_phone: string;
  customer_email?: string;
  delivery_address?: string;
  type: 'takeaway' | 'delivery' | 'dine_in';
  status: 'pending' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
  items: CartItem[];
  subtotal: number;
  delivery_fee: number;
  total: number;
  created_at: string;
  table_number?: number;
}

export type OrderStatus = Order['status'];

export interface Category {
  id: string;
  name: string;
  slug: string;
}