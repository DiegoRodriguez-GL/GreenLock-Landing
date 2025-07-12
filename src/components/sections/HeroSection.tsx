// src/components/sections/HeroSection.jsx - VERSIÓN CORREGIDA TECNOLÓGICA MINIMALISTA
import { useEffect, useState, useRef } from 'react';
import { ArrowRight, Shield, Scale, Monitor } from 'lucide-react';

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
    const nodeCount = 30; // Cantidad moderada
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
      className="absolute inset-0 w-full h-full"
      style={{ background: '#080f1d' }}
    />
  );
}

// Componente para el efecto de typewriter rotativo con frases atractivas
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
    <span className="text-lg md:text-xl text-gray-300 block">
      {displayText}
      <span className={`typewriter-cursor ${isComplete ? 'opacity-0' : 'opacity-100'}`}></span>
    </span>
  );
}

// Componente mejorado para el efecto de terminal de código
function CodeTerminal() {
  const [lines, setLines] = useState([]);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanStatus, setScanStatus] = useState('initializing');
  const terminalRef = useRef(null);
  
  useEffect(() => {
    // Líneas de código para la animación - versión minimalista
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
  const progressBarColor = {
    initializing: 'bg-blue-500',
    scanning: 'bg-yellow-500',
    analyzing: 'bg-orange-500',
    complete: 'bg-green-500'
  }[scanStatus];
  
  return (
    <div className="w-full relative">
      <div className="bg-[#0c1628] border border-gray-700 rounded-md overflow-hidden shadow-md w-full lg:max-w-lg ml-auto">
        {/* Barra de título simplificada */}
        <div className="px-3 py-1.5 bg-[#0a1426] border-b border-gray-700 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-red-500"></div>
            <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
          </div>
          <div className="text-xs text-gray-400">scan.sh</div>
        </div>
        
        {/* Barra de progreso minimalista */}
        <div className="w-full h-0.5 bg-gray-800">
          <div 
            className={`h-full transition-all duration-300 ${progressBarColor}`}
            style={{ width: `${scanProgress}%` }}
          ></div>
        </div>
        
        {/* Contenido de la terminal - minimalista */}
        <div 
          ref={terminalRef}
          className="p-3 font-mono text-xs text-gray-300 h-48 overflow-y-auto scrollbar-thin scrollbar-track-transparent"
          style={{ scrollbarWidth: 'thin' }}
        >
          {lines.map((line, index) => (
            <div 
              key={index} 
              className={`mb-1 ${
                line.type === "command" ? "text-greenlock-400" : 
                line.type === "warning" ? "text-yellow-500" : 
                line.type === "info" ? "text-blue-300" :
                line.type === "success" ? "text-green-400" : 
                "text-gray-300"
              }`}
            >
              {line.type === "command" && <span className="text-gray-500 mr-1">$</span>}
              {line.text}
            </div>
          ))}
          <div className="h-4"></div> {/* Espacio al final */}
        </div>
      </div>
    </div>
  );
}

// Componente pulsante para los íconos de las tarjetas
function PulsingIcon({ icon: Icon }) {
  return (
    <div className="mb-4 flex justify-center feature-icon relative">
      <div className="p-3 rounded-full bg-gradient-to-br from-greenlock-500/20 to-greenlock-400/5 relative z-10">
        <Icon className="w-10 h-10 text-greenlock-400" />
      </div>
      {/* Anillos pulsantes */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-greenlock-500/10 animate-pulse-ring1"></div>
        <div className="absolute w-20 h-20 rounded-full bg-greenlock-500/5 animate-pulse-ring2"></div>
      </div>
    </div>
  );
}

// Estilos CSS para animaciones (se debe añadir a tu archivo global de CSS)
const styles = `
@keyframes pulse-ring1 {
  0% {
    transform: scale(0.95);
    opacity: 0.7;
  }
  70% {
    transform: scale(1.1);
    opacity: 0.2;
  }
  100% {
    transform: scale(0.95);
    opacity: 0.7;
  }
}

@keyframes pulse-ring2 {
  0% {
    transform: scale(0.95);
    opacity: 0.5;
  }
  70% {
    transform: scale(1.2);
    opacity: 0.1;
  }
  100% {
    transform: scale(0.95);
    opacity: 0.5;
  }
}

@keyframes gradient-shift {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

@keyframes button-pulse {
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(23, 153, 63, 0.5);
  }
  50% {
    box-shadow: 0 0 0 10px rgba(23, 153, 63, 0);
  }
}

@keyframes glow {
  0%, 100% {
    text-shadow: 0 0 5px rgba(23, 153, 63, 0.5);
  }
  50% {
    text-shadow: 0 0 20px rgba(23, 153, 63, 0.8), 0 0 30px rgba(23, 153, 63, 0.4);
  }
}

.animate-pulse-ring1 {
  animation: pulse-ring1 3s infinite;
}

.animate-pulse-ring2 {
  animation: pulse-ring2 4s infinite 0.5s;
}

.animate-gradient-text {
  background-size: 200% auto;
  animation: gradient-shift 4s ease infinite;
}

.animate-button-pulse {
  animation: button-pulse 2s infinite;
}

.animate-glow {
  animation: glow 2s ease-in-out infinite;
}

.typewriter-cursor {
  display: inline-block;
  width: 2px;
  height: 1em;
  background-color: #17993f;
  margin-left: 2px;
  vertical-align: text-bottom;
  animation: blink 1s step-end infinite;
}

@keyframes blink {
  from, to { opacity: 1; }
  50% { opacity: 0; }
}
`;

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [cardsVisible, setCardsVisible] = useState(false);
  
  useEffect(() => {
    // Inyectar estilos CSS en el documento
    const styleElement = document.createElement('style');
    styleElement.textContent = styles;
    document.head.appendChild(styleElement);
    
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
      // Limpiar estilos al desmontar el componente
      if (document.head.contains(styleElement)) {
        document.head.removeChild(styleElement);
      }
    };
  }, []);
  
  return (
    <section 
      id="hero" 
      className="relative w-full h-screen flex items-center overflow-hidden"
      style={{ backgroundColor: '#080f1d' }}
    >
      {/* Fondo tecnológico en movimiento */}
      <TechBackground />
      
      {/* Overlay de gradiente para mejor legibilidad con fade en elementos */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#080f1d]/70 via-transparent to-[#080f1d] z-10"></div>
      
      <div className="container relative z-20 mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Contenido principal */}
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
              <span className="text-white block mb-1">Seguridad</span>
              <span className="block mb-1">
                {/* Texto con gradiente animado */}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-300 via-greenlock-500 to-emerald-600 animate-gradient-text">Inquebrantable</span>
                <span className="text-white"> para</span>
              </span>
              <span className="text-white block">Infraestructura Digital</span>
            </h1>
            
            <div className={`mb-5 transition-opacity duration-700 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
              <RotatingTypewriter />
            </div>
            
            <p className={`text-md text-gray-400 mb-6 max-w-2xl transition-opacity duration-700 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
              En GreenLock nos especializamos en auditorías de Ciberseguridad, Red Team, Evaluación Perimetral y Pentesting Web para detectar vulnerabilidades antes que los atacantes.
            </p>
            
            <div className={`flex flex-wrap gap-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              {/* Botón destacado con efecto de pulso y glow */}
              <a 
                href="#contacto" 
                className="px-6 py-3 bg-gradient-to-r from-greenlock-600 to-greenlock-400 text-white rounded-md font-medium transition-all duration-300 shadow-lg hover:shadow-greenlock-500/50 hover:-translate-y-1 relative overflow-hidden group animate-button-pulse border border-greenlock-400/30"
              >
                <span className="relative z-10">Solicitar auditoría</span>
                <div className="absolute inset-0 bg-gradient-to-r from-greenlock-400 to-greenlock-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute -inset-1 bg-gradient-to-r from-greenlock-400/20 to-greenlock-500/20 rounded-lg blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>
              <a 
                href="#servicios" 
                className="px-6 py-3 border border-greenlock-500/40 text-greenlock-400 rounded-md font-medium hover:border-greenlock-400 hover:bg-greenlock-500/10 transition-all duration-300 flex items-center gap-2 group hover:-translate-y-1"
              >
                Explorar servicios
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
          </div>
          
          {/* Terminal de código rectangular */}
          <div className={`flex justify-end transition-all duration-1000 delay-500 ease-in-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <CodeTerminal />
          </div>
        </div>
        
        {/* Tarjetas de características con íconos pulsantes */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 transition-all duration-1000 ${cardsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="feature-card bg-gradient-to-br from-[#0a1426]/90 to-[#0a1426]/70 backdrop-blur-sm border border-gray-800 rounded-lg p-6 hover:border-greenlock-500/30 transition-all hover:shadow-xl hover:shadow-greenlock-900/10 group">
            <PulsingIcon icon={Shield} />
            <h3 className="text-xl font-semibold text-center text-white mb-2">Experiencia Certificada</h3>
            <p className="text-gray-400 text-sm text-center">
              Equipo de profesionales con experiencia real en escenarios de auditoría y certificaciones profesionales (CRTO)
            </p>
          </div>
          
          <div className="feature-card bg-gradient-to-br from-[#0a1426]/90 to-[#0a1426]/70 backdrop-blur-sm border border-gray-800 rounded-lg p-6 hover:border-greenlock-500/30 transition-all hover:shadow-xl hover:shadow-greenlock-900/10 group" style={{ transitionDelay: '200ms' }}>
            <PulsingIcon icon={Scale} />
            <h3 className="text-xl font-semibold text-center text-white mb-2">Estándares Globales</h3>
            <p className="text-gray-400 text-sm text-center">
              Metodologías alineadas con MITRE ATT&CK, OWASP Top 10 y normativas NIS
            </p>
          </div>
          
          <div className="feature-card bg-gradient-to-br from-[#0a1426]/90 to-[#0a1426]/70 backdrop-blur-sm border border-gray-800 rounded-lg p-6 hover:border-greenlock-500/30 transition-all hover:shadow-xl hover:shadow-greenlock-900/10 group" style={{ transitionDelay: '400ms' }}>
            <PulsingIcon icon={Monitor} />
            <h3 className="text-xl font-semibold text-center text-white mb-2">Cobertura Integral</h3>
            <p className="text-gray-400 text-sm text-center">
              Auditorías end-to-end que cubren infraestructura, aplicaciones y factor humano
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}