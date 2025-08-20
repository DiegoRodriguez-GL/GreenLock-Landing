import { useEffect, useState, useRef } from 'react';
import { ArrowRight, Shield, Scale, Monitor } from 'lucide-react';
import '../../styles/HeroSection.css';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
}

function TechBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

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

    const nodes: Node[] = [];
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

    let animationFrameId: number;
    let time = 0;

    const animate = () => {
      const width = canvasWidth();
      const height = canvasHeight();

      ctx.fillStyle = '#080f1d';
      ctx.fillRect(0, 0, width, height);

      time += 0.01;

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
            ctx.strokeStyle = `rgba(0, 178, 103, ${opacity})`;
            ctx.beginPath();
            ctx.moveTo(nodeA.x, nodeA.y);
            ctx.lineTo(nodeB.x, nodeB.y);
            ctx.stroke();
          }
        }
      }

      for (const node of nodes) {
        const pulse = Math.sin(time * 2 + node.x * 0.01) * 0.3 + 0.7;

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
      className="absolute inset-0 w-full h-full"
      style={{ background: '#080f1d' }}
    />
  );
}

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
    const currentPhrase = phrases[currentPhraseIndex];
    const typingSpeed = 70;
    const deletingSpeed = 30;
    const pauseBeforeDelete = 1800;
    const pauseBeforeNextPhrase = 500;

    let timeout: number;

    if (!isDeleting && displayText === currentPhrase) {
      setIsComplete(true);
      timeout = setTimeout(() => {
        setIsDeleting(true);
        setIsComplete(false);
      }, pauseBeforeDelete);
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false);
      timeout = setTimeout(() => {
        const nextIndex = (currentPhraseIndex + 1) % phrases.length;
        setCurrentPhraseIndex(nextIndex);
        setDisplayText(phrases[nextIndex][0]);
      }, pauseBeforeNextPhrase);
    } else {
      timeout = setTimeout(() => {
        if (isDeleting) {
          setDisplayText(prev => prev.slice(0, -1));
        } else {
          setDisplayText(prev => currentPhrase.slice(0, prev.length + 1));
        }
      }, isDeleting ? deletingSpeed : typingSpeed);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentPhraseIndex, phrases]);

  return (
    <span className="text-base sm:text-lg md:text-xl text-gray-300 block min-h-[1.5em]">
      {displayText}
      <span className={`typewriter-cursor ${isComplete ? 'opacity-0' : 'opacity-100'}`}></span>
    </span>
  );
}

