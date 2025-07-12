// src/components/sections/HeroSection.jsx
import { useEffect, useState, useRef } from 'react';
import { ArrowRight, Shield, Scale, Monitor, Terminal, AlertTriangle, Check } from 'lucide-react';

// Componente mejorado para la animación de dots/nodos en el fondo - versión similar a la imagen
function NetworkBackground() {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Configuración del canvas
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
    
    // Crear nodos para un estilo similar a la imagen de referencia
    const nodes = [];
    const nodeCount = 20; // Número reducido de nodos como en la imagen
    
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        // Velocidad muy lenta para un movimiento sutil
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        // Nodos pequeños como puntos para simular la imagen
        radius: 1.5,
        // Baja opacidad para un efecto sutil
        color: `rgba(23, 153, 63, 0.6)`
      });
    }
    
    // Configuración de animación
    let animationFrameId;
    
    // Animación simple sin interacción del ratón
    const animate = () => {
      // Limpia el canvas
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      
      // Dibujar líneas entre nodos para crear el efecto de constelación
      for (let i = 0; i < nodes.length; i++) {
        const nodeA = nodes[i];
        
        // Conectar solo con los nodos cercanos
        for (let j = 0; j < nodes.length; j++) {
          if (i !== j) {
            const nodeB = nodes[j];
            const dx = nodeB.x - nodeA.x;
            const dy = nodeB.y - nodeA.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            // Distancia máxima para conectar nodos - ajustada para simular la imagen
            if (distance < 220) {
              ctx.beginPath();
              ctx.moveTo(nodeA.x, nodeA.y);
              ctx.lineTo(nodeB.x, nodeB.y);
              // Líneas muy finas y sutiles como en la imagen
              const opacity = 0.15 - (distance / 220) * 0.15;
              ctx.strokeStyle = `rgba(23, 153, 63, ${opacity})`;
              ctx.lineWidth = 0.3;
              ctx.stroke();
            }
          }
        }
      }
      
      // Dibujar nodos como pequeños puntos
      for (const node of nodes) {
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.fill();
        
        // Actualizar posición con movimiento lento
        node.x += node.vx;
        node.y += node.vy;
        
        // Cambiar dirección aleatoriamente con poca frecuencia para un movimiento natural
        if (Math.random() < 0.002) {
          node.vx = (Math.random() - 0.5) * 0.15;
          node.vy = (Math.random() - 0.5) * 0.15;
        }
        
        // Rebotar en los bordes
        if (node.x < 0 || node.x > window.innerWidth) {
          node.vx *= -1;
        }
        if (node.y < 0 || node.y > window.innerHeight) {
          node.vy *= -1;
        }
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    
    // Limpieza
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0" />;
}

// Componente mejorado para el efecto de terminal de código - versión rectangular
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

// Componente para el efecto de typewriter rotativo
function RotatingTypewriter() {
  const phrases = [
    "Detectamos vulnerabilidades al",
    "Protegemos su infraestructura antes que",
    "Aseguramos su empresa frente a"
  ];
  
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  
  useEffect(() => {
    const currentPhrase = phrases[currentPhraseIndex];
    
    // Velocidad de escritura y borrado
    const typingSpeed = 70;
    const deletingSpeed = 30;
    const pauseBeforeDelete = 1800;
    const pauseBeforeNextPhrase = 500;
    
    if (!isDeleting && displayText === currentPhrase) {
      // Texto completo, esperar antes de empezar a borrar
      setIsComplete(true);
      const timeout = setTimeout(() => {
        setIsDeleting(true);
        setIsComplete(false);
      }, pauseBeforeDelete);
      
      return () => clearTimeout(timeout);
    } else if (isDeleting && displayText === '') {
      // Terminó de borrar, pasar a la siguiente frase
      setIsDeleting(false);
      
      const timeout = setTimeout(() => {
        setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
      }, pauseBeforeNextPhrase);
      
      return () => clearTimeout(timeout);
    }
    
    // Manejo de escritura y borrado
    const timeout = setTimeout(() => {
      if (isDeleting) {
        setDisplayText(prev => prev.slice(0, -1));
      } else {
        setDisplayText(prev => currentPhrase.slice(0, prev.length + 1));
      }
    }, isDeleting ? deletingSpeed : typingSpeed);
    
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentPhraseIndex]);
  
  return (
    <span className="text-xl text-gray-300 block">
      {displayText}
      <span className={`typewriter-cursor ${isComplete ? 'opacity-0' : 'opacity-100'}`}></span>
    </span>
  );
}

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [subtitleVisible, setSubtitleVisible] = useState(false);
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
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <section id="hero" className="relative md:h-screen flex items-center overflow-hidden bg-[#080f1d]">
      {/* Fondo animado de red */}
      <NetworkBackground />
      
      {/* Overlay de gradiente para mejor legibilidad */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#080f1d]/70 via-transparent to-[#080f1d] z-10"></div>
      
      <div className="container relative z-20 mx-auto px-4 pt-24 pb-16 md:pt-28 md:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Contenido principal */}
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 tracking-tight">
              <span className="text-white block mb-1">Seguridad</span>
              <span className="block mb-1">
                <span className="text-greenlock-500">Inquebrantable</span>
                <span className="text-white"> para</span>
              </span>
              <span className="text-white block">su Infraestructura Digital</span>
            </h1>
            
            <div className={`mb-10 transition-opacity duration-700 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
              <RotatingTypewriter />
            </div>
            
            <p className={`text-md text-gray-400 mb-10 max-w-2xl transition-opacity duration-700 ease-in-out ${subtitleVisible ? 'opacity-100' : 'opacity-0'}`}>
              En GreenLock nos especializamos en auditorías de Ciberseguridad, Red Team, Evaluación Perimetral y Pentesting Web para detectar vulnerabilidades antes que los atacantes.
            </p>
            
            <div className={`flex flex-wrap gap-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <a 
                href="#contacto" 
                className="px-6 py-3 bg-gradient-to-r from-greenlock-600 to-greenlock-500 text-white rounded-md font-medium hover:from-greenlock-500 hover:to-greenlock-400 transition-all duration-300 shadow-md hover:shadow-greenlock-500/30 hover:-translate-y-1"
              >
                Solicitar auditoría
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
          
          {/* Terminal de código minimalista */}
          <div className={`flex justify-end transition-all duration-1000 delay-500 ease-in-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <CodeTerminal />
          </div>
        </div>
        
        {/* Tarjetas de características - Mejoradas */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 transition-all duration-1000 ${cardsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="feature-card bg-gradient-to-br from-[#0a1426]/90 to-[#0a1426]/70 backdrop-blur-sm border border-gray-800 rounded-lg p-6 hover:border-greenlock-500/30 transition-all hover:shadow-xl hover:shadow-greenlock-900/10 group">
            <div className="mb-4 flex justify-center feature-icon">
              <div className="p-3 rounded-full bg-gradient-to-br from-greenlock-500/20 to-greenlock-400/5">
                <Shield className="w-10 h-10 text-greenlock-400" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-center text-white mb-2">Experiencia Certificada</h3>
            <p className="text-gray-400 text-sm text-center">
              Equipo de profesionales con experiencia real en escenarios de auditoría y certificaciones profesionales (CRTO)
            </p>
          </div>
          
          <div className="feature-card bg-gradient-to-br from-[#0a1426]/90 to-[#0a1426]/70 backdrop-blur-sm border border-gray-800 rounded-lg p-6 hover:border-greenlock-500/30 transition-all hover:shadow-xl hover:shadow-greenlock-900/10 group" style={{ transitionDelay: '200ms' }}>
            <div className="mb-4 flex justify-center feature-icon">
              <div className="p-3 rounded-full bg-gradient-to-br from-greenlock-500/20 to-greenlock-400/5">
                <Scale className="w-10 h-10 text-greenlock-400" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-center text-white mb-2">Estándares Globales</h3>
            <p className="text-gray-400 text-sm text-center">
              Metodologías alineadas con MITRE ATT&CK, OWASP Top 10 y normativas NIS
            </p>
          </div>
          
          <div className="feature-card bg-gradient-to-br from-[#0a1426]/90 to-[#0a1426]/70 backdrop-blur-sm border border-gray-800 rounded-lg p-6 hover:border-greenlock-500/30 transition-all hover:shadow-xl hover:shadow-greenlock-900/10 group" style={{ transitionDelay: '400ms' }}>
            <div className="mb-4 flex justify-center feature-icon">
              <div className="p-3 rounded-full bg-gradient-to-br from-greenlock-500/20 to-greenlock-400/5">
                <Monitor className="w-10 h-10 text-greenlock-400" />
              </div>
            </div>
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