// src/components/sections/OSISection.tsx - VERSIÓN VISUAL IMPACTANTE
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Shield, 
  Clock, 
  Eye, 
  Zap, 
  CheckCircle,
  ArrowRight,
  Award,
  Target,
  Monitor,
  Activity,
  Lock,
  AlertTriangle,
  TrendingUp,
  Users
} from 'lucide-react';

// Fondo con partículas avanzadas y más dinámicas
function OSIBackground() {
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
    
    // Crear sistemas de partículas más complejos
    const particles: Array<{
      x: number; y: number; vx: number; vy: number; 
      radius: number; opacity: number; trail: Array<{x: number; y: number; opacity: number}>
    }> = [];
    const particleCount = 25;
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        radius: Math.random() * 2 + 1,
        opacity: Math.random() * 0.6 + 0.4,
        trail: []
      });
    }
    
    let animationFrameId: number;
    let time = 0;
    
    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
      
      time += 0.01;
      
      // Dibujar conexiones dinámicas
      ctx.lineWidth = 1;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 150) {
            const opacity = (150 - distance) / 150 * 0.3;
            const gradient = ctx.createLinearGradient(
              particles[i].x, particles[i].y,
              particles[j].x, particles[j].y
            );
            gradient.addColorStop(0, `rgba(0, 178, 103, ${opacity})`);
            gradient.addColorStop(0.5, `rgba(74, 222, 128, ${opacity * 0.8})`);
            gradient.addColorStop(1, `rgba(0, 178, 103, ${opacity})`);
            
            ctx.strokeStyle = gradient;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      
      // Dibujar partículas con efectos avanzados
      for (const particle of particles) {
        // Actualizar trail
        particle.trail.push({ x: particle.x, y: particle.y, opacity: particle.opacity });
        if (particle.trail.length > 8) particle.trail.shift();
        
        // Dibujar trail
        for (let i = 0; i < particle.trail.length; i++) {
          const trailPoint = particle.trail[i];
          const trailOpacity = (i / particle.trail.length) * trailPoint.opacity * 0.5;
          
          ctx.beginPath();
          ctx.arc(trailPoint.x, trailPoint.y, particle.radius * (i / particle.trail.length), 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0, 178, 103, ${trailOpacity})`;
          ctx.fill();
        }
        
        // Partícula principal con glow
        const pulse = Math.sin(time * 2 + particle.x * 0.01) * 0.3 + 0.7;
        
        // Glow exterior
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius * 3, 0, Math.PI * 2);
        const glowGradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.radius * 3
        );
        glowGradient.addColorStop(0, `rgba(0, 178, 103, ${particle.opacity * pulse * 0.2})`);
        glowGradient.addColorStop(1, 'transparent');
        ctx.fillStyle = glowGradient;
        ctx.fill();
        
        // Partícula principal
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius * pulse, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 178, 103, ${particle.opacity * pulse})`;
        ctx.fill();
        
        // Actualizar posición
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        // Rebote con efecto suave
        if (particle.x <= 0 || particle.x >= window.innerWidth) {
          particle.vx *= -0.8;
          particle.x = Math.max(0, Math.min(window.innerWidth, particle.x));
        }
        if (particle.y <= 0 || particle.y >= window.innerHeight) {
          particle.vy *= -0.8;
          particle.y = Math.max(0, Math.min(window.innerHeight, particle.y));
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

// Contador animado más impactante
function AnimatedCounter({ value, suffix = '', duration = 2000 }: { value: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
  
  useEffect(() => {
    if (inView && !isVisible) {
      setIsVisible(true);
      
      const increment = value / (duration / 16);
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(current);
        }
      }, 16);
      
      return () => clearInterval(timer);
    }
  }, [inView, value, duration, isVisible]);
  
  return (
    <span ref={ref} className="tabular-nums">
      {Math.floor(count)}{suffix}
    </span>
  );
}

// Datos reorganizados para mayor impacto visual
const osiStats = [
  { icon: <Activity className="w-8 h-8" />, value: 24, suffix: "/7", label: "Monitorización", color: "from-blue-500 to-cyan-500" },
  { icon: <Zap className="w-8 h-8" />, value: 4, suffix: "h", label: "Respuesta Máxima", color: "from-orange-500 to-red-500" },
  { icon: <Shield className="w-8 h-8" />, value: 100, suffix: "%", label: "Cumplimiento", color: "from-green-500 to-emerald-500" },
  { icon: <Target className="w-8 h-8" />, value: 99.9, suffix: "%", label: "Disponibilidad", color: "from-purple-500 to-pink-500" }
];

const osiFeatures = [
  {
    icon: <Monitor className="w-12 h-12" />,
    title: "Centro de Operaciones 24/7",
    description: "SOC dedicado con analistas expertos monitorizando su infraestructura las 24 horas.",
    benefits: ["Detección en tiempo real", "Análisis de amenazas", "Correlación de eventos"],
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-500"
  },
  {
    icon: <AlertTriangle className="w-12 h-12" />,
    title: "Respuesta Automática",
    description: "Sistemas de respuesta automatizada que contienen amenazas en minutos, no horas.",
    benefits: ["Contención automática", "Escalado inteligente", "Notificaciones inmediatas"],
    color: "from-orange-500 to-red-500",
    bgColor: "bg-orange-500"
  },
  {
    icon: <Lock className="w-12 h-12" />,
    title: "Cumplimiento Garantizado",
    description: "Cumplimiento automático de ENS, NIS2, ISO 27001 y todas las regulaciones europeas.",
    benefits: ["Auditorías continuas", "Reportes automáticos", "Gestión de evidencias"],
    color: "from-green-500 to-emerald-500",
    bgColor: "bg-green-500"
  },
  {
    icon: <TrendingUp className="w-12 h-12" />,
    title: "Inteligencia de Amenazas",
    description: "Análisis predictivo basado en IA para anticiparse a las amenazas emergentes.",
    benefits: ["Predicción de ataques", "Threat hunting", "Análisis forense"],
    color: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-500"
  }
];

// Componente de estadística impactante
function StatCard({ stat, index, inView }: { stat: typeof osiStats[0]; index: number; inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, rotateY: 90 }}
      animate={inView ? { opacity: 1, scale: 1, rotateY: 0 } : { opacity: 0, scale: 0.5, rotateY: 90 }}
      transition={{ duration: 0.8, delay: index * 0.2, type: "spring", stiffness: 100 }}
      className="group"
    >
      <div className="relative bg-white rounded-2xl p-6 shadow-2xl border border-gray-100 overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-3xl">
        {/* Glow effect */}
        <div className={`absolute -inset-1 bg-gradient-to-r ${stat.color} rounded-2xl blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-500`}></div>
        
        {/* Content */}
        <div className="relative z-10 text-center">
          <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${stat.color} text-white mb-4 transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6`}>
            {stat.icon}
          </div>
          
          <div className={`text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${stat.color} mb-2`}>
            <AnimatedCounter value={stat.value} suffix={stat.suffix} />
          </div>
          
          <div className="text-gray-600 font-medium">{stat.label}</div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-20 h-20 transform translate-x-10 -translate-y-10">
          <div className={`w-full h-full rounded-full bg-gradient-to-br ${stat.color} opacity-10`}></div>
        </div>
      </div>
    </motion.div>
  );
}

// Componente de característica mejorado
function FeatureCard({ feature, index, inView }: { feature: typeof osiFeatures[0]; index: number; inView: boolean }) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.7, delay: index * 0.15 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative"
    >
      {/* Glow background */}
      <div className={`absolute -inset-2 bg-gradient-to-r ${feature.color} rounded-3xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-700`}></div>
      
      {/* Main card */}
      <div className="relative bg-white rounded-2xl p-8 shadow-xl border border-gray-100 transform transition-all duration-500 hover:scale-105 overflow-hidden">
        {/* Background pattern */}
        <div className="absolute top-0 right-0 w-32 h-32 transform translate-x-16 -translate-y-16">
          <div className={`w-full h-full rounded-full bg-gradient-to-br ${feature.color} opacity-5`}></div>
        </div>
        
        {/* Icon with advanced effects */}
        <div className="relative z-10 mb-6">
          <div className={`inline-flex p-6 rounded-2xl bg-gradient-to-br ${feature.color} text-white transform transition-all duration-500 ${isHovered ? 'scale-110 rotate-6' : ''}`}>
            {feature.icon}
            
            {/* Pulse rings */}
            <div className="absolute inset-0 rounded-2xl">
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.color} animate-ping opacity-20`}></div>
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.color} animate-pulse opacity-10`}></div>
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className="relative z-10">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
          <p className="text-gray-600 mb-6 leading-relaxed">{feature.description}</p>
          
          {/* Benefits */}
          <div className="space-y-3">
            {feature.benefits.map((benefit, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.5, delay: index * 0.15 + idx * 0.1 }}
                className="flex items-center gap-3"
              >
                <div className={`w-2 h-2 ${feature.bgColor} rounded-full flex-shrink-0`}></div>
                <span className="text-sm text-gray-600 font-medium">{benefit}</span>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Bottom accent */}
        <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}></div>
      </div>
    </motion.div>
  );
}

export default function OSISection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Fondo dinámico */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <OSIBackground />
      </div>
      
      {/* Overlay con patrón */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/50 to-transparent z-10"></div>
      
      <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        
        {/* HERO SECTION IMPACTANTE */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 1 }}
          className="text-center mb-20"
        >
          {/* Badge Premium */}
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500 to-emerald-400 text-white px-6 py-3 rounded-full text-sm font-bold mb-8 shadow-2xl">
            <Award className="w-5 h-5" />
            <span>SERVICIO PREMIUM</span>
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          </div>
          
          {/* Título Principal */}
          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
            <span className="text-white block">Tu</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 animate-pulse">
              Centro de Operaciones
            </span>
            <span className="text-white block">de Ciberseguridad</span>
          </h1>
          
          {/* Subtítulo impactante */}
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-12">
            <span className="text-green-400 font-bold">Protección 24/7</span> • 
            <span className="text-blue-400 font-bold"> Respuesta en 4h</span> • 
            <span className="text-purple-400 font-bold"> Cumplimiento Total</span>
          </p>
        </motion.div>

        {/* IMAGEN PRINCIPAL + ESTADÍSTICAS */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="relative mb-20"
        >
          {/* Contenedor de imagen principal */}
          <div className="relative max-w-6xl mx-auto">
            {/* Imagen del dashboard/centro de operaciones */}
            <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 shadow-2xl border border-gray-700 overflow-hidden">
              {/* Simulación de dashboard */}
              <div className="bg-black rounded-2xl p-6 relative overflow-hidden">
                {/* Header del dashboard */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="text-green-400 font-mono text-sm">OSI-DASHBOARD-LIVE</div>
                </div>
                
                {/* Grid del dashboard */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-green-900/30 border border-green-500/30 rounded-lg p-4">
                    <div className="text-green-400 text-sm font-mono mb-2">THREAT DETECTION</div>
                    <div className="text-green-400 text-2xl font-bold">SECURE</div>
                  </div>
                  <div className="bg-blue-900/30 border border-blue-500/30 rounded-lg p-4">
                    <div className="text-blue-400 text-sm font-mono mb-2">MONITORING</div>
                    <div className="text-blue-400 text-2xl font-bold">ACTIVE</div>
                  </div>
                  <div className="bg-purple-900/30 border border-purple-500/30 rounded-lg p-4">
                    <div className="text-purple-400 text-sm font-mono mb-2">COMPLIANCE</div>
                    <div className="text-purple-400 text-2xl font-bold">100%</div>
                  </div>
                </div>
                
                {/* Terminal simulado */}
                <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm">
                  <div className="text-green-400 mb-1">$ ./security-monitor --status</div>
                  <div className="text-gray-300 mb-1">[✓] All systems operational</div>
                  <div className="text-gray-300 mb-1">[✓] Threat detection: ACTIVE</div>
                  <div className="text-gray-300 mb-1">[✓] Compliance status: COMPLIANT</div>
                  <div className="text-green-400 animate-pulse">█</div>
                </div>
              </div>
              
              {/* Efectos de glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 via-transparent to-purple-500/10 rounded-3xl"></div>
            </div>
            
            {/* Floating stats */}
            <div className="absolute -top-10 -left-10 bg-white rounded-2xl p-4 shadow-2xl transform rotate-6 border">
              <div className="text-green-600 font-bold text-lg">99.9%</div>
              <div className="text-gray-600 text-sm">Uptime</div>
            </div>
            
            <div className="absolute -top-10 -right-10 bg-white rounded-2xl p-4 shadow-2xl transform -rotate-6 border">
              <div className="text-blue-600 font-bold text-lg">&lt;2min</div>
              <div className="text-gray-600 text-sm">Detection</div>
            </div>
          </div>
        </motion.div>

        {/* ESTADÍSTICAS IMPACTANTES */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {osiStats.map((stat, index) => (
            <StatCard
              key={index}
              stat={stat}
              index={index}
              inView={inView}
            />
          ))}
        </div>

        {/* CARACTERÍSTICAS PRINCIPALES */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-20"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Capacidades <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">Avanzadas</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Tecnología de última generación al servicio de su seguridad
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {osiFeatures.map((feature, index) => (
              <FeatureCard
                key={index}
                feature={feature}
                index={index}
                inView={inView}
              />
            ))}
          </div>
        </motion.div>

        {/* CTA FINAL ESPECTACULAR */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 1, delay: 1 }}
          className="relative"
        >
          <div className="relative bg-gradient-to-r from-green-600 via-emerald-500 to-green-400 rounded-3xl p-12 md:p-16 text-center overflow-hidden">
            {/* Efectos de fondo */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
            
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 mb-8">
                <Users className="w-5 h-5 text-white" />
                <span className="text-white font-semibold">Únete a 500+ empresas protegidas</span>
              </div>
              
              <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">
                ¿Listo para la <span className="underline decoration-white/50">tranquilidad total</span>?
              </h3>
              
              <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
                Transforme su seguridad en 48 horas. Consulta estratégica gratuita con nuestros expertos.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group bg-white text-green-600 px-10 py-5 rounded-2xl font-bold text-xl shadow-2xl transition-all duration-300 hover:shadow-3xl flex items-center gap-3"
                >
                  <Shield className="w-6 h-6" />
                  Activar OSI Ahora
                  <ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-2" />
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-white/50 text-white px-8 py-5 rounded-2xl font-semibold text-lg backdrop-blur-sm transition-all duration-300 hover:bg-white/10"
                >
                  Ver Demo en Vivo
                </motion.button>
              </div>
              
              <div className="flex items-center justify-center gap-8 mt-8 text-white/80">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  <span>Setup en 48h</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  <span>Sin permanencia</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  <span>Garantía total</span>
                </div>
              </div>
            </div>
          </div>
          </motion.div>
        </div>
      </section>
