// src/pages/ServicesPage.tsx
import { useState, useEffect } from 'react';
import HeroServicesSection from '../components/sections/HeroServicesSection';
import OSISection from '../components/sections/OSISection';
import IndividualServicesSection from '../components/sections/IndividualServicesSection';

const ServicesPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen">
      <HeroServicesSection isLoaded={isLoaded} />
      <OSISection />
      <IndividualServicesSection />
    </div>
  );
};

export default ServicesPage;