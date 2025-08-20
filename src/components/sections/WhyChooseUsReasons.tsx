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
  Zap
} from 'lucide-react';


function CTAButton({
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


function AnimatedBackground() {
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


    const hexagons: { x: number; y: number; size: number; rotation: number; opacity: number; speed: number }[] = [];
    const hexCount = 8;

    for (let i = 0; i < hexCount; i++) {
      hexagons.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 20 + 15,
        rotation: Math.random() * Math.PI * 2,
        opacity: Math.random() * 0.05 + 0.02,
        speed: Math.random() * 0.3 + 0.1
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
        ctx.strokeStyle = `rgba(0, 178, 103, ${hex.opacity})`;
        ctx.lineWidth = 1;

        drawHexagon(hex.x, hex.y, hex.size, hex.rotation);
        ctx.stroke();


        hex.y -= hex.speed;
        hex.rotation += 0.005;


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
    id: 'methodology',
    title: 'Metodología Especializada',
    description: 'Framework propio basado en MITRE ATT&CK, OWASP TOP 10, OWASP WSTG, NIS2 y Esquema Nacional de Seguridad (ENS).',
    icon: <Shield className="w-8 h-8" />,
    stats: 'ENS',
    highlight: 'NIS2 Compliance',
    bgColor: 'bg-emerald-600'
  },
  {
    id: 'services',
    title: 'Servicios Completos',
    description: 'Evaluación Perimetral, Red Team, Pentesting Web, Auditorías de Código, Pentesting IA y Consultoría en Ciberseguridad a todos los niveles.',
    icon: <Target className="w-8 h-8" />,
    stats: 'Consultoría',
    highlight: 'De Ciberseguridad',
    bgColor: 'bg-blue-600'
  },
  {
    id: 'sectors',
    title: 'Experiencia Vertical',
    description: 'Especialización demostrada en sectores críticos: salud, turismo, procesos industriales e Internet of Things (IoT).',
    icon: <Users className="w-8 h-8" />,
    stats: 'IoT',
    highlight: 'Sectores críticos',
    bgColor: 'bg-purple-600'
  },
  {
    id: 'research',
    title: 'Investigación Avanzada',
    description: 'Participación activa en identificación de vulnerabilidades CVE, programas Bug Bounty y competiciones CTF internacionales.',
    icon: <Award className="w-8 h-8" />,
    stats: 'CVE',
    highlight: 'Investigación 0-day',
    bgColor: 'bg-orange-600'
  },
  {
    id: 'operations',
    title: 'Operaciones Controladas',
    description: 'Reglas de Compromiso (ROE) estrictas que garantizan disponibilidad, confidencialidad e integridad durante las pruebas.',
    icon: <CheckCircle className="w-8 h-8" />,
    stats: 'ROE',
    highlight: 'Cero interrupciones',
    bgColor: 'bg-teal-600'
  },
  {
    id: 'ttps',
    title: 'Simulaciones Realistas',
    description: 'Implementación de Tácticas, Técnicas y Procedimientos (TTPs) de atacantes sofisticados documentados en MITRE ATT&CK.',
    icon: <Zap className="w-8 h-8" />,
    stats: 'TTPs',
    highlight: 'Ataques reales',
    bgColor: 'bg-amber-600'
  },
  {
    id: 'reporting',
    title: 'Documentación Técnica',
    description: 'Informes detallados con métricas CVSS, referencias OWASP y CWE, incluyendo pruebas de concepto (PoC) personalizadas.',
    icon: <FileText className="w-8 h-8" />,
    stats: 'CVSS',
    highlight: 'Métricas estándar',
    bgColor: 'bg-red-600'
  },
  {
    id: 'followup',
    title: 'Seguimiento Continuo',
    description: 'Presentaciones periódicas, comunicación inmediata de hallazgos críticos y repentesting post-remediación.',
    icon: <TrendingUp className="w-8 h-8" />,
    stats: '24/7',
    highlight: 'Soporte continuo',
    bgColor: 'bg-indigo-600'
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
      className="relative group cursor-pointer h-full"
    >
      { }
      <div className="relative bg-gray-800 border border-gray-700 rounded-xl p-6 h-full transition-all duration-300 group-hover:border-gray-600 group-hover:transform group-hover:-translate-y-1">

        { }
        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#00B267] to-transparent opacity-70"></div>

        { }
        <div className="flex items-start justify-between mb-4">
          { }
          <div className={`${reason.bgColor} p-3 rounded-lg text-white relative transition-transform duration-300 group-hover:scale-105`}>
            { }
            <div className={`absolute inset-0 ${reason.bgColor} rounded-lg blur-md opacity-30`}></div>
            <div className="relative z-10">{reason.icon}</div>
          </div>

          <div className="text-right">
            <div className="text-2xl font-bold text-white transition-colors duration-300 group-hover:text-[#00B267]">
              {reason.stats}
            </div>
            <div className="text-xs text-gray-400 font-medium uppercase tracking-wide transition-colors duration-300 group-hover:text-[#00B267]">
              {reason.highlight}
            </div>
          </div>
        </div>

        { }
        <div className="space-y-3">
          <h3 className="text-xl font-bold text-white leading-tight transition-colors duration-300 group-hover:text-[#00B267]">
            {reason.title}
          </h3>
          <p className="text-gray-300 text-sm leading-relaxed">
            {reason.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function WhyChooseUsReasons() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="bg-gray-900 py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden">
          { }
          <AnimatedBackground />

          { }
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/95 via-gray-900/80 to-gray-900/95 z-10"></div>

          <div className="relative z-20" ref={ref}>
            { }
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {reasons.map((reason, index) => (
                <ReasonCard
                  key={reason.id}
                  reason={reason}
                  index={index}
                  inView={inView}
                />
              ))}

              { }
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="col-span-1 md:col-span-2 lg:col-span-4 mt-14"
              >
                <div className="relative bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-3xl p-8 border border-[#00B267]/20 overflow-hidden">
                  { }
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-[#00B267] rounded-full filter blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#33D17A] rounded-full filter blur-3xl animate-pulse delay-1000"></div>
                  </div>

                  { }
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00B267] to-transparent opacity-50"></div>
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#33D17A] to-transparent opacity-50"></div>

                  { }
                  <div className="relative z-10 text-center mb-10">
                    <div className="inline-flex items-center gap-2 bg-[#00B267]/10 border border-[#00B267]/30 rounded-full px-4 py-2 mb-4">
                      <div className="w-2 h-2 bg-[#00B267] rounded-full animate-pulse"></div>
                      <span className="text-[#00B267] font-semibold text-sm uppercase tracking-wide">Garantías Profesionales</span>
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-3 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                      Excelencia Comprobada
                    </h3>
                    <p className="text-gray-300 text-lg max-w-2xl mx-auto">Métricas que demuestran nuestro compromiso con la ciberseguridad empresarial</p>
                  </div>

                  { }
                  <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="text-center group">
                      <div className="relative mb-4">
                        <div className="text-4xl font-bold bg-gradient-to-r from-[#00B267] to-[#33D17A] bg-clip-text text-transparent transform group-hover:scale-110 transition-transform duration-300">
                          100%
                        </div>
                        <div className="absolute inset-0 bg-[#00B267] opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"></div>
                      </div>
                      <div className="text-gray-300 text-sm font-semibold uppercase tracking-wide border-t border-gray-700 pt-3">
                        Auditorías Exitosas
                      </div>
                      <div className="text-gray-400 text-xs mt-1">Vulnerabilidades Identificadas siempre</div>
                    </div>

                    <div className="text-center group">
                      <div className="relative mb-4">
                        <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent transform group-hover:scale-110 transition-transform duration-300">
                          0%
                        </div>
                        <div className="absolute inset-0 bg-blue-500 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"></div>
                      </div>
                      <div className="text-gray-300 text-sm font-semibold uppercase tracking-wide border-t border-gray-700 pt-3">
                        Carga Operativa Cliente
                      </div>
                      <div className="text-gray-400 text-xs mt-1">Nosotros gestionamos todo</div>
                    </div>

                    <div className="text-center group">
                      <div className="relative mb-4">
                        <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent transform group-hover:scale-110 transition-transform duration-300">
                          &lt;2h
                        </div>
                        <div className="absolute inset-0 bg-purple-500 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"></div>
                      </div>
                      <div className="text-gray-300 text-sm font-semibold uppercase tracking-wide border-t border-gray-700 pt-3">
                        Respuesta Crítica
                      </div>
                      <div className="text-gray-400 text-xs mt-1">Soporte inmediato 24/7</div>
                    </div>

                    <div className="text-center group">
                      <div className="relative mb-4">
                        <div className="text-4xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent transform group-hover:scale-110 transition-transform duration-300">
                          CVE
                        </div>
                        <div className="absolute inset-0 bg-orange-500 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"></div>
                      </div>
                      <div className="text-gray-300 text-sm font-semibold uppercase tracking-wide border-t border-gray-700 pt-3">
                        Investigación 0-Day
                      </div>
                      <div className="text-gray-400 text-xs mt-1">Vulnerabilidades exclusivas</div>
                    </div>
                  </div>

                  { }
                  <div className="relative z-10 text-center mt-8">
                    <div className="inline-flex items-center gap-3">
                      <a href="contacto">
                        <CTAButton
                          variant="primary"
                          size="lg"
                          className="px-8 py-4 text-lg font-semibold relative overflow-hidden group bg-gradient-to-r from-[#00B267] to-[#33D17A] hover:from-[#33D17A] hover:to-[#00B267] transition-all duration-500 transform hover:scale-105 shadow-lg shadow-[#00B267]/25"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                          <span className="relative z-10">Solicitar Auditoría Gratuita</span>
                        </CTAButton>
                      </a>
                    </div>

                    <p className="text-gray-400 text-sm mt-3">Consulta inicial sin compromiso • Respuesta en 24h</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}