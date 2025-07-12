// src/components/ui/SectionTitle.tsx
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

interface SectionTitleProps {
  title: string;
  description?: string;
  center?: boolean;
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  animated?: boolean;
}

export default function SectionTitle({
  title,
  description,
  center = false,
  className = '',
  titleClassName = '',
  descriptionClassName = '',
  animated = true,
}: SectionTitleProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const descriptionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.2,
      },
    },
  };

  if (animated) {
    return (
      <motion.div
        ref={ref}
        className={`mb-12 ${center ? 'text-center' : ''} ${className}`}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <motion.h2
          className={`text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl ${titleClassName}`}
          variants={titleVariants}
        >
          {title}
        </motion.h2>
        {description && (
          <motion.p
            className={`mt-4 text-lg text-gray-600 max-w-3xl ${center ? 'mx-auto' : ''} ${descriptionClassName}`}
            variants={descriptionVariants}
          >
            {description}
          </motion.p>
        )}
      </motion.div>
    );
  }

  return (
    <div className={`mb-12 ${center ? 'text-center' : ''} ${className}`}>
      <h2
        className={`text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl ${titleClassName}`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 text-lg text-gray-600 max-w-3xl ${center ? 'mx-auto' : ''} ${descriptionClassName}`}
        >
          {description}
        </p>
      )}
    </div>
  );
}