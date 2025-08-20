import { useEffect, useState, useRef } from 'react';
import { Shield, AlertTriangle, Home, ArrowRight, Lock } from 'lucide-react';
import '../styles/Page404.css';


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


function PulsingIcon({ icon: Icon, color = "text-red-400" }: { icon: React.ElementType; color?: string }) {
  return (
    <div className="mb-6 flex justify-center relative">
      <div className="p-4 rounded-full bg-gradient-to-br from-red-500/20 to-red-400/5 relative z-10">
        <Icon className={`w-12 h-12 md:w-16 md:h-16 ${color}`} />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-red-500/10 animate-pulse-ring1"></div>
        <div className="absolute w-24 h-24 md:w-28 md:h-28 rounded-full bg-red-500/5 animate-pulse-ring2"></div>
      </div>
    </div>
  );
}

export default function Page404() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      className="min-h-screen w-full flex items-center justify-center overflow-hidden relative"
      style={{ backgroundColor: '#080f1d' }}
    >
      <TechBackground />
      <div className="absolute inset-0 bg-gradient-to-b from-[#080f1d]/70 via-transparent to-[#080f1d] z-10"></div>

      <div className="container relative z-20 mx-auto px-4 w-full flex items-center justify-center">
        <div className="text-center max-w-2xl mx-auto">
          
          {}
          <div className={`space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <PulsingIcon icon={AlertTriangle} color="text-red-400" />
            
            <div className="space-y-6">
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight">
                <span className="glitch-effect text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-red-500 to-red-600 animate-error-gradient">404</span>
              </h1>
              
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">
                Acceso <span className="text-red-400">Denegado</span>
              </h2>
              
              <div className="text-lg md:text-xl text-gray-300 space-y-4">
                <div className="flex items-center justify-center gap-2">
                  <Lock size={20} className="text-red-400" />
                  <span>Sistema de seguridad activado</span>
                </div>
                <p className="text-gray-400 text-base md:text-lg">La página que busca no existe o ha sido movida</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/" 
                className="nav-button-primary px-8 py-4 bg-gradient-to-r from-green-600 to-green-400 text-white rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-green-500/50 hover:-translate-y-1 relative overflow-hidden group border border-green-400/30 flex items-center gap-2 justify-center text-base md:text-lg"
              >
                <Home size={20} />
                <span className="relative z-10">Volver al inicio</span>
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>
              
              <a 
                href="/servicios" 
                className="nav-button-secondary px-8 py-4 border border-green-500/40 text-green-400 rounded-lg font-medium hover:border-green-400 hover:bg-green-500/10 transition-all duration-300 flex items-center gap-2 group hover:-translate-y-1 justify-center text-base md:text-lg"
              >
                <Shield size={20} />
                Ver servicios
                <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}