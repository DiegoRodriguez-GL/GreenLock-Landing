// src/pages/HomePage.tsx
import HeroSection from '../components/sections/HeroSection';
import Stats from '../components/sections/CybersecurityStatsSection';

export default function HomePage() {
  return (
    <div className="relative">
      {/* Solo el Hero Section como página principal */}
      <HeroSection />
      <Stats />
    </div>
  );
}