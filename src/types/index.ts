export type UserRole = 'customer' | 'artisan' | 'admin';

export interface Address {
  id: string;
  name: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault?: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  avatar?: string;
  addresses: Address[];
  wishlist: string[]; // product IDs
  isActive: boolean;
  createdAt: string;
}

export interface Artisan {
  id: string;
  name: string;
  slug: string;
  village: string;
  district: string;
  state: string;
  craft: string;
  profileImage: string;
  coverImage: string;
  biography: string;
  story: string;
  quote?: string;
  yearsOfExperience: number;
  skills: string[];
  productCount: number;
  featured: boolean;
  verified: boolean;
  createdAt: string;
}

export interface Craft {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  history: string;
  region: string;
  images: string[];
  process: {
    step: string;
    title: string;
    description: string;
  }[];
  materials: string[];
  culturalSignificance: string;
  artisanIds: string[];
  featured: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  parentCategory?: string;
  featured: boolean;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: number;
  compareAtPrice?: number;
  images: string[];
  category: string;
  categorySlug: string;
  craft: string;
  craftSlug: string;
  artisanId: string;
  artisanName: string;
  artisanVillage: string;
  materials: string[];
  dimensions: string;
  weight: string;
  colors: string[];
  inventory: number;
  sku: string;
  tags: string[];
  featured: boolean;
  bestseller: boolean;
  newArrival: boolean;
  customizable: boolean;
  handmadeTime: string;
  careInstructions: string;
  story: string;
  status: 'active' | 'draft' | 'archived';
  rating: number;
  reviewCount: number;
  createdAt: string;
}

export interface CartItem {
  productId: string;
  product: Product;
  quantity: number;
  selectedColor?: string;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  shippingFee: number;
  discount: number;
  total: number;
}

export type OrderStatus = 'pending' | 'confirmed' | 'crafting' | 'shipped' | 'delivered' | 'cancelled';
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';

export interface OrderItem {
  productId: string;
  productName: string;
  productImage: string;
  price: number;
  quantity: number;
  artisanName: string;
  craft: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: OrderItem[];
  shippingAddress: Address;
  subtotal: number;
  shippingFee: number;
  discount: number;
  total: number;
  paymentMethod: 'online' | 'cod';
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  trackingNumber: string;
  estimatedDelivery?: string;
  createdAt: string;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  title: string;
  comment: string;
  verifiedPurchase: boolean;
  status: 'approved' | 'pending';
  createdAt: string;
}

export interface Exhibition {
  id: string;
  title: string;
  slug: string;
  description: string;
  location: string;
  venue: string;
  date: string;
  endDate?: string;
  coverImage: string;
  gallery: string[];
  artisans: string[];
  status: 'upcoming' | 'ongoing' | 'concluded';
  registrationLink?: string;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  type: 'customer' | 'artisan' | 'retailer' | 'exhibition' | 'corporate' | 'collaboration';
  status: 'new' | 'in_progress' | 'resolved';
  createdAt: string;
}

export interface Story {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: 'Artisan Stories' | 'Craft Knowledge' | 'Design' | 'Bihar Heritage';
  readTime: string;
  coverImage: string;
  author: string;
  artisanSlug?: string;
  craftSlug?: string;
  publishedAt: string;
}
