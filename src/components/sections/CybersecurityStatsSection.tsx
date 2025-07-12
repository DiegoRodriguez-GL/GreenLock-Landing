// CybersecurityStatsSection.tsx - Versión Mejorada Oscura
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  AlertTriangle, 
  DollarSign,
  Shield,
  Target,
  Clock,
  TrendingDown,
  ArrowRight,
  Zap
} from 'lucide-react';

// Componente de fondo sutil
function StatsBackground() {
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
    
    // Nodos sutiles
    const nodes: {x: number; y: number; vx: number; vy: number; radius: number; opacity: number}[] = [];
    const nodeCount = 20;
    
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        radius: Math.random() * 1 + 0.5,
        opacity: Math.random() * 0.1 + 0.05
      });
    }
    
    let animationFrameId: number;
    
    const animate = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      
      // Conexiones sutilísimas
      for (let i = 0; i < nodes.length; i++) {
        const nodeA = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const nodeB = nodes[j];
          const dx = nodeB.x - nodeA.x;
          const dy = nodeB.y - nodeA.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(nodeA.x, nodeA.y);
            ctx.lineTo(nodeB.x, nodeB.y);
            const opacity = 0.05 - (distance / 150) * 0.05;
            ctx.strokeStyle = `rgba(100, 100, 100, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      
      // Nodos
      for (const node of nodes) {
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(100, 100, 100, ${node.opacity})`;
        ctx.fill();
        
        node.x += node.vx;
        node.y += node.vy;
        
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

// Contador animado mejorado
function AnimatedCounter({ target, suffix = '', duration = 2000, isVisible }: { target: number; suffix?: string; duration?: number; isVisible: boolean }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  
  useEffect(() => {
    if (isVisible && !hasAnimated) {
      setHasAnimated(true);
      
      const increment = target / (duration / 16);
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(current);
        }
      }, 16);
      
      return () => clearInterval(timer);
    }
  }, [isVisible, target, duration, hasAnimated]);
  
  return (
    <span>
      {Math.floor(count)}{suffix}
    </span>
  );
}

const threatStats = [
  {
    id: 'frequency',
    title: 'Ataques por Minuto',
    icon: <Zap className="w-10 h-10" />,
    value: 5,
    suffix: '/min',
    subtitle: 'Ciberataques globales'
  },
  {
    id: 'cost',
    title: 'Coste Medio Brecha',
    icon: <DollarSign className="w-10 h-10" />,
    value: 4.88,
    suffix: 'M€',
    subtitle: 'Pérdidas en España'
  },
  {
    id: 'closure',
    title: 'Empresas que Cierran',
    icon: <TrendingDown className="w-10 h-10" />,
    value: 60,
    suffix: '%',
    subtitle: 'PYMEs en 6 meses'
  },
  {
    id: 'detection',
    title: 'Tiempo Detección',
    icon: <Clock className="w-10 h-10" />,
    value: 287,
    suffix: ' días',
    subtitle: 'Promedio mundial'
  }
];

