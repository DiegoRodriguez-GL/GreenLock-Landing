
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  BookOpen, 
  Users, 
  Shield,
  ArrowRight,
  ExternalLink,
  Linkedin,
  FileText,
  Target
} from 'lucide-react';
import '../../styles/BlogContentSection.css';


function BlogButton({ 
  children, 
  href, 
  variant = 'primary', 
  size = 'md', 
  className = '',
  external = false
}: {
  children: React.ReactNode;
  href?: string;
  variant?: 'primary' | 'outline' | 'linkedin';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  external?: boolean;
}) {
  const baseClasses = "font-medium rounded-md transition-all duration-300 inline-flex items-center justify-center";
  
  const variantClasses = {
    primary: "bg-[#00B267] text-white hover:bg-[#2F4F39] shadow-md shadow-[#00B267]/20 hover:shadow-[#00B267]/40",
    outline: "border border-[#00B267] text-[#00B267] hover:bg-[#00B267]/10 hover:border-[#2F4F39]",
    linkedin: "bg-[#0077B5] text-white hover:bg-[#005582] shadow-md shadow-[#0077B5]/20 hover:shadow-[#0077B5]/40"
  };
  
  const sizeClasses = {
    sm: "text-sm px-3 py-1.5",
    md: "px-4 py-2",
    lg: "text-lg px-6 py-3"
  };
  
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;
  
  if (href) {
    if (href.startsWith('http') || external) {
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


const contentSections = [
  {
    id: 'blog',
    title: 'Blog GreenLock',
    subtitle: 'Investigación y Conocimiento',
    description: 'Accede a nuestras investigaciones técnicas, análisis de vulnerabilidades, y metodologías de seguridad desarrolladas por nuestro equipo de expertos.',
    icon: <BookOpen className="w-12 h-12" />,
    features: [
      'Análisis técnicos de vulnerabilidades',
      'Metodologías de pentesting',
      'Casos de estudio reales',
      'Tendencias en ciberseguridad'
    ],
    cta: 'Explorar Blog',
    link: 'https://blog.greenlock.tech',
    color: 'from-[#00B267] to-[#2F4F39]',
    bgColor: 'bg-[#00B267]'
  },
  {
    id: 'linkedin',
    title: 'LinkedIn GreenLock',
    subtitle: 'Investigación y Comunidad',
    description: 'Síguenos en LinkedIn para contenido técnico, casos reales de nuestro equipo, conceptos de ciberseguridad y análisis de la industria.',
    icon: <Linkedin className="w-12 h-12" />,
    features: [
      'Casos reales de nuestro equipo',
      'Explicación de conceptos técnicos',
      'Terminología de ciberseguridad',
      'Análisis de amenazas actuales'
    ],
    cta: 'Seguir en LinkedIn',
    link: 'https://www.linkedin.com/company/greenlock-cybersecurity',
    color: 'from-[#0077B5] to-[#005582]',
    bgColor: 'bg-[#0077B5]'
  }
];


function ContentCard({ content, index, inView }: { content: typeof contentSections[0]; index: number; inView: boolean }) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, delay: index * 0.3 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="blog-content-card"
    >
      {}
      <div className={`blog-content-glow bg-gradient-to-r ${content.color}`}></div>
      
      {}
      <div className="blog-content-card-inner">
        {}
        <div className={`blog-content-header ${content.id}`}></div>
        
        {}
        <div className="blog-content-body">
          {}
          <div className="blog-content-icon-section">
            <div className={`blog-content-icon ${content.id} ${isHovered ? 'hovered' : ''}`}>
              {content.icon}
            </div>
            <div className={`blog-content-badge ${content.id}`}>
              {content.id === 'blog' ? 'Blog' : 'LinkedIn'}
            </div>
          </div>
          
          <h3 className="blog-content-title">{content.title}</h3>
          <p className="blog-content-subtitle">{content.subtitle}</p>
          <p className="blog-content-description">{content.description}</p>
          
          {}
          <div className="blog-content-features">
            <h4 className="blog-content-features-title">
              Contenido destacado:
            </h4>
            <ul className="blog-content-features-list">
              {content.features.map((feature, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                  transition={{ duration: 0.4, delay: index * 0.3 + idx * 0.1 }}
                  className="blog-content-feature-item"
                >
                  <div className={`blog-content-feature-dot ${content.id}`}></div>
                  {feature}
                </motion.li>
              ))}
            </ul>
          </div>
          
          {}
          <BlogButton 
            href={content.link}
            variant={content.id === 'linkedin' ? 'linkedin' : 'primary'}
            size="lg"
            external={true}
            className="blog-cta-button group"
          >
            <span>{content.cta}</span>
            <ExternalLink className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
          </BlogButton>
        </div>
        
        {}
        <motion.div
          className={`blog-content-hover-indicator ${content.id}`}
          initial={{ width: 0 }}
          animate={{ width: isHovered ? '100%' : '0%' }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  );
}


function ResearchStats({ inView }: { inView: boolean }) {
  const stats = [
    { number: '15+', label: 'Artículos Técnicos', icon: <FileText className="w-6 h-6" /> },
    { number: '3', label: 'Casos de Estudio', icon: <Target className="w-6 h-6" /> },
    { number: '4', label: 'CVEs Descubiertos', icon: <Shield className="w-6 h-6" /> },
    { number: '250+', label: 'Seguidores LinkedIn', icon: <Users className="w-6 h-6" /> }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.8, delay: 0.8 }}
      className="blog-stats-container"
    >
      <div className="blog-stats-header">
        <h3 className="blog-stats-title">Nuestro Impacto en la Comunidad</h3>
        <p className="blog-stats-subtitle">Compartiendo conocimiento y fortaleciendo la ciberseguridad</p>
      </div>
      
      <div className="blog-stats-grid">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
            className="blog-stats-item"
          >
            <div className="blog-stats-icon">
              {stat.icon}
            </div>
            <div className="blog-stats-number">{stat.number}</div>
            <div className="blog-stats-label">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

const BlogContentSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="blog-main-container">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative" ref={ref}>
          {}
          <div className="blog-content-grid">
            {contentSections.map((content, index) => (
              <ContentCard
                key={content.id}
                content={content}
                index={index}
                inView={inView}
              />
            ))}
          </div>
          
          {}
          <ResearchStats inView={inView} />
          
          {}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="blog-final-cta"
          >
            <h3 className="blog-final-cta-title">
              Mantente al día con la ciberseguridad
            </h3>
            <p className="blog-final-cta-description">
              Síguenos para acceder a contenido técnico, casos reales y análisis 
              de las últimas amenazas en ciberseguridad.
            </p>
            
            <div className="blog-final-cta-buttons">
  <BlogButton href="https://blog.greenlock.tech" className="blog-cta-button group">
    <span>Visitar nuestro Blog</span>
    <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
  </BlogButton>

  <BlogButton href="https://www.linkedin.com/company/greenlock-cybersecurity" variant="linkedin" className="blog-cta-button group">
    <Linkedin className="w-5 h-5 mr-2" />
    Seguir en LinkedIn
  </BlogButton>
</div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BlogContentSection;