import { useState, useEffect } from 'react';
import { MessageCircle, Phone, Mail, Shield, X, Headphones } from 'lucide-react';
import '../../styles/FloatingContactCTA.css';

export default function FloatingContactCTA() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isPulsing, setIsPulsing] = useState(true);

  useEffect(() => {
    // Mostrar el botón después de un delay
    const timer = setTimeout(() => setIsVisible(true), 2000);
    
    // Pulsar cada 5 segundos para llamar la atención
    const pulseInterval = setInterval(() => {
      if (!isExpanded) {
        setIsPulsing(true);
        setTimeout(() => setIsPulsing(false), 2000);
      }
    }, 8000);

    return () => {
      clearTimeout(timer);
      clearInterval(pulseInterval);
    };
  }, [isExpanded]);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
    setIsPulsing(false);
  };

  const contactOptions = [
    {
      icon: Phone,
      label: "Llamar",
      action: "tel:+34682790545",
      color: "text-blue-400",
      bgColor: "from-blue-500/20 to-blue-400/5",
      hoverColor: "hover:border-blue-400"
    },
    {
      icon: Mail,
      label: "Email",
      action: "mailto:info@greenlock.es",
      color: "text-purple-400",
      bgColor: "from-purple-500/20 to-purple-400/5",
      hoverColor: "hover:border-purple-400"
    },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      action: "https://wa.me/34682790545",
      color: "text-green-400",
      bgColor: "from-green-500/20 to-green-400/5",
      hoverColor: "hover:border-green-400"
    },
    {
      icon: Headphones,
      label: "Soporte",
      action: "contacto",
      color: "text-orange-400",
      bgColor: "from-orange-500/20 to-orange-400/5",
      hoverColor: "hover:border-orange-400"
    }
  ];

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Opciones expandidas */}
      <div className={`absolute bottom-20 right-0 space-y-3 transition-all duration-500 ease-out ${
        isExpanded 
          ? 'opacity-100 translate-y-0 pointer-events-auto' 
          : 'opacity-0 translate-y-4 pointer-events-none'
      }`}>
        {contactOptions.map((option, index) => (
          <div
            key={option.label}
            className={`transform transition-all duration-300 ${
              isExpanded ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
            }`}
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            <a
              href={option.action}
              className={`contact-option group flex items-center gap-3 px-4 py-3 bg-gradient-to-r ${option.bgColor} backdrop-blur-sm border border-gray-700 ${option.hoverColor} rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg min-w-[140px]`}
              onClick={() => setIsExpanded(false)}
            >
              <div className={`p-2 rounded-full bg-gradient-to-br ${option.bgColor}`}>
                <option.icon className={`icon w-4 h-4 ${option.color}`} />
              </div>
              <span className="text-white text-sm font-medium">{option.label}</span>
            </a>
          </div>
        ))}
      </div>

      {/* Botón principal */}
      <div className="relative">
        {/* Anillos pulsantes de fondo */}
        <div className={`absolute inset-0 rounded-full transition-opacity duration-300 ${
          isPulsing && !isExpanded ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="absolute inset-0 bg-green-500/20 rounded-full animate-ping"></div>
          <div className="absolute inset-0 bg-green-400/30 rounded-full animate-pulse"></div>
        </div>

        {/* Partículas flotantes */}
        <div className="absolute inset-0 overflow-hidden rounded-full pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-1 h-1 bg-green-400/60 rounded-full animate-float-particle-${i + 1}`}
              style={{
                left: `${20 + (i * 10)}%`,
                top: `${15 + (i * 12)}%`,
                animationDelay: `${i * 0.5}s`
              }}
            />
          ))}
        </div>

        {/* Botón principal */}
        <button
          onClick={toggleExpanded}
          className={`floating-cta-button relative w-16 h-16 bg-gradient-to-r from-green-600 to-green-400 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center group overflow-hidden border-2 border-green-400/30 ${
            isExpanded 
              ? 'scale-90 rotate-45 bg-red-500' 
              : 'hover:scale-110 hover:shadow-green-500/50 hover:shadow-xl'
          } ${isPulsing ? 'animate-bounce-subtle' : ''}`}
        >
          {/* Efecto de brillo */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 animate-shimmer"></div>
          
          {/* Icono principal */}
          <div className={`relative z-10 transition-all duration-300 ${isExpanded ? 'rotate-45' : ''}`}>
            {isExpanded ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <Shield className="w-6 h-6 text-white" />
            )}
          </div>

          {/* Texto flotante */}
          <div className={`cta-tooltip absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900/90 text-white text-xs px-3 py-1 rounded-lg whitespace-nowrap transition-all duration-300 ${
            isExpanded ? 'opacity-0 scale-75' : 'opacity-0 group-hover:opacity-100 scale-100'
          }`}>
            ¿Necesitas ayuda?
          </div>
        </button>

        {/* Badge de notificación */}
        <div className={`notification-badge absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center transition-all duration-300 ${
          isPulsing && !isExpanded ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
        }`}>
          <div className="w-2 h-2 bg-white rounded-full animate-notification-pulse"></div>
        </div>
      </div>
    </div>
  );
}