import { ReactNode, useRef } from 'react';
import LiquidGlass from 'liquid-glass-react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
}

export function GlassCard({ children, className = '', onClick, hover = false }: GlassCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className={className}>
      <LiquidGlass
        mouseContainer={containerRef}
        elasticity={0.2}
        displacementScale={hover ? 60 : 40}
        blurAmount={0.075}
        saturation={130}
        onClick={onClick}
        className={`${onClick ? 'cursor-pointer' : ''} transition-all duration-300 ${
          hover ? 'hover:scale-[1.02]' : ''
        }`}
      >
        {children}
      </LiquidGlass>
    </div>
  );
}
