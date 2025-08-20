
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, Shield, Users, Zap, AlertTriangle } from 'lucide-react';
import '../../styles/UrgentCTASection.css';


function ConnectedDotsBackground() {
  useEffect(() => {
    const container = document.querySelector('.connected-dots');
    if (!container) return;
    
    const dots: any[] = [];
    const lines: any[] = [];
    const maxDistance = 180;
    const numDots = 16;
    
    
    for (let i = 0; i < numDots; i++) {
      const dot = document.createElement('div');
      dot.className = 'moving-dot';
      container.appendChild(dot);
      
      dots.push({
        element: dot,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
      });
    }
    
    const animate = () => {
      const rect = container.getBoundingClientRect();
      
      dots.forEach(dot => {
        dot.x += dot.vx;
        dot.y += dot.vy;
        
        if (dot.x <= 0 || dot.x >= rect.width) dot.vx *= -1;
        if (dot.y <= 0 || dot.y >= rect.height) dot.vy *= -1;
        
        dot.x = Math.max(0, Math.min(rect.width, dot.x));
        dot.y = Math.max(0, Math.min(rect.height, dot.y));
        
        dot.element.style.left = dot.x + 'px';
        dot.element.style.top = dot.y + 'px';
      });
      
      lines.forEach(line => line.element.remove());
      lines.length = 0;
      
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dot1 = dots[i];
          const dot2 = dots[j];
          
          const dx = dot2.x - dot1.x;
          const dy = dot2.y - dot1.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < maxDistance) {
            const line = document.createElement('div');
            line.className = 'dynamic-line';
            
            const angle = Math.atan2(dy, dx) * 180 / Math.PI;
            const opacity = (1 - (distance / maxDistance)) * 0.6;
            
            line.style.left = dot1.x + 'px';
            line.style.top = dot1.y + 'px';
            line.style.width = distance + 'px';
            line.style.transform = `rotate(${angle}deg)`;
            line.style.opacity = opacity.toString();
            
            container.appendChild(line);
            lines.push({ element: line });
          }
        }
      }
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      dots.forEach(dot => dot.element.remove());
      lines.forEach(line => line.element.remove());
    };
  }, []);
  
  return <div className="connected-dots"></div>;
}

export default function ProfessionalCTASection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="relative py-20 professional-cta-background">
      {}
      <ConnectedDotsBackground />
      
      <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          {}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Asegure la <span className="fade-word">continuidad</span> de su negocio
            </h2>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Una estrategia de ciberseguridad robusta es fundamental para proteger 
              su inversión y mantener la confianza de sus stakeholders.
            </p>
          </div>

          {}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="benefit-card text-center p-6 rounded-lg"
            >
              <Shield className="w-10 h-10 text-[#00B267] mx-auto mb-4" />
              <h3 className="font-semibold text-white mb-2">Protege tu empresa</h3>
              <p className="text-sm text-gray-300">Blindaje integral contra ciberataques y amenazas avanzadas</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="benefit-card text-center p-6 rounded-lg"
            >
              <Users className="w-10 h-10 text-[#00B267] mx-auto mb-4" />
              <h3 className="font-semibold text-white mb-2">Seguridad a tus clientes</h3>
              <p className="text-sm text-gray-300">Protección de datos personales y cumplimiento RGPD</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="benefit-card text-center p-6 rounded-lg"
            >
              <Zap className="w-10 h-10 text-[#00B267] mx-auto mb-4" />
              <h3 className="font-semibold text-white mb-2">Operativa asegurada</h3>
              <p className="text-sm text-gray-300">Continuidad del negocio sin interrupciones críticas</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="benefit-card text-center p-6 rounded-lg"
            >
              <AlertTriangle className="w-10 h-10 text-[#00B267] mx-auto mb-4" />
              <h3 className="font-semibold text-white mb-2">Evita multas millonarias</h3>
              <p className="text-sm text-gray-300">Cumplimiento normativo y prevención de sanciones</p>
            </motion.div>
          </div>

          {}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="impact-stat rounded-lg p-6 mb-10 text-center"
          >
            <p className="text-lg text-gray-300">
              <span className="font-bold text-red-400">4.88M€</span> es el coste promedio de una brecha de datos. 
              <span className="font-semibold text-white"> Una auditoría preventiva cuesta una fracción de esto.</span>
            </p>
          </motion.div>

          {}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center"
          >
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
              <motion.a
                href="/contacto"
                className="primary-cta-button text-white px-8 py-4 rounded-lg font-semibold text-lg inline-flex items-center"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Solicitar Auditoría Preventiva
                <ArrowRight className="w-5 h-5 ml-2" />
              </motion.a>
              
              <motion.a
                href="/servicios"
                className="secondary-cta-button px-8 py-4 rounded-lg font-semibold text-lg inline-flex items-center"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Ver Servicios
              </motion.a>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center text-sm text-gray-400">
              <span>✓ Consulta gratuita sin compromiso</span>
              <span>✓ Respuesta garantizada en 24 horas</span>
              <span>✓ Confidencialidad absoluta</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}