import express, { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import {
  CRAFTS_DATA,
  ARTISANS_DATA,
  CATEGORIES_DATA,
  PRODUCTS_DATA,
  EXHIBITIONS_DATA,
  STORIES_DATA,
  INITIAL_ORDERS,
  DEMO_USERS
} from './src/data/seedData';
import { Product, Artisan, Craft, Order, Inquiry, Review, User } from './src/types';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// In-Memory Data Store (persists during process lifetime)
let products: Product[] = [...PRODUCTS_DATA];
let artisans: Artisan[] = [...ARTISANS_DATA];
let crafts: Craft[] = [...CRAFTS_DATA];
let categories = [...CATEGORIES_DATA];
let exhibitions = [...EXHIBITIONS_DATA];
let stories = [...STORIES_DATA];
let orders: Order[] = [...INITIAL_ORDERS];
let users: User[] = [...DEMO_USERS];

let reviews: Review[] = [
  {
    id: 'rev-1',
    productId: 'prod-1',
    userId: 'user-cust-1',
    userName: 'Priya Narayanan',
    rating: 5,
    title: 'Exquisite luminaire, warm sacred light',
    comment: 'The craftsmanship of the Sikki pendant is extraordinary. The grass has a natural golden aura that synthetic materials could never emulate. Delivered in pristine custom wooden-reinforced packaging with a certificate of authenticity signed by Devi Devi.',
    verifiedPurchase: true,
    status: 'approved',
    createdAt: '2026-02-14'
  },
  {
    id: 'rev-2',
    productId: 'prod-2',
    userId: 'user-cust-2',
    userName: 'Rohan Mehra',
    rating: 5,
    title: 'Poetry in thread work',
    comment: 'The Sujuni cushion cover is truly museum quality. You can feel the hours of patient hand-quilting in the tactile texture. Proud to have Bihar craft in our home.',
    verifiedPurchase: true,
    status: 'approved',
    createdAt: '2026-03-01'
  }
];

let inquiries: Inquiry[] = [
  {
    id: 'inq-1',
    name: 'Vikram Sethi',
    email: 'v.sethi@tataheritage.com',
    phone: '+91 98200 44332',
    subject: 'Corporate Diwali Gifting — 400 Curated Sikki Boxes',
    message: 'We are seeking 400 bespoke handcrafted Sikki gift boxes with custom brass monograms for executive corporate gifting.',
    type: 'corporate',
    status: 'new',
    createdAt: '2026-10-04T09:30:00Z'
  }
];

let newsletterSubscribers: { id: string; email: string; subscribedAt: string }[] = [];

// API ROUTES

// 1. AUTH
app.post('/api/auth/login', (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  let user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (!user) {
    // If not found, create a demo customer user on the fly for ease of evaluation
    user = {
      id: `user-${Date.now()}`,
      name: email.split('@')[0],
      email: email.toLowerCase(),
      role: email.includes('admin') ? 'admin' : email.includes('artisan') ? 'artisan' : 'customer',
      addresses: [],
      wishlist: [],
      isActive: true,
      createdAt: new Date().toISOString()
    };
    users.push(user);
  }

  // Simulated session token
  const token = `token_${user.id}_${Date.now()}`;
  res.json({ user, token });
});

app.post('/api/auth/register', (req: Request, res: Response) => {
  const { name, email, phone, role } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  const existing = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (existing) {
    return res.status(409).json({ error: 'User already exists' });
  }

  const newUser: User = {
    id: `user-${Date.now()}`,
    name,
    email: email.toLowerCase(),
    phone,
    role: role || 'customer',
    addresses: [],
    wishlist: [],
    isActive: true,
    createdAt: new Date().toISOString()
  };

  users.push(newUser);
  const token = `token_${newUser.id}_${Date.now()}`;
  res.status(201).json({ user: newUser, token });
});

app.get('/api/auth/me', (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'Not authorized' });
  }
  const token = authHeader.replace('Bearer ', '');
  const parts = token.split('_');
  const userId = parts[1];
  const user = users.find(u => u.id === userId) || users[0];
  res.json({ user });
});

