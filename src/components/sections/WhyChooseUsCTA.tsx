
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Star } from 'lucide-react';
import '../../styles/WhyChooseUsCTA.css';


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
  const baseClasses = "why-cta-button-base";
  
  const variantClasses = {
    primary: "why-cta-button-primary",
    outline: "why-cta-button-outline"
  };
  
  const sizeClasses = {
    sm: "why-cta-button-sm",
    md: "why-cta-button-md",
    lg: "why-cta-button-lg"
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

export default function WhyChooseUsCTA() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="why-cta-container">
      <div className="why-cta-content">
        <div ref={ref}>
          {}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="why-cta-main"
          >
            <div className="why-cta-badge">
              <Star className="why-cta-badge-icon" />
              <span className="why-cta-badge-text">Especialistas en Ciberseguridad Ofensiva</span>
            </div>
            
            <h3 className="why-cta-title">
              ¿Preparado para evaluar su verdadera exposición?
            </h3>
            <p className="why-cta-description">
              Únase a las organizaciones que confían en nuestra metodología especializada basada en marcos internacionales para identificar vulnerabilidades reales.
            </p>
            
            <motion.div 
              className="why-cta-buttons-container"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="why-cta-buttons-container">
                <CTAButton href="/contacto" size="lg">
                  Solicitar evaluación especializada
                </CTAButton>
                <CTAButton href="/metodologia" variant="outline" size="lg">
                  Conocer metodología
                </CTAButton>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}