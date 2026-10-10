import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  TrendingUp,
  Package,
  Users,
  Compass,
  MessageSquare,
  Shield,
  Plus,
  Check,
  Edit,
  Trash2,
  ExternalLink,
  DollarSign
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PRODUCTS_DATA, ARTISANS_DATA, CRAFTS_DATA, INITIAL_ORDERS } from '../data/seedData';
import { Product, Artisan, Order } from '../types';

export const AdminPage: React.FC = () => {
  const {
    currentUser,
    loginAs,
    orders,
    updateOrderStatus,
    showNotification
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'artisans' | 'orders' | 'inquiries'>('overview');
  const [productList, setProductList] = useState<Product[]>(PRODUCTS_DATA);
  const [artisanList, setArtisanList] = useState<Artisan[]>(ARTISANS_DATA);

  // New Product Modal state
  const [showNewProductModal, setShowNewProductModal] = useState(false);
  const [newProdName, setNewProdName] = useState('');
  const [newProdCraft, setNewProdCraft] = useState('Sikki Grass Weaving');
  const [newProdArtisan, setNewProdArtisan] = useState('Devi Devi');
  const [newProdPrice, setNewProdPrice] = useState(3200);
  const [newProdDesc, setNewProdDesc] = useState('');

  // Sample inquiries
  const [inquiries, setInquiries] = useState([
    {
      id: 'inq-1',
      name: 'Vikram Sethi',
      org: 'Tata Heritage Projects',
      email: 'v.sethi@tataheritage.com',
      phone: '+91 98200 44332',
      subject: '400 Bespoke Sikki Grass Gift Boxes for Diwali',
      message: 'Need 400 customized Sikki woven keepsake boxes with brass engraved monograms.',
      status: 'new'
    },
    {
      id: 'inq-2',
      name: 'Dr. Meenakshi Sundaram',
      org: 'Craft Revival Trust',
      email: 'meenakshi@craftrevival.org',
      phone: '+91 98100 12890',
      subject: 'Sujuni Exhibition Collaboration',
      message: 'Inviting Sakhi–Saheli master artisans to hold an 8-day live symposium at Bangalore International Centre.',
      status: 'in_progress'
    }
  ]);

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName || !newProdPrice) return;

    const newProd: Product = {
      id: `prod-${Date.now()}`,
      name: newProdName,
      slug: newProdName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      shortDescription: newProdDesc || 'Handcrafted contemporary living piece from Bihar.',
      description: newProdDesc || 'Meticulously handcrafted by master artisans in rural Bihar.',
      price: Number(newProdPrice),
      images: [
        'https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=800&q=80'
      ],
      category: 'Living & Decor',
      categorySlug: 'living-decor',
      craft: newProdCraft,
      craftSlug: 'sikki-grass',
      artisanId: 'artisan-1',
      artisanName: newProdArtisan,
      artisanVillage: 'Ranti, Madhubani',
      materials: ['Natural Reed', 'Vegetable Dyes'],
      dimensions: '30 cm × 20 cm',
      weight: '400 g',
      colors: ['Natural Wheat Gold'],
      inventory: 15,
      sku: `SS-${Math.floor(100 + Math.random() * 900)}`,
      tags: ['New', 'Handcrafted', 'Contemporary'],
      featured: true,
      bestseller: false,
      newArrival: true,
      customizable: true,
      handmadeTime: '3 days of weaving',
      careInstructions: 'Dust with dry bristle brush.',
      story: 'Crafted in collaboration with our master sakhis.',
      status: 'active',
      rating: 5.0,
      reviewCount: 1,
      createdAt: new Date().toISOString()
    };

    setProductList([newProd, ...productList]);
    setShowNewProductModal(false);
    setNewProdName('');
    showNotification(`New product "${newProd.name}" published to catalog.`, 'success');
  };

  const totalRevenue = orders.reduce((s, o) => s + o.total, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      {/* Header */}
      <div className="border-b border-[#E8E1D5] pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-[#8C3A27] font-semibold uppercase tracking-wider">
            <Shield className="w-4 h-4" />
            <span>Curator & Master Admin Console</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#1E1B18] font-medium mt-1">
            Sakhi–Saheli Atelier Operations
          </h1>
        </div>

        {/* Status / Role switch notice */}
        <div className="text-xs text-[#5C564E] flex items-center gap-3">
          <span>Logged in as: <strong className="text-[#1E1B18]">{currentUser?.name}</strong></span>
          {currentUser?.role !== 'admin' && (
            <button
              onClick={() => loginAs('admin')}
              className="px-3 py-1 bg-[#8C3A27] text-white font-medium hover:bg-[#A34A35]"
            >
              Switch to Admin Role
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#E8E1D5] gap-8 text-xs font-semibold uppercase tracking-wider overflow-x-auto pb-2">
        {[
          { id: 'overview', label: 'Overview Metrics' },
          { id: 'products', label: `Products (${productList.length})` },
          { id: 'artisans', label: `Sakhis (${artisanList.length})` },
          { id: 'orders', label: `Customer Orders (${orders.length})` },
          { id: 'inquiries', label: `B2B Inquiries (${inquiries.length})` }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`pb-2 whitespace-nowrap transition-colors relative ${
              activeTab === tab.id ? 'text-[#8C3A27]' : 'text-[#5C564E] hover:text-[#1E1B18]'
            }`}
          >
            {tab.label}
            {activeTab === tab.id && <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#8C3A27]" />}
          </button>
        ))}
      </div>

      {/* Tab 1: Overview */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-white border border-[#E8E1D5] space-y-2">
              <span className="text-[11px] text-[#5C564E] uppercase tracking-wider font-semibold">Total Patron Sales</span>
              <div className="font-serif text-3xl font-bold text-[#1E1B18] tabular-nums">
                ₹{totalRevenue.toLocaleString('en-IN')}
              </div>
              <span className="text-[11px] text-[#8C3A27] font-medium block">
                100% direct artisan settlement completed
              </span>
            </div>

            <div className="p-6 bg-white border border-[#E8E1D5] space-y-2">
              <span className="text-[11px] text-[#5C564E] uppercase tracking-wider font-semibold">Total Orders</span>
              <div className="font-serif text-3xl font-bold text-[#1E1B18] tabular-nums">
                {orders.length}
              </div>
              <span className="text-[11px] text-[#5C564E] block">
                Insured express delivery across India
              </span>
            </div>

            <div className="p-6 bg-white border border-[#E8E1D5] space-y-2">
              <span className="text-[11px] text-[#5C564E] uppercase tracking-wider font-semibold">Active Master Sakhis</span>
              <div className="font-serif text-3xl font-bold text-[#1E1B18] tabular-nums">
                {artisanList.length}
              </div>
              <span className="text-[11px] text-[#5C564E] block">
                Across 6 districts of Northern Bihar
              </span>
            </div>

            <div className="p-6 bg-white border border-[#E8E1D5] space-y-2">
              <span className="text-[11px] text-[#5C564E] uppercase tracking-wider font-semibold">Pending B2B Inquiries</span>
              <div className="font-serif text-3xl font-bold text-[#1E1B18] tabular-nums">
                {inquiries.filter(i => i.status === 'new').length}
              </div>
              <span className="text-[11px] text-[#8C3A27] font-medium block">
                Corporate gifting & museum proposals
              </span>
            </div>
          </div>

          {/* Recent Orders Overview */}
          <div className="bg-white border border-[#E8E1D5] p-6 space-y-4">
            <h3 className="font-serif text-xl text-[#1E1B18] font-medium">Recent Atelier Orders</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#E8E1D5] text-[#786F64] uppercase text-[10px]">
                    <th className="py-2.5">Order ID</th>
                    <th className="py-2.5">Customer</th>
                    <th className="py-2.5">Items</th>
                    <th className="py-2.5">Total</th>
                    <th className="py-2.5">Status</th>
                    <th className="py-2.5">Tracking</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8E1D5]">
                  {orders.map(o => (
                    <tr key={o.id} className="text-[#1E1B18]">
                      <td className="py-3 font-mono font-medium">{o.orderNumber}</td>
                      <td className="py-3">{o.customerName}</td>
                      <td className="py-3">{o.items.length} item(s)</td>
                      <td className="py-3 font-semibold tabular-nums">₹{o.total.toLocaleString('en-IN')}</td>
                      <td className="py-3">
                        <span className="px-2 py-0.5 text-[10px] uppercase font-semibold bg-[#EFE8DC] text-[#8C3A27]">
                          {o.orderStatus}
                        </span>
                      </td>
                      <td className="py-3 font-mono text-[11px] text-[#5C564E]">{o.trackingNumber}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Products */}
      {activeTab === 'products' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <span className="text-xs text-[#5C564E]">
              Manage cataloged pieces, inventory levels, and craftsmanship pricing.
            </span>
            <button
              onClick={() => setShowNewProductModal(true)}
              className="px-4 py-2 bg-[#8C3A27] hover:bg-[#A34A35] text-white text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Catalog New Piece</span>
            </button>
          </div>

          <div className="bg-white border border-[#E8E1D5] overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#E8E1D5] text-[#786F64] uppercase text-[10px] bg-[#FAF7F2]">
                  <th className="p-3">Product Name</th>
                  <th className="p-3">Craft</th>
                  <th className="p-3">Master Sakhi</th>
                  <th className="p-3">Price</th>
                  <th className="p-3">Inventory</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8E1D5]">
                {productList.map(p => (
                  <tr key={p.id}>
                    <td className="p-3 font-medium text-[#1E1B18]">{p.name}</td>
                    <td className="p-3 text-[#5C564E]">{p.craft}</td>
                    <td className="p-3 text-[#8C3A27]">{p.artisanName}</td>
                    <td className="p-3 font-semibold tabular-nums text-[#1E1B18]">₹{p.price.toLocaleString('en-IN')}</td>
                    <td className="p-3 tabular-nums">{p.inventory} units</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 text-[10px] uppercase font-semibold bg-emerald-50 text-emerald-800">
                        {p.status}
                      </span>
                    </td>
                    <td className="p-3">
                      <Link to={`/product/${p.slug}`} className="text-[#8C3A27] hover:underline flex items-center gap-1">
                        <span>View</span>
                        <ExternalLink className="w-3 h-3" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Artisans */}
      {activeTab === 'artisans' && (
        <div className="space-y-6">
          <div className="bg-white border border-[#E8E1D5] overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#E8E1D5] text-[#786F64] uppercase text-[10px] bg-[#FAF7F2]">
                  <th className="p-3">Sakhi Name</th>
                  <th className="p-3">Village & District</th>
                  <th className="p-3">Primary Craft</th>
                  <th className="p-3">Experience</th>
                  <th className="p-3">Verification</th>
                  <th className="p-3">Profile</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8E1D5]">
                {artisanList.map(a => (
                  <tr key={a.id}>
                    <td className="p-3 font-medium text-[#1E1B18]">{a.name}</td>
                    <td className="p-3 text-[#5C564E]">{a.village}, {a.district}</td>
                    <td className="p-3 text-[#8C3A27]">{a.craft}</td>
                    <td className="p-3 tabular-nums">{a.yearsOfExperience} Years</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 text-[10px] uppercase font-semibold bg-emerald-50 text-emerald-800 flex items-center gap-1 w-fit">
                        <Check className="w-3 h-3" />
                        <span>Verified GI Master</span>
                      </span>
                    </td>
                    <td className="p-3">
                      <Link to={`/artisans/${a.id}`} className="text-[#8C3A27] hover:underline flex items-center gap-1">
                        <span>View Bio</span>
                        <ExternalLink className="w-3 h-3" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 4: Orders & Status Management */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          <span className="text-xs text-[#5C564E] block">
            Update fulfillment states to trigger courier notifications.
          </span>
          <div className="bg-white border border-[#E8E1D5] divide-y divide-[#E8E1D5]">
            {orders.map(order => (
              <div key={order.id} className="p-6 space-y-4">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                  <div>
                    <span className="font-mono text-sm font-semibold text-[#1E1B18]">{order.orderNumber}</span>
                    <span className="text-xs text-[#5C564E] ml-3">Customer: {order.customerName} ({order.customerPhone})</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-[#5C564E]">Fulfillment Status:</span>
                    <select
                      value={order.orderStatus}
                      onChange={e => updateOrderStatus(order.id, e.target.value as any)}
                      className="border border-[#E8E1D5] bg-[#FAF7F2] text-xs px-2.5 py-1 text-[#1E1B18] font-medium"
                    >
                      <option value="confirmed">Confirmed</option>
                      <option value="crafting">In Crafting</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                    </select>
                  </div>
                </div>

                <div className="text-xs text-[#5C564E] grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <div>
                    <strong>Shipping Address:</strong> {order.shippingAddress.street}, {order.shippingAddress.city} - {order.shippingAddress.postalCode}
                  </div>
                  <div>
                    <strong>Tracking AWB:</strong> <span className="font-mono">{order.trackingNumber}</span>
                  </div>
                  <div>
                    <strong>Total Amount:</strong> ₹{order.total.toLocaleString('en-IN')} ({order.paymentMethod.toUpperCase()})
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 5: Inquiries */}
      {activeTab === 'inquiries' && (
        <div className="space-y-6">
          <div className="space-y-4">
            {inquiries.map(inq => (
              <div key={inq.id} className="p-6 bg-white border border-[#E8E1D5] space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 bg-[#EFE8DC] text-[#8C3A27]">
                      {inq.subject}
                    </span>
                    <h4 className="font-serif text-lg text-[#1E1B18] font-medium mt-1">
                      {inq.name} · {inq.org}
                    </h4>
                    <p className="text-xs text-[#5C564E]">{inq.email} · {inq.phone}</p>
                  </div>
                  <span className={`px-2 py-0.5 text-[10px] uppercase font-semibold ${
                    inq.status === 'new' ? 'bg-[#8C3A27] text-white' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {inq.status}
                  </span>
                </div>
                <p className="text-xs text-[#5C564E] bg-[#FAF7F2] p-3 border border-[#E8E1D5]">
                  “{inq.message}”
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal: New Product */}
      {showNewProductModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center p-4">
            <div className="fixed inset-0 bg-black/50" onClick={() => setShowNewProductModal(false)} />
            <div className="relative w-full max-w-lg bg-[#FAF7F2] border border-[#E8E1D5] p-6 sm:p-8 z-10 shadow-2xl">
              <h3 className="font-serif text-2xl text-[#1E1B18] font-medium mb-4">
                Catalog New Handcrafted Piece
              </h3>
              <form onSubmit={handleCreateProduct} className="space-y-4 text-xs">
                <div>
                  <label className="block text-[#1E1B18] font-medium mb-1">Product Title *</label>
                  <input
                    type="text"
                    required
                    value={newProdName}
                    onChange={e => setNewProdName(e.target.value)}
                    placeholder="e.g. Sikki Archival Bread Vessel"
                    className="w-full bg-white border border-[#E8E1D5] p-2 focus:outline-none focus:border-[#8C3A27]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#1E1B18] font-medium mb-1">Craft Discipline</label>
                    <select
                      value={newProdCraft}
                      onChange={e => setNewProdCraft(e.target.value)}
                      className="w-full bg-white border border-[#E8E1D5] p-2"
                    >
                      {CRAFTS_DATA.map(c => (
                        <option key={c.id} value={c.name}>{c.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[#1E1B18] font-medium mb-1">Assigned Sakhi</label>
                    <select
                      value={newProdArtisan}
                      onChange={e => setNewProdArtisan(e.target.value)}
                      className="w-full bg-white border border-[#E8E1D5] p-2"
                    >
                      {ARTISANS_DATA.map(a => (
                        <option key={a.id} value={a.name}>{a.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-[#1E1B18] font-medium mb-1">Patron Price (INR) *</label>
                  <input
                    type="number"
                    required
                    value={newProdPrice}
                    onChange={e => setNewProdPrice(Number(e.target.value))}
                    className="w-full bg-white border border-[#E8E1D5] p-2 focus:outline-none focus:border-[#8C3A27]"
                  />
                </div>
                <div>
                  <label className="block text-[#1E1B18] font-medium mb-1">Short Description</label>
                  <textarea
                    rows={3}
                    value={newProdDesc}
                    onChange={e => setNewProdDesc(e.target.value)}
                    placeholder="Describe material, hand coiling, or weave details..."
                    className="w-full bg-white border border-[#E8E1D5] p-2 focus:outline-none focus:border-[#8C3A27]"
                  />
                </div>
                <div className="pt-2 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowNewProductModal(false)}
                    className="px-4 py-2 border border-[#E8E1D5] text-[#5C564E]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-[#8C3A27] text-white font-semibold uppercase tracking-wider"
                  >
                    Publish to Catalog
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
