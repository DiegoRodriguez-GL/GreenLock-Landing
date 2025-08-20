import React, { useState, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Search, 
  Target, 
  Zap, 
  BarChart3, 
  CheckCircle,
  Clock,
  Users,
  Shield,
  AlertTriangle,
  ArrowRight
} from 'lucide-react';
import '../../styles/MethodologyRoadmapSection.css';

interface RoadmapSectionProps {
  isLoaded: boolean;
}

interface Phase {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  duration: string;
  icon: React.ReactNode;
  details: string[];
  frameworks: string[];
  color: string;
  position: 'left' | 'right';
}

const roadmapPhases: Phase[] = [
  {
    id: 'planning',
    title: 'Planificación',
    subtitle: 'Definición de alcance y ROE',
    description: 'Establecemos un marco claro de colaboración mediante la definición de las Reglas de Compromiso (ROE) y el alcance del ejercicio.',
    duration: '1-2 semanas',
    icon: <FileText className="w-6 h-6" />,
    details: [
      'Definición de sistemas a evaluar y limitaciones',
      'Técnicas permitidas y condiciones especiales',
      'Consideraciones CIA (Confidencialidad, Integridad, Disponibilidad)',
      'Marcos de referencia aplicables',
      'Frecuencia de presentaciones de seguimiento'
    ],
    frameworks: ['MITRE ATT&CK', 'OWASP', 'ENS'],
    color: 'from-blue-500 to-blue-600',
    position: 'left'
  },
  {
    id: 'reconnaissance',
    title: 'Reconocimiento',
    subtitle: 'Recopilación de información',
    description: 'Investigación exhaustiva tanto pasiva como activa para mapear la infraestructura objetivo y detectar posibles vectores de entrada.',
    duration: '1-3 semanas',
    icon: <Search className="w-6 h-6" />,
    details: [
      'Reconocimiento pasivo (OSINT)',
      'Análisis de superficie de ataque',
      'Identificación de tecnologías',
      'Mapeo de subdominios y servicios',
      'Técnicas de evasión ante defensas'
    ],
    frameworks: ['TA0043', 'OSINT', 'DNS'],
    color: 'from-purple-500 to-purple-600',
    position: 'right'
  },
  {
    id: 'scanning',
    title: 'Identificación',
    subtitle: 'Análisis de vectores de ataque',
    description: 'Análisis y priorización de vectores de ataque identificados para enfocar los esfuerzos en los elementos de mayor riesgo.',
    duration: '1-2 semanas',
    icon: <Target className="w-6 h-6" />,
    details: [
      'Escaneo de puertos y servicios',
      'Detección de versiones de software',
      'Análisis de configuraciones inseguras',
      'Identificación de sistemas de defensa',
      'Priorización por criticidad y exposición'
    ],
    frameworks: ['CVSS', 'NVD', 'CWE'],
    color: 'from-orange-500 to-orange-600',
    position: 'left'
  },
  {
    id: 'exploitation',
    title: 'Explotación',
    subtitle: 'Validación controlada',
    description: 'Ejecución controlada de ataques para validar vulnerabilidades mediante explotación segura y desarrollo de PoCs personalizados.',
    duration: '2-4 semanas',
    icon: <Zap className="w-6 h-6" />,
    details: [
      'Explotación manual de vulnerabilidades',
      'Desarrollo de PoCs personalizados (N-day/0-day)',
      'Escalada de privilegios controlada',
      'Validación de impacto real',
      'Movimiento lateral (si aplica)'
    ],
    frameworks: ['MITRE ATT&CK', 'Exploit-DB', 'CVE'],
    color: 'from-red-500 to-red-600',
    position: 'right'
  },
  {
    id: 'reporting',
    title: 'Análisis y Reporte',
    subtitle: 'Documentación de hallazgos',
    description: 'Elaboración de informe detallado con hallazgos, impacto potencial y plan de acción priorizado para la remediación.',
    duration: '1-2 semanas',
    icon: <BarChart3 className="w-6 h-6" />,
    details: [
      'Clasificación de vulnerabilidades por criticidad',
      'Evidencias técnicas y pasos de reproducción',
      'Análisis de impacto potencial (CVSS)',
      'Recomendaciones específicas de remediación',
      'Plan de acción estructurado y priorizado'
    ],
    frameworks: ['CVSS', 'OWASP', 'ISO 27001'],
    color: 'from-green-500 to-green-600',
    position: 'left'
  }
];

