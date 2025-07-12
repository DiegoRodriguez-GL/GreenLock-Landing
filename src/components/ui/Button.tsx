// src/components/ui/Button.tsx
import React from 'react';
import { Link } from 'react-router-dom';

type ButtonProps = {
  children: React.ReactNode;
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  className = '',
  type = 'button',
}: ButtonProps) {
  // Determine classes based on variant and size
  const baseClasses = "font-medium rounded-md transition-all duration-300 inline-flex items-center justify-center";
  
  const variantClasses = {
    primary: "bg-greenlock-500 text-white hover:bg-greenlock-600 shadow-md shadow-greenlock-500/20 hover:shadow-greenlock-500/40",
    outline: "border border-greenlock-500 text-greenlock-400 hover:bg-greenlock-500/10 hover:border-greenlock-400",
    ghost: "text-greenlock-400 hover:bg-greenlock-500/10"
  };
  
  const sizeClasses = {
    sm: "text-sm px-3 py-1.5",
    md: "px-4 py-2",
    lg: "text-lg px-6 py-3"
  };
  
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;
  
  // Render as button or link
  if (href) {
    // Check if it's an external link
    if (href.startsWith('http')) {
      return (
        <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      );
    }
    
    // Internal link (assuming React Router)
    return (
      <Link to={href} className={classes}>
        {children}
      </Link>
    );
  }
  
  // Regular button
  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}