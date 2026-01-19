import { MenuItem } from '../types';

export const MOCK_MENU: MenuItem[] = [
  // Base Tomate
  {
    id: 'p1',
    name: 'Margherita',
    description: 'Sauce tomate maison, Mozzarella fior di latte, Origan, Basilic frais',
    price_junior: 8.50,
    price_senior: 11.50,
    price_mega: 15.00,
    category: 'base-tomate',
    image_url: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=500&q=80',
    is_halal: true,
    is_vegetarian: true,
    available: true,
    allergens: ['Gluten', 'Lait']
  },
  {
    id: 'p2',
    name: 'Reine',
    description: 'Sauce tomate, Mozzarella, Jambon de dinde, Champignons frais',
    price_junior: 9.50,
    price_senior: 12.50,
    price_mega: 16.50,
    category: 'base-tomate',
    image_url: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=500&q=80',
    is_halal: true,
    is_vegetarian: false,
    available: true,
    allergens: ['Gluten', 'Lait']
  },
  {
    id: 'p3',
    name: 'Orientale',
    description: 'Sauce tomate, Mozzarella, Merguez, Poivrons, Œuf, Olives noires',
    price_junior: 10.00,
    price_senior: 13.00,
    price_mega: 17.00,
    category: 'base-tomate',
    image_url: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=500&q=80',
    is_halal: true,
    is_vegetarian: false,
    is_spicy: true,
    available: true,
    allergens: ['Gluten', 'Lait', 'Œuf']
  },
  {
    id: 'p4',
    name: '4 Fromages',
    description: 'Sauce tomate, Mozzarella, Chèvre, Roquefort, Brie',
    price_junior: 11.00,
    price_senior: 14.00,
    price_mega: 18.00,
    category: 'base-tomate',
    image_url: 'https://images.unsplash.com/photo-1573821663912-569905455b1c?auto=format&fit=crop&w=500&q=80',
    is_halal: true,
    is_vegetarian: true,
    available: true,
    allergens: ['Gluten', 'Lait']
  },
  {
    id: 'p7',
    name: 'Campione',
    description: 'Tomate, Mozzarella, Viande Hachée, Champignons, Œuf',
    price_junior: 11.00,
    price_senior: 14.00,
    price_mega: 18.00,
    category: 'base-tomate',
    image_url: 'https://images.unsplash.com/photo-1594007654729-407eedc4be65?auto=format&fit=crop&w=500&q=80',
    is_halal: true,
    is_vegetarian: false,
    is_new: true,
    available: true,
    allergens: ['Gluten', 'Lait', 'Œuf']
  },
  // Base Creme
  {
    id: 'p5',
    name: 'Chèvre Miel',
    description: 'Crème fraîche, Mozzarella, Chèvre, Miel, Noix',
    price_junior: 11.00,
    price_senior: 14.00,
    price_mega: 18.00,
    category: 'base-creme',
    image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=500&q=80',
    is_halal: true,
    is_vegetarian: true,
    available: true,
    allergens: ['Gluten', 'Lait', 'Fruits à coque']
  },
  {
    id: 'p6',
    name: 'Kebab',
    description: 'Crème fraîche, Mozzarella, Viande Kebab, Oignons rouges',
    price_junior: 11.00,
    price_senior: 14.00,
    price_mega: 18.00,
    category: 'base-creme',
    image_url: 'https://images.unsplash.com/photo-1555072956-7758afb20e8f?auto=format&fit=crop&w=500&q=80',
    is_halal: true,
    is_vegetarian: false,
    available: true,
    allergens: ['Gluten', 'Lait']
  },
  // Sides
  {
    id: 's1',
    name: 'Chicken Wings x6',
    description: 'Ailes de poulet marinées et épicées',
    price_junior: 5.50,
    price_senior: 5.50,
    price_mega: 5.50,
    category: 'sides',
    image_url: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=500&q=80',
    is_halal: true,
    is_vegetarian: false,
    is_spicy: true,
    available: true,
    allergens: ['Gluten']
  },
  // Desserts
  {
    id: 'd1',
    name: 'Tiramisu Maison',
    description: 'Fait maison, recette classique au café',
    price_junior: 3.50,
    price_senior: 3.50,
    price_mega: 3.50,
    category: 'desserts',
    image_url: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=500&q=80',
    is_halal: true,
    is_vegetarian: true,
    available: true,
    allergens: ['Gluten', 'Lait', 'Œuf']
  },
  // Drinks
  {
    id: 'dr1',
    name: 'Coca-Cola 33cl',
    description: 'Canette',
    price_junior: 1.50,
    price_senior: 1.50,
    price_mega: 1.50,
    category: 'drinks',
    image_url: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=500&q=80',
    is_halal: true,
    is_vegetarian: true,
    available: true
  }
];

export const MOCK_ORDERS = [
  {
    id: 'o1',
    order_number: 'ASN-001',
    customer_name: 'Jean Dupont',
    customer_phone: '0612345678',
    type: 'delivery',
    status: 'preparing',
    items: [],
    subtotal: 25.50,
    delivery_fee: 2.50,
    total: 28.00,
    created_at: new Date().toISOString(),
    delivery_address: '12 Rue de la Paix'
  },
  {
    id: 'o2',
    order_number: 'ASN-002',
    customer_name: 'Marie Curie',
    customer_phone: '0698765432',
    type: 'takeaway',
    status: 'pending',
    items: [],
    subtotal: 14.00,
    delivery_fee: 0,
    total: 14.00,
    created_at: new Date().toISOString()
  }
];