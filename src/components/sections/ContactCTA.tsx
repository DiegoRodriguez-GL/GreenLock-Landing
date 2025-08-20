
import { motion } from 'framer-motion';
import { Phone } from 'lucide-react';
import '../../styles/ContactCTA.css';

export default function ContactCTA() {
  return (
    <section className="contact-cta">
      <div className="contact-cta__container">
        <div className="contact-cta__content">
          <h3 className="contact-cta__title">
            ¿Necesita ayuda inmediata?
          </h3>
          <p className="contact-cta__description">
            Si ha detectado actividad sospechosa o cree que su sistema puede estar comprometido, 
            no espere. Contacte con nuestro equipo de respuesta inmediata.
          </p>
          <motion.a
            href="tel:+34900555123"
            className="contact-cta__button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Phone className="contact-cta__button-icon" />
            Llamar ahora: +34 682 790 545
          </motion.a>
        </div>
      </div>
    </section>
  );
}