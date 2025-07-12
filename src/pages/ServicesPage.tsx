// src/pages/ServicesPage.tsx - SIN DEPENDENCIAS UI
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Lock, Globe, Smartphone, Code, CheckCircle, ArrowRight, AlertTriangle } from 'lucide-react';

// Componente Section integrado
function ServicesSection({ id, className = '', children, bgColor = 'bg-transparent', paddingY = 'lg' }: {
  id?: string;
  className?: string;
  children: React.ReactNode;
  bgColor?: string;
  paddingY?: 'sm' | 'md' | 'lg' | 'xl' | 'none';
}) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const paddingYClasses = {
    none: '',
    sm: 'py-6 md:py-8',
    md: 'py-8 md:py-12',
    lg: 'py-12 md:py-16',
    xl: 'py-16 md:py-24',
  };

  return (
    <section
      id={id}
      className={`${bgColor} ${paddingYClasses[paddingY]} ${className}`}
      ref={ref}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </motion.div>
    </section>
  );
}

// Hook useInView integrado
function useInView(options: { triggerOnce: boolean; threshold: number }) {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (options.triggerOnce) {
            observer.unobserve(entry.target);
          }
        } else if (!options.triggerOnce) {
          setInView(false);
        }
      },
      { threshold: options.threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [options.triggerOnce, options.threshold]);

  return { ref, inView };
}

