// src/components/ui/button.tsx
import React from 'react';

type ButtonProps = {
  variant?: 'default' | 'link' | 'feedback' | 'signIn' | 'signUp';
  className?: string;
  children: React.ReactNode;
  onClick?: () => void; // Added onClick handler
};

export const Button: React.FC<ButtonProps> = ({ variant = 'default', className = '', children, onClick }) => {
  const baseStyles = 'px-4 py-2 rounded transition duration-300';
  const variantStyles = variant === 'link'
    ? 'pb-1 hover:text-blue-800 hover:border-red-700 hover:border-b-2'
    : variant === 'feedback'
    ? 'text-blue-800 hover:bg-blue-300 hover:text-blue-900 hover:border-b-2 hover:border-blue-900'
    : variant === 'signIn'
    ? 'bg-primary text-primary-foreground hover:bg-primary-dark hover:text-primary-foreground-dark -px-2'
    : variant === 'signUp'
    ? 'bg-secondary text-secondary-foreground hover:bg-secondary-dark hover:text-secondary-foreground-dark'
    : 'bg-blue-500 text-white hover:bg-blue-600';

  return (
    <button className={`${baseStyles} ${variantStyles} ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};
