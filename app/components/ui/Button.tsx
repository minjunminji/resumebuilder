'use client';

import { ButtonHTMLAttributes, forwardRef } from 'react';
import LiquidGlass from 'liquid-glass-react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'glass';
  size?: 'sm' | 'md' | 'lg';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant = 'primary', size = 'md', className = '', ...props }, ref) => {
    const baseClasses = 'font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';

    const sizeClasses = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg',
    };

    const variantClasses = {
      primary: 'bg-accent hover:bg-accent-hover text-white rounded-lg',
      secondary: 'bg-card hover:bg-muted text-foreground rounded-lg border border-border',
      ghost: 'hover:bg-card text-foreground rounded-lg',
      glass: '', // Will use LiquidGlass component
    };

    const buttonContent = (
      <span className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className} inline-flex items-center justify-center gap-2`}>
        {children}
      </span>
    );

    if (variant === 'glass') {
      return (
        <button ref={ref} {...props}>
          <LiquidGlass
            displacementScale={64}
            blurAmount={0.1}
            saturation={130}
            aberrationIntensity={2}
            elasticity={0.35}
            cornerRadius={12}
            padding={size === 'sm' ? '8px 16px' : size === 'md' ? '12px 24px' : '16px 32px'}
            className={className}
          >
            <span className="text-foreground font-medium">{children}</span>
          </LiquidGlass>
        </button>
      );
    }

    return (
      <button ref={ref} className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