function AnimatedTerminal() {
  const [lines, setLines] = useState<Array<{id: number, text: string, type: string}>>([]);
  const [currentId, setCurrentId] = useState(0);
  const [commandIndex, setCommandIndex] = useState(0);

  const terminalSequence = [
  { text: "$ ./security_scan --target=client.domain", type: "command" },
  { text: "[+] Iniciando escaneo de seguridad...", type: "info" },
  { text: "[*] Detectando puertos abiertos...", type: "process" },
  { text: "[*] Puertos: 22, 80, 443, 3306", type: "data" },
  { text: "[*] Verificando servicios web...", type: "process" },
  { text: "[!] VULNERABILIDAD: OpenSSL desactualizado", type: "warning" },
  { text: "[*] Analizando certificados SSL...", type: "process" },
  { text: "[✓] Certificado SSL válido", type: "success" },
  { text: "[*] Escaneando directorios...", type: "process" },
  { text: "[!] HIGH: Archivo de respaldo expuesto", type: "critical" },
  { text: "[*] Verificando configuración DB...", type: "process" },
  { text: "[!] MEDIUM: Credenciales por defecto", type: "warning" },
  { text: "[*] Finalizando análisis...", type: "process" },
  { text: "[+] Escaneo completado", type: "summary" },
  { text: "$ nmap -sS -O target.domain", type: "command" },
  { text: "[*] Iniciando escaneo de puertos...", type: "process" },
  { text: "[+] 80/tcp open http", type: "data" },
  { text: "[+] 443/tcp open https", type: "data" },
  { text: "$ nikto -h https://target.domain", type: "command" },
  { text: "[*] Ejecutando pruebas web...", type: "process" },
  { text: "[!] Server: Apache/2.4.29", type: "info" },
  { text: "[✓] No se encontraron backdoors", type: "success" }
];

  useEffect(() => {
    const addLine = () => {
      if (lines.length >= 6) {
        setLines(prev => prev.slice(1));
      }

      const currentCommand = terminalSequence[commandIndex % terminalSequence.length];
      const newLine = {
        id: currentId,
        text: currentCommand.text,
        type: currentCommand.type
      };

      setLines(prev => [...prev, newLine]);
      setCurrentId(prev => prev + 1);
      setCommandIndex(prev => prev + 1);
    };

    
    const initialTimeout = setTimeout(() => {
      addLine();
    }, 2000);

    
    const interval = setInterval(() => {
      addLine();
    }, Math.random() * 2000 + 4000); 

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, [currentId, lines.length, commandIndex]);

  const getLineClass = (type: string) => {
    switch (type) {
      case 'command': return 'text-green-400';
      case 'info': return 'text-gray-300';
      case 'process': return 'text-blue-300';
      case 'data': return 'text-cyan-300';
      case 'warning': return 'text-yellow-400';
      case 'critical': return 'text-red-400';
      case 'success': return 'text-green-400';
      case 'finding': return 'text-purple-400';
      case 'summary': return 'text-green-300';
      default: return 'text-gray-300';
    }
  };

  return (
    <div className="w-full relative bg-[#0c1628] border border-gray-700 rounded-md overflow-hidden shadow-md w-full lg:max-w-lg ml-auto">
      <div className="px-3 py-1.5 bg-[#0a1426] border-b border-gray-700 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-red-500"></div>
          <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
        </div>
        <div className="text-xs text-gray-400">security_scan.sh</div>
      </div>
      <div className="w-full h-0.5 bg-gray-800">
        <div className="h-full bg-green-500 animate-progress-bar"></div>
      </div>
      <div className="p-3 font-mono text-xs text-gray-300 h-48 overflow-hidden">
        <div className="space-y-1">
          {lines.map((line) => (
            <div
              key={line.id}
              className={`${getLineClass(line.type)} animate-terminal-line opacity-0`}
              style={{
                animation: 'terminalFadeIn 0.5s ease-out forwards'
              }}
            >
              {line.text}
            </div>
          ))}
          <div className="text-green-400 animate-pulse">
            █
          </div>
        </div>
      </div>
    </div>
  );
}

function PulsingIcon({ icon: Icon }: { icon: React.ElementType }) {
  return (
    <div className="mb-4 flex justify-center feature-icon relative">
      <div className="p-3 rounded-full bg-gradient-to-br from-green-500/20 to-green-400/5 relative z-10">
        <Icon className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 text-green-400" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full bg-green-500/10 animate-pulse-ring1"></div>
        <div className="absolute w-16 h-16 md:w-18 md:h-18 lg:w-20 lg:h-20 rounded-full bg-green-500/5 animate-pulse-ring2"></div>
      </div>
    </div>
  );
}

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [cardsVisible, setCardsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      setTimeout(() => {
        setCardsVisible(true);
      }, 1500);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <section 
  id="hero" 
  className="relative w-full flex items-center overflow-hidden py-12 md:py-16"
  style={{ backgroundColor: '#080f1d', minHeight: '75dvh' }}
>

      <TechBackground />
      <div className="absolute inset-0 bg-gradient-to-b from-[#080f1d]/70 via-transparent to-[#080f1d] z-10"></div>

      <div className="container relative z-20 mx-auto px-4 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center h-full">
          <div className="text-left space-y-4 lg:space-y-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold tracking-tight leading-tight">
              <span className="text-white block">Seguridad</span>
              <span className="block">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-300 via-green-500 to-emerald-600 animate-gradient-text">Inquebrantable</span>
                <span className="text-white"> para</span>
              </span>
              <span className="text-white block">Infraestructura Digital</span>
            </h1>

            <div className={`transition-opacity duration-700 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
              <RotatingTypewriter />
            </div>

            <p className={`text-sm sm:text-base text-gray-400 max-w-2xl transition-opacity duration-700 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
              En GreenLock nos especializamos en auditorías de Ciberseguridad, Red Team, Evaluación Perimetral y Pentesting Web para detectar vulnerabilidades antes que los atacantes.
            </p>

            <div className={`flex flex-col sm:flex-row gap-4 justify-start transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <a 
                href="contacto" 
                className="px-4 sm:px-6 py-3 bg-gradient-to-r from-green-600 to-green-400 text-white rounded-md font-medium transition-all duration-300 shadow-lg hover:shadow-green-500/50 hover:-translate-y-1 relative overflow-hidden group animate-button-pulse border border-green-400/30 text-sm sm:text-base flex items-center justify-center text-center"
              >
                <span className="relative z-10">Solicitar auditoría</span>
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute -inset-1 bg-gradient-to-r from-green-400/20 to-green-500/20 rounded-lg blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>
              <a 
                href="servicios" 
                className="px-4 sm:px-6 py-3 border border-green-500/40 text-green-400 rounded-md font-medium hover:border-green-400 hover:bg-green-500/10 transition-all duration-300 flex items-center gap-2 group hover:-translate-y-1 justify-center text-sm sm:text-base"
              >
                Explorar servicios
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
          </div>

          <div className={`hidden md:flex justify-end transition-all duration-1000 delay-500 ease-in-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <AnimatedTerminal />
          </div>
        </div>

        <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 mt-8 lg:mt-12 transition-all duration-1000 ${cardsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="feature-card bg-gradient-to-br from-[#0a1426]/90 to-[#0a1426]/70 backdrop-blur-sm border border-gray-800 rounded-lg p-4 lg:p-6 hover:border-green-500/30 transition-all hover:shadow-xl hover:shadow-green-900/10 group">
            <PulsingIcon icon={Shield} />
            <h3 className="text-base lg:text-lg xl:text-xl font-semibold text-center text-white mb-2">Experiencia Certificada</h3>
            <p className="text-gray-400 text-xs lg:text-sm text-center">
              Equipo de profesionales con experiencia real en escenarios de auditoría y certificaciones profesionales (CRTO)
            </p>
          </div>
          <div className="feature-card bg-gradient-to-br from-[#0a1426]/90 to-[#0a1426]/70 backdrop-blur-sm border border-gray-800 rounded-lg p-4 lg:p-6 hover:border-green-500/30 transition-all hover:shadow-xl hover:shadow-green-900/10 group" style={{ transitionDelay: '200ms' }}>
            <PulsingIcon icon={Scale} />
            <h3 className="text-base lg:text-lg xl:text-xl font-semibold text-center text-white mb-2">Estándares Globales</h3>
            <p className="text-gray-400 text-xs lg:text-sm text-center">
              Metodologías alineadas con MITRE ATT&CK, OWASP Top 10 y normativas NIS
            </p>
          </div>
          <div className="feature-card bg-gradient-to-br from-[#0a1426]/90 to-[#0a1426]/70 backdrop-blur-sm border border-gray-800 rounded-lg p-4 lg:gap-6 hover:border-green-500/30 transition-all hover:shadow-xl hover:shadow-green-900/10 group" style={{ transitionDelay: '400ms' }}>
            <PulsingIcon icon={Monitor} />
            <h3 className="text-base lg:text-lg xl:text-xl font-semibold text-center text-white mb-2">Cobertura Integral</h3>
            <p className="text-gray-400 text-xs lg:text-sm text-center">
              Auditorías end-to-end que cubren infraestructura, aplicaciones y factor humano
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}