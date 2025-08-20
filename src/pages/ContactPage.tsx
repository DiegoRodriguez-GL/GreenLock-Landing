
import { useState, useEffect } from 'react';
import ContactHero from '../components/sections/ContactHero';
import ContactForm from '../components/sections/ContactForm';
import ContactCTA from '../components/sections/ContactCTA';

export default function ContactPage() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <ContactHero isLoaded={isLoaded} />
      <ContactForm />
      <ContactCTA />
    </div>
  );
}