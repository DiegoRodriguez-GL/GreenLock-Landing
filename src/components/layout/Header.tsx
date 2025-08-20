
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Menu, 
  X, 
  Phone,
  Settings,
  BookOpen,
  Award,
  TrendingUp
} from 'lucide-react';
import Logo from '../../assets/Logo-Web.png';
import '../../styles/Header.css';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: 'Servicios', href: '/servicios', icon: Settings },
    { name: 'Metodología', href: '/metodologia', icon: BookOpen },
    { name: 'Por qué elegirnos', href: '/porque-elegirnos', icon: Award },
    { name: 'Blog', href: '/blog', icon: TrendingUp }
  ];

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        {}
        <Link to="/" className="header-logo">
          <img 
            src={Logo} 
            alt="GreenLock Logo" 
            className="header-logo-image"
          />
          <span className="header-logo-text">
            Green<span className="lock-part">Lock</span>
          </span>
        </Link>

        {}
        <nav className="header-nav">
          {navigation.map((item) => {
            const IconComponent = item.icon;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`header-nav-link ${
                  location.pathname === item.href ? 'active' : ''
                }`}
              >
                <IconComponent className="header-nav-icon" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {}
        <div className="header-buttons">
          <Link to="/contacto" className="header-btn header-btn-primary">
            <Phone className="header-btn-icon" />
            Consulta Gratuita
          </Link>
        </div>

        {}
        <button
          className="header-mobile-menu-btn"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="header-mobile-menu-icon" />
          ) : (
            <Menu className="header-mobile-menu-icon" />
          )}
        </button>

        {}
        <div className={`header-mobile-menu ${isMenuOpen ? 'open' : ''}`}>
          <nav className="header-mobile-menu-nav">
            {navigation.map((item) => {
              const IconComponent = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`header-mobile-menu-link ${
                    location.pathname === item.href ? 'active' : ''
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <IconComponent className="header-nav-icon" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
          
          {}
          <div className="header-mobile-menu-buttons">
            <Link 
              to="/contacto" 
              className="header-mobile-btn"
              onClick={() => setIsMenuOpen(false)}
            >
              <Phone className="header-mobile-btn-icon" />
              Consulta Gratuita
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
