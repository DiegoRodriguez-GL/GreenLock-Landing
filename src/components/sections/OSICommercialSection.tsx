// src/components/sections/OSICommercialSection.tsx
import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Shield, 
  AlertTriangle, 
  Clock, 
  Euro, 
  Users, 
  Eye, 
  CheckCircle, 
  ArrowRight,
  Zap,
  Award,
  TrendingDown
} from 'lucide-react';
import '../../styles/OSICommercialSection.css';

// Datos de beneficios clave
const keyBenefits = [
  {
    icon: <Shield className="w-8 h-8" />,
    title: "Protección Total",
    subtitle: "24/7 • 365 días",
    description: "Monitorización continua y respuesta automática ante cualquier amenaza.",
    color: "from-green-400 to-emerald-500"
  },
  {
    icon: <Euro className="w-8 h-8" />,
    title: "Ahorro Garantizado",
    subtitle: "Evita multas hasta 10M€",
    description: "Cumplimiento automático que previene sanciones NIS2 millonarias.",
    color: "from-yellow-400 to-orange-500"
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: "Cero Carga Operativa",
    subtitle: "Tu equipo libre",
    description: "Externalizamos toda la gestión de ciberseguridad de tu empresa.",
    color: "from-blue-400 to-cyan-500"
  },
  {
    icon: <Eye className="w-8 h-8" />,
    title: "Informes Recurrentes",
    subtitle: "Auditorías • Reuniones",
    description: "Informes ejecutivos periódicos y reuniones de seguimiento del estado de seguridad.",
    color: "from-purple-400 to-pink-500"
  }
];

const OSICommercialSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="osi-commercial-container">
      {/* Connected dots sin canvas - Solo CSS */}
      <div className="osi-connected-dots">
        <div className="osi-dot osi-dot-1"></div>
        <div className="osi-dot osi-dot-2"></div>
        <div className="osi-dot osi-dot-3"></div>
        <div className="osi-dot osi-dot-4"></div>
        <div className="osi-dot osi-dot-5"></div>
        <div className="osi-dot osi-dot-6"></div>
        <div className="osi-dot osi-dot-7"></div>
        <div className="osi-dot osi-dot-8"></div>
        
        <div className="osi-line osi-line-1"></div>
        <div className="osi-line osi-line-2"></div>
        <div className="osi-line osi-line-3"></div>
        <div className="osi-line osi-line-4"></div>
        <div className="osi-line osi-line-5"></div>
        <div className="osi-line osi-line-6"></div>
      </div>
      
      {/* Overlay para profundidad */}
      <div className="osi-commercial-overlay" />
      
      <div className="osi-commercial-content" ref={ref}>
        
        {/* Header de urgencia */}
        <div className="osi-commercial-header">
          <div className="osi-urgency-badge">
            <AlertTriangle className="w-4 h-4" />
            <span>EVITA MULTAS MILLONARIAS POR INCUMPLIMIENTO</span>
          </div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="osi-commercial-title"
          >
            <motion.span 
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="osi-title-highlight"
            >
              Oficina de Seguridad
            </motion.span>
            <span className="osi-title-main"> Virtualizada (OSI)</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="osi-commercial-subtitle"
          >
            <strong>Cumplimiento NIS2 y ENS automático.</strong> Gestionamos toda tu ciberseguridad para que tú te centres en hacer crecer tu negocio.
          </motion.p>
        </div>

        {/* Grid de beneficios */}
        <div className="osi-benefits-grid">
          {keyBenefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className="osi-benefit-card"
            >
              <div className={`osi-benefit-icon bg-gradient-to-br ${benefit.color}`}>
                {benefit.icon}
              </div>
              <div className="osi-benefit-content">
                <h3 className="osi-benefit-title">{benefit.title}</h3>
                <p className="osi-benefit-subtitle">{benefit.subtitle}</p>
                <p className="osi-benefit-description">{benefit.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Sección de urgencia financiera completamente reorganizada */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="osi-cost-section"
        >
          <div className="osi-cost-header">
            <h3 className="osi-cost-title">
              <TrendingDown className="w-6 h-6" />
              El coste de <span className="osi-cost-highlight">NO cumplir</span>
            </h3>
          </div>
          
          <div className="osi-cost-grid">
            <div className="osi-cost-card">
              <div className="osi-cost-number">10M€</div>
              <div className="osi-cost-label">Multa máxima NIS2</div>
              <div className="osi-cost-description">O 2% de la facturación global anual</div>
            </div>
            
            <div className="osi-cost-card">
              <div className="osi-cost-number">4.88M€</div>
              <div className="osi-cost-label">Coste promedio brecha</div>
              <div className="osi-cost-description">Investigación, recuperación y multas</div>
            </div>
          </div>
          
          <div className="osi-cost-solution">
            <p className="osi-solution-text">
              Nuestro servicio OSI cuesta <strong>una fracción de estos riesgos</strong> y garantiza el cumplimiento automático.
            </p>
          </div>
        </motion.div>

        {/* Compliance badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="osi-compliance-badges"
        >
          <div className="osi-compliance-badge">
            <Award className="w-5 h-5" />
            <span>NIS2 Compliant</span>
          </div>
          <div className="osi-compliance-badge">
            <Shield className="w-5 h-5" />
            <span>ENS Alto</span>
          </div>
          <div className="osi-compliance-badge">
            <CheckCircle className="w-5 h-5" />
            <span>ISO 27001</span>
          </div>
        </motion.div>

        {/* CTA principal */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="osi-cta-section"
        >
          <h3 className="osi-cta-title">
            Protege tu empresa. Cumple la normativa. <span className="text-green-400">Sin complicaciones.</span>
          </h3>
          
 <div className="osi-cta-buttons">
  <motion.a
    href="/activar-osi"
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className="osi-cta-primary"
  >
    <Zap className="w-5 h-5" />
    Activar OSI Ahora
    <ArrowRight className="w-5 h-5" />
  </motion.a>

  <motion.a
    href="https://wa.me/34682790545?text=Hola%2C%20estoy%20interesado%20en%20solicitar%20una%20consulta%20gratuita%20sobre%20la%20Oficina%20de%20Seguridad%20Virtualizada%20%28OSI%29%20de%20GreenLock.%20Me%20gustar%C3%ADa%20recibir%20m%C3%A1s%20informaci%C3%B3n%20sobre%20c%C3%B3mo%20puede%20ayudarnos%20en%20el%20cumplimiento%20de%20NIS2%20y%20ENS%2C%20as%C3%AD%20como%20en%20la%20gesti%C3%B3n%20continua%20de%20la%20ciberseguridad%20de%20nuestra%20empresa."
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className="osi-cta-secondary"
  >
    Consulta Gratuita
  </motion.a>
</div>
          
          <div className="osi-cta-guarantees">
            <div className="osi-guarantee">
              <Clock className="w-4 h-4" />
              <span>Setup en 48h</span>
            </div>
            <div className="osi-guarantee">
              <CheckCircle className="w-4 h-4" />
              <span>Sin permanencia</span>
            </div>
            <div className="osi-guarantee">
              <Shield className="w-4 h-4" />
              <span>Garantía total</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default OSICommercialSection;