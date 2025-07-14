// src/components/sections/IndividualServicesSection.tsx
import { useRef, useEffect, useState } from 'react';
import { Shield, Globe, Smartphone, Code, Users, Lock, ArrowRight, CheckCircle, AlertTriangle } from 'lucide-react';
import '../../styles/IndividualServicesSection.css';

// Fondo tecnológico para servicios individuales
const TechBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      ctx.scale(dpr, dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas();
    });

    resizeObserver.observe(canvas.parentElement!);
    resizeCanvas();

    const nodes: any[] = [];
    const nodeCount = 25;
    const canvasWidth = () => canvas.width / (window.devicePixelRatio || 1);
    const canvasHeight = () => canvas.height / (window.devicePixelRatio || 1);

    const initNodes = () => {
      nodes.length = 0;
      for (let i = 0; i < nodeCount; i++) {
        nodes.push({
          x: Math.random() * canvasWidth(),
          y: Math.random() * canvasHeight(),
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2,
          radius: Math.random() * 1.5 + 0.5,
          opacity: Math.random() * 0.3 + 0.2
        });
      }
    };

    initNodes();

    let animationFrameId: number;
    let time = 0;

    const animate = () => {
      const width = canvasWidth();
      const height = canvasHeight();

      ctx.fillStyle = 'transparent';
      ctx.fillRect(0, 0, width, height);

      time += 0.008;

      ctx.lineWidth = 0.4;

      // Conexiones entre nodos
      for (let i = 0; i < nodes.length; i++) {
        const nodeA = nodes[i];

        for (let j = i + 1; j < nodes.length; j++) {
          const nodeB = nodes[j];
          const dx = nodeB.x - nodeA.x;
          const dy = nodeB.y - nodeA.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            const opacity = (100 - distance) / 100 * 0.15;
            ctx.strokeStyle = `rgba(0, 178, 103, ${opacity})`;
            ctx.beginPath();
            ctx.moveTo(nodeA.x, nodeA.y);
            ctx.lineTo(nodeB.x, nodeB.y);
            ctx.stroke();
          }
        }
      }

      // Nodos pulsantes
      for (const node of nodes) {
        const pulse = Math.sin(time * 1.5 + node.x * 0.01) * 0.3 + 0.7;

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * pulse, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 178, 103, ${node.opacity * pulse})`;
        ctx.fill();

        node.x += node.vx;
        node.y += node.vy;

        if (node.x < -10) node.x = width + 10;
        else if (node.x > width + 10) node.x = -10;

        if (node.y < -10) node.y = height + 10;
        else if (node.y > height + 10) node.y = -10;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="individual-services-tech-background"
    />
  );
};

const IndividualServicesSection = () => {
  const [activeService, setActiveService] = useState('red-team');

  const services = [
    {
      id: 'red-team',
      title: 'Red Team',
      icon: <Shield className="w-6 h-6" />,
      activeIcon: <Shield className="w-6 h-6 text-white" />,
      description: 'Simulación de ataques reales para evaluar infraestructura ante adversarios avanzados.',
      valueProposition: 'Sin este servicio, sus sistemas quedan expuestos a ataques reales sin haber podido identificar antes las vulnerabilidades críticas.',
      features: [
        'Simulación de amenazas APT',
        'Pruebas de evasión de defensas',
        'Ataques dirigidos a objetivos específicos',
        'Evaluación completa de respuesta a incidentes'
      ],
      benefits: [
        'Reducción de riesgo de brechas hasta un 60%',
        'Validación práctica de defensas existentes',
        'Identificación de rutas de ataque no evidentes',
        'Mejora de tiempos de respuesta ante incidentes'
      ]
    },
    {
      id: 'web-pentesting',
      title: 'Pentesting Web',
      icon: <Globe className="w-6 h-6" />,
      activeIcon: <Globe className="w-6 h-6 text-white" />,
      description: 'Pruebas de penetración en aplicaciones web para identificar vulnerabilidades antes que los atacantes.',
      valueProposition: 'Sin auditar sus aplicaciones web, está exponiendo datos sensibles de clientes a ataques como inyecciones SQL, XSS y robo de credenciales.',
      features: [
        'Detección de vulnerabilidades OWASP Top 10',
        'Análisis de autenticación y autorización',
        'Pruebas de inyección y XSS',
        'Evaluación de configuraciones seguras'
      ],
      benefits: [
        'Protección de datos sensibles de clientes',
        'Mantenimiento de la confianza de marca',
        'Reducción de costos por brechas',
        'Cumplimiento con regulaciones de datos'
      ]
    },
    {
      id: 'mobile-pentesting',
      title: 'Pentesting Mobile',
      icon: <Smartphone className="w-6 h-6" />,
      activeIcon: <Smartphone className="w-6 h-6 text-white" />,
      description: 'Análisis de seguridad en aplicaciones móviles para iOS y Android con enfoque en protección de datos.',
      valueProposition: 'Sin este servicio, su app móvil podría estar filtrando datos personales de usuarios o permitiendo accesos no autorizados por fallos de seguridad.',
      features: [
        'Análisis de código y protecciones anti-tampering',
        'Evaluación de almacenamiento de datos sensibles',
        'Pruebas de comunicación segura',
        'Análisis de autenticación y sesiones'
      ],
      benefits: [
        'Mayor confianza de usuarios en su app',
        'Protección contra manipulación de la aplicación',
        'Reducción de riesgos de fraude',
        'Conformidad con requisitos de tiendas'
      ]
    },
    {
      id: 'code-review',
      title: 'Revisión de Código',
      icon: <Code className="w-6 h-6" />,
      activeIcon: <Code className="w-6 h-6 text-white" />,
      description: 'Análisis manual y automatizado de código fuente para identificar vulnerabilidades en etapas tempranas.',
      valueProposition: 'Sin revisar su código, las vulnerabilidades permanecen ocultas hasta producción, donde corregirlas cuesta hasta 60 veces más y expone a sus usuarios.',
      features: [
        'Detección temprana de vulnerabilidades críticas',
        'Análisis de prácticas seguras de codificación',
        'Revisión manual por expertos',
        'Integración con CI/CD para evaluación continua'
      ],
      benefits: [
        'Reducción significativa de costos de remediación',
        'Aceleración de ciclos de desarrollo seguros',
        'Mejora de prácticas de codificación segura',
        'Detección de vulnerabilidades antes de ser explotables'
      ]
    }
  ];

  const currentService = services.find(s => s.id === activeService) || services[0];

  return (
    <section className="individual-services-container">
      <TechBackground />
      <div className="individual-services-overlay" />
      
      <div className="individual-services-content">
        <div className="individual-services-header">
          <h2 className="individual-services-title">
            <span className="individual-services-title-gradient">Servicios</span> Especializados
          </h2>
          <p className="individual-services-subtitle">
            Soluciones técnicas avanzadas para cada necesidad de ciberseguridad
          </p>
        </div>

        {/* Tabs de servicios */}
        <div className="individual-services-tabs">
          {services.map((service) => (
            <button
              key={service.id}
              onClick={() => setActiveService(service.id)}
              className={`individual-services-tab ${
                activeService === service.id ? 'active' : ''
              }`}
            >
              <span className="individual-services-tab-icon">
                {activeService === service.id ? service.activeIcon : service.icon}
              </span>
              <span className="individual-services-tab-text">{service.title}</span>
              {activeService === service.id && (
                <ArrowRight className="individual-services-tab-arrow" />
              )}
            </button>
          ))}
        </div>

        {/* Contenido del servicio activo */}
        <div className="individual-services-content-card">
          <div className="individual-services-card-background" />
          
          <div className="individual-services-card-grid">
            {/* Columna izquierda - Información principal */}
            <div className="individual-services-info-column">
              <div className="individual-services-service-header">
                <h3 className="individual-services-service-title">
                  <div className="individual-services-service-icon">
                    {currentService.activeIcon}
                  </div>
                  <span className="individual-services-service-name">
                    {currentService.title}
                  </span>
                </h3>
                <p className="individual-services-service-desc">
                  {currentService.description}
                </p>
              </div>
              
              <div className="individual-services-risk-warning">
                <h4 className="individual-services-risk-title">
                  <AlertTriangle className="w-5 h-5" /> Riesgo si no actúa
                </h4>
                <p className="individual-services-risk-text">{currentService.valueProposition}</p>
              </div>
              
              <div className="individual-services-cta-wrapper">
                <button className="individual-services-cta-button">
                  ¡Contratar ahora! <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            {/* Columna derecha - Características y beneficios */}
            <div className="individual-services-details-column">
              {/* Panel de características */}
              <div className="individual-services-panel">
                <div className="individual-services-panel-header">
                  <CheckCircle className="w-5 h-5 text-[#00B267]" />
                  <h4 className="individual-services-panel-title">
                    ¿Qué <span className="individual-services-panel-highlight">evaluamos</span>?
                  </h4>
                </div>
                <ul className="individual-services-feature-list">
                  {currentService.features.map((feature, index) => (
                    <li key={index} className="individual-services-feature-item">
                      <div className="individual-services-feature-check">
                        <span>✓</span>
                      </div>
                      <span className="individual-services-feature-text">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Panel de beneficios */}
              <div className="individual-services-panel">
                <div className="individual-services-panel-header">
                  <Shield className="w-5 h-5 text-[#00B267]" />
                  <h4 className="individual-services-panel-title">
                    <span className="individual-services-panel-highlight">Beneficios</span> para su empresa
                  </h4>
                </div>
                <ul className="individual-services-benefit-list">
                  {currentService.benefits.map((benefit, index) => (
                    <li key={index} className="individual-services-benefit-item">
                      <div className="individual-services-benefit-number">
                        {index + 1}
                      </div>
                      <span className="individual-services-benefit-text">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Final */}
        <div className="individual-services-final-cta">
          <h3 className="individual-services-final-cta-title">
            ¿Necesita una evaluación personalizada?
          </h3>
          <p className="individual-services-final-cta-text">
            Contacte con nuestro equipo para discutir sus necesidades específicas de ciberseguridad.
          </p>
          <button className="individual-services-final-cta-button">
            Solicitar consulta gratuita
          </button>
        </div>
      </div>
    </section>
  );
};

export default IndividualServicesSection;