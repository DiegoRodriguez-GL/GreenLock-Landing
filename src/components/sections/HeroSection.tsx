// src/components/sections/HeroSection.tsx - VERSIÓN CON CSS ESPECÍFICO
import { useEffect, useState, useRef } from 'react';
import { ArrowRight, Shield, Scale, Monitor } from 'lucide-react';
import '../../styles/HeroSection.css'; // Importar estilos específicos

// Componente de fondo tecnológico minimalista en movimiento
function TechBackground() {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Configuración del canvas responsive
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      
      // Usar el tamaño del elemento padre
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      
      ctx.scale(dpr, dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    
    // Configurar el observer para redimensionar
    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas();
    });
    
    resizeObserver.observe(canvas.parentElement);
    resizeCanvas();
    
    // Crear nodos para el efecto tecnológico minimalista
    const nodes = [];
    const nodeCount = 30;
    const canvasWidth = () => canvas.width / (window.devicePixelRatio || 1);
    const canvasHeight = () => canvas.height / (window.devicePixelRatio || 1);
    
    const initNodes = () => {
      nodes.length = 0;
      for (let i = 0; i < nodeCount; i++) {
        nodes.push({
          x: Math.random() * canvasWidth(),
          y: Math.random() * canvasHeight(),
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          radius: Math.random() * 1.5 + 0.5,
          opacity: Math.random() * 0.4 + 0.3
        });
      }
    };
    
    initNodes();
    
    // Variables de animación
    let animationFrameId;
    let time = 0;
    
    const animate = () => {
      const width = canvasWidth();
      const height = canvasHeight();
      
      // Limpiar canvas
      ctx.fillStyle = '#080f1d';
      ctx.fillRect(0, 0, width, height);
      
      time += 0.01;
      
      // Dibujar líneas de conexión minimalistas
      ctx.strokeStyle = 'rgba(23, 153, 63, 0.15)';
      ctx.lineWidth = 0.5;
      
      for (let i = 0; i < nodes.length; i++) {
        const nodeA = nodes[i];
        
        for (let j = i + 1; j < nodes.length; j++) {
          const nodeB = nodes[j];
          const dx = nodeB.x - nodeA.x;
          const dy = nodeB.y - nodeA.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 120) {
            const opacity = (120 - distance) / 120 * 0.2;
            ctx.strokeStyle = `rgba(23, 153, 63, ${opacity})`;
            ctx.beginPath();
            ctx.moveTo(nodeA.x, nodeA.y);
            ctx.lineTo(nodeB.x, nodeB.y);
            ctx.stroke();
          }
        }
      }
      
      // Dibujar nodos
      for (const node of nodes) {
        // Efecto de pulso sutil
        const pulse = Math.sin(time * 2 + node.x * 0.01) * 0.3 + 0.7;
        
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * pulse, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(23, 153, 63, ${node.opacity * pulse})`;
        ctx.fill();
        
        // Actualizar posición
        node.x += node.vx;
        node.y += node.vy;
        
        // Rebote en bordes con wrap around mejorado
        if (node.x < -10) {
          node.x = width + 10;
        } else if (node.x > width + 10) {
          node.x = -10;
        }
        
        if (node.y < -10) {
          node.y = height + 10;
        } else if (node.y > height + 10) {
          node.y = -10;
        }
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    
    // Cleanup
    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="hero-background-canvas"
    />
  );
}

// Componente para el efecto de typewriter rotativo
function RotatingTypewriter() {
  const phrases = [
    "Protegemos su empresa contra amenazas avanzadas",
    "Detectamos vulnerabilidades antes que los atacantes",
    "Evaluamos su seguridad con técnicas reales"
  ];
  
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  
  useEffect(() => {
    // Iniciar con la primera frase
    if (!displayText && !isDeleting && currentPhraseIndex === 0) {
      setDisplayText(phrases[0][0]);
    }
    
    const currentPhrase = phrases[currentPhraseIndex];
    
    // Velocidad de escritura y borrado
    const typingSpeed = 70;
    const deletingSpeed = 30;
    const pauseBeforeDelete = 1800;
    const pauseBeforeNextPhrase = 500;
    
    let timeout;
    
    if (!isDeleting && displayText === currentPhrase) {
      // Texto completo, esperar antes de empezar a borrar
      setIsComplete(true);
      timeout = setTimeout(() => {
        setIsDeleting(true);
        setIsComplete(false);
      }, pauseBeforeDelete);
    } 
    else if (isDeleting && displayText === '') {
      // Terminó de borrar, pasar a la siguiente frase
      setIsDeleting(false);
      timeout = setTimeout(() => {
        const nextIndex = (currentPhraseIndex + 1) % phrases.length;
        setCurrentPhraseIndex(nextIndex);
        // Iniciar inmediatamente con la primera letra de la siguiente frase
        setDisplayText(phrases[nextIndex][0]);
      }, pauseBeforeNextPhrase);
    } 
    else {
      // Manejo de escritura y borrado
      timeout = setTimeout(() => {
        if (isDeleting) {
          setDisplayText(prev => prev.slice(0, -1));
        } else {
          // Solo agregar caracteres si no hemos llegado al final
          if (displayText.length < currentPhrase.length) {
            setDisplayText(prev => currentPhrase.slice(0, prev.length + 1));
          }
        }
      }, isDeleting ? deletingSpeed : typingSpeed);
    }
    
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentPhraseIndex, phrases]);
  
  return (
    <span className="hero-typewriter-text">
      {displayText}
      <span className={`hero-typewriter-cursor ${isComplete ? 'hero-element-hidden' : 'hero-element-visible'}`}></span>
    </span>
  );
}

// Componente para el terminal de código
function CodeTerminal() {
  const [lines, setLines] = useState([]);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanStatus, setScanStatus] = useState('initializing');
  const terminalRef = useRef(null);
  
  useEffect(() => {
    // Líneas de código para la animación
    const codeLines = [
      { text: "$ ./security_scan --target=client.domain", delay: 800, type: "command" },
      { text: "[+] Iniciando escaneo de seguridad", delay: 800, type: "output" },
      { text: "[+] Analizando perímetro de red...", delay: 1000, type: "output" },
      { text: "[*] Puertos: 22, 80, 443, 3306", delay: 800, type: "info" },
      { text: "[+] Validando configuraciones...", delay: 1000, type: "output" },
      { text: "[!] VULNERABILIDAD: OpenSSL desactualizado", delay: 1200, type: "warning" },
      { text: "[!] VULNERABILIDAD: CSRF en forms", delay: 800, type: "warning" },
      { text: "[+] Generando informe...", delay: 1200, type: "output" },
      { text: "[*] 3 vulnerabilidades críticas", delay: 800, type: "info" },
      { text: "[*] 7 vulnerabilidades moderadas", delay: 800, type: "info" },
      { text: "[✓] Informe completo generado", delay: 1000, type: "success" },
      { text: "$ ./patch_vulnerabilities.sh", delay: 1200, type: "command" },
      { text: "[+] Aplicando parches...", delay: 800, type: "output" },
      { text: "[✓] Sistema asegurado", delay: 1200, type: "success" }
    ];
    
    let currentIndex = 0;
    let linesDisplayed = [];
    
    const typeNextLine = () => {
      if (currentIndex < codeLines.length) {
        const line = codeLines[currentIndex];
        linesDisplayed.push(line);
        setLines([...linesDisplayed]);
        
        // Actualizar progreso de escaneo
        const progress = (currentIndex / codeLines.length) * 100;
        setScanProgress(progress);
        
        // Actualizar estado del escaneo
        if (currentIndex < 3) {
          setScanStatus('initializing');
        } else if (currentIndex < 6) {
          setScanStatus('scanning');
        } else if (currentIndex < 10) {
          setScanStatus('analyzing');
        } else {
          setScanStatus('complete');
        }
        
        currentIndex++;
        
        setTimeout(typeNextLine, line.delay);
      } else {
        // Reiniciar la animación después de completar todas las líneas
        setTimeout(() => {
          setLines([]);
          currentIndex = 0;
          linesDisplayed = [];
          setScanProgress(0);
          setScanStatus('initializing');
          setTimeout(typeNextLine, 1000);
        }, 3000);
      }
    };
    
    typeNextLine();
    
    return () => {
      // Limpieza
    };
  }, []);
  
  useEffect(() => {
    // Auto-scroll al último mensaje
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines]);
  
  // Determinar color de la barra de progreso según el estado
  const progressBarClass = {
    initializing: 'hero-terminal-progress-bar--blue',
    scanning: 'hero-terminal-progress-bar--yellow',
    analyzing: 'hero-terminal-progress-bar--orange',
    complete: 'hero-terminal-progress-bar--green'
  }[scanStatus];
  
  return (
    <div className="hero-terminal">
      {/* Header del terminal */}
      <div className="hero-terminal-header">
        <div className="hero-terminal-dots">
          <div className="hero-terminal-dot hero-terminal-dot--red"></div>
          <div className="hero-terminal-dot hero-terminal-dot--yellow"></div>
          <div className="hero-terminal-dot hero-terminal-dot--green"></div>
        </div>
        <div className="hero-terminal-title">scan.sh</div>
      </div>
      
      {/* Barra de progreso */}
      <div className="hero-terminal-progress">
        <div 
          className={`hero-terminal-progress-bar ${progressBarClass}`}
          style={{ width: `${scanProgress}%` }}
        ></div>
      </div>
      
      {/* Contenido del terminal */}
      <div ref={terminalRef} className="hero-terminal-content">
        {lines.map((line, index) => (
          <div key={index} className={`hero-terminal-line hero-terminal-line--${line.type}`}>
            {line.type === "command" && <span style={{ color: '#9ca3af', marginRight: '0.25rem' }}>$</span>}
            {line.text}
          </div>
        ))}
        <div style={{ height: '1rem' }}></div>
      </div>
    </div>
  );
}

// Componente para los íconos pulsantes
function PulsingIcon({ icon: Icon }) {
  return (
    <div className="hero-feature-icon-container">
      <div className="hero-feature-icon">
        <Icon />
      </div>
      {/* Anillos pulsantes */}
      <div className="hero-feature-rings">
        <div className="hero-feature-ring hero-feature-ring--primary"></div>
        <div className="hero-feature-ring hero-feature-ring--secondary"></div>
      </div>
    </div>
  );
}

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [cardsVisible, setCardsVisible] = useState(false);
  
  useEffect(() => {
    // Animación secuencial
    const timer = setTimeout(() => {
      setIsVisible(true);
      
      // Mostrar las tarjetas después
      setTimeout(() => {
        setCardsVisible(true);
      }, 1500);
    }, 500);
    
    return () => {
      clearTimeout(timer);
    };
  }, []);
  
  return (
    <section id="hero" className="hero-section-container">
      {/* Fondo tecnológico en movimiento */}
      <TechBackground />
      
      {/* Overlay de gradiente para mejor legibilidad */}
      <div className="hero-gradient-overlay"></div>
      
      <div className="hero-content-wrapper">
        <div className="hero-main-grid">
          {/* Contenido principal */}
          <div className="hero-text-content">
            <h1 className="hero-main-title">
              <span className="hero-title-line hero-title-line--primary">Seguridad</span>
              <span className="hero-title-line">
                <span className="hero-title-line--gradient">Inquebrantable</span>
                <span className="hero-title-line--secondary"> para</span>
              </span>
              <span className="hero-title-line hero-title-line--secondary">Infraestructura Digital</span>
            </h1>
            
            <div className={`hero-typewriter-container ${isVisible ? 'hero-element-visible' : 'hero-element-hidden'}`}>
              <RotatingTypewriter />
            </div>
            
            <p className={`hero-description hero-description--mobile-center ${isVisible ? 'hero-element-visible' : 'hero-element-hidden'}`}>
              En GreenLock nos especializamos en auditorías de Ciberseguridad, Red Team, Evaluación Perimetral y Pentesting Web para detectar vulnerabilidades antes que los atacantes.
            </p>
            
            <div className={`hero-buttons-container ${isVisible ? 'hero-element-visible' : 'hero-element-hidden'}`}>
              <a href="#contacto" className="hero-btn-primary">
                Solicitar auditoría
              </a>
              <a href="#servicios" className="hero-btn-secondary">
                Explorar servicios
                <ArrowRight size={16} />
              </a>
            </div>
          </div>
          
          {/* Terminal de código - Oculto en móviles */}
          <div className={`hero-terminal-container ${isVisible ? 'hero-element-visible' : 'hero-element-hidden'}`}>
            <CodeTerminal />
          </div>
        </div>
        
        {/* Tarjetas de características */}
        <div className={`hero-features-grid ${cardsVisible ? 'hero-element-visible' : 'hero-element-hidden'}`}>
          <div className="hero-feature-card">
            <PulsingIcon icon={Shield} />
            <h3 className="hero-feature-title">Experiencia Certificada</h3>
            <p className="hero-feature-description">
              Equipo de profesionales con experiencia real en escenarios de auditoría y certificaciones profesionales (CRTO)
            </p>
          </div>
          
          <div className="hero-feature-card">
            <PulsingIcon icon={Scale} />
            <h3 className="hero-feature-title">Estándares Globales</h3>
            <p className="hero-feature-description">
              Metodologías alineadas con MITRE ATT&CK, OWASP Top 10 y normativas NIS
            </p>
          </div>
          
          <div className="hero-feature-card">
            <PulsingIcon icon={Monitor} />
            <h3 className="hero-feature-title">Cobertura Integral</h3>
            <p className="hero-feature-description">
              Auditorías end-to-end que cubren infraestructura, aplicaciones y factor humano
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}