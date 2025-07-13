// src/components/sections/WhyChooseSection.tsx
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Award, 
  Clock, 
  Users, 
  Shield, 
  Target,
  CheckCircle,
  Zap,
  Lock
} from 'lucide-react';
import '../../styles/WhyChooseSection.css';

// Fondo con patrón geométrico
function GeometricPattern() {
  useEffect(() => {
    const container = document.querySelector('.geometric-pattern');
    if (!container) return;
    
    // Crear formas geométricas
    const createShape = (type: string, index: number) => {
      const shape = document.createElement('div');
      shape.className = `pattern-shape ${type}`;
      shape.style.left = Math.random() * 100 + '%';
      shape.style.top = Math.random() * 100 + '%';
      shape.style.animationDelay = (index * 1.5) + 's';
      shape.style.animationDuration = (Math.random() * 8 + 10) + 's';
      container.appendChild(shape);
    };
    
    // Crear elementos
    for (let i = 0; i < 6; i++) createShape('hexagon', i);
    for (let i = 0; i < 4; i++) createShape('triangle', i + 6);
    for (let i = 0; i < 8; i++) createShape('circle', i + 10);
    
  }, []);
  
  return <div className="geometric-pattern"></div>;
}

// Datos de ventajas competitivas
const advantages = [
  {
    number: '01',
    icon: <Award className="w-8 h-8" />,
    title: 'Experiencia Certificada',
    description: 'Equipo con certificaciones CRTO y más de 5 años de experiencia en auditorías de seguridad para empresas críticas.',
    highlight: '+100 auditorías exitosas'
  },
  {
    number: '02',
    icon: <Clock className="w-8 h-8" />,
    title: 'Metodología Probada',
    description: 'Proceso estructurado basado en MITRE ATT&CK y OWASP que garantiza cobertura completa de vectores de ataque.',
    highlight: '99.7% efectividad'
  },
  {
    number: '03',
    icon: <Shield className="w-8 h-8" />,
    title: 'Enfoque Empresarial',
    description: 'Entendemos el impacto en el negocio. Nuestros informes incluyen recomendaciones prácticas y priorizadas por riesgo.',
    highlight: 'ROI promedio 400%'
  },
  {
    number: '04',
    icon: <Users className="w-8 h-8" />,
    title: 'Soporte Continuo',
    description: 'No terminamos con el informe. Acompañamos la implementación y ofrecemos seguimiento trimestral sin coste adicional.',
    highlight: '24/7 disponibilidad'
  },
  {
    number: '05',
    icon: <Target className="w-8 h-8" />,
    title: 'Cumplimiento Normativo',
    description: 'Especialistas en ENS, NIS2 e ISO 27001. Garantizamos que su organización cumpla con todas las regulaciones aplicables.',
    highlight: '100% conformidad'
  },
  {
    number: '06',
    icon: <Zap className="w-8 h-8" />,
    title: 'Respuesta Rápida',
    description: 'Entendemos la urgencia. Iniciamos auditorías en máximo 48 horas y entregamos informes ejecutivos en tiempo récord.',
    highlight: 'Inicio en 48h'
  }
];

export default function WhyChooseSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="relative py-16 md:py-20 why-choose-background">
      {/* Patrón geométrico de fondo */}
      <GeometricPattern />
      
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="cert-badge mb-6">
            <Lock className="w-4 h-4 mr-2" />
            <span className="font-medium text-sm">Líderes en Ciberseguridad</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Por qué elegir <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-green-600">GreenLock</span>
          </h2>
          
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Combinamos expertise técnico, metodologías probadas y enfoque empresarial 
            para ofrecer el más alto nivel de protección para su organización.
          </p>
        </motion.div>

        {/* Grid de ventajas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {advantages.map((advantage, index) => (
            <motion.div
              key={advantage.number}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="advantage-card p-6 rounded-lg shadow-sm"
            >
              <div className="flex items-start space-x-4 mb-4">
                <div className="advantage-number">
                  {advantage.number}
                </div>
                <div className="text-[#00B267]">
                  {advantage.icon}
                </div>
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {advantage.title}
              </h3>
              
              <p className="text-gray-600 mb-4 leading-relaxed">
                {advantage.description}
              </p>
              
              <div className="inline-flex items-center text-sm font-semibold text-[#00B267]">
                <CheckCircle className="w-4 h-4 mr-2" />
                {advantage.highlight}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Estadística destacada */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="highlight-stat rounded-xl p-8 text-center max-w-4xl mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="text-3xl font-bold text-[#00B267] mb-2">5+</div>
              <div className="text-gray-700 font-medium">Años de experiencia</div>
              <div className="text-sm text-gray-600">en auditorías críticas</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#00B267] mb-2">100+</div>
              <div className="text-gray-700 font-medium">Empresas protegidas</div>
              <div className="text-sm text-gray-600">desde startups a Fortune 500</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#00B267] mb-2">0</div>
              <div className="text-gray-700 font-medium">Brechas post-auditoría</div>
              <div className="text-sm text-gray-600">en clientes que siguieron recomendaciones</div>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-gray-700 font-medium">
              "La tranquilidad de saber que su empresa está verdaderamente protegida no tiene precio."
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}