// src/pages/ImpactPage.tsx - SIN DEPENDENCIAS UI
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  DollarSign, 
  TrendingDown, 
  AlertTriangle, 
  Clock,
  Shield,
  ArrowRight,
  BarChart3,
  Target,
  Zap
} from 'lucide-react';

// Componente Section integrado
function ImpactSection({ id, className = '', children, bgColor = 'bg-transparent', paddingY = 'lg' }: {
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
function ImpactButton({ 
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

// Componente de fondo animado con ondas de impacto
function ImpactBackground() {
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
    
    // Crear ondas concéntricas
    const waves: {x: number; y: number; radius: number; maxRadius: number; opacity: number; speed: number}[] = [];
    
    const createWave = (x: number, y: number) => {
      waves.push({
        x,
        y,
        radius: 0,
        maxRadius: Math.random() * 300 + 200,
        opacity: 0.3,
        speed: Math.random() * 1 + 0.5
      });
    };
    
    // Crear ondas iniciales
    for (let i = 0; i < 3; i++) {
      createWave(
        Math.random() * window.innerWidth,
        Math.random() * window.innerHeight
      );
    }
    
    let animationFrameId: number;
    let lastWaveTime = 0;
    
    const animate = (currentTime: number) => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      
      // Crear nueva onda cada 3 segundos
      if (currentTime - lastWaveTime > 3000) {
        createWave(
          Math.random() * window.innerWidth,
          Math.random() * window.innerHeight
        );
        lastWaveTime = currentTime;
      }
      
      // Dibujar ondas
      for (let i = waves.length - 1; i >= 0; i--) {
        const wave = waves[i];
        
        // Dibujar círculo
        ctx.beginPath();
        ctx.arc(wave.x, wave.y, wave.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(239, 68, 68, ${wave.opacity})`;
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Actualizar onda
        wave.radius += wave.speed;
        wave.opacity = Math.max(0, 0.3 - (wave.radius / wave.maxRadius) * 0.3);
        
        // Eliminar ondas que han llegado al máximo
        if (wave.radius >= wave.maxRadius) {
          waves.splice(i, 1);
        }
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate(0);
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0" />;
}

// Componente de contador animado
function AnimatedCounter({ value, suffix = '', duration = 2000 }: { value: string; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  
  useEffect(() => {
    if (inView && !isVisible) {
      setIsVisible(true);
      
      // Extraer número del valor
      const numericValue = parseFloat(value.replace(/[^\d.]/g, ''));
      if (isNaN(numericValue)) return;
      
      const increment = numericValue / (duration / 16);
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= numericValue) {
          setCount(numericValue);
          clearInterval(timer);
        } else {
          setCount(current);
        }
      }, 16);
      
      return () => clearInterval(timer);
    }
  }, [inView, value, duration, isVisible]);
  
  const formatCount = (num: number) => {
    if (value.includes('.')) {
      return num.toFixed(1);
    }
    return Math.floor(num).toString();
  };
  
  return (
    <span ref={ref}>
      {value.includes('.') ? formatCount(count) : formatCount(count)}{value.replace(/[\d.]/g, '')}{suffix}
    </span>
  );
}

const impacts = [
  {
    id: 'financial',
    title: 'Impacto Financiero',
    icon: <DollarSign className="w-12 h-12" />,
    stats: '4.88M€',
    description: 'El coste medio de una brecha de datos en España alcanzó los 4.88 millones de euros en 2024, incluyendo costes de investigación, recuperación, multas regulatorias y pérdida de negocio.',
    color: 'from-red-500 to-red-600',
    bgColor: 'bg-red-500',
    details: [
      'Multas RGPD hasta 20M€ o 4% facturación',
      'Pérdida de ingresos durante la recuperación',
      'Costes de investigación forense',
      'Indemnizaciones a clientes afectados'
    ]
  },
  {
    id: 'reputation',
    title: 'Daño Reputacional',
    icon: <TrendingDown className="w-12 h-12" />,
    stats: '60%',
    description: 'El 60% de las pequeñas y medianas empresas cierran dentro de los seis meses posteriores a sufrir un ciberataque importante debido a la pérdida irreversible de confianza de clientes y socios.',
    color: 'from-orange-500 to-orange-600',
    bgColor: 'bg-orange-500',
    details: [
      'Pérdida de confianza de clientes',
      'Daño a la imagen de marca',
      'Pérdida de ventaja competitiva',
      'Dificultades para conseguir nuevos clientes'
    ]
  },
  {
    id: 'operational',
    title: 'Interrupción Operativa',
    icon: <Clock className="w-12 h-12" />,
    stats: '287 días',
    description: 'El tiempo medio para identificar y contener una brecha de seguridad es de 287 días, durante los cuales los atacantes pueden acceder libremente a sistemas críticos y datos sensibles.',
    color: 'from-yellow-500 to-yellow-600',
    bgColor: 'bg-yellow-500',
    details: [
      'Paralización de sistemas críticos',
      'Pérdida de productividad',
      'Imposibilidad de atender clientes',
      'Retrasos en entregas y servicios'
    ]
  }
];

// Componente de tarjeta de impacto mejorada
function ImpactCard({ impact, index, inView }: { impact: typeof impacts[0]; index: number; inView: boolean }) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.9 }}
      transition={{ duration: 0.7, delay: index * 0.2 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group cursor-pointer"
    >
      {/* Glow effect */}
      <div className={`absolute -inset-1 bg-gradient-to-r ${impact.color} rounded-xl blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-500`}></div>
      
      {/* Card */}
      <div className="relative bg-white rounded-xl shadow-xl overflow-hidden h-full border border-gray-100 transform transition-all duration-500 hover:scale-105">
        {/* Header gradient */}
        <div className={`h-2 bg-gradient-to-r ${impact.color}`}></div>
        
        {/* Content */}
        <div className="p-8">
          {/* Icon and title */}
          <div className="flex items-center justify-between mb-6">
            <div className={`p-4 rounded-full bg-gradient-to-br ${impact.color} text-white transform transition-transform duration-300 ${isHovered ? 'scale-110 rotate-6' : ''}`}>
              {impact.icon}
            </div>
            <div className="text-right">
              <div className={`text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${impact.color}`}>
                <AnimatedCounter value={impact.stats} />
              </div>
            </div>
          </div>
          
          <h3 className="text-2xl font-bold text-gray-900 mb-4">{impact.title}</h3>
          <p className="text-gray-600 mb-6 leading-relaxed">{impact.description}</p>
          
          {/* Details */}
          <div className="space-y-2">
            <h4 className="font-semibold text-gray-900 text-sm uppercase tracking-wide mb-3">
              Consecuencias principales:
            </h4>
            <ul className="space-y-2">
              {impact.details.map((detail, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                  transition={{ duration: 0.4, delay: index * 0.2 + idx * 0.1 }}
                  className="flex items-center text-sm text-gray-600"
                >
                  <div className={`w-2 h-2 ${impact.bgColor} rounded-full mr-3 flex-shrink-0`}></div>
                  {detail}
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Hover indicator */}
        <motion.div
          className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${impact.color}`}
          initial={{ width: 0 }}
          animate={{ width: isHovered ? '100%' : '0%' }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  );
}

// Componente de comparación de costos mejorado
function CostComparison({ inView }: { inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.8, delay: 0.6 }}
      className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-200 shadow-xl"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left side - Text */}
        <div>
          <div className="flex items-center mb-4">
            <Shield className="w-8 h-8 text-[#00B267] mr-3" />
            <h3 className="text-3xl font-bold text-gray-900">Prevenir vs Remediar</h3>
          </div>
          <p className="text-gray-600 mb-6 text-lg leading-relaxed">
            Invertir en ciberseguridad preventiva es hasta <strong>50 veces más económico</strong> que 
            enfrentar las consecuencias de una brecha. Nuestro enfoque proactivo identifica y mitiga 
            vulnerabilidades antes de que sean explotadas.
          </p>
          <ImpactButton href="/contacto" size="lg" className="group">
            <span>Solicitar evaluación preventiva</span>
            <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
          </ImpactButton>
        </div>
        
        {/* Right side - Cost comparison chart */}
        <div className="space-y-6">
          <h4 className="font-bold text-gray-900 text-xl mb-6 text-center">
            Comparación de Costos (Índice de Inversión)
          </h4>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700 flex items-center">
                  <Target className="w-4 h-4 text-[#00B267] mr-2" />
                  Prevención (Auditorías)
                </span>
                <span className="text-sm font-bold text-[#00B267]">1x</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <motion.div
                  className="bg-gradient-to-r from-[#00B267] to-[#2F4F39] h-3 rounded-full"
                  initial={{ width: 0 }}
                  animate={inView ? { width: '8%' } : { width: 0 }}
                  transition={{ duration: 1.5, delay: 1 }}
                />
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700 flex items-center">
                  <Zap className="w-4 h-4 text-yellow-500 mr-2" />
                  Respuesta a Incidentes
                </span>
                <span className="text-sm font-bold text-yellow-600">10x</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <motion.div
                  className="bg-gradient-to-r from-yellow-500 to-yellow-400 h-3 rounded-full"
                  initial={{ width: 0 }}
                  animate={inView ? { width: '40%' } : { width: 0 }}
                  transition={{ duration: 1.5, delay: 1.2 }}
                />
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700 flex items-center">
                  <AlertTriangle className="w-4 h-4 text-red-500 mr-2" />
                  Recuperación Post-Brecha
                </span>
                <span className="text-sm font-bold text-red-600">50x</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <motion.div
                  className="bg-gradient-to-r from-red-500 to-red-400 h-3 rounded-full"
                  initial={{ width: 0 }}
                  animate={inView ? { width: '100%' } : { width: 0 }}
                  transition={{ duration: 1.5, delay: 1.4 }}
                />
              </div>
            </div>
          </div>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-6">
            <div className="flex items-center text-green-800">
              <BarChart3 className="w-5 h-5 mr-2" />
              <span className="font-semibold">Ahorro estimado:</span>
            </div>
            <p className="text-green-700 mt-1">
              Una auditoría puede ahorrarle hasta <strong>2.4M€</strong> en costos de recuperación
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ImpactPage() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section para la página */}
      <ImpactSection bgColor="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" paddingY="xl">
        <div className="relative overflow-hidden">
          <div className="text-center text-white">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                <span className="text-white">El Coste Real de </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600">No Actuar</span>
              </h1>
              <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                Las consecuencias de un incidente de seguridad van más allá de lo técnico, 
                afectando a toda la organización, sus clientes y su futuro en el mercado.
              </p>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="mt-8 inline-flex items-center bg-red-500/10 border border-red-500/30 rounded-full px-6 py-3"
              >
                <AlertTriangle className="w-5 h-5 text-red-400 mr-2" />
                <span className="text-red-300 font-medium">
                  95% de las brechas son evitables con auditorías preventivas
                </span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </ImpactSection>

      {/* Impact Section */}
      <ImpactSection bgColor="bg-white" paddingY="xl">
        <div className="relative overflow-hidden">
          {/* Fondo animado */}
          <ImpactBackground />
          
          <div className="relative z-10" ref={ref}>
            {/* Impact Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
              {impacts.map((impact, index) => (
                <ImpactCard
                  key={impact.id}
                  impact={impact}
                  index={index}
                  inView={inView}
                />
              ))}
            </div>
            
            {/* Cost Comparison */}
            <CostComparison inView={inView} />
            
            {/* Final CTA */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="text-center mt-16"
            >
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                No espere a ser víctima de un ciberataque
              </h3>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Cada día de retraso aumenta su exposición al riesgo. Actúe ahora y proteja 
                el futuro de su empresa con una auditoría preventiva.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <ImpactButton href="/contacto" size="lg" className="group">
                  <span>Solicitar auditoría urgente</span>
                  <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                </ImpactButton>
                <ImpactButton href="/servicios" variant="outline" size="lg">
                  Ver nuestros servicios
                </ImpactButton>
              </div>
            </motion.div>
          </div>
        </div>
      </ImpactSection>
    </div>
  );
}