const MethodologyRoadmapSection: React.FC<RoadmapSectionProps> = ({ isLoaded }) => {
  const [activePhase, setActivePhase] = useState<number | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const element = sectionRef.current;
      const rect = element.getBoundingClientRect();
      const elementTop = rect.top;
      const elementHeight = rect.height;
      const windowHeight = window.innerHeight;
      
      
      const scrolled = Math.max(0, Math.min(1, (windowHeight - elementTop) / (elementHeight + windowHeight)));
      setScrollProgress(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); 
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="methodology-roadmap-section" ref={(node) => {
      sectionRef.current = node;
      ref(node);
    }}>
      {}
      <div className="methodology-roadmap-dots">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="methodology-roadmap-dot"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 20}s`,
              animationDuration: `${15 + Math.random() * 10}s`
            }}
          />
        ))}
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={`line-${i}`}
            className="methodology-roadmap-connecting-line"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              transform: `rotate(${Math.random() * 360}deg)`,
              animationDelay: `${Math.random() * 15}s`
            }}
          />
        ))}
      </div>

      <div className="methodology-roadmap-container">
        {}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="methodology-roadmap-header"
        >
          <h2 className="methodology-roadmap-title">
            Nuestro <span className="methodology-roadmap-title-gradient">Proceso</span>
          </h2>
          <p className="methodology-roadmap-subtitle">
            Metodología propia basada en estándares internacionales como{' '}
            <span className="methodology-roadmap-highlight">MITRE ATT&CK</span>,{' '}
            <span className="methodology-roadmap-highlight">OWASP</span> y{' '}
            <span className="methodology-roadmap-highlight">ENS</span>,{' '}
            garantizando una ejecución controlada, trazable y con retorno claro para tu organización.
          </p>
        </motion.div>

        {}
        <div className="methodology-roadmap-timeline">
          <div className="methodology-roadmap-line">
            <div 
              className="methodology-roadmap-line-progress"
              style={{ height: `${scrollProgress * 100}%` }}
            />
          </div>
          
          {roadmapPhases.map((phase, index) => (
            <motion.div
              key={phase.id}
              initial={{ opacity: 0, x: phase.position === 'left' ? -50 : 50 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: phase.position === 'left' ? -50 : 50 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`methodology-roadmap-phase methodology-roadmap-phase-${phase.position}`}
              onMouseEnter={() => setActivePhase(index)}
              onMouseLeave={() => setActivePhase(null)}
            >
              {}
              <div className="methodology-roadmap-node">
                <div className={`methodology-roadmap-node-icon bg-gradient-to-br ${phase.color}`}>
                  {phase.icon}
                </div>
                <div className="methodology-roadmap-node-pulse"></div>
              </div>

              {}
              <div className="methodology-roadmap-content">
                <div className="methodology-roadmap-card">
                  <div className="methodology-roadmap-card-header">
                    <div className={`methodology-roadmap-phase-number bg-gradient-to-br ${phase.color}`}>
                      {index + 1}
                    </div>
                    <div className="methodology-roadmap-card-title">
                      <h3>{phase.title}</h3>
                      <p className="methodology-roadmap-card-subtitle">{phase.subtitle}</p>
                    </div>
                    <div className="methodology-roadmap-duration">
                      <Clock className="w-4 h-4" />
                      <span>{phase.duration}</span>
                    </div>
                  </div>

                  <p className="methodology-roadmap-description">
                    {phase.description}
                  </p>

                  {}
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={
                      activePhase === index
                        ? { height: 'auto', opacity: 1 }
                        : { height: 0, opacity: 0 }
                    }
                    transition={{ duration: 0.3 }}
                    className="methodology-roadmap-details"
                  >
                    <div className="methodology-roadmap-details-content">
                      <h4>
                        <CheckCircle className="w-4 h-4" />
                        Actividades clave:
                      </h4>
                      <ul className="methodology-roadmap-activities">
                        {phase.details.map((detail, idx) => (
                          <li key={idx}>
                            <div className="methodology-roadmap-bullet"></div>
                            {detail}
                          </li>
                        ))}
                      </ul>

                      <div className="methodology-roadmap-frameworks">
                        <h4>
                          <Shield className="w-4 h-4" />
                          Marcos de referencia:
                        </h4>
                        <div className="methodology-roadmap-tags">
                          {phase.frameworks.map((framework, idx) => (
                            <span key={idx} className="methodology-roadmap-tag">
                              {framework}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="methodology-roadmap-stats"
        >
          <div className="methodology-roadmap-stat">
            <div className="methodology-roadmap-stat-icon">
              <Users className="w-6 h-6" />
            </div>
            <div className="methodology-roadmap-stat-content">
              <div className="methodology-roadmap-stat-number">4-8</div>
              <div className="methodology-roadmap-stat-label">Semanas promedio</div>
              <div className="methodology-roadmap-stat-desc">Duración completa del ejercicio</div>
            </div>
          </div>

          <div className="methodology-roadmap-stat">
            <div className="methodology-roadmap-stat-icon">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="methodology-roadmap-stat-content">
              <div className="methodology-roadmap-stat-number">24/7</div>
              <div className="methodology-roadmap-stat-label">Comunicación crítica</div>
              <div className="methodology-roadmap-stat-desc">Notificación inmediata de vulnerabilidades críticas</div>
            </div>
          </div>

          <div className="methodology-roadmap-stat">
            <div className="methodology-roadmap-stat-icon">
              <Target className="w-6 h-6" />
            </div>
            <div className="methodology-roadmap-stat-content">
              <div className="methodology-roadmap-stat-number">0%</div>
              <div className="methodology-roadmap-stat-label">Impacto operativo</div>
              <div className="methodology-roadmap-stat-desc">Sin comprometer disponibilidad de servicios</div>
            </div>
          </div>
        </motion.div>

        {}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="methodology-roadmap-cta"
        >
          <div className="methodology-roadmap-cta-glow"></div>
          <div className="methodology-roadmap-cta-content">
            <div className="methodology-roadmap-cta-icon">
              <Shield className="w-8 h-8" />
            </div>
            <h3>¿Listo para evaluar tu postura de seguridad?</h3>
            <p>Solicita una consulta personalizada para conocer cómo aplicamos nuestra metodología a tu organización.</p>
            <a href="contacto">
            <button className="methodology-roadmap-cta-button">
            <span>Solicitar consulta técnica</span>
               <ArrowRight className="w-5 h-5 methodology-roadmap-button-arrow" />
            </button>
          </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MethodologyRoadmapSection;