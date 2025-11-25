'use client'

import { ReactNode } from 'react'
import LiquidGlass from 'liquid-glass-react'

interface GlassButtonProps {
  children: ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'danger'
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  className?: string
}

export function GlassButton({
  children,
  onClick,
  variant = 'primary',
  type = 'button',
  disabled = false,
  className = '',
}: GlassButtonProps) {
  const variantStyles = {
    primary: 'bg-blue-500/20 hover:bg-blue-500/30 text-blue-100',
    secondary: 'bg-white/10 hover:bg-white/20 text-white',
    danger: 'bg-red-500/20 hover:bg-red-500/30 text-red-100',
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      <LiquidGlass
        displacementScale={64}
        blurAmount={0.1}
        saturation={130}
        aberrationIntensity={2}
        elasticity={0.35}
        cornerRadius={100}
        padding="12px 24px"
      >
        <span className={`font-medium ${variantStyles[variant]}`}>
          {children}
        </span>
      </LiquidGlass>
    </button>
  )
}
