
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  AlertTriangle, 
  TrendingUp, 
  Clock, 
  Euro,
  MapPin,
  Shield,
  Users,
  Target,
  ArrowRight
} from 'lucide-react';
import '../../styles/CybersecurityStatsSection.css';


function TechBackground() {
  useEffect(() => {
    const container = document.querySelector('.tech-grid');
    if (!container) return;
    
    
    const createLine = () => {
      const line = document.createElement('div');
      line.className = 'tech-line';
      line.style.top = Math.random() * 100 + '%';
      line.style.animationDelay = Math.random() * 2 + 's';
      container.appendChild(line);
      
      
      setTimeout(() => {
        if (container.contains(line)) {
          container.removeChild(line);
        }
      }, 6000);
    };
    
    
    const createDot = () => {
      const dot = document.createElement('div');
      dot.className = 'tech-dot';
      dot.style.left = Math.random() * 100 + '%';
      dot.style.top = Math.random() * 100 + '%';
      dot.style.animationDelay = Math.random() * 2 + 's';
      container.appendChild(dot);
    };
    
    
    for (let i = 0; i < 12; i++) {
      createDot();
    }
    
    
    for (let i = 0; i < 2; i++) {
      setTimeout(() => createLine(), i * 1000);
    }
    
    
    const lineInterval = setInterval(createLine, 2000);
    
    return () => {
      clearInterval(lineInterval);
    };
  }, []);
  
  return <div className="tech-grid"></div>;
}


function Counter({ value, suffix = '', prefix = '', duration = 2000 }: { 
  value: number; 
  suffix?: string; 
  prefix?: string; 
  duration?: number; 
}) {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
  
  useEffect(() => {
    if (inView) {
      const increment = value / (duration / 50);
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, 50);
      
      return () => clearInterval(timer);
    }
  }, [inView, value, duration]);
  
  return (
    <span ref={ref} className="counter-animate">
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}

const cybersecurityStats = [
  {
    id: 'cost',
    icon: <Euro className="w-7 h-7" />,
    value: 4.88,
    suffix: 'M€',
    label: 'Coste promedio de una brecha',
    description: 'El coste global promedio de una brecha de datos en 2024, con un aumento del 10% respecto al año anterior.',
    trend: '+10%',
    color: 'from-green-500 to-green-600',
    source: 'IBM Security 2024'
  },
  {
    id: 'spain_attacks',
    icon: <MapPin className="w-7 h-7" />,
    value: 58,
    label: 'Ataques ransomware en España',
    description: 'Número de ataques registrados en los primeros 6 meses de 2024. España es el 5º país más atacado.',
    trend: '+23%',
    color: 'from-green-400 to-green-500',
    source: 'S21sec & INCIBE 2024'
  },
  {
    id: 'detection_time',
    icon: <Clock className="w-7 h-7" />,
    value: 277,
    label: 'Días para detectar y contener',
    description: 'Tiempo promedio que tardan las empresas en identificar y resolver una brecha de seguridad.',
    trend: 'Crítico',
    color: 'from-green-600 to-green-700',
    source: 'IBM Security 2024'
  },
  {
    id: 'human_factor',
    icon: <Users className="w-7 h-7" />,
    value: 68,
    suffix: '%',
    label: 'Involucran factor humano',
    description: 'Porcentaje de brechas causadas por errores humanos, phishing o ingeniería social.',
    trend: 'Constante',
    color: 'from-green-300 to-green-400',
    source: 'Verizon DBIR 2024'
  }
];

function StatCard({ stat, index, inView }: { stat: typeof cybersecurityStats[0]; index: number; inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="stat-card relative rounded-lg p-6 overflow-hidden group"
    >
      {}
      <div className="flex items-center justify-between mb-4">
        <div className={`stat-icon p-3 rounded-lg bg-gradient-to-br ${stat.color} text-white`}>
          {stat.icon}
        </div>
        <div className="text-right">
          {stat.trend.includes('%') && (
            <div className="flex items-center text-red-400 text-sm font-medium">
              <TrendingUp className="w-4 h-4 mr-1" />
              {stat.trend}
            </div>
          )}
          {stat.trend === 'Crítico' && (
            <div className="flex items-center text-red-400 text-sm font-medium">
              <AlertTriangle className="w-4 h-4 mr-1" />
              {stat.trend}
            </div>
          )}
          {stat.trend === 'Constante' && (
            <div className="flex items-center text-red-300 text-sm font-medium">
              <Target className="w-4 h-4 mr-1" />
              {stat.trend}
            </div>
          )}
        </div>
      </div>
      
      {}
      <div className={`text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${stat.color} mb-2`}>
        <Counter value={stat.value} suffix={stat.suffix} />
      </div>
      <h3 className="font-semibold text-white text-base mb-4">{stat.label}</h3>
      
      {}
      <p className="text-gray-300 text-sm leading-relaxed mb-4">{stat.description}</p>
      
      {}
      <div className="text-xs text-gray-400 font-medium">
        Fuente: {stat.source}
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
    <section className="relative py-16 md:py-20 stats-background">
      {}
      <TechBackground />
      
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="alert-badge inline-flex items-center rounded-full px-4 py-2 mb-6">
            <AlertTriangle className="w-4 h-4 text-green-400 mr-2" />
            <span className="text-green-300 font-medium text-sm">Situación Actual</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            El Estado de la <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-500">Ciberseguridad</span>
          </h2>
          
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Las cifras revelan una realidad preocupante: <strong className="text-white">los ciberataques están en constante aumento</strong> 
            y las empresas no están preparadas para defenderse adecuadamente.
          </p>
        </motion.div>

        {}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {cybersecurityStats.map((stat, index) => (
            <StatCard
              key={stat.id}
              stat={stat}
              index={index}
              inView={inView}
            />
          ))}
        </div>

        {}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center"
        >
          <div className="cta-container rounded-xl p-8 shadow-lg">
            <div className="flex items-center justify-center mb-6">
              <Shield className="w-10 h-10 text-[#00B267] mr-3" />
              <h3 className="text-2xl font-bold text-white">
                ¿Su empresa está <span className="text-green-400">preparada</span>?
              </h3>
            </div>
            
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              <strong className="text-white">Una auditoría proactiva puede prevenir el 95% de estas amenazas.</strong> 
              No espere a convertirse en otra estadística.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/contacto"
                className="cta-button bg-[#00B267] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#2F4F39] transition-all duration-300 inline-flex items-center justify-center"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Shield className="w-5 h-5 mr-2" />
                Solicitar Auditoría
              </motion.a>
              
              <motion.a
                href="/servicios"
                className="border border-green-500/40 text-green-400 px-6 py-3 rounded-lg font-semibold hover:border-green-400 hover:bg-green-500/10 transition-all duration-300 inline-flex items-center justify-center"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Ver Servicios
                <ArrowRight className="w-4 h-4 ml-2" />
              </motion.a>
            </div>
            
            <div className="mt-4 text-sm text-gray-400">
              Consulta inicial gratuita • Respuesta en 24h
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}