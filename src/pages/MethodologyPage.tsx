// src/pages/MethodologyPage.tsx - SIN DEPENDENCIAS UI
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Search, 
  Target, 
  FileText, 
  CheckCircle, 
  Clock,
  Zap
} from 'lucide-react';

// Componente Section integrado
function MethodologySection({ id, className = '', children, bgColor = 'bg-transparent', paddingY = 'lg' }: {
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

// Componente Button integrado
function MethodologyButton({ 
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

// Componente de fondo animado similar al Hero
function MethodologyBackground() {
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
    
    // Crear nodos
    const nodes: {x: number; y: number; vx: number; vy: number; radius: number; opacity: number}[] = [];
    const nodeCount = 25;
    
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.3 + 0.2
      });
    }
    
    let animationFrameId: number;
    
    const animate = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      
      // Dibujar conexiones
      for (let i = 0; i < nodes.length; i++) {
        const nodeA = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const nodeB = nodes[j];
          const dx = nodeB.x - nodeA.x;
          const dy = nodeB.y - nodeA.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 180) {
            ctx.beginPath();
            ctx.moveTo(nodeA.x, nodeA.y);
            ctx.lineTo(nodeB.x, nodeB.y);
            const opacity = 0.1 - (distance / 180) * 0.1;
            ctx.strokeStyle = `rgba(0, 178, 103, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      
      // Dibujar nodos
      for (const node of nodes) {
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 178, 103, ${node.opacity})`;
        ctx.fill();
        
        // Actualizar posición
        node.x += node.vx;
        node.y += node.vy;
        
        // Rebotar en bordes
        if (node.x < 0 || node.x > window.innerWidth) node.vx *= -1;
        if (node.y < 0 || node.y > window.innerHeight) node.vy *= -1;
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0" />;
}

const phases = [
  {
    id: 'reconnaissance',
    title: 'Reconocimiento',
    icon: <Search className="w-8 h-8" />,
    duration: '1-2 días',
    description: 'Recopilación de información sobre la infraestructura objetivo.',
    details: [
      'Análisis de la superficie de ataque',
      'Identificación de tecnologías utilizadas',
      'Mapeo de subdominios y servicios',
      'Análisis de información pública disponible'
    ],
    color: 'from-blue-500 to-blue-600'
  },
  {
    id: 'scanning',
    title: 'Escaneo',
    icon: <Target className="w-8 h-8" />,
    duration: '2-3 días',
    description: 'Identificación detallada de servicios y posibles vectores de ataque.',
    details: [
      'Escaneo de puertos y servicios activos',
      'Detección de versiones de software',
      'Identificación de configuraciones inseguras',
      'Análisis de certificados y protocolos'
    ],
    color: 'from-yellow-500 to-yellow-600'
  },
  {
    id: 'exploitation',
    title: 'Explotación',
    icon: <Zap className="w-8 h-8" />,
    duration: '3-5 días',
    description: 'Ejecución controlada de ataques para validar vulnerabilidades.',
    details: [
      'Explotación manual de vulnerabilidades',
      'Escalada de privilegios controlada',
      'Validación de impacto real',
      'Documentación de evidencias'
    ],
    color: 'from-red-500 to-red-600'
  },
  {
    id: 'reporting',
    title: 'Reporte',
    icon: <FileText className="w-8 h-8" />,
    duration: '2-3 días',
    description: 'Documentación completa de hallazgos y recomendaciones.',
    details: [
      'Clasificación de vulnerabilidades por criticidad',
      'Pasos detallados de reproducción',
      'Recomendaciones específicas de remediación',
      'Resumen ejecutivo para directivos'
    ],
    color: 'from-[#00B267] to-[#2F4F39]'
  }
];

export default function MethodologyPage() {
  const [activePhase, setActivePhase] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || !inView) return;
    
    const interval = setInterval(() => {
      setActivePhase((prev) => (prev + 1) % phases.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [isAutoPlaying, inView]);

  const handlePhaseClick = (index: number) => {
    setActivePhase(index);
    setIsAutoPlaying(false);
    
    // Restart auto-play after 10 seconds
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <div className="min-h-screen bg-[#080f1d]">
      {/* Hero Section para la página */}
      <MethodologySection bgColor="bg-gradient-to-br from-[#080f1d] via-gray-900 to-[#080f1d]" paddingY="xl">
        <div className="relative overflow-hidden">
          <div className="text-center text-white">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                <span className="text-white">Nuestra </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00B267] to-[#2F4F39]">Metodología</span>
              </h1>
              <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                Seguimos un proceso estructurado y probado que garantiza resultados consistentes 
                y de alta calidad en cada auditoría de ciberseguridad.
              </p>
            </motion.div>
          </div>
        </div>
      </MethodologySection>

      {/* Metodología Section */}
      <MethodologySection bgColor="bg-[#080f1d]" paddingY="xl">
        <div className="relative overflow-hidden">
          {/* Fondo animado */}
          <MethodologyBackground />
          
          {/* Overlay para mejor legibilidad */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#080f1d]/80 via-transparent to-[#080f1d]/80 z-10"></div>
          
          <div className="relative z-20" ref={ref}>
            <div className="mt-16">
              {/* Progress Bar */}
              <div className="flex justify-center mb-12">
                <div className="flex items-center space-x-4 bg-gray-900/50 backdrop-blur-sm rounded-full p-2">
                  {phases.map((phase, index) => (
                    <button
                      key={phase.id}
                      onClick={() => handlePhaseClick(index)}
                      className={`relative flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${
                        activePhase === index
                          ? 'bg-[#00B267] text-white shadow-lg'
                          : 'text-gray-400 hover:text-gray-200'
                      }`}
                    >
                      <div className={`p-1 rounded-full ${
                        activePhase === index ? 'bg-white/20' : 'bg-gray-700'
                      }`}>
                        {React.cloneElement(phase.icon, { 
                          className: `w-4 h-4 ${activePhase === index ? 'text-white' : 'text-gray-400'}` 
                        })}
                      </div>
                      <span className="text-sm font-medium hidden md:block">{phase.title}</span>
                      
                      {/* Progress indicator */}
                      {activePhase === index && (
                        <motion.div
                          className="absolute -bottom-1 left-0 right-0 h-0.5 bg-white rounded-full"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: isAutoPlaying ? 1 : 0 }}
                          transition={{ duration: 4, ease: "linear" }}
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Content Area */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activePhase}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
                >
                  {/* Left side - Phase details */}
                  <div className="space-y-6">
                    <div className={`inline-flex items-center space-x-3 px-4 py-2 rounded-full bg-gradient-to-r ${phases[activePhase].color} text-white`}>
                      {phases[activePhase].icon}
                      <span className="font-semibold text-lg">{phases[activePhase].title}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2 text-gray-300">
                      <Clock className="w-5 h-5 text-[#00B267]" />
                      <span className="text-sm">Duración: {phases[activePhase].duration}</span>
                    </div>
                    
                    <p className="text-xl text-gray-200 leading-relaxed">
                      {phases[activePhase].description}
                    </p>
                    
                    <div className="space-y-3">
                      <h4 className="text-lg font-semibold text-white flex items-center">
                        <CheckCircle className="w-5 h-5 text-[#00B267] mr-2" />
                        Actividades clave:
                      </h4>
                      <ul className="space-y-2">
                        {phases[activePhase].details.map((detail, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            className="flex items-start space-x-3"
                          >
                            <div className="w-2 h-2 bg-[#00B267] rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-gray-300">{detail}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Right side - Visual representation */}
                  <div className="relative">
                    <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm rounded-xl p-8 border border-gray-700">
                      <div className="text-center mb-6">
                        <div className={`inline-flex p-4 rounded-full bg-gradient-to-br ${phases[activePhase].color} mb-4`}>
                          {React.cloneElement(phases[activePhase].icon, { className: "w-12 h-12 text-white" })}
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">
                          Fase {activePhase + 1}: {phases[activePhase].title}
                        </h3>
                      </div>
                      
                      {/* Mini timeline */}
                      <div className="space-y-3">
                        {phases.map((phase, index) => (
                          <div key={phase.id} className="flex items-center space-x-3">
                            <div className={`w-3 h-3 rounded-full ${
                              index < activePhase ? 'bg-[#00B267]' :
                              index === activePhase ? 'bg-yellow-500' :
                              'bg-gray-600'
                            }`}></div>
                            <div className={`h-px flex-1 ${
                              index < activePhase ? 'bg-[#00B267]' :
                              index === activePhase ? 'bg-yellow-500' :
                              'bg-gray-600'
                            }`}></div>
                            <span className={`text-sm ${
                              index <= activePhase ? 'text-white' : 'text-gray-400'
                            }`}>
                              {phase.title}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Bottom stats */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                <div className="text-center bg-gray-900/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
                  <div className="text-3xl font-bold text-[#00B267] mb-2">7-14</div>
                  <div className="text-gray-300">días promedio</div>
                  <div className="text-sm text-gray-400">por auditoría completa</div>
                </div>
                
                <div className="text-center bg-gray-900/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
                  <div className="text-3xl font-bold text-[#00B267] mb-2">100%</div>
                  <div className="text-gray-300">metodología propia</div>
                  <div className="text-sm text-gray-400">basada en estándares internacionales</div>
                </div>
                
                <div className="text-center bg-gray-900/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
                  <div className="text-3xl font-bold text-[#00B267] mb-2">24/7</div>
                  <div className="text-gray-300">comunicación</div>
                  <div className="text-sm text-gray-400">durante todo el proceso</div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </MethodologySection>

      {/* CTA Section */}
      <MethodologySection bgColor="bg-gray-900" paddingY="lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            ¿Quiere conocer más sobre nuestro proceso?
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Contacte con nuestro equipo para una explicación detallada de cómo aplicamos nuestra metodología a su organización.
          </p>
          <MethodologyButton href="/contacto" size="lg">
            Solicitar consulta técnica
          </MethodologyButton>
        </div>
      </MethodologySection>
    </div>
  );
}