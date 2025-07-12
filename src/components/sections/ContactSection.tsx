// src/components/sections/ContactSection.tsx - VERSIÓN MEJORADA
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Section from '../ui/Section';
import SectionTitle from '../ui/SectionTitle';
import HackerEffect from '../ui/HackerEffect';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Shield, 
  Zap, 
  CheckCircle,
  ArrowRight,
  Send
} from 'lucide-react';

// Componente de fondo animado similar al Hero
function ContactBackground() {
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
    
    // Crear partículas flotantes
    const particles: {x: number; y: number; vx: number; vy: number; radius: number; opacity: number; life: number}[] = [];
    const maxParticles = 30;
    
    const createParticle = () => {
      return {
        x: Math.random() * window.innerWidth,
        y: window.innerHeight + 20,
        vx: (Math.random() - 0.5) * 0.5,
        vy: -Math.random() * 1 - 0.5,
        radius: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.3,
        life: 1
      };
    };
    
    // Inicializar partículas
    for (let i = 0; i < maxParticles; i++) {
      particles.push(createParticle());
    }
    
    let animationFrameId: number;
    
    const animate = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      
      // Actualizar y dibujar partículas
      for (let i = particles.length - 1; i >= 0; i--) {
        const particle = particles[i];
        
        // Actualizar posición
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life -= 0.001;
        
        // Dibujar partícula
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(23, 153, 63, ${particle.opacity * particle.life})`;
        ctx.fill();
        
        // Remover partículas que salen de pantalla o mueren
        if (particle.y < -20 || particle.life <= 0) {
          particles.splice(i, 1);
          particles.push(createParticle());
        }
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

// Componente de formulario mejorado
function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.name.trim()) newErrors.name = 'El nombre es requerido';
    if (!formData.email.trim()) newErrors.email = 'El email es requerido';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email inválido';
    if (!formData.company.trim()) newErrors.company = 'La empresa es requerida';
    if (!formData.service) newErrors.service = 'Seleccione un servicio';
    if (!formData.message.trim() || formData.message.length < 10) {
      newErrors.message = 'El mensaje debe tener al menos 10 caracteres';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Simular envío
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({
        name: '', email: '', company: '', phone: '', service: '', message: ''
      });
      
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Limpiar error al escribir
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-br from-greenlock-500 to-greenlock-600 rounded-xl p-8 text-white text-center"
      >
        <div className="mb-6">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold mb-2">¡Mensaje enviado con éxito!</h3>
          <p className="text-greenlock-100">
            Gracias por contactarnos. Nuestro equipo se pondrá en contacto contigo en las próximas 24 horas.
          </p>
        </div>
        
        <div className="bg-white/10 rounded-lg p-4">
          <HackerEffect text="Procesando solicitud..." duration={1000} />
        </div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Nombre *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-greenlock-500 focus:border-transparent transition-all duration-200 ${
              errors.name ? 'border-red-500 bg-red-50' : 'border-gray-300 focus:bg-white'
            }`}
            placeholder="Tu nombre completo"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-greenlock-500 focus:border-transparent transition-all duration-200 ${
              errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300 focus:bg-white'
            }`}
            placeholder="tu@empresa.com"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email}</p>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
            Empresa *
          </label>
          <input
            id="company"
            name="company"
            type="text"
            value={formData.company}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-greenlock-500 focus:border-transparent transition-all duration-200 ${
              errors.company ? 'border-red-500 bg-red-50' : 'border-gray-300 focus:bg-white'
            }`}
            placeholder="Nombre de tu empresa"
          />
          {errors.company && (
            <p className="mt-1 text-sm text-red-500">{errors.company}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
            Teléfono (opcional)
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-greenlock-500 focus:border-transparent transition-all duration-200"
            placeholder="+34 600 000 000"
          />
        </div>
      </div>
      
      <div>
        <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
          Servicio que te interesa *
        </label>
        <select
          id="service"
          name="service"
          value={formData.service}
          onChange={handleChange}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-greenlock-500 focus:border-transparent transition-all duration-200 ${
            errors.service ? 'border-red-500 bg-red-50' : 'border-gray-300 focus:bg-white'
          }`}
        >
          <option value="">Selecciona un servicio</option>
          <option value="red-team">Red Team - Simulación de ataques reales</option>
          <option value="perimeter">Evaluación Perimetral - Análisis de defensas</option>
          <option value="web-pentesting">Pentesting Web - Auditoría de aplicaciones</option>
          <option value="mobile-pentesting">Pentesting Mobile - Seguridad en apps móviles</option>
          <option value="code-review">Revisión de Código - Análisis de vulnerabilidades</option>
          <option value="other">Otro (especificar en mensaje)</option>
        </select>
        {errors.service && (
          <p className="mt-1 text-sm text-red-500">{errors.service}</p>
        )}
      </div>
      
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
          Mensaje *
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={formData.message}
          onChange={handleChange}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-greenlock-500 focus:border-transparent transition-all duration-200 resize-none ${
            errors.message ? 'border-red-500 bg-red-50' : 'border-gray-300 focus:bg-white'
          }`}
          placeholder="Cuéntanos sobre tu proyecto y cómo podemos ayudarte..."
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-500">{errors.message}</p>
        )}
      </div>
      
      <motion.button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-gradient-to-r from-greenlock-600 to-greenlock-500 text-white py-4 px-8 rounded-lg font-semibold transition-all duration-300 hover:from-greenlock-500 hover:to-greenlock-400 hover:shadow-lg hover:shadow-greenlock-500/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 group"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {isSubmitting ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            <span>Enviando mensaje...</span>
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            <span>Enviar mensaje</span>
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </>
        )}
      </motion.button>
    </form>
  );
}