// Componente de tarjeta oscura
function DarkStatCard({ stat, index, inView }: { stat: typeof threatStats[0]; index: number; inView: boolean }) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group"
    >
      <div className="bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-sm border border-gray-700 rounded-xl p-6 h-full transition-all duration-300 hover:border-greenlock-500/30 hover:shadow-xl hover:shadow-greenlock-900/10">
        
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-lg bg-greenlock-500/10 border border-greenlock-500/20 text-greenlock-400 transform transition-transform duration-300 ${isHovered ? 'scale-110' : ''}`}>
            {stat.icon}
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="text-4xl font-bold text-white">
            <AnimatedCounter target={stat.value} suffix={stat.suffix} isVisible={inView} />
          </div>
          <h3 className="text-lg font-semibold text-greenlock-400">{stat.title}</h3>
          <p className="text-sm text-gray-400">{stat.subtitle}</p>
        </div>
        
        <motion.div
          className="absolute bottom-0 left-0 h-1 bg-greenlock-500 rounded-b-xl"
          initial={{ width: 0 }}
          animate={{ width: isHovered ? '100%' : '0%' }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  );
}

export default function CybersecurityStatsSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="relative bg-gray-50 py-16 overflow-hidden">
      <StatsBackground />
      
      <div className="relative z-10 container mx-auto px-4" ref={ref}>
        {/* Título principal estilo Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            <span className="text-gray-900">Amenazas </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-greenlock-500 via-greenlock-400 to-greenlock-600">Reales</span>
            <span className="text-gray-900"> que Crecen</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Los ciberataques aumentan cada día. Su empresa puede ser la próxima víctima... 
            <strong className="text-greenlock-600">o puede estar preparada.</strong>
          </p>
        </motion.div>
        
        {/* Grid de estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {threatStats.map((stat, index) => (
            <DarkStatCard
              key={stat.id}
              stat={stat}
              index={index}
              inView={inView}
            />
          ))}
        </div>
        
        {/* Sección de impacto y solución */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          {/* Lado izquierdo - Problema */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-8 text-white">
            <div className="flex items-center mb-6">
              <AlertTriangle className="w-8 h-8 text-red-400 mr-3" />
              <h3 className="text-2xl font-bold">La Cruda Realidad</h3>
            </div>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center justify-between py-3 border-b border-gray-700">
                <span className="text-gray-300">Empresas atacadas diariamente</span>
                <span className="text-2xl font-bold text-red-400">
                  <AnimatedCounter target={4000} suffix="+" isVisible={inView} />
                </span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-gray-700">
                <span className="text-gray-300">Coste promedio por hora de inactividad</span>
                <span className="text-2xl font-bold text-red-400">
                  <AnimatedCounter target={300} suffix="K€" isVisible={inView} />
                </span>
              </div>
              <div className="flex items-center justify-between py-3">
                <span className="text-gray-300">Tiempo promedio para recuperarse</span>
                <span className="text-2xl font-bold text-red-400">
                  <AnimatedCounter target={280} suffix=" días" isVisible={inView} />
                </span>
              </div>
            </div>
            
            <p className="text-red-200 text-center font-medium">
              ¿Su empresa resistiría estos números?
            </p>
          </div>
          
          {/* Lado derecho - Solución */}
          <div className="space-y-8">
            <div>
              <div className="flex items-center mb-4">
                <Shield className="w-8 h-8 text-greenlock-500 mr-3" />
                <h3 className="text-3xl font-bold text-gray-900">
                  La <span className="text-transparent bg-clip-text bg-gradient-to-r from-greenlock-500 to-greenlock-400">Solución</span>
                </h3>
              </div>
              <p className="text-xl text-gray-600 leading-relaxed">
                Una auditoría preventiva identifica el <strong>95% de vulnerabilidades</strong> antes que los atacantes.
              </p>
            </div>
            
            <div className="bg-greenlock-50 border-l-4 border-greenlock-500 p-6 rounded-r-lg">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-3xl font-bold text-greenlock-600">85%</div>
                  <div className="text-sm text-greenlock-700">Reducción del riesgo</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-greenlock-600">24h</div>
                  <div className="text-sm text-greenlock-700">Tiempo de respuesta</div>
                </div>
              </div>
            </div>
            
            <motion.div
              className="text-center"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <a
                href="#contacto"
                className="inline-flex items-center bg-gradient-to-r from-greenlock-600 to-greenlock-500 text-white px-8 py-4 rounded-lg font-bold text-lg hover:from-greenlock-500 hover:to-greenlock-400 transition-all duration-300 shadow-lg hover:shadow-xl group"
              >
                <Target className="w-6 h-6 mr-3" />
                <span>Auditar mi empresa ahora</span>
                <ArrowRight className="w-6 h-6 ml-3 transition-transform group-hover:translate-x-1" />
              </a>
              <p className="text-sm text-gray-500 mt-3">
                Consulta inicial gratuita • Respuesta en 24h
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}