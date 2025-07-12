// src/components/sections/HeroSection.tsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Play } from 'lucide-react';
import '../../styles/HeroSection.css';

const HeroSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="hero-section">
      {/* Efectos de fondo */}
      <div className="hero-glow" />
      
      <div className="hero-container">
        {/* Contenido de texto */}
        <motion.div 
          className="hero-content"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="hero-title">
            Protege tu empresa con{' '}
            <span className="gradient-text">auditorías de ciberseguridad</span>{' '}
            de élite
          </h1>
          
          <p className="hero-subtitle">
            Identificamos vulnerabilidades críticas antes que los atacantes. 
            Metodología probada, resultados garantizados y cumplimiento normativo 
            para empresas que no pueden permitirse fallos de seguridad.
          </p>
          
          <div className="hero-buttons">
            <a href="/contact" className="hero-btn hero-btn-primary">
              <Shield size={20} />
              Evaluación Gratuita
              <ArrowRight size={16} />
            </a>
            <a href="/services" className="hero-btn hero-btn-secondary">
              <Play size={16} />
              Ver Servicios
            </a>
          </div>
        </motion.div>

        {/* Área visual */}
        <motion.div 
          className="hero-visual"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="hero-visual-content">
            {/* Tu contenido visual aquí */}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