export default function ContactSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <Section id="contacto" bgColor="bg-gray-50" paddingY="xl">
      <div className="relative overflow-hidden">
        {/* Fondo animado */}
        <ContactBackground />
        
        {/* Contenido principal */}
        <div className="relative z-10" ref={ref}>
          <SectionTitle
            title="¿Listo para Proteger tu Empresa?"
            description="Completa el formulario y nuestro equipo te contactará en 24 horas para diseñar una estrategia de seguridad personalizada."
            center={true}
          />
          
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-16"
          >
            {/* Formulario de contacto */}
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <Shield className="w-6 h-6 text-greenlock-500 mr-2" />
                  Solicita tu auditoría gratuita
                </h3>
                <p className="text-gray-600">
                  Respuesta garantizada en 24 horas. Consulta inicial sin compromiso.
                </p>
              </div>
              
              <ContactForm />
            </div>
            
            {/* Información de contacto y beneficios */}
            <div className="space-y-8">
              {/* Información de contacto */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-8 text-white"
              >
                <h3 className="text-2xl font-bold mb-6 flex items-center">
                  <Mail className="w-6 h-6 text-greenlock-400 mr-2" />
                  Información de contacto
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 text-greenlock-400 mt-1 mr-3" />
                    <div>
                      <p className="text-greenlock-400 font-medium">Dirección</p>
                      <p className="text-gray-300">Calle Seguridad Digital, 42</p>
                      <p className="text-gray-300">28001 Madrid, España</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Phone className="w-5 h-5 text-greenlock-400 mt-1 mr-3" />
                    <div>
                      <p className="text-greenlock-400 font-medium">Teléfono</p>
                      <p className="text-gray-300">+34 910 123 456</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Mail className="w-5 h-5 text-greenlock-400 mt-1 mr-3" />
                    <div>
                      <p className="text-greenlock-400 font-medium">Email</p>
                      <p className="text-gray-300">info@greenlock.es</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Clock className="w-5 h-5 text-greenlock-400 mt-1 mr-3" />
                    <div>
                      <p className="text-greenlock-400 font-medium">Horario</p>
                      <p className="text-gray-300">Lunes - Viernes: 9:00 - 18:00</p>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              {/* Soporte de emergencia */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-gradient-to-br from-greenlock-600 to-greenlock-500 rounded-xl p-8 text-white"
              >
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mr-3">
                    <Zap className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold">Soporte de Emergencia 24/7</h3>
                </div>
                <p className="mb-6 text-greenlock-100">
                  Para incidentes críticos de seguridad y respuesta a brechas, nuestro equipo está disponible las 24 horas.
                </p>
                <div className="bg-white/10 rounded-lg p-4 font-mono text-center text-lg">
                  <HackerEffect text="+34 900 555 123" duration={1500} />
                </div>
              </motion.div>
              
              {/* Garantías */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-200"
              >
                <h4 className="font-bold text-gray-900 mb-4">Nuestro compromiso contigo:</h4>
                <ul className="space-y-3">
                  {[
                    'Respuesta en menos de 24 horas',
                    'Consulta inicial gratuita de 30 minutos',
                    'Presupuesto detallado sin compromiso',
                    'Confidencialidad absoluta garantizada'
                  ].map((item, index) => (
                    <li key={index} className="flex items-center text-gray-700">
                      <CheckCircle className="w-5 h-5 text-greenlock-500 mr-3" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}