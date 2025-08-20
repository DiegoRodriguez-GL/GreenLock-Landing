import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Award, 
  Shield, 
  Zap,
  Target,
  CheckCircle,
  Code,
  Activity
} from 'lucide-react';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
}

interface FloatingElement {
  x: number;
  y: number;
  vx: number;
  vy: number;
  text: string;
  alpha: number;
  size: number;
}

function SubtleHackerBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    const nodes: Node[] = [];
    const floatingElements: FloatingElement[] = [];
    
    
    for (let i = 0; i < 8; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        size: Math.random() * 2 + 1
      });
    }
    
    
    for (let i = 0; i < 4; i++) {
      floatingElements.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.1,
        vy: (Math.random() - 0.5) * 0.1,
        text: ['01', '10', '0x', '{}', '[]', '<>'][Math.floor(Math.random() * 6)],
        alpha: 0.1,
        size: 12
      });
    }
    
    let animationFrameId: number;
    let time = 0;
    
    const draw = () => {
      
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#fefefe');
      gradient.addColorStop(0.5, '#f8fafc');
      gradient.addColorStop(1, '#f1f5f9');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      time += 0.005; 
      
      
      nodes.forEach((node, index) => {
        node.x += node.vx;
        node.y += node.vy;
        
        
        if (node.x <= 0 || node.x >= canvas.width) node.vx *= -1;
        if (node.y <= 0 || node.y >= canvas.height) node.vy *= -1;
        
        node.x = Math.max(0, Math.min(canvas.width, node.x));
        node.y = Math.max(0, Math.min(canvas.height, node.y));
        
        
        const pulse = 1 + Math.sin(time + index) * 0.1;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size * pulse, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(148, 163, 184, 0.15)`;
        ctx.fill();
      });
      
      
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 200) {
            const opacity = (1 - distance / 200) * 0.08;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(148, 163, 184, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      
      
      floatingElements.forEach((element) => {
        element.x += element.vx;
        element.y += element.vy;
        
        if (element.x > canvas.width + 20) element.x = -20;
        if (element.x < -20) element.x = canvas.width + 20;
        if (element.y > canvas.height + 20) element.y = -20;
        if (element.y < -20) element.y = canvas.height + 20;
        
        ctx.font = `${element.size}px monospace`;
        ctx.fillStyle = `rgba(148, 163, 184, ${element.alpha})`;
        ctx.fillText(element.text, element.x, element.y);
      });
      
      animationFrameId = requestAnimationFrame(draw);
    };
    
    draw();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0" />;
}


const advantages = [
  {
    id: 'expertise',
    icon: <Shield className="w-7 h-7" />,
    title: 'Expertise Real',
    subtitle: 'CRTO Certified',
    description: 'Equipo certificado con experiencia práctica en Red Team y detección de amenazas.',
    metric: '5+',
    metricLabel: 'Años exp.',
    features: ['Cert. CRTO', 'Exp. práctica']
  },
  {
    id: 'methodology',
    icon: <Target className="w-7 h-7" />,
    title: 'Metodología',
    subtitle: 'MITRE ATT&CK',
    description: 'Estándares MITRE ATT&CK y OWASP para cobertura completa de vectores.',
    metric: '100%',
    metricLabel: 'Expecializada',
    features: ['MITRE ATT&CK', 'OWASP Top 10']
  },
  {
    id: 'response',
    icon: <Zap className="w-7 h-7" />,
    title: 'Respuesta',
    subtitle: '24/7 Support',
    description: 'Soporte disponible 24 horas con respuesta garantizada en menos de 4 horas.',
    metric: '<4h',
    metricLabel: 'Respuesta',
    features: ['Soporte 24/7', 'Escalado auto']
  },
  {
    id: 'compliance',
    icon: <Award className="w-7 h-7" />,
    title: 'Cumplimiento',
    subtitle: 'ENS + NIS2',
    description: 'Cumplimiento completo de ENS, NIS2 y regulaciones europeas vigentes.',
    metric: 'NIS2 & ENS',
    metricLabel: '',
    features: ['ENS Alto', 'NIS2 compliant']
  }
];

export default function WhyChooseSection() {
  return (
    <section className="relative py-16 overflow-hidden">
      {}
      <SubtleHackerBackground />
      
      {}
      <div className="absolute inset-0 bg-white/60 z-10"></div>
      
      <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8">
        
        {}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            ¿Por qué elegir{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-green-600">
              GreenLock
            </span>
            ?
          </h2>
          
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            La diferencia está en los <strong className="text-gray-900">resultados</strong>
          </p>
        </motion.div>

        {}
        <div className="max-w-6xl mx-auto mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {advantages.map((advantage, index) => (
              <motion.div
                key={advantage.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                className="group"
              >
                <div 
                  className="relative bg-white rounded-lg p-6 h-96 border border-gray-200 shadow-sm transition-all duration-500 ease-out hover:shadow-lg hover:border-gray-300 hover:-translate-y-1"
                  style={{
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 178, 103, 0.1), 0 4px 6px -2px rgba(0, 178, 103, 0.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
                  }}
                >
                  
                  {}
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-green-500/0 via-green-500/0 to-green-500/0 group-hover:from-green-500/3 group-hover:via-green-500/1 group-hover:to-green-500/1 transition-all duration-700"></div>
                  
                  <div className="relative h-full flex flex-col">
                    {}
                    <div className="flex items-start justify-between mb-4">
                      {}
                      <div className="relative">
                        <div 
                          className="p-3 rounded-lg bg-gradient-to-br from-green-500 to-green-600 text-white shadow-sm transition-all duration-500"
                          style={{
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 178, 103, 0.4), 0 0 40px rgba(0, 178, 103, 0.2), 0 4px 6px -1px rgba(0, 0, 0, 0.1)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
                          }}
                        >
                          {advantage.icon}
                        </div>
                        {}
                        <div className="absolute inset-0 rounded-lg bg-green-500/20 blur-sm scale-110 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                      </div>
                      
                      <div className="px-3 py-1.5 rounded-md text-sm font-semibold bg-gray-100 text-gray-600 group-hover:bg-green-50 group-hover:text-green-700 transition-all duration-300">
                        {advantage.subtitle}
                      </div>
                    </div>
                    
                    {}
                    <div className="flex-1 flex flex-col">
                      <h3 className="font-bold text-lg text-gray-900 mb-3">
                        {advantage.title}
                      </h3>
                      
                      <p className="text-gray-600 leading-relaxed mb-6 flex-1">
                        {advantage.description}
                      </p>
                      
                      {}
                      <div className="mb-4">
                        <div className="flex items-end space-x-2">
                          <span className="text-2xl font-bold bg-gradient-to-r from-green-500 to-green-600 bg-clip-text text-transparent">
                            {advantage.metric}
                          </span>
                          <span className="text-gray-500 mb-1">
                            {advantage.metricLabel}
                          </span>
                        </div>
                      </div>
                      
                      {}
                      <div className="space-y-2">
                        {advantage.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center text-gray-600">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                            <span className="truncate">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {}
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-green-500/30 to-transparent group-hover:via-green-500/60 transition-all duration-500"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        {}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-4"
        >
          <div className="inline-flex items-center space-x-6 bg-white rounded-lg shadow-sm px-6 py-3 border border-gray-200">
            <div className="flex items-center space-x-2">
              <Activity className="w-4 h-4 text-green-500" />
              <span className="font-bold text-green-600">5+</span>
              <span className="text-gray-600 text-sm">años</span>
            </div>
            <div className="w-0.5 h-4 bg-gray-300"></div>
            <div className="flex items-center space-x-2">
              <Code className="w-4 h-4 text-green-500" />
              <span className="font-bold text-green-600">24/7</span>
              <span className="text-gray-600 text-sm">soporte</span>
            </div>
            <div className="w-0.5 h-4 bg-gray-300"></div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="font-bold text-green-600">NIS2</span>
              <span className="text-gray-600 text-sm">ready</span>
            </div>
          </div>
        </motion.div>
        
      </div>
    </section>
  );
}