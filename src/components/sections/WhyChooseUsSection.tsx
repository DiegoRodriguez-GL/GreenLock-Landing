
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

import { 
  Award, 
  Shield, 
  Users, 
  FileText, 
  Target,
  TrendingUp,
  CheckCircle,
  Star,
  Zap
} from 'lucide-react';


function WhyChooseBackground() {
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
    
    
    const hexagons: {x: number; y: number; size: number; rotation: number; opacity: number; speed: number}[] = [];
    const hexCount = 15;
    
    for (let i = 0; i < hexCount; i++) {
      hexagons.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 30 + 20,
        rotation: Math.random() * Math.PI * 2,
        opacity: Math.random() * 0.1 + 0.05,
        speed: Math.random() * 0.5 + 0.1
      });
    }
    
    let animationFrameId: number;
    
    const drawHexagon = (x: number, y: number, size: number, rotation: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (i * Math.PI) / 3;
        const px = Math.cos(angle) * size;
        const py = Math.sin(angle) * size;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.restore();
    };
    
    const animate = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      
      
      for (const hex of hexagons) {
        ctx.strokeStyle = `rgba(23, 153, 63, ${hex.opacity})`;
        ctx.lineWidth = 1;
        
        drawHexagon(hex.x, hex.y, hex.size, hex.rotation);
        ctx.stroke();
        
        
        hex.y -= hex.speed;
        hex.rotation += 0.01;
        
        
        if (hex.y < -hex.size) {
          hex.y = window.innerHeight + hex.size;
          hex.x = Math.random() * window.innerWidth;
        }
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

const reasons = [
  {
    id: 'experience',
    title: 'Experiencia Certificada',
    description: 'Equipo con certificaciones OSCP, CEH, CISSP y más de 10 años de experiencia en ciberseguridad empresarial.',
    icon: <Award className="w-8 h-8" />,
    stats: '10+ años',
    highlight: 'Certificaciones internacionales',
    color: 'from-blue-500 to-blue-600'
  },
  {
    id: 'standards',
    title: 'Estándares Internacionales',
    description: 'Metodologías alineadas con OWASP, NIST, MITRE ATT&CK y normativas europeas como NIS2.',
    icon: <Shield className="w-8 h-8" />,
    stats: '100%',
    highlight: 'Cumplimiento normativo',
    color: 'from-greenlock-500 to-greenlock-600'
  },
  {
    id: 'coverage',
    title: 'Cobertura Integral',
    description: 'Evaluamos todas las capas: infraestructura, aplicaciones, dispositivos móviles y factor humano.',
    icon: <Target className="w-8 h-8" />,
    stats: '360°',
    highlight: 'Cobertura completa',
    color: 'from-purple-500 to-purple-600'
  },
  {
    id: 'communication',
    title: 'Comunicación Constante',
    description: 'Contacto directo durante todo el proceso con reportes de progreso y hallazgos críticos inmediatos.',
    icon: <Users className="w-8 h-8" />,
    stats: '24/7',
    highlight: 'Disponibilidad garantizada',
    color: 'from-orange-500 to-orange-600'
  },
  {
    id: 'reports',
    title: 'Informes Ejecutivos',
    description: 'Documentación detallada con clasificación de riesgos, pasos de reproducción y roadmap de remediación.',
    icon: <FileText className="w-8 h-8" />,
    stats: '3 niveles',
    highlight: 'Técnico, táctico y estratégico',
    color: 'from-red-500 to-red-600'
  },
  {
    id: 'safety',
    title: 'Pruebas Seguras',
    description: 'Reglas de compromiso claras y procedimientos que garantizan cero interrupciones en sus operaciones.',
    icon: <CheckCircle className="w-8 h-8" />,
    stats: '0%',
    highlight: 'Riesgo operacional',
    color: 'from-green-500 to-green-600'
  },
  {
    id: 'realistic',
    title: 'Simulaciones Realistas',
    description: 'Replicamos tácticas reales de adversarios para identificar vulnerabilidades que otros pasan por alto.',
    icon: <Zap className="w-8 h-8" />,
    stats: 'TTPs',
    highlight: 'Tácticas reales de atacantes',
    color: 'from-yellow-500 to-yellow-600'
  },
  {
    id: 'improvement',
    title: 'Mejora Continua',
    description: 'Seguimiento post-remediación y re-testing para verificar la correcta implementación de soluciones.',
    icon: <TrendingUp className="w-8 h-8" />,
    stats: 'Follow-up',
    highlight: 'Garantía de efectividad',
    color: 'from-indigo-500 to-indigo-600'
  }
];


function ReasonCard({ reason, index, inView }: { reason: typeof reasons[0]; index: number; inView: boolean }) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group cursor-pointer"
    >
      {}
      <div className={`absolute -inset-1 bg-gradient-to-r ${reason.color} rounded-xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>
      
      {}
      <div className="relative bg-gray-800 border border-gray-700 rounded-xl p-6 h-full transition-all duration-300 hover:border-gray-600 hover:bg-gray-750">
        {}
        <div className="flex items-start justify-between mb-4">
          <div className={`p-3 rounded-lg bg-gradient-to-br ${reason.color} text-white transform transition-transform duration-300 ${isHovered ? 'scale-110' : ''}`}>
            {reason.icon}
          </div>
          <div className="text-right">
            <div className={`text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${reason.color}`}>
              {reason.stats}
            </div>
            <div className="text-xs text-gray-400">{reason.highlight}</div>
          </div>
        </div>
        
        {}
        <div className="space-y-3">
          <h3 className="text-xl font-bold text-white">{reason.title}</h3>
          <p className="text-gray-300 text-sm leading-relaxed">{reason.description}</p>
        </div>
        
        {}
        <motion.div
          className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${reason.color} rounded-b-xl`}
          initial={{ width: 0 }}
          animate={{ width: isHovered ? '100%' : '0%' }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  );
}

