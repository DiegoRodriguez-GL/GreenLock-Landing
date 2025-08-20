import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Lock, Globe, Smartphone, Code, CheckCircle, ArrowRight, AlertTriangle } from 'lucide-react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
}

const services = [
  {
    id: 'red-team',
    title: 'Red Team',
    icon: <Shield className="w-6 h-6" />,
    activeIcon: <Shield className="w-6 h-6 text-white" />,
    bgColor: 'bg-[#1a3836]',
    borderColor: 'border-greenlock-500',
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
    borderColor: 'border-greenlock-500',
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
    borderColor: 'border-greenlock-500',
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
    borderColor: 'border-greenlock-500',
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
    borderColor: 'border-greenlock-500',
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


function GrayMovingBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    
    const particles: Particle[] = [];
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
    
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, 'rgba(245, 245, 245, 0.2)');
      gradient.addColorStop(1, 'rgba(250, 250, 250, 0.2)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      
      ctx.fillStyle = 'rgba(200, 200, 200, 0.1)';
      for (let x = 0; x < canvas.width; x += 30) { 
        for (let y = 0; y < canvas.height; y += 30) { 
          ctx.beginPath();
          ctx.arc(x, y, 0.3, 0, Math.PI * 2); 
          ctx.fill();
        }
      }
      
      
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        
        
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
            ctx.strokeStyle = `rgba(150, 150, 150, ${opacity})`;
            ctx.lineWidth = 0.3; 
            ctx.stroke();
          }
        }
        
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(100, 100, 100, ${p.opacity})`;
        ctx.fill();
        
        
        p.x += p.vx;
        p.y += p.vy;
        
        
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      }
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full z-0"
    />
  );
}


export default function ServicesSection() {
  const [activeService, setActiveService] = useState(services[0].id);
  const autoRotateIntervalRef = useRef<number | null>(null);
  
  
  const rotateToNextService = () => {
    const currentIndex = services.findIndex(s => s.id === activeService);
    const nextIndex = (currentIndex + 1) % services.length;
    setActiveService(services[nextIndex].id);
  };
  
  
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
      <div className="relative overflow-hidden">
        {}
        <GrayMovingBackground />
        
        {}
        <div className="relative z-10">
          <div className="flex flex-col items-center justify-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              <span className="text-gray-900">Nuestros </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-greenlock-600 to-greenlock-400">Servicios</span>
            </h2>
            <p className="text-gray-600 text-center max-w-3xl">
              Detectamos vulnerabilidades antes que los atacantes para proteger su infraestructura digital.
            </p>
          </div>

          <div className="mt-12">
            {}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {services.map((service) => (
                <button
                  key={service.id}
                  onClick={() => handleServiceClick(service.id)}
                  className={`px-4 py-2 rounded-full text-sm md:text-base transition-all duration-300 flex items-center ${
                    activeService === service.id
                      ? 'bg-greenlock-500 text-white shadow-md'
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

            {}
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
                          {}
                          <div className="lg:col-span-2">
                            <div className="mb-6">
                              <h3 className="text-2xl font-bold text-white mb-3 flex items-center">
                                <div className="p-2 bg-greenlock-500/20 rounded-lg mr-3 border border-greenlock-500/40">
                                  {service.activeIcon}
                                </div>
                                <div>
                                  {service.id === 'red-team' ? (
                                    <>Red <span className="text-transparent bg-clip-text bg-gradient-to-r from-greenlock-400 to-greenlock-500">Team</span></>
                                  ) : service.id === 'perimeter' ? (
                                    <>Evaluación <span className="text-transparent bg-clip-text bg-gradient-to-r from-greenlock-400 to-greenlock-500">Perimetral</span></>
                                  ) : service.id === 'web-pentesting' ? (
                                    <>Pentesting <span className="text-transparent bg-clip-text bg-gradient-to-r from-greenlock-400 to-greenlock-500">Web</span></>
                                  ) : service.id === 'mobile-pentesting' ? (
                                    <>Pentesting <span className="text-transparent bg-clip-text bg-gradient-to-r from-greenlock-400 to-greenlock-500">Mobile</span></>
                                  ) : (
                                    <>Revisión de <span className="text-transparent bg-clip-text bg-gradient-to-r from-greenlock-400 to-greenlock-500">Código</span></>
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
                          </div>
                          
                          {}
                          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6">
                            {}
                            <div className="bg-black/20 rounded-lg p-6 border border-greenlock-500/30 h-full">
                              <div className="flex items-center mb-4 pb-2 border-b border-greenlock-500/30">
                                <h4 className="font-semibold text-white flex items-center">
                                  <CheckCircle className="w-5 h-5 text-greenlock-500 mr-2" />¿Qué <span className="text-transparent bg-clip-text bg-gradient-to-r from-greenlock-400 to-greenlock-500">evaluamos</span>?
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
                                      <div className="w-5 h-5 rounded-full bg-greenlock-500/20 flex items-center justify-center">
                                        <span className="text-greenlock-500 text-xs font-bold">✓</span>
                                      </div>
                                    </div>
                                    <span className="ml-3 text-gray-300 text-sm">{feature}</span>
                                  </motion.li>
                                ))}
                              </ul>
                            </div>
                            
                            {}
                            <div className="bg-black/20 rounded-lg p-6 border border-greenlock-500/30 h-full">
                              <div className="flex items-center mb-4 pb-2 border-b border-greenlock-500/30">
                                <h4 className="font-semibold text-white flex items-center">
                                  <Shield className="w-5 h-5 text-greenlock-500 mr-2" /><span className="text-transparent bg-clip-text bg-gradient-to-r from-greenlock-400 to-greenlock-500">Beneficios</span> para su empresa
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
                                    <div className="shrink-0 mt-1 w-6 h-6 rounded-full bg-greenlock-500/20 flex items-center justify-center text-greenlock-400 font-medium">
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
  );
}