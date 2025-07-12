// src/components/layout/Header.tsx - ACTUALIZADO CON ICONOS Y TEXTO IMPACTANTE
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Menu, 
  X, 
  ChevronDown, 
  Shield, 
  Target, 
  Award, 
  AlertTriangle, 
  Phone
} from 'lucide-react';
// Importamos la imagen del logo desde Assets
import logoImage from '../../assets/Logo-Web.png'; // Ajusta la ruta según tu estructura de carpetas

const navItems = [
  { 
    name: 'Servicios Especializados', 
    shortName: 'Servicios',
    href: '/servicios',
    icon: Shield,
    description: 'Protección avanzada'
  },
  { 
    name: 'Nuestra Metodología', 
    shortName: 'Metodología',
    href: '/metodologia',
    icon: Target,
    description: 'Proceso probado'
  },
  { 
    name: 'Por Qué Elegirnos', 
    shortName: 'Ventajas',
    href: '/porque-elegirnos',
    icon: Award,
    description: 'Líderes en seguridad'
  },
  { 
    name: 'Riesgos de No Actuar', 
    shortName: 'Impacto',
    href: '/impacto',
    icon: AlertTriangle,
    description: 'Consecuencias reales'
  }
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Check if current route is active
  const isActiveRoute = (href: string) => {
    return location.pathname === href;
  };

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-[#080f1d]/95 backdrop-blur-sm shadow-md shadow-black/20 py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="z-10 flex items-center group">
            {/* Logo como imagen desde assets */}
            <img 
              src={logoImage} 
              alt="GreenLock Logo" 
              className="h-10 w-auto transition-transform duration-300 group-hover:scale-105" 
            />
            <span className="ml-3 font-bold text-xl">
              <span className="text-white group-hover:text-gray-100 transition-colors duration-300">Green</span>
              <span className="bg-gradient-to-r from-greenlock-500 to-greenlock-300 bg-clip-text text-transparent group-hover:from-greenlock-400 group-hover:to-greenlock-500 transition-all duration-300">Lock</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2 lg:space-x-4">
            {navItems.map((item) => {
              const isActive = isActiveRoute(item.href);
              const IconComponent = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`relative px-4 py-3 rounded-md font-medium text-lg transition-all duration-200 group flex items-center space-x-2 ${
                    isActive 
                      ? 'text-greenlock-400' 
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <IconComponent className={`w-5 h-5 transition-all duration-200 ${
                    isActive 
                      ? 'text-greenlock-400' 
                      : 'text-gray-400 group-hover:text-greenlock-400'
                  }`} />
                  <span>{item.shortName}</span>
                  {/* Línea activa */}
                  {isActive && (
                    <span className="absolute bottom-0 -left-1 right-0 h-0.5 bg-greenlock-400"></span>
                  )}
                  {/* Línea hover para elementos no activos */}
                  {!isActive && (
                    <span className="absolute bottom-0 -left-1 right-0 h-0.5 bg-greenlock-400 transform origin-left transition-transform duration-300 scale-x-0 group-hover:scale-x-100"></span>
                  )}
                </Link>
              );
            })}
            <Link 
              to="/contacto"
              className={`ml-20 px-5 py-2.5 border border-greenlock-500 rounded-md font-medium text-lg transition-all duration-300 hover:shadow-glow relative overflow-hidden group flex items-center space-x-2 ${
                isActiveRoute('/contacto')
                  ? 'bg-greenlock-500 text-white'
                  : 'text-greenlock-400 hover:bg-greenlock-500 hover:text-white'
              }`}
            >
              <Phone className="w-5 h-5 relative z-20" />
              <span className="relative z-20">Contactar Ahora</span>
              <span className="absolute inset-0 w-0 bg-greenlock-500 transition-all duration-300 z-10 group-hover:w-full"></span>
            </Link>
          </nav>

          {/* Mobile Navigation - Solo menú hamburguesa */}
          <div className="md:hidden">
            <button 
              className="z-10 p-2 rounded-md hover:bg-white/10"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
            >
              <Menu className={isMenuOpen ? "hidden" : "block text-white"} size={24} />
              <X className={isMenuOpen ? "block text-white" : "hidden"} size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation - Slide down con fondo blur */}
      <div 
        className={`md:hidden absolute top-full left-0 w-full bg-[#080f1d]/95 backdrop-blur-sm shadow-lg shadow-black/20 transition-all duration-300 transform ${
          isMenuOpen 
            ? 'translate-y-0 opacity-100 pointer-events-auto' 
            : '-translate-y-full opacity-0 pointer-events-none'
        }`}
      >
        <nav className="container mx-auto px-4 py-4">
          {navItems.map((item, index) => {
            const isActive = isActiveRoute(item.href);
            const IconComponent = item.icon;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`block py-4 px-2 text-lg transition-colors duration-200 ${
                  isActive ? 'text-greenlock-400 font-medium' : 'text-gray-300 hover:text-white'
                } ${index !== navItems.length - 1 ? 'border-b border-gray-800' : ''}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <IconComponent className={`w-5 h-5 ${
                      isActive ? 'text-greenlock-400' : 'text-gray-400'
                    }`} />
                    <div>
                      <div className="font-medium">{item.name}</div>
                      <div className="text-sm text-gray-500">{item.description}</div>
                    </div>
                  </div>
                  <ChevronDown 
                    size={16} 
                    className={`transform transition-transform ${isActive ? 'rotate-180 text-greenlock-400' : 'text-gray-500'}`} 
                  />
                </div>
              </Link>
            );
          })}
          
          {/* Botón de contacto en el menú móvil */}
          <div className="pt-8 border-t border-gray-800 mt-6">
            <Link 
              to="/contacto"
              className={`w-full py-4 px-4 border border-greenlock-500 rounded-md text-center font-medium text-lg transition-all duration-300 block flex items-center justify-center space-x-2 relative overflow-hidden group ${
                isActiveRoute('/contacto')
                  ? 'bg-greenlock-500 text-white'
                  : 'text-greenlock-400 hover:bg-greenlock-500 hover:text-white'
              }`}
            >
              <Phone className="w-5 h-5 relative z-20" />
              <span className="relative z-20">Habla con un Experto Ahora</span>
              <span className="absolute inset-0 w-0 bg-greenlock-500 transition-all duration-300 z-10 group-hover:w-full"></span>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}