export default function WhyChooseUsSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
      <div className="relative overflow-hidden">
        {}
        <WhyChooseBackground />
        
        {}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/90 via-gray-900/70 to-gray-900/90 z-10"></div>
        
        <div className="relative z-20" ref={ref}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-white">¿Por Qué </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-greenlock-400 to-greenlock-600">Elegirnos</span>
              <span className="text-white">?</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              En GreenLock combinamos experiencia técnica avanzada con un enfoque centrado en resultados 
              para ofrecer valor real a su organización.
            </p>
          </motion.div>
          
          {}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {reasons.map((reason, index) => (
              <ReasonCard
                key={reason.id}
                reason={reason}
                index={index}
                inView={inView}
              />
            ))}
          </div>
          
          {}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-20"
          >
            <div className="bg-gradient-to-r from-gray-800/80 to-gray-700/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-600">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-4xl font-bold text-greenlock-400 mb-2">500+</div>
                  <div className="text-gray-300 text-sm">Auditorías completadas</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-greenlock-400 mb-2">98%</div>
                  <div className="text-gray-300 text-sm">Satisfacción del cliente</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-greenlock-400 mb-2">24h</div>
                  <div className="text-gray-300 text-sm">Tiempo de respuesta</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-greenlock-400 mb-2">0%</div>
                  <div className="text-gray-300 text-sm">Interrupciones operativas</div>
                </div>
              </div>
            </div>
          </motion.div>
          
          {}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="text-center mt-16"
          >
            <div className="inline-flex items-center space-x-2 bg-greenlock-500/10 border border-greenlock-500/30 rounded-full px-6 py-3 mb-6">
              <Star className="w-5 h-5 text-greenlock-400" />
              <span className="text-greenlock-400 font-medium">Líder en ciberseguridad empresarial</span>
            </div>
            
            <h3 className="text-2xl font-bold text-white mb-4">
              ¿Listo para fortalecer su seguridad?
            </h3>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Únase a las 500+ empresas que confían en GreenLock para proteger su infraestructura digital.
            </p>
            
            <motion.a
              href="#contacto"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-greenlock-600 to-greenlock-500 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:from-greenlock-500 hover:to-greenlock-400 hover:shadow-lg hover:shadow-greenlock-500/30 group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Solicitar evaluación gratuita</span>
              <motion.div
                className="transform transition-transform group-hover:translate-x-1"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                →
              </motion.div>
            </motion.a>
          </motion.div>
        </div>
      </div>
  );
}