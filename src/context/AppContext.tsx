import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Product, CartItem, Order, Address } from '../types';
import { DEMO_USERS, PRODUCTS_DATA, INITIAL_ORDERS } from '../data/seedData';

interface Notification {
  id: string;
  type: 'success' | 'info' | 'error';
  message: string;
}

interface AppContextType {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  loginAs: (role: 'customer' | 'artisan' | 'admin') => void;
  logout: () => void;
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, selectedColor?: string) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartSubtotal: number;
  cartCount: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isAuthOpen: boolean;
  setIsAuthOpen: (open: boolean) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  orders: Order[];
  placeOrder: (shippingAddress: Address, paymentMethod: 'online' | 'cod') => Promise<Order>;
  updateOrderStatus: (orderId: string, status: Order['orderStatus']) => void;
  notifications: Notification[];
  showNotification: (message: string, type?: 'success' | 'info' | 'error') => void;
  removeNotification: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Current user state - default to Priya Narayanan (Customer)
  const [currentUser, setCurrentUser] = useState<User | null>(DEMO_USERS[2]);
  const [cart, setCart] = useState<CartItem[]>(() => {
    // Initial sample item in cart
    return [
      {
        productId: PRODUCTS_DATA[0].id,
        product: PRODUCTS_DATA[0],
        quantity: 1,
        selectedColor: PRODUCTS_DATA[0].colors[0]
      }
    ];
  });
  const [wishlist, setWishlist] = useState<string[]>(['prod-2', 'prod-3']);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const showNotification = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = `notif-${Date.now()}-${Math.random()}`;
    setNotifications(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 4000);
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const loginAs = (role: 'customer' | 'artisan' | 'admin') => {
    if (role === 'admin') setCurrentUser(DEMO_USERS[0]);
    else if (role === 'artisan') setCurrentUser(DEMO_USERS[1]);
    else setCurrentUser(DEMO_USERS[2]);
    showNotification(`Logged in as ${role.toUpperCase()}`, 'info');
  };

  const logout = () => {
    setCurrentUser(null);
    showNotification('Logged out successfully', 'info');
  };

  const addToCart = (product: Product, quantity = 1, selectedColor?: string) => {
    setCart(prev => {
      const existing = prev.find(item => item.productId === product.id);
      if (existing) {
        return prev.map(item =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, {
        productId: product.id,
        product,
        quantity,
        selectedColor: selectedColor || product.colors[0]
      }];
    });
    showNotification(`Added "${product.name}" to your bag`, 'success');
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.productId !== productId));
    showNotification('Item removed from bag', 'info');
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.productId === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartSubtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => {
      const exists = prev.includes(productId);
      if (exists) {
        showNotification('Removed from saved pieces', 'info');
        return prev.filter(id => id !== productId);
      } else {
        showNotification('Saved to your wishlist', 'success');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => {
    return wishlist.includes(productId);
  };

  const placeOrder = async (shippingAddress: Address, paymentMethod: 'online' | 'cod'): Promise<Order> => {
    const shippingFee = cartSubtotal >= 3000 ? 0 : 250;
    const discount = 0;
    const total = cartSubtotal + shippingFee - discount;

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber: `SS-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      userId: currentUser ? currentUser.id : 'guest',
      customerName: shippingAddress.name,
      customerEmail: currentUser?.email || 'customer@example.com',
      customerPhone: shippingAddress.phone,
      items: cart.map(c => ({
        productId: c.productId,
        productName: c.product.name,
        productImage: c.product.images[0],
        price: c.product.price,
        quantity: c.quantity,
        artisanName: c.product.artisanName,
        craft: c.product.craft
      })),
      shippingAddress,
      subtotal: cartSubtotal,
      shippingFee,
      discount,
      total,
      paymentMethod,
      paymentStatus: paymentMethod === 'cod' ? 'pending' : 'paid',
      orderStatus: 'confirmed',
      trackingNumber: `EXP-SS-${Math.floor(100000 + Math.random() * 900000)}`,
      estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      createdAt: new Date().toISOString()
    };

    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    showNotification(`Order ${newOrder.orderNumber} confirmed! Our artisans have received your order.`, 'success');
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: Order['orderStatus']) => {
    setOrders(prev =>
      prev.map(o => (o.id === orderId ? { ...o, orderStatus: status } : o))
    );
    showNotification(`Order status updated to ${status}`, 'info');
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        loginAs,
        logout,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartSubtotal,
        cartCount,
        isCartOpen,
        setIsCartOpen,
        wishlist,
        toggleWishlist,
        isInWishlist,
        isSearchOpen,
        setIsSearchOpen,
        isAuthOpen,
        setIsAuthOpen,
        quickViewProduct,
        setQuickViewProduct,
        isCheckoutOpen,
        setIsCheckoutOpen,
        orders,
        placeOrder,
        updateOrderStatus,
        notifications,
        showNotification,
        removeNotification
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
