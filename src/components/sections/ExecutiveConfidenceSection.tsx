// src/components/sections/ExecutiveConfidenceSection.tsx - VERSIÓN EJECUTIVA MINIMALISTA
import { useRef, useEffect } from 'react';
import { Shield, TrendingUp, Users } from 'lucide-react';
import '../../styles/ExecutiveConfidenceSection.css';

interface ExecutiveConfidenceSectionProps {
  isLoaded: boolean;
}

const ExecutiveConfidenceSection = ({ isLoaded }: ExecutiveConfidenceSectionProps) => {
  return (
    <section className="executive-confidence-container">
      <div className="executive-confidence-content">
        {/* Badge ejecutivo */}
        <div 
          className="executive-badge"
          style={{
            opacity: isLoaded ? 1 : 0,
            transform: isLoaded ? 'translateY(0)' : 'translateY(10px)',
            transition: 'all 0.6s ease-out 0.1s'
          }}
        >
          <span>PARA DIRECTIVOS</span>
        </div>

        {/* Título principal impactante */}
        <div className="executive-confidence-header">
          <h2 
            className="executive-confidence-title"
            style={{
              opacity: isLoaded ? 1 : 0,
              transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.6s ease-out 0.2s'
            }}
          >
            Liderazgo tranquilo, <span className="executive-confidence-accent">ciberseguridad total</span>
          </h2>
        </div>

        {/* Mensaje ejecutivo directo */}
        <div className="executive-confidence-message">
          <p 
            className="executive-confidence-text"
            style={{
              opacity: isLoaded ? 1 : 0,
              transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.6s ease-out 0.4s'
            }}
          >
            <strong>Usted se enfoca en hacer crecer el negocio.</strong> Nosotros nos encargamos de que su infraestructura tecnológica sea inquebrantable, escalable y proteja tanto a sus clientes como a sus stakeholders.
          </p>
        </div>

        {/* Pilares ejecutivos */}
        <div className="executive-confidence-pillars">
          <div 
            className="executive-confidence-pillar"
            style={{
              opacity: isLoaded ? 1 : 0,
              transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.6s ease-out 0.6s'
            }}
          >
            <div className="executive-confidence-pillar-icon">
              <Shield size={24} />
            </div>
            <div className="executive-pillar-content">
              <span className="executive-confidence-pillar-title">Protección Total</span>
              <span className="executive-confidence-pillar-subtitle">24/7 • Sin interrupciones</span>
            </div>
          </div>

          <div 
            className="executive-confidence-pillar"
            style={{
              opacity: isLoaded ? 1 : 0,
              transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.6s ease-out 0.8s'
            }}
          >
            <div className="executive-confidence-pillar-icon">
              <TrendingUp size={24} />
            </div>
            <div className="executive-pillar-content">
              <span className="executive-confidence-pillar-title">Escalabilidad</span>
              <span className="executive-confidence-pillar-subtitle">Crece con su empresa</span>
            </div>
          </div>

          <div 
            className="executive-confidence-pillar"
            style={{
              opacity: isLoaded ? 1 : 0,
              transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.6s ease-out 1s'
            }}
          >
            <div className="executive-confidence-pillar-icon">
              <Users size={24} />
            </div>
            <div className="executive-pillar-content">
              <span className="executive-confidence-pillar-title">Confianza</span>
              <span className="executive-confidence-pillar-subtitle">Clientes • Socios • Board</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExecutiveConfidenceSection;