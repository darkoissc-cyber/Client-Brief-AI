import React from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className = '',
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-medium rounded-full transition-[background-color,border-color,box-shadow,transform] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2 hover:shadow-[0_0_0_3px_rgba(0,0,0,0.08),0_4px_16px_rgba(0,0,0,0.08)] disabled:opacity-40 disabled:pointer-events-none active:scale-[0.98]';

  const variants = {
    primary:
      'bg-neutral-900 hover:bg-neutral-800 text-white',
    secondary:
      'bg-neutral-900 hover:bg-neutral-800 text-white',
    outline:
      'bg-transparent border border-neutral-900 hover:bg-neutral-100 text-neutral-900',
    ghost:
      'bg-transparent hover:bg-neutral-100 text-neutral-900 hover:text-black',
    danger:
      'bg-red-50 hover:bg-red-100 text-red-600 border border-red-100',
  };

  const sizes = {
    sm: 'px-3.5 py-1.5 text-[13px]',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-7 py-3.5 text-[15px]',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin text-current" />}
      {children}
    </button>
  );
};
