
import { useState, useEffect } from 'react';
import WhyChooseUsHero from '../components/sections/WhyChooseUsHero';
import WhyChooseUsReasons from '../components/sections/WhyChooseUsReasons';
import WhyChooseUsCTA from '../components/sections/WhyChooseUsCTA';

export default function WhyChooseUsPage() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900">
      {}
      <WhyChooseUsHero isLoaded={isLoaded} />
      
      {}
      <WhyChooseUsReasons />
      
      {}
      <WhyChooseUsCTA />
    </div>
  );
}