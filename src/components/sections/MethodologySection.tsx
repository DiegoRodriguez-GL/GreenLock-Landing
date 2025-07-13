// src/components/sections/MethodologiesSection.tsx
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Shield, Award } from 'lucide-react';
import '../../styles/MethodologiesSection.css';

// Fondo de connected dots móviles
function TechBackground() {
  useEffect(() => {
    const container = document.querySelector('.connected-dots');
    if (!container) return;
    
    const dots: any[] = [];
    const lines: any[] = [];
    const maxDistance = 120; // Distancia máxima para conexión
    const numDots = 12;
    
    // Crear puntos móviles
    for (let i = 0; i < numDots; i++) {
      const dot = document.createElement('div');
      dot.className = 'moving-dot';
      container.appendChild(dot);
      
      dots.push({
        element: dot,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.8, // Velocidad horizontal
        vy: (Math.random() - 0.5) * 0.8, // Velocidad vertical
      });
    }
    
    // Función para actualizar posiciones y conexiones
    const animate = () => {
      const rect = container.getBoundingClientRect();
      
      // Mover puntos
      dots.forEach(dot => {
        dot.x += dot.vx;
        dot.y += dot.vy;
        
        // Rebote en bordes
        if (dot.x <= 0 || dot.x >= rect.width) dot.vx *= -1;
        if (dot.y <= 0 || dot.y >= rect.height) dot.vy *= -1;
        
        // Mantener dentro de límites
        dot.x = Math.max(0, Math.min(rect.width, dot.x));
        dot.y = Math.max(0, Math.min(rect.height, dot.y));
        
        // Actualizar posición visual
        dot.element.style.left = dot.x + 'px';
        dot.element.style.top = dot.y + 'px';
      });
      
      // Limpiar líneas existentes
      lines.forEach(line => line.element.remove());
      lines.length = 0;
      
      // Crear nuevas conexiones
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
            const opacity = 1 - (distance / maxDistance);
            
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
    
    // Limpiar al desmontar
    return () => {
      dots.forEach(dot => dot.element.remove());
      lines.forEach(line => line.element.remove());
    };
  }, []);
  
  return (
    <div className="tech-background">
      <div className="connected-dots"></div>
    </div>
  );
}

// Datos de metodologías específicas
const methodologies = [
  {
    id: 'owasp',
    name: 'OWASP',
    type: 'Estándar',
    description: 'Seguridad en aplicaciones web'
  },
  {
    id: 'mitre',
    name: 'MITRE ATT&CK',
    type: 'Framework',
    description: 'Tácticas y técnicas de adversarios'
  },
  {
    id: 'ens',
    name: 'ENS',
    type: 'Nacional',
    description: 'Esquema Nacional de Seguridad'
  },
  {
    id: 'nis2',
    name: 'NIS2',
    type: 'Directiva EU',
    description: 'Seguridad de redes y sistemas'
  },
  {
    id: 'iso27001',
    name: 'ISO 27001',
    type: 'Certificación',
    description: 'Gestión de seguridad'
  },
  {
    id: 'enisa',
    name: 'ENISA',
    type: 'Agencia EU',
    description: 'Ciberseguridad europea'
  }
];

// Componente de logo personalizado
function MethodologyLogo({ methodology }: { methodology: typeof methodologies[0] }) {
  return (
    <div className="logo-item group">
      <div className="flex flex-col items-center justify-center h-full">
        <div className="logo-text mb-1">
          {methodology.name}
        </div>
        <div className="text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {methodology.type}
        </div>
      </div>
    </div>
  );
}

export default function MethodologiesSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Triplicar metodologías para carrusel infinito con menos elementos
  const duplicatedMethodologies = [...methodologies, ...methodologies, ...methodologies];

  return (
    <section className="relative py-16 md:py-24 methodologies-background">
      {/* Fondo tech animado */}
      <TechBackground />
      
      <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Metodologías y <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-green-600">Estándares</span>
          </h2>
          
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Aplicamos las <strong className="text-gray-900">metodologías más reconocidas internacionalmente</strong> 
            para garantizar auditorías exhaustivas y resultados de máxima calidad.
          </p>
        </motion.div>

        {/* Carrusel de metodologías */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="logos-carousel relative mb-12"
        >
          <div className="logos-track">
            {duplicatedMethodologies.map((methodology, index) => (
              <MethodologyLogo 
                key={`${methodology.id}-${index}`} 
                methodology={methodology} 
              />
            ))}
          </div>
        </motion.div>

        {/* Footer con highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="flex items-center justify-center space-x-2 text-base text-gray-600">
              <Shield className="w-5 h-5 text-green-500" />
              <span><strong className="text-gray-900">100%</strong> Metodologías actualizadas</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-base text-gray-600">
              <Award className="w-5 h-5 text-green-500" />
              <span><strong className="text-gray-900">10+</strong> Frameworks aplicados</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-base text-gray-600">
              <Shield className="w-5 h-5 text-green-500" />
              <span><strong className="text-gray-900">EU & ES</strong> Cumplimiento normativo</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}