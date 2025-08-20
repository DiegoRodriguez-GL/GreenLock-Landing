
import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import FloatingContactCTA from './FloatingContactCTA'

export default function Layout() {
  const location = useLocation();
  
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="w-full min-h-screen">
      <Header />
      <main className="w-full">
        <Outlet />
      </main>
      <Footer />
      <FloatingContactCTA />
    </div>
  );
}