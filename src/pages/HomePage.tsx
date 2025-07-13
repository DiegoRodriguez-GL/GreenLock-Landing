// src/pages/HomePage.tsx
import HeroSection from '../components/sections/HeroSection';
import Logos from '../components/sections/MethodologySection';
import CTA from '../components/sections/UrgentCTASection';
import WhyChooseSection from '../components/sections/WhyChooseSection';
import Stats from '../components/sections/CybersecurityStatsSection';

export default function HomePage() {
  return (
    <div className="relative">
      <HeroSection />
      <Logos />
      <Stats />
      <WhyChooseSection />
      <CTA />
    </div>
  );
}