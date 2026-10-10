import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { CartDrawer } from './components/cart/CartDrawer';
import { CheckoutModal } from './components/checkout/CheckoutModal';
import { QuickViewModal } from './components/product/QuickViewModal';
import { SearchModal } from './components/search/SearchModal';
import { AuthModal } from './components/auth/AuthModal';

// Pages
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { ArtisansPage } from './pages/ArtisansPage';
import { ArtisanDetailPage } from './pages/ArtisanDetailPage';
import { CraftsPage } from './pages/CraftsPage';
import { CraftDetailPage } from './pages/CraftDetailPage';
import { StoriesPage } from './pages/StoriesPage';
import { StoryDetailPage } from './pages/StoryDetailPage';
import { AboutPage } from './pages/AboutPage';
import { OurApproachPage } from './pages/OurApproachPage';
import { ExhibitionsPage } from './pages/ExhibitionsPage';
import { ContactPage } from './pages/ContactPage';
import { AccountPage } from './pages/AccountPage';
import { AdminPage } from './pages/AdminPage';
import { PoliciesPage } from './pages/PoliciesPage';

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Toast notification component
const NotificationToaster: React.FC = () => {
  const { notifications, removeNotification } = useApp();

  if (notifications.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm pointer-events-none">
      {notifications.map(n => (
        <div
          key={n.id}
          className={`pointer-events-auto p-3.5 border shadow-lg text-xs leading-relaxed flex items-center justify-between gap-3 animate-in slide-in-from-bottom-2 ${
            n.type === 'success'
              ? 'bg-[#1E1B18] text-[#FAF7F2] border-[#443D36]'
              : n.type === 'error'
              ? 'bg-[#8C3A27] text-white border-[#6E291A]'
              : 'bg-white text-[#1E1B18] border-[#E8E1D5]'
          }`}
        >
          <span className="font-medium">{n.message}</span>
          <button
            onClick={() => removeNotification(n.id)}
            className="text-stone-400 hover:text-white px-1 text-sm font-bold"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#1E1B18] font-sans selection:bg-[#8C3A27]/20 selection:text-[#8C3A27]">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/shop" element={<ShopPage />} />
              <Route path="/shop/:category" element={<ShopPage />} />
              <Route path="/product/:slug" element={<ProductDetailPage />} />
              
              <Route path="/artisans" element={<ArtisansPage />} />
              <Route path="/artisans/:slug" element={<ArtisanDetailPage />} />
              
              <Route path="/crafts" element={<CraftsPage />} />
              <Route path="/crafts/:slug" element={<CraftDetailPage />} />
              
              <Route path="/stories" element={<StoriesPage />} />
              <Route path="/stories/:slug" element={<StoryDetailPage />} />
              
              <Route path="/about" element={<AboutPage />} />
              <Route path="/our-approach" element={<OurApproachPage />} />
              <Route path="/exhibitions" element={<ExhibitionsPage />} />
              <Route path="/exhibitions/:slug" element={<ExhibitionsPage />} />
              <Route path="/contact" element={<ContactPage />} />
              
              <Route path="/account" element={<AccountPage />} />
              <Route path="/account/orders" element={<AccountPage />} />
              <Route path="/account/wishlist" element={<AccountPage />} />
              <Route path="/account/addresses" element={<AccountPage />} />
              <Route path="/account/settings" element={<AccountPage />} />
              
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/admin/dashboard" element={<AdminPage />} />
              <Route path="/admin/products" element={<AdminPage />} />
              <Route path="/admin/artisans" element={<AdminPage />} />
              <Route path="/admin/orders" element={<AdminPage />} />
              <Route path="/admin/inquiries" element={<AdminPage />} />
              
              <Route path="/shipping-policy" element={<PoliciesPage />} />
              <Route path="/return-policy" element={<PoliciesPage />} />
              <Route path="/faq" element={<PoliciesPage />} />
              <Route path="/privacy-policy" element={<PoliciesPage />} />
              <Route path="/terms" element={<PoliciesPage />} />
              
              <Route path="*" element={<HomePage />} />
            </Routes>
          </main>
          <Footer />

          {/* Interactive Drawers & Modals */}
          <CartDrawer />
          <CheckoutModal />
          <QuickViewModal />
          <SearchModal />
          <AuthModal />
          <NotificationToaster />
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}
