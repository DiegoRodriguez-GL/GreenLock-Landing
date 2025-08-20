import { useRef, useEffect } from 'react';
import '../../styles/BlogHeroSection.css';

interface BlogHeroSectionProps {
  isLoaded: boolean;
}

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
}

const TechBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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
      className="blog-hero-tech-background"
      style={{ background: '#080f1d' }}
    />
  );
};

const BlogHeroSection = ({ isLoaded }: BlogHeroSectionProps) => {
  return (
    <section className="blog-hero-container">
      <TechBackground />
      <div className="blog-hero-overlay" />
      
      <div className="blog-hero-content">
        <div className="blog-hero-title-container">
          <h1 className="blog-hero-main-title">
            <span 
              className="blog-hero-title-main"
              style={{
                opacity: isLoaded ? 1 : 0,
                transform: isLoaded ? 'translateY(0)' : 'translateY(-20px)',
                transition: 'all 0.6s ease-out 0.2s'
              }}
            >
              Investigación e <span className="blog-hero-title-gradient">Insights</span>
            </span>
          </h1>
        </div>

        <p 
          className="blog-hero-subtitle"
          style={{
            opacity: isLoaded ? 1 : 0,
            transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.6s ease-out 0.6s'
          }}
        >
          Accede a nuestras{' '}
          <span className="blog-hero-highlight">investigaciones técnicas</span>, casos de estudio reales y{' '}
          <span className="blog-hero-highlight">análisis de vulnerabilidades</span>{' '}
          desarrollados por nuestro equipo de expertos.
        </p>
      </div>
    </section>
  );
};

export default BlogHeroSection;