// 2. PRODUCTS
app.get('/api/products', (req: Request, res: Response) => {
  let filtered = [...products];
  const { search, category, craft, artisan, minPrice, maxPrice, sort, featured, bestseller } = req.query;

  if (search && typeof search === 'string') {
    const q = search.toLowerCase();
    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.craft.toLowerCase().includes(q) ||
      p.artisanName.toLowerCase().includes(q) ||
      p.tags.some(t => t.toLowerCase().includes(q))
    );
  }

  if (category && typeof category === 'string' && category !== 'all') {
    filtered = filtered.filter(p => p.categorySlug === category || p.category.toLowerCase() === category.toLowerCase());
  }

  if (craft && typeof craft === 'string' && craft !== 'all') {
    filtered = filtered.filter(p => p.craftSlug === craft || p.craft.toLowerCase() === craft.toLowerCase());
  }

  if (artisan && typeof artisan === 'string' && artisan !== 'all') {
    filtered = filtered.filter(p => p.artisanId === artisan || p.artisanName.toLowerCase().includes(artisan.toLowerCase()));
  }

  if (minPrice) {
    filtered = filtered.filter(p => p.price >= parseFloat(minPrice as string));
  }

  if (maxPrice) {
    filtered = filtered.filter(p => p.price <= parseFloat(maxPrice as string));
  }

  if (featured === 'true') {
    filtered = filtered.filter(p => p.featured);
  }

  if (bestseller === 'true') {
    filtered = filtered.filter(p => p.bestseller);
  }

  if (sort === 'price-low-high') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sort === 'price-high-low') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sort === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating);
  } else {
    // default: newest
    filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  res.json({ products: filtered, total: filtered.length });
});

app.get('/api/products/:slug', (req: Request, res: Response) => {
  const { slug } = req.params;
  const product = products.find(p => p.slug === slug || p.id === slug);
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  res.json({ product });
});

app.post('/api/products', (req: Request, res: Response) => {
  const data = req.body;
  const newProduct: Product = {
    ...data,
    id: `prod-${Date.now()}`,
    slug: data.slug || data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    rating: 5.0,
    reviewCount: 0,
    status: data.status || 'active',
    createdAt: new Date().toISOString()
  };
  products.unshift(newProduct);
  res.status(201).json({ product: newProduct });
});

app.put('/api/products/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const index = products.findIndex(p => p.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Product not found' });
  }
  products[index] = { ...products[index], ...req.body };
  res.json({ product: products[index] });
});

app.delete('/api/products/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  products = products.filter(p => p.id !== id);
  res.json({ success: true });
});

// 3. ARTISANS
app.get('/api/artisans', (req: Request, res: Response) => {
  res.json({ artisans });
});

app.get('/api/artisans/:slug', (req: Request, res: Response) => {
  const { slug } = req.params;
  const artisan = artisans.find(a => a.slug === slug || a.id === slug);
  if (!artisan) {
    return res.status(404).json({ error: 'Artisan not found' });
  }
  const artisanProducts = products.filter(p => p.artisanId === artisan.id || p.artisanName === artisan.name);
  res.json({ artisan, products: artisanProducts });
});

app.post('/api/artisans', (req: Request, res: Response) => {
  const data = req.body;
  const newArtisan: Artisan = {
    ...data,
    id: `artisan-${Date.now()}`,
    slug: data.slug || data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    productCount: 0,
    featured: data.featured || false,
    verified: true,
    createdAt: new Date().toISOString()
  };
  artisans.push(newArtisan);
  res.status(201).json({ artisan: newArtisan });
});

app.put('/api/artisans/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const index = artisans.findIndex(a => a.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Artisan not found' });
  }
  artisans[index] = { ...artisans[index], ...req.body };
  res.json({ artisan: artisans[index] });
});

// 4. CRAFTS
app.get('/api/crafts', (req: Request, res: Response) => {
  res.json({ crafts });
});

app.get('/api/crafts/:slug', (req: Request, res: Response) => {
  const { slug } = req.params;
  const craft = crafts.find(c => c.slug === slug || c.id === slug);
  if (!craft) {
    return res.status(404).json({ error: 'Craft not found' });
  }
  const craftArtisans = artisans.filter(a => craft.artisanIds.includes(a.id) || a.craft.toLowerCase().includes(craft.name.toLowerCase()));
  const craftProducts = products.filter(p => p.craftSlug === craft.slug || p.craft.toLowerCase().includes(craft.name.toLowerCase()));
  res.json({ craft, artisans: craftArtisans, products: craftProducts });
});

// 5. CATEGORIES
app.get('/api/categories', (req: Request, res: Response) => {
  res.json({ categories });
});

// 6. ORDERS
app.get('/api/orders', (req: Request, res: Response) => {
  const userId = req.query.userId as string;
  if (userId) {
    return res.json({ orders: orders.filter(o => o.userId === userId) });
  }
  res.json({ orders });
});

app.get('/api/orders/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const order = orders.find(o => o.id === id || o.orderNumber === id);
  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }
  res.json({ order });
});

app.post('/api/orders', (req: Request, res: Response) => {
  const orderData = req.body;
  const newOrder: Order = {
    ...orderData,
    id: `ord-${Date.now()}`,
    orderNumber: `SS-2026-${Math.floor(1000 + Math.random() * 9000)}`,
    trackingNumber: `EXP-SS-${Math.floor(100000 + Math.random() * 900000)}`,
    orderStatus: 'confirmed',
    paymentStatus: orderData.paymentMethod === 'cod' ? 'pending' : 'paid',
    estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    createdAt: new Date().toISOString()
  };
  orders.unshift(newOrder);

  // Decrement inventory
  for (const item of newOrder.items) {
    const prod = products.find(p => p.id === item.productId);
    if (prod && prod.inventory > 0) {
      prod.inventory = Math.max(0, prod.inventory - item.quantity);
    }
  }

  res.status(201).json({ order: newOrder });
});

