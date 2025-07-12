// src/components/layout/Layout.tsx
import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './Header.tsx';
import Footer from './Footer.tsx';

export default function Layout() {
  const location = useLocation();
  
  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}