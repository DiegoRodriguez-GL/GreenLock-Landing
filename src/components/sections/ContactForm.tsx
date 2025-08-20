
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Shield,
  CheckCircle,
  ArrowRight,
  Send,
  User,
  Building,
  MessageSquare,
  AlertTriangle,
} from "lucide-react";
import "../../styles/ContactForm.css";


const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || "http://localhost:3001",
  ENDPOINTS: {
    CONTACT: "/api/contact",
    HEALTH: "/api/health",
  },
};


function HackerEffect({ text, duration = 1500 }: { text: string; duration?: number }) {
  const [displayText, setDisplayText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()_+-=[]{}|;:,.<>?";
    let isMounted = true;

    if (isMounted) {
      setDisplayText("");
      setIsComplete(false);
    }

    const finalText = text;
    const intervalDuration = Math.max(20, duration / (finalText.length * 3));

    let currentIndex = 0;
    let iterations = 0;

    const interval = setInterval(() => {
      if (!isMounted) return;

      if (currentIndex >= finalText.length) {
        if (iterations >= 2) {
          clearInterval(interval);
          setIsComplete(true);
          return;
        }
        iterations++;
      }

      let result = "";
      for (let i = 0; i < finalText.length; i++) {
        if (i < currentIndex) {
          result += finalText[i];
        } else if (i === currentIndex) {
          if (iterations > 0 && Math.random() < 0.8) {
            result += finalText[i];
            currentIndex++;
          } else {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
          }
        } else if (i > currentIndex) {
          if (iterations === 0 && Math.random() < 0.7) {
            result += " ";
          } else {
            if (Math.random() < 0.3) {
              result += characters.charAt(Math.floor(Math.random() * characters.length));
            } else {
              result += " ";
            }
          }
        }
      }

      setDisplayText(result);
    }, intervalDuration);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [text, duration]);

  return <span className={`hacker-text ${isComplete ? "" : "hacker-text--animate"}`}>{displayText}</span>;
}


function ContactBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0); 
      ctx.scale(dpr, dpr);
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    const particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      opacity: number;
      life: number;
    }[] = [];
    const maxParticles = 30;

    const createParticle = () => {
      return {
        x: Math.random() * window.innerWidth,
        y: window.innerHeight + 20,
        vx: (Math.random() - 0.5) * 0.5,
        vy: -Math.random() * 1 - 0.5,
        radius: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.3,
        life: 1,
      };
    };

    for (let i = 0; i < maxParticles; i++) particles.push(createParticle());

    let animationFrameId: number;

    const animate = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.001;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 178, 103, ${p.opacity * p.life})`;
        ctx.fill();

        if (p.y < -20 || p.life <= 0) {
          particles.splice(i, 1);
          particles.push(createParticle());
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="contact-background" />;
}


function MainContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    service: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitError, setSubmitError] = useState<string>("");

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) newErrors.name = "El nombre es requerido";
    if (!formData.email.trim()) newErrors.email = "El email es requerido";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email invalido";
    if (!formData.company.trim()) newErrors.company = "La empresa es requerida";
    if (!formData.service) newErrors.service = "Selecciona un servicio";
    if (!formData.message.trim() || formData.message.length < 10)
      newErrors.message = "El mensaje debe tener al menos 10 caracteres";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitError("");

    
    const payload = {
  name: formData.name,
  email: formData.email,
  company: formData.company,
  phone: formData.phone || 'No indicado',
  service: formData.service,
  message: formData.message,
  templateId: 'contact_default',
  subject: `Nueva solicitud (${formData.service}) — ${formData.company}`,
};

    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CONTACT}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json().catch(() => ({}));

      if (response.ok && (result.success ?? true)) {
        setIsSuccess(true);
        setFormData({
          name: "",
          email: "",
          company: "",
          phone: "",
          service: "",
          message: "",
        });
        setTimeout(() => setIsSuccess(false), 5000);
      } else {
        if (response.status === 429) {
          setSubmitError(
            "Has enviado demasiadas solicitudes. Por favor, espera 15 minutos antes de intentar de nuevo."
          );
        } else if (response.status === 400) {
          if (result.errors && Array.isArray(result.errors)) {
            setSubmitError(`Errores en el formulario: ${result.errors.join(", ")}`);
          } else {
            setSubmitError(result.message || "Datos del formulario invalidos. Revisa la informacion.");
          }
        } else if (response.status >= 500) {
          setSubmitError(
            "Error del servidor. Intentalo mas tarde o contacta directamente al +34 682 790 545."
          );
        } else {
          setSubmitError(result.message || "Hubo un error al enviar el mensaje. Intentalo de nuevo.");
        }
      }
    } catch (error: any) {
      console.error("Error enviando formulario:", error);
      if (error instanceof TypeError && String(error.message || "").includes("fetch")) {
        setSubmitError("No se pudo conectar con el servidor. Verifica tu conexion a internet.");
      } else if (error instanceof SyntaxError) {
        setSubmitError("Error en la respuesta del servidor. Intentalo de nuevo.");
      } else {
        setSubmitError("Error inesperado. Intentalo de nuevo o contacta directamente.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
    if (submitError) setSubmitError("");
  };

  if (isSuccess) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="contact-form__success">
        <div className="contact-form__success-content">
          <div className="contact-form__success-icon">
            <CheckCircle />
          </div>
          <h3 className="contact-form__success-title">Mensaje enviado con exito</h3>
          <p className="contact-form__success-description">
            Gracias por contactarnos. Nuestro equipo se pondra en contacto contigo en las proximas 24 horas.
          </p>
        </div>

        <div className="contact-form__success-processing">
          <HackerEffect text="Procesando solicitud..." duration={1000} />
        </div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="contact-form__form">
      {submitError && (
        <div className="contact-form__submit-error">
          <AlertTriangle />
          <p>{submitError}</p>
        </div>
      )}

      <div className="contact-form__row">
        <div className="contact-form__field">
          <label htmlFor="name" className="contact-form__label">
            <User className="contact-form__label-icon" />
            Nombre *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            className={`contact-form__input ${errors.name ? "contact-form__input--error" : ""}`}
            placeholder="Tu nombre completo"
            disabled={isSubmitting}
          />
          {errors.name && <p className="contact-form__error">{errors.name}</p>}
        </div>

        <div className="contact-form__field">
          <label htmlFor="email" className="contact-form__label">
            <Mail className="contact-form__label-icon" />
            Email *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className={`contact-form__input ${errors.email ? "contact-form__input--error" : ""}`}
            placeholder="tu@empresa.com"
            disabled={isSubmitting}
          />
          {errors.email && <p className="contact-form__error">{errors.email}</p>}
        </div>
      </div>

      <div className="contact-form__row">
        <div className="contact-form__field">
          <label htmlFor="company" className="contact-form__label">
            <Building className="contact-form__label-icon" />
            Empresa *
          </label>
          <input
            id="company"
            name="company"
            type="text"
            value={formData.company}
            onChange={handleChange}
            className={`contact-form__input ${errors.company ? "contact-form__input--error" : ""}`}
            placeholder="Nombre de tu empresa"
            disabled={isSubmitting}
          />
          {errors.company && <p className="contact-form__error">{errors.company}</p>}
        </div>

        <div className="contact-form__field">
          <label htmlFor="phone" className="contact-form__label">
            <Phone className="contact-form__label-icon" />
            Telefono (opcional)
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            className="contact-form__input"
            placeholder="+34 600 000 000"
            disabled={isSubmitting}
          />
        </div>
      </div>

      <div className="contact-form__field">
        <label htmlFor="service" className="contact-form__label">
          <Shield className="contact-form__label-icon" />
          Servicio que te interesa *
        </label>
        <select
          id="service"
          name="service"
          value={formData.service}
          onChange={handleChange}
          className={`contact-form__select ${errors.service ? "contact-form__input--error" : ""}`}
          disabled={isSubmitting}
        >
          <option value="">Selecciona un servicio</option>
          <option value="red-team">Red Team - Simulacion de ataques reales</option>
          <option value="perimeter">Evaluacion Perimetral - Analisis de defensas</option>
          <option value="web-pentesting">Pentesting Web - Auditoria de aplicaciones</option>
          <option value="mobile-pentesting">Pentesting Mobile - Seguridad en apps moviles</option>
          <option value="code-review">Revision de Codigo - Analisis de vulnerabilidades</option>
          <option value="consultation">Consultoria General de Ciberseguridad</option>
          <option value="other">Otro (especificar en mensaje)</option>
        </select>
        {errors.service && <p className="contact-form__error">{errors.service}</p>}
      </div>

      <div className="contact-form__field">
        <label htmlFor="message" className="contact-form__label">
          <MessageSquare className="contact-form__label-icon" />
          Mensaje *
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={formData.message}
          onChange={handleChange}
          className={`contact-form__textarea ${errors.message ? "contact-form__input--error" : ""}`}
          placeholder="Cuentanos sobre tu proyecto, necesidades de seguridad, timeline, presupuesto, etc."
          disabled={isSubmitting}
        />
        {errors.message && <p className="contact-form__error">{errors.message}</p>}
      </div>

      <motion.button
        type="submit"
        disabled={isSubmitting}
        className="contact-form__submit"
        whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
        whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
      >
        {isSubmitting ? (
          <>
            <div className="contact-form__spinner"></div>
            <span>Enviando mensaje...</span>
          </>
        ) : (
          <>
            <Send />
            <span>Enviar mensaje</span>
            <ArrowRight className="contact-form__submit-arrow" />
          </>
        )}
      </motion.button>
    </form>
  );
}

export default function ContactForm() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="contact-form">
      <div className="contact-form__container">
        <div className="contact-form__background">
          <ContactBackground />
        </div>

        <div className="contact-form__content" ref={ref}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.6 }}
            className="contact-form__grid"
          >
            {}
            <div className="contact-form__main-card">
              <div className="contact-form__header">
                <h2 className="contact-form__title">
                  <Shield />
                  Solicita tu auditoria
                </h2>
                <p className="contact-form__subtitle">
                  Consulta inicial <strong>completamente gratuita</strong>. Sin compromiso. Te ayudamos a
                  identificar tus necesidades especificas de ciberseguridad.
                </p>
              </div>

              <MainContactForm />
            </div>

            {}
            <div className="contact-form__sidebar">
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="contact-form__info-card"
              >
                <h3 className="contact-form__info-title">
                  <Mail />
                  Informacion de contacto
                </h3>

                <div className="contact-form__info-list">
                  <div className="contact-form__info-item">
                    <MapPin />
                    <div>
                      <p className="contact-form__info-label">Oficina Central</p>
                      <p className="contact-form__info-value">28001 Madrid, España</p>
                    </div>
                  </div>

                  <div className="contact-form__info-item">
                    <Phone />
                    <div>
                      <p className="contact-form__info-label">Telefono</p>
                      <p className="contact-form__info-value">+34 682 790 545</p>
                      <p className="contact-form__info-note">Atencion comercial</p>
                    </div>
                  </div>

                  <div className="contact-form__info-item">
                    <Mail />
                    <div>
                      <p className="contact-form__info-label">Email</p>
                      <p className="contact-form__info-value">info@greenlock.tech</p>
                      <p className="contact-form__info-note">Respuesta en 24h garantizada</p>
                    </div>
                  </div>

                  <div className="contact-form__info-item">
                    <Clock />
                    <div>
                      <p className="contact-form__info-label">Horario</p>
                      <p className="contact-form__info-value">Lunes - Viernes: 9:00 - 18:00</p>
                      <p className="contact-form__info-value">Sabados: 10:00 - 14:00</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="contact-form__emergency-card"
              >
                <div className="contact-form__emergency-header">
                  <div className="contact-form__emergency-icon">
                    <AlertTriangle />
                  </div>
                  <h3 className="contact-form__emergency-title">Emergencias 24/7</h3>
                </div>
                <p className="contact-form__emergency-description">
                  <strong>¿Tu empresa ha sido comprometida?</strong> Para incidentes criticos de seguridad,
                  estamos disponibles 24 horas.
                </p>
                <a href="tel:+34682790545" className="contact-form__emergency-phone-button">
                  <Phone className="contact-form__emergency-phone-icon" />
                  <span className="contact-form__emergency-phone-text">+34 682 790 545</span>
                </a>
                <p className="contact-form__emergency-note">Linea directa de emergencias</p>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="contact-form__guarantees-full-width"
          >
            <h4 className="contact-form__guarantees-title">Nuestro compromiso contigo:</h4>

            <div className="contact-form__guarantees-content">
              <div className="contact-form__guarantees-left">
                <ul className="contact-form__guarantees-list">
                  {[
                    { text: "Respuesta en menos de 24 horas", icon: Clock },
                    { text: "Consulta inicial gratuita de 30 minutos", icon: CheckCircle },
                    { text: "Presupuesto detallado sin compromiso", icon: CheckCircle },
                    { text: "Confidencialidad absoluta garantizada", icon: Shield },
                  ].map((item, index) => (
                    <li key={index} className="contact-form__guarantees-item">
                      <item.icon />
                      <span>{item.text}</span>
                    </li>
                  ))}
                </ul>

                <div className="contact-form__tip">
                  <p>
                    💡 <strong>Tip:</strong> Cuantos mas detalles nos des, mejor podremos preparar una
                    propuesta para tus necesidades.
                  </p>
                </div>
              </div>

              <div className="contact-form__guarantees-right">
                <ul className="contact-form__guarantees-list">
                  {[
                    { text: "Seguimiento post-implementacion", icon: CheckCircle },
                    { text: "Documentacion tecnica completa", icon: CheckCircle },
                    { text: "Soporte tecnico especializado", icon: CheckCircle },
                    { text: "Certificados de cumplimiento", icon: Shield },
                  ].map((item, index) => (
                    <li key={index} className="contact-form__guarantees-item">
                      <item.icon />
                      <span>{item.text}</span>
                    </li>
                  ))}
                </ul>

                <div className="contact-form__additional-info">
                  <h5 className="contact-form__additional-info-title">¿Por que elegirnos?</h5>
                  <div className="contact-form__stats">
                    <div className="contact-form__stat">
                      <span className="contact-form__stat-number">Equipo</span>
                      <span className="contact-form__stat-label">Certificado</span>
                    </div>
                    <div className="contact-form__stat">
                      <span className="contact-form__stat-number">100%</span>
                      <span className="contact-form__stat-label">Tasa de exito</span>
                    </div>
                    <div className="contact-form__stat">
                      <span className="contact-form__stat-number">24/7</span>
                      <span className="contact-form__stat-label">Monitoreo continuo</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
