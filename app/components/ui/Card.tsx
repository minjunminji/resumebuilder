'use client';

import { HTMLAttributes, forwardRef } from 'react';
import LiquidGlass from 'liquid-glass-react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  glass?: boolean;
  hover?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ children, glass = false, hover = false, className = '', ...props }, ref) => {
    const baseClasses = 'rounded-xl overflow-hidden';
    const hoverClasses = hover ? 'transition-transform duration-200 hover:scale-[1.02]' : '';

    if (glass) {
      return (
        <div ref={ref} className={`${baseClasses} ${hoverClasses} ${className}`} {...props}>
          <LiquidGlass
            displacementScale={70}
            blurAmount={0.0625}
            saturation={140}
            aberrationIntensity={2}
            elasticity={0.15}
            cornerRadius={16}
          >
            <div className="p-6">
              {children}
            </div>
          </LiquidGlass>
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={`${baseClasses} ${hoverClasses} bg-card border border-border ${className}`}
        {...props}
      >
        <div className="p-6">
          {children}
        </div>
      </div>
    );
  }
);

Card.displayName = 'Card';

export default Card;