// Componente Button integrado
function ServicesButton({ 
  children, 
  href, 
  variant = 'primary', 
  size = 'md', 
  className = '' 
}: {
  children: React.ReactNode;
  href?: string;
  variant?: 'primary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}) {
  const baseClasses = "font-medium rounded-md transition-all duration-300 inline-flex items-center justify-center";
  
  const variantClasses = {
    primary: "bg-[#00B267] text-white hover:bg-[#2F4F39] shadow-md shadow-[#00B267]/20 hover:shadow-[#00B267]/40",
    outline: "border border-[#00B267] text-[#00B267] hover:bg-[#00B267]/10 hover:border-[#2F4F39]"
  };
  
  const sizeClasses = {
    sm: "text-sm px-3 py-1.5",
    md: "px-4 py-2",
    lg: "text-lg px-6 py-3"
  };
  
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;
  
  if (href) {
    if (href.startsWith('http')) {
      return (
        <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      );
    }
    
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }
  
  return (
    <button className={classes}>
      {children}
    </button>
  );
}

// Componente de fondo animado
function ServicesBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    // Crear partículas y nodos
    const particles: {x: number; y: number; vx: number; vy: number; radius: number; opacity: number}[] = [];
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.7,
        vy: (Math.random() - 0.5) * 0.7,
        radius: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.1
      });
    }
    
    let animationFrameId: number;
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Fondo gradiente
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, 'rgba(245, 245, 245, 0.2)');
      gradient.addColorStop(1, 'rgba(250, 250, 250, 0.2)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Patrón de puntos
      ctx.fillStyle = 'rgba(200, 200, 200, 0.1)';
      for (let x = 0; x < canvas.width; x += 30) {
        for (let y = 0; y < canvas.height; y += 30) {
          ctx.beginPath();
          ctx.arc(x, y, 0.3, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      
      // Dibujar y actualizar partículas
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        
        // Conectar partículas cercanas
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p2.x - p.x;
          const dy = p2.y - p.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            const opacity = 0.1 - (distance / 150) * 0.1;
            ctx.strokeStyle = `rgba(0, 178, 103, ${opacity})`;
            ctx.lineWidth = 0.3;
            ctx.stroke();
          }
        }
        
        // Dibujar partícula
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 178, 103, ${p.opacity})`;
        ctx.fill();
        
        // Actualizar posición
        p.x += p.vx;
        p.y += p.vy;
        
        // Rebote en los bordes
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full z-0"
    />
  );
}

const services = [
  {
    id: 'red-team',
    title: 'Red Team',
    icon: <Shield className="w-6 h-6" />,
    activeIcon: <Shield className="w-6 h-6 text-white" />,
    bgColor: 'bg-[#1a3836]',
    borderColor: 'border-[#00B267]',
    description: 'Simulación de ataques reales para evaluar infraestructura ante adversarios avanzados.',
    valueProposition: 'Sin este servicio, sus sistemas quedan expuestos a ataques reales sin haber podido identificar antes las vulnerabilidades críticas.',
    features: [
      'Simulación de amenazas APT',
      'Pruebas de evasión de defensas',
      'Ataques dirigidos a objetivos específicos',
      'Evaluación completa de respuesta a incidentes'
    ],
    benefits: [
      'Reducción de riesgo de brechas hasta un 60%',
      'Validación práctica de defensas existentes',
      'Identificación de rutas de ataque no evidentes',
      'Mejora de tiempos de respuesta ante incidentes'
    ]
  },
  {
    id: 'perimeter',
    title: 'Evaluación Perimetral',
    icon: <Lock className="w-6 h-6" />,
    activeIcon: <Lock className="w-6 h-6 text-white" />,
    bgColor: 'bg-[#1a3836]',
    borderColor: 'border-[#00B267]',
    description: 'Análisis exhaustivo del perímetro de red para identificar puntos de entrada no autorizados.',
    valueProposition: 'Sin evaluar su perímetro, está dejando la puerta abierta a atacantes que aprovechan configuraciones incorrectas para acceder a sus sistemas.',
    features: [
      'Escaneo avanzado de puertos y servicios',
      'Análisis de configuración de firewall',
      'Detección de servicios expuestos',
      'Análisis de VPNs y accesos remotos'
    ],
    benefits: [
      'Reducción de la superficie de ataque expuesta',
      'Visibilidad completa de defensas perimetrales',
      'Protección contra intrusiones no autorizadas',
      'Cumplimiento con estándares de seguridad'
    ]
  },
  {
    id: 'web-pentesting',
    title: 'Pentesting Web',
    icon: <Globe className="w-6 h-6" />,
    activeIcon: <Globe className="w-6 h-6 text-white" />,
    bgColor: 'bg-[#1a3836]',
    borderColor: 'border-[#00B267]',
    description: 'Pruebas de penetración en aplicaciones web para identificar vulnerabilidades antes que los atacantes.',
    valueProposition: 'Sin auditar sus aplicaciones web, está exponiendo datos sensibles de clientes a ataques como inyecciones SQL, XSS y robo de credenciales.',
    features: [
      'Detección de vulnerabilidades OWASP Top 10',
      'Análisis de autenticación y autorización',
      'Pruebas de inyección y XSS',
      'Evaluación de configuraciones seguras'
    ],
    benefits: [
      'Protección de datos sensibles de clientes',
      'Mantenimiento de la confianza de marca',
      'Reducción de costos por brechas',
      'Cumplimiento con regulaciones de datos'
    ]
  },
  {
    id: 'mobile-pentesting',
    title: 'Pentesting Mobile',
    icon: <Smartphone className="w-6 h-6" />,
    activeIcon: <Smartphone className="w-6 h-6 text-white" />,
    bgColor: 'bg-[#1a3836]',
    borderColor: 'border-[#00B267]',
    description: 'Análisis de seguridad en aplicaciones móviles para iOS y Android con enfoque en protección de datos.',
    valueProposition: 'Sin este servicio, su app móvil podría estar filtrando datos personales de usuarios o permitiendo accesos no autorizados por fallos de seguridad.',
    features: [
      'Análisis de código y protecciones anti-tampering',
      'Evaluación de almacenamiento de datos sensibles',
      'Pruebas de comunicación segura',
      'Análisis de autenticación y sesiones'
    ],
    benefits: [
      'Mayor confianza de usuarios en su app',
      'Protección contra manipulación de la aplicación',
      'Reducción de riesgos de fraude',
      'Conformidad con requisitos de tiendas'
    ]
  },
  {
    id: 'code-review',
    title: 'Revisión de Código',
    icon: <Code className="w-6 h-6" />,
    activeIcon: <Code className="w-6 h-6 text-white" />,
    bgColor: 'bg-[#1a3836]',
    borderColor: 'border-[#00B267]',
    description: 'Análisis manual y automatizado de código fuente para identificar vulnerabilidades en etapas tempranas.',
    valueProposition: 'Sin revisar su código, las vulnerabilidades permanecen ocultas hasta producción, donde corregirlas cuesta hasta 60 veces más y expone a sus usuarios.',
    features: [
      'Detección temprana de vulnerabilidades críticas',
      'Análisis de prácticas seguras de codificación',
      'Revisión manual por expertos',
      'Integración con CI/CD para evaluación continua'
    ],
    benefits: [
      'Reducción significativa de costos de remediación',
      'Aceleración de ciclos de desarrollo seguros',
      'Mejora de prácticas de codificación segura',
      'Detección de vulnerabilidades antes de ser explotables'
    ]
  }
];

export default function ServicesPage() {
  const [activeService, setActiveService] = useState(services[0].id);
  const autoRotateIntervalRef = useRef<NodeJS.Timeout | null>(null);
  
  // Función para pasar al siguiente servicio
  const rotateToNextService = () => {
    const currentIndex = services.findIndex(s => s.id === activeService);
    const nextIndex = (currentIndex + 1) % services.length;
    setActiveService(services[nextIndex].id);
  };
  
  // Configurar rotación automática
  useEffect(() => {
    autoRotateIntervalRef.current = setInterval(() => {
      rotateToNextService();
    }, 8000);
    
    return () => {
      if (autoRotateIntervalRef.current) {
        clearInterval(autoRotateIntervalRef.current);
      }
    };
  }, [activeService]);
  
  // Reiniciar el intervalo cuando el usuario selecciona manualmente un servicio
  const handleServiceClick = (serviceId: string) => {
    setActiveService(serviceId);
    
    if (autoRotateIntervalRef.current) {
      clearInterval(autoRotateIntervalRef.current);
      autoRotateIntervalRef.current = setInterval(() => {
        rotateToNextService();
      }, 8000);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section para la página */}
      <ServicesSection bgColor="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" paddingY="xl">
        <div className="relative overflow-hidden">
          <div className="text-center text-white">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                <span className="text-white">Nuestros </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00B267] to-[#2F4F39]">Servicios</span>
              </h1>
              <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                Servicios especializados de ciberseguridad diseñados para detectar vulnerabilidades 
                antes que los atacantes y proteger su infraestructura digital.
              </p>
            </motion.div>
          </div>
        </div>
      </ServicesSection>

      {/* Servicios Section */}
      <ServicesSection bgColor="bg-white" paddingY="xl">
        <div className="relative overflow-hidden">
          {/* Fondo animado en movimiento */}
          <ServicesBackground />
          
          {/* Contenido principal */}
          <div className="relative z-10">
            <div className="mt-12">
              {/* Tabs de servicios mejorados */}
              <div className="flex flex-wrap justify-center gap-3 mb-12">
                {services.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => handleServiceClick(service.id)}
                    className={`px-4 py-2 rounded-full text-sm md:text-base transition-all duration-300 flex items-center ${
                      activeService === service.id
                        ? 'bg-[#00B267] text-white shadow-md'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                  >
                    <span className="mr-2">
                      {activeService === service.id ? service.activeIcon : service.icon}
                    </span>
                    <span>{service.title}</span>
                    {activeService === service.id && (
                      <span className="ml-2">
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    )}
                  </button>
                ))}
              </div>

              {/* Contenido de servicios */}
              <div className="relative overflow-hidden">
                <AnimatePresence mode="wait">
                  {services.map(
                    (service) =>
                      activeService === service.id && (
                        <motion.div
                          key={service.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.5 }}
                          className={`${service.bgColor} rounded-lg p-8 text-white overflow-hidden relative max-w-6xl mx-auto shadow-lg border ${service.borderColor}`}
                        >
                          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 relative z-10">
                            {/* Columna izquierda - Información principal */}
                            <div className="lg:col-span-2">
                              <div className="mb-6">
                                <h3 className="text-2xl font-bold text-white mb-3 flex items-center">
                                  <div className="p-2 bg-[#00B267]/20 rounded-lg mr-3 border border-[#00B267]/40">
                                    {service.activeIcon}
                                  </div>
                                  <div>
                                    {service.id === 'red-team' ? (
                                      <>Red <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00B267] to-[#2F4F39]">Team</span></>
                                    ) : service.id === 'perimeter' ? (
                                      <>Evaluación <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00B267] to-[#2F4F39]">Perimetral</span></>
                                    ) : service.id === 'web-pentesting' ? (
                                      <>Pentesting <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00B267] to-[#2F4F39]">Web</span></>
                                    ) : service.id === 'mobile-pentesting' ? (
                                      <>Pentesting <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00B267] to-[#2F4F39]">Mobile</span></>
                                    ) : (
                                      <>Revisión de <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00B267] to-[#2F4F39]">Código</span></>
                                    )}
                                  </div>
                                </h3>
                                <p className="text-gray-300 text-sm">
                                  {service.description}
                                </p>
                              </div>
                              
                              <div className="bg-amber-900/30 rounded-lg p-5 mb-8 border-l-2 border-amber-500">
                                <h4 className="font-semibold text-amber-400 mb-2 flex items-center">
                                  <AlertTriangle className="w-5 h-5 mr-2" /> Riesgo si no actúa
                                </h4>
                                <p className="text-amber-100 text-sm">{service.valueProposition}</p>
                              </div>
                              
                              <div className="w-full mb-8">
                                <ServicesButton 
                                  href="/contacto" 
                                  className="w-full bg-[#00B267] hover:bg-[#2F4F39] text-white py-3 px-8 rounded-md font-semibold flex items-center justify-center transition-all duration-300 shadow-lg shadow-[#00B267]/20 hover:shadow-[#00B267]/30 hover:-translate-y-1 border border-[#00B267]/20 text-base uppercase tracking-wide"
                                >
                                  ¡Contratar ahora! <ArrowRight className="ml-2 w-5 h-5" />
                                </ServicesButton>
                              </div>
                            </div>
                            
                            {/* Columna derecha - Características y beneficios */}
                            <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6">
                              {/* Panel de características */}
                              <div className="bg-black/20 rounded-lg p-6 border border-[#00B267]/30 h-full">
                                <div className="flex items-center mb-4 pb-2 border-b border-[#00B267]/30">
                                  <h4 className="font-semibold text-white flex items-center">
                                    <CheckCircle className="w-5 h-5 text-[#00B267] mr-2" />¿Qué <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00B267] to-[#2F4F39]">evaluamos</span>?
                                  </h4>
                                </div>
                                <ul className="space-y-4">
                                  {service.features.map((feature, index) => (
                                    <motion.li 
                                      key={index} 
                                      className="flex items-start"
                                      initial={{ opacity: 0, x: 20 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ duration: 0.3, delay: index * 0.1 }}
                                    >
                                      <div className="shrink-0 mt-1">
                                        <div className="w-5 h-5 rounded-full bg-[#00B267]/20 flex items-center justify-center">
                                          <span className="text-[#00B267] text-xs font-bold">✓</span>
                                        </div>
                                      </div>
                                      <span className="ml-3 text-gray-300 text-sm">{feature}</span>
                                    </motion.li>
                                  ))}
                                </ul>
                              </div>
                              
                              {/* Panel de beneficios */}
                              <div className="bg-black/20 rounded-lg p-6 border border-[#00B267]/30 h-full">
                                <div className="flex items-center mb-4 pb-2 border-b border-[#00B267]/30">
                                  <h4 className="font-semibold text-white flex items-center">
                                    <Shield className="w-5 h-5 text-[#00B267] mr-2" /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00B267] to-[#2F4F39]">Beneficios</span> para su empresa
                                  </h4>
                                </div>
                                <ul className="space-y-4">
                                  {service.benefits.map((benefit, index) => (
                                    <motion.li 
                                      key={index} 
                                      className="flex items-start"
                                      initial={{ opacity: 0, x: 20 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
                                    >
                                      <div className="shrink-0 mt-1 w-6 h-6 rounded-full bg-[#00B267]/20 flex items-center justify-center text-[#00B267] font-medium">
                                        {index + 1}
                                      </div>
                                      <span className="ml-3 text-gray-300 text-sm">{benefit}</span>
                                    </motion.li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </ServicesSection>

      {/* CTA Section */}
      <ServicesSection bgColor="bg-gray-900" paddingY="lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            ¿Necesita una evaluación personalizada?
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Contacte con nuestro equipo para discutir sus necesidades específicas de ciberseguridad.
          </p>
          <ServicesButton href="/contacto" size="lg">
            Solicitar consulta gratuita
          </ServicesButton>
        </div>
      </ServicesSection>
    </div>
  );
}