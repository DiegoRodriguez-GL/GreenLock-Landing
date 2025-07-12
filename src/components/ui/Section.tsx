// src/components/ui/Section.tsx
import { ReactNode } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

interface SectionProps {
  id?: string;
  className?: string;
  children: ReactNode;
  bgColor?: string;
  withContainer?: boolean;
  paddingY?: 'sm' | 'md' | 'lg' | 'xl' | 'none';
  animated?: boolean;
}

export default function Section({
  id,
  className = '',
  children,
  bgColor = 'bg-transparent',
  withContainer = true,
  paddingY = 'lg',
  animated = true,
}: SectionProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const paddingYClasses = {
    none: '',
    sm: 'py-6 md:py-8',
    md: 'py-8 md:py-12',
    lg: 'py-12 md:py-16',
    xl: 'py-16 md:py-24',
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        ease: "easeOut" 
      } 
    },
  };

  const content = withContainer ? (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      {children}
    </div>
  ) : (
    children
  );

  if (animated) {
    return (
      <section
        id={id}
        className={`${bgColor} ${paddingYClasses[paddingY]} ${className}`}
        ref={ref}
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {content}
        </motion.div>
      </section>
    );
  }

  return (
    <section
      id={id}
      className={`${bgColor} ${paddingYClasses[paddingY]} ${className}`}
    >
      {content}
    </section>
  );
}