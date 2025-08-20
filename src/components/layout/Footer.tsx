
import { Link } from 'react-router-dom';
import { 
  Shield, 
  Phone, 
  Mail, 
  MapPin, 
  ArrowUp,
  Lock,
  ArrowRight,
  Target,
  TrendingUp,
  Globe,
  Smartphone,
  Code,
  FileText,
  Scale,
  Settings,
  Star
} from 'lucide-react';
import { motion } from 'framer-motion';
import logoImage from '../../assets/Logo-Web.png';

const quickLinks = [
  { name: 'Servicios', href: '/servicios', icon: Shield },
  { name: 'Metodología', href: '/metodologia', icon: Target },
  { name: 'Por qué elegirnos', href: '/porque-elegirnos', icon: Star },
  { name: 'Impacto', href: '/impacto', icon: TrendingUp },
];

const services = [
  { name: 'Red Team', href: '/servicios', icon: Shield },
  { name: 'Pentesting Web', href: '/servicios', icon: Globe },
  { name: 'Evaluación Perimetral', href: '/servicios', icon: Lock },
  { name: 'Pentesting Mobile', href: '/servicios', icon: Smartphone },
  { name: 'Revisión de Código', href: '/servicios', icon: Code },
];

const legalPolicies = [
  { name: 'Política de Privacidad', href: '/privacidad', icon: Shield },
  { name: 'Términos de Servicio', href: '/terminos', icon: FileText },
  { name: 'Aviso Legal', href: '/legal', icon: Scale },
  { name: 'Política de Cookies', href: '/cookies', icon: Settings },
];


const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

export default function Footer() {
  return (
    <footer className="relative bg-gray-950 text-white overflow-hidden">
      {}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(23, 153, 63, 0.1) 0%, transparent 50%)`
        }}></div>
      </div>

      <div className="relative z-10">
        {}
        <div className="container mx-auto px-4 pt-16 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            
            {}
            <div className="space-y-3 text-center md:text-left">
              <div className="space-y-2">
                <Link to="/" className="inline-flex items-center group justify-center md:justify-start">
                  <img 
                    src={logoImage} 
                    alt="GreenLock Logo" 
                    className="h-10 w-auto transition-transform duration-300 group-hover:scale-105" 
                  />
                  <span className="ml-1 font-bold text-xl">
                    <span className="text-white">Green</span>
                    <span className="bg-gradient-to-r from-greenlock-400 to-greenlock-600 bg-clip-text text-transparent">Lock</span>
                  </span>
                </Link>
                
                <p className="text-gray-300 text-sm">
                  Protegemos tu empresa con <strong className="text-greenlock-400">soluciones de ciberseguridad avanzadas</strong> y auditorías especializadas.
                </p>
              </div>

              {}
              <div className="mt-12 pt-4 flex justify-center md:justify-start">
                <Link 
                  to="/contacto"
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-greenlock-600 to-greenlock-500 text-white px-6 py-3 rounded-lg font-medium hover:from-greenlock-500 hover:to-greenlock-400 transition-all duration-300 group text-sm shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  <Phone className="w-4 h-4" />
                  <span>Solicitar Auditoría</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            {}
            <div className="ml-0 md:ml-8 text-center md:text-left">
              <h3 className="text-lg font-bold mb-4 text-white">Navegación</h3>
              <ul className="space-y-2 flex flex-col items-center md:items-start">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link 
                      to={link.href} 
                      className="flex items-center space-x-2 text-gray-300 hover:text-greenlock-400 transition-colors duration-300 text-sm group"
                    >
                      <link.icon className="w-4 h-4 text-greenlock-500 group-hover:text-greenlock-400 transition-colors duration-300" />
                      <span>{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {}
            <div className="text-center md:text-left">
              <h3 className="text-lg font-bold mb-4 text-white">Servicios</h3>
              <ul className="space-y-2 flex flex-col items-center md:items-start">
                {services.map((service) => (
                  <li key={service.name}>
                    <Link 
                      to={service.href} 
                      className="flex items-center space-x-2 text-gray-300 hover:text-greenlock-400 transition-colors duration-300 text-sm group"
                    >
                      <service.icon className="w-4 h-4 text-greenlock-500 group-hover:text-greenlock-400 transition-colors duration-300" />
                      <span>{service.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {}
            <div className="text-center md:text-left">
              <h3 className="text-lg font-bold mb-4 text-white">Legal</h3>
              <ul className="space-y-2 flex flex-col items-center md:items-start">
                {legalPolicies.map((policy) => (
                  <li key={policy.name}>
                    <Link 
                      to={policy.href} 
                      className="flex items-center space-x-2 text-gray-300 hover:text-greenlock-400 transition-colors duration-300 text-sm group"
                    >
                      <policy.icon className="w-4 h-4 text-greenlock-500 group-hover:text-greenlock-400 transition-colors duration-300" />
                      <span>{policy.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {}
            <div className="text-center md:text-left">
              <h3 className="text-lg font-bold mb-4 text-white">Contacto</h3>
              
              <div className="space-y-3 flex flex-col items-center md:items-start">
                <div className="flex items-center space-x-2 text-gray-300 text-sm">
                  <MapPin className="w-4 h-4 text-greenlock-400" />
                  <span>España, Madrid</span>
                </div>
                
                <div className="flex items-center space-x-2 text-gray-300 text-sm">
                  <Mail className="w-4 h-4 text-greenlock-400" />
                  <span>info@greenlock.es</span>
                </div>
                
                <div className="flex items-center space-x-2 text-gray-300 text-sm">
                  <svg className="w-4 h-4 text-greenlock-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Lun - Vie: 9:00 - 18:00</span>
                </div>
                
                <div className="flex items-center space-x-2 text-gray-300 text-sm">
                  <svg className="w-4 h-4 text-greenlock-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25c5.385 0 9.75 4.365 9.75 9.75s-4.365 9.75-9.75 9.75S2.25 17.635 2.25 12 6.615 2.25 12 2.25zM8.5 12l1.5 1.5L13.5 9" />
                  </svg>
                  <span>Soporte 24/7 para clientes</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {}
        <div className="border-t border-gray-800">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0 text-center md:text-left">
              <div className="text-sm text-gray-400">
                © {new Date().getFullYear()} GreenLock. Todos los derechos reservados.
              </div>
              
              <div className="flex items-center space-x-4 justify-center md:justify-end">
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <span className="w-2 h-2 bg-greenlock-400 rounded-full animate-pulse"></span>
                  <span>Sistema operativo</span>
                </div>
                
                <motion.button
                  onClick={scrollToTop}
                  className="p-2 bg-greenlock-500 rounded-full text-white hover:bg-greenlock-600 transition-colors"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Volver arriba"
                >
                  <ArrowUp className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
