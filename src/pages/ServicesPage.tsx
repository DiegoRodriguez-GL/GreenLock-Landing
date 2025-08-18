// src/pages/ServicesPage.tsx
import { useState, useEffect } from 'react';
import HeroServicesSection from '../components/sections/HeroServicesSection';
import ExecutiveSection from '../components/sections/ExecutiveConfidenceSection';
import IndividualServicesSection from '../components/sections/IndividualServicesSection';
import OSI from '../components/sections/OSICommercialSection';

const ServicesPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen">
      <HeroServicesSection isLoaded={isLoaded} />
      <ExecutiveSection isLoaded={isLoaded} />
      <OSI isLoaded={isLoaded} />
      <IndividualServicesSection />
    </div>
  );
};

export default ServicesPage;