
import { useState } from 'react';
import { Shield, Globe, Smartphone, Code, Users, Lock, ArrowRight, CheckCircle, AlertTriangle, Brain, Search } from 'lucide-react';
import '../../styles/IndividualServicesSection.css';


const MinimalBackground = () => {
  return (
    <div className="individual-services-minimal-bg">
      {}
      <div className="individual-services-connected-dots">
        <div className="individual-services-dot individual-services-dot-1"></div>
        <div className="individual-services-dot individual-services-dot-2"></div>
        <div className="individual-services-dot individual-services-dot-3"></div>
        <div className="individual-services-dot individual-services-dot-4"></div>
        <div className="individual-services-dot individual-services-dot-5"></div>
        <div className="individual-services-dot individual-services-dot-6"></div>
        <div className="individual-services-dot individual-services-dot-7"></div>
        <div className="individual-services-dot individual-services-dot-8"></div>
        
        <div className="individual-services-line individual-services-line-1"></div>
        <div className="individual-services-line individual-services-line-2"></div>
        <div className="individual-services-line individual-services-line-3"></div>
        <div className="individual-services-line individual-services-line-4"></div>
        <div className="individual-services-line individual-services-line-5"></div>
        <div className="individual-services-line individual-services-line-6"></div>
      </div>
      
      <div className="individual-services-bg-lines">
        <div className="individual-services-bg-line individual-services-bg-line-1"></div>
        <div className="individual-services-bg-line individual-services-bg-line-2"></div>
        <div className="individual-services-bg-line individual-services-bg-line-3"></div>
      </div>
    </div>
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
    },
    {
      id: 'ai-pentesting',
      title: 'Pentesting IA',
      icon: <Brain className="w-6 h-6" />,
      activeIcon: <Brain className="w-6 h-6 text-white" />,
      description: 'Evaluación especializada de sistemas de inteligencia artificial siguiendo estándares internacionales de seguridad.',
      valueProposition: 'Sin evaluar su IA, está expuesto a ataques de envenenamiento de datos, sesgos maliciosos y manipulación de modelos que pueden comprometer toda su operación.',
      features: [
        'Evaluación de modelos de machine learning',
        'Análisis de datasets y pipelines de entrenamiento',
        'Pruebas de adversarial attacks y robustez',
        'Cumplimiento con estándares NIST AI RMF'
      ],
      benefits: [
        'Protección contra ataques a modelos de IA',
        'Validación de confiabilidad y precisión',
        'Cumplimiento con regulaciones emergentes de IA',
        'Reducción de riesgos de sesgo y discriminación'
      ]
    },
    {
      id: 'perimeter-assessment',
      title: 'Evaluación Perimetral',
      icon: <Search className="w-6 h-6" />,
      activeIcon: <Search className="w-6 h-6 text-white" />,
      description: 'Análisis exhaustivo del perímetro externo de su empresa para identificar puntos de acceso no autorizados.',
      valueProposition: 'Sin evaluar su perímetro externo, atacantes pueden encontrar servicios expuestos, credenciales filtradas o configuraciones débiles para acceder a su red interna.',
      features: [
        'Reconocimiento y mapeo de infraestructura externa',
        'Identificación de servicios y puertos expuestos',
        'Búsqueda de credenciales en fuentes abiertas',
        'Análisis de configuraciones de DNS y subdominios'
      ],
      benefits: [
        'Visibilidad completa de su superficie de ataque',
        'Identificación de activos desconocidos',
        'Prevención de accesos no autorizados',
        'Reducción de la huella digital vulnerable'
      ]
    }
  ];

  const currentService = services.find(s => s.id === activeService) || services[0];

  return (
    <section className="individual-services-container">
      <MinimalBackground />
      
      <div className="individual-services-content">
        <div className="individual-services-header">
          <h2 className="individual-services-title">
            <span className="individual-services-title-gradient">Servicios</span> Especializados
          </h2>
          <p className="individual-services-subtitle">
            Soluciones técnicas avanzadas para cada necesidad de ciberseguridad
          </p>
        </div>

        {}
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

        {}
        <div className="individual-services-content-card">
          <div className="individual-services-card-background" />
          
          <div className="individual-services-card-grid">
            {}
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
                <a href="/contacto" className="individual-services-cta-button">
                  Contactar ahora <ArrowRight className="w-5 h-5" />
                </a>
              </div>
            </div>
            
            {}
            <div className="individual-services-details-column">
              {}
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
              
              {}
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

        {}
        <div className="individual-services-final-cta">
          <div className="individual-services-final-cta-content">
            <h3 className="individual-services-final-cta-title">
              ¿Necesita una evaluación personalizada?
            </h3>
            <p className="individual-services-final-cta-text">
              Contacte con nuestro equipo para discutir sus necesidades específicas de ciberseguridad.
            </p>
            <a
              href="mailto:info@greenlock.tech?subject=Solicitud%20evaluacion%20personalizada%20-%20GreenLock%20OSI&body=Hola%2C%20me%20gustaria%20solicitar%20una%20evaluacion%20personalizada%20de%20ciberseguridad.%20Por%20favor%2C%20contactadme%20para%20concretar%20una%20llamada.%0A%0AEmpresa%3A%20%0ANombre%3A%20%0ATelefono%3A%20%0APreferencia%20de%20horario%3A%20%0A%0AGracias."
              className="individual-services-final-cta-button"
            >
              Solicitar consulta gratuita
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndividualServicesSection;