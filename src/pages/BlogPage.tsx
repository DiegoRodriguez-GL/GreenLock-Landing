
import { useState, useEffect } from 'react';
import BlogHeroSection from '../components/sections/BlogHeroSection';
import BlogContentSection from '../components/sections/BlogContentSection';

export default function BlogResearchPage() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <BlogHeroSection isLoaded={isLoaded} />
      <BlogContentSection />
    </div>
  );
}