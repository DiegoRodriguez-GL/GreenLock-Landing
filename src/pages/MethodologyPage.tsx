// src/pages/MethodologyPage.tsx - CON NUEVO HERO INTEGRADO
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Logos from '../components/sections/MethodologySection';
import HeroMethodologySection from '../components/sections/HeroMethodologySection';
import MethodologiesRoadmap from '../components/sections/MethodologyRoadmapSection';
// Componente Section integrado
function MethodologySection({ id, className = '', children, bgColor = 'bg-transparent', paddingY = 'lg' }: {
  id?: string;
  className?: string;
  children: React.ReactNode;
  bgColor?: string;
  paddingY?: 'sm' | 'md' | 'lg' | 'xl' | 'none';
}) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const paddingYClasses = {
    none: '',
    sm: 'py-6 md:py-8',
    md: 'py-8 md:py-12',
    lg: 'py-12 md:py-16',
    xl: 'py-16 md:py-24',
  };

  return (
    <section
      id={id}
      className={`${bgColor} ${paddingYClasses[paddingY]} ${className}`}
      ref={ref}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </motion.div>
    </section>
  );
}

// Componente Button integrado
function MethodologyButton({ 
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
  const baseClasses = "font-medium rounded-md transition-all duration-300 inline-flex items-center justify-center";
  
  const variantClasses = {
    primary: "bg-[#00B267] text-white hover:bg-[#2F4F39] shadow-md shadow-[#00B267]/20 hover:shadow-[#00B267]/40",
    outline: "border border-[#00B267] text-[#00B267] hover:bg-[#00B267]/10 hover:border-[#2F4F39]"
  };
  
  const sizeClasses = {
    sm: "text-sm px-3 py-1.5",
    md: "px-4 py-2",
    lg: "text-lg px-6 py-3"
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

// Componente de fondo animado similar al Hero
function MethodologyBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    // Crear nodos
    const nodes: {x: number; y: number; vx: number; vy: number; radius: number; opacity: number}[] = [];
    const nodeCount = 25;
    
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.3 + 0.2
      });
    }
    
    let animationFrameId: number;
    
    const animate = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      
      // Dibujar conexiones
      for (let i = 0; i < nodes.length; i++) {
        const nodeA = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const nodeB = nodes[j];
          const dx = nodeB.x - nodeA.x;
          const dy = nodeB.y - nodeA.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 180) {
            ctx.beginPath();
            ctx.moveTo(nodeA.x, nodeA.y);
            ctx.lineTo(nodeB.x, nodeB.y);
            const opacity = 0.1 - (distance / 180) * 0.1;
            ctx.strokeStyle = `rgba(0, 178, 103, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      
      // Dibujar nodos
      for (const node of nodes) {
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 178, 103, ${node.opacity})`;
        ctx.fill();
        
        // Actualizar posición
        node.x += node.vx;
        node.y += node.vy;
        
        // Rebotar en bordes
        if (node.x < 0 || node.x > window.innerWidth) node.vx *= -1;
        if (node.y < 0 || node.y > window.innerHeight) node.vy *= -1;
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0" />;
}

export default function MethodologyPage() {
  const [activePhase, setActivePhase] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Controlar animación del hero
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || !inView) return;
    
    const interval = setInterval(() => {
      setActivePhase((prev) => (prev + 1) % phases.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [isAutoPlaying, inView]);

  const handlePhaseClick = (index: number) => {
    setActivePhase(index);
    setIsAutoPlaying(false);
    
    // Restart auto-play after 10 seconds
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <div className="min-h-screen bg-[#080f1d]">
      {/* Nuevo Hero Section */}
      <HeroMethodologySection isLoaded={isLoaded} />
      <Logos />
      <MethodologiesRoadmap isLoaded={isLoaded} />
{/* CTA Section Verde Simple */}
<MethodologySection bgColor="bg-gradient-to-br from-[#00B267] to-[#2F4F39]" paddingY="xl">
  <div className="text-center">
    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
      ¿Quiere conocer más sobre nuestro proceso?
    </h2>
    <p className="text-xl text-green-50 mb-8 max-w-3xl mx-auto font-light">
      Contacte con nuestro equipo para una explicación detallada de cómo aplicamos nuestra metodología a su organización.
    </p>
    
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="bg-white text-[#00B267] px-8 py-4 rounded-full font-bold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 inline-flex items-center gap-3"
    >
      <span>Solicitar consulta técnica</span>
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
      </svg>
    </motion.button>
  </div>
</MethodologySection>
    </div>
  );
}