app.put('/api/orders/:id/status', (req: Request, res: Response) => {
  const { id } = req.params;
  const { orderStatus, paymentStatus } = req.body;
  const order = orders.find(o => o.id === id);
  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }
  if (orderStatus) order.orderStatus = orderStatus;
  if (paymentStatus) order.paymentStatus = paymentStatus;
  res.json({ order });
});

// 7. REVIEWS
app.get('/api/reviews/:productId', (req: Request, res: Response) => {
  const { productId } = req.params;
  const productReviews = reviews.filter(r => r.productId === productId);
  res.json({ reviews: productReviews });
});

app.post('/api/reviews', (req: Request, res: Response) => {
  const { productId, userId, userName, rating, title, comment } = req.body;
  const newReview: Review = {
    id: `rev-${Date.now()}`,
    productId,
    userId: userId || 'anon',
    userName: userName || 'Patron',
    rating: rating || 5,
    title: title || 'Thoughtful Craftsmanship',
    comment,
    verifiedPurchase: true,
    status: 'approved',
    createdAt: new Date().toISOString()
  };
  reviews.unshift(newReview);

  // Update product rating
  const prod = products.find(p => p.id === productId);
  if (prod) {
    const pRevs = reviews.filter(r => r.productId === productId);
    const avg = pRevs.reduce((acc, r) => acc + r.rating, 0) / pRevs.length;
    prod.rating = parseFloat(avg.toFixed(1));
    prod.reviewCount = pRevs.length;
  }

  res.status(201).json({ review: newReview });
});

// 8. EXHIBITIONS
app.get('/api/exhibitions', (req: Request, res: Response) => {
  res.json({ exhibitions });
});

app.get('/api/exhibitions/:slug', (req: Request, res: Response) => {
  const { slug } = req.params;
  const exhibition = exhibitions.find(e => e.slug === slug || e.id === slug);
  if (!exhibition) {
    return res.status(404).json({ error: 'Exhibition not found' });
  }
  res.json({ exhibition });
});

// 9. STORIES
app.get('/api/stories', (req: Request, res: Response) => {
  res.json({ stories });
});

app.get('/api/stories/:slug', (req: Request, res: Response) => {
  const { slug } = req.params;
  const story = stories.find(s => s.slug === slug || s.id === slug);
  if (!story) {
    return res.status(404).json({ error: 'Story not found' });
  }
  res.json({ story });
});

// 10. INQUIRIES (Corporate, Artisans, Gifting, Collaborations)
app.get('/api/inquiries', (req: Request, res: Response) => {
  res.json({ inquiries });
});

app.post('/api/inquiries', (req: Request, res: Response) => {
  const { name, email, phone, subject, message, type } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required' });
  }
  const newInquiry: Inquiry = {
    id: `inq-${Date.now()}`,
    name,
    email,
    phone: phone || '',
    subject: subject || 'General Inquiry',
    message,
    type: type || 'customer',
    status: 'new',
    createdAt: new Date().toISOString()
  };
  inquiries.unshift(newInquiry);
  res.status(201).json({ inquiry: newInquiry, success: true });
});

// 11. NEWSLETTER
app.post('/api/newsletter', (req: Request, res: Response) => {
  const { email } = req.body;
  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Valid email required' });
  }
  newsletterSubscribers.push({
    id: `sub-${Date.now()}`,
    email,
    subscribedAt: new Date().toISOString()
  });
  res.json({ success: true, message: 'Welcome to the Sakhi–Saheli community.' });
});

// 12. ADMIN ANALYTICS
app.get('/api/analytics', (req: Request, res: Response) => {
  const totalSales = orders.reduce((sum, o) => sum + o.total, 0);
  const totalOrders = orders.length;
  const activeArtisans = artisans.length;
  const totalProducts = products.length;
  const pendingInquiries = inquiries.filter(i => i.status === 'new').length;

  res.json({
    totalSales,
    totalOrders,
    activeArtisans,
    totalProducts,
    pendingInquiries,
    recentOrders: orders.slice(0, 5),
    topCrafts: crafts.map(c => ({
      name: c.name,
      productCount: products.filter(p => p.craftSlug === c.slug).length
    }))
  });
});

// VITE INTEGRATION
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    // Serve static files in production
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  } else {
    // Mount Vite middlewares in development
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);

    app.use('*', async (req: Request, res: Response, next) => {
      const url = req.originalUrl;
      try {
        let template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8');
        template = await vite.transformIndexHtml(url, template);
        res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
      } catch (e) {
        vite.ssrFixStacktrace(e as Error);
        next(e);
      }
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Sakhi–Saheli server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
