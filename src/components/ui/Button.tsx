import React from 'react'
import { twMerge } from 'tailwind-merge'
import { clsx } from 'clsx'

// ============================================================
// Button — Componente atômico de botão
// Styleguide: h-14, rounded-xl, font-bold, shadow-lg shadow-primary/20
// Micro-interação: hover:scale-[1.02], active:scale-[0.98]
// ============================================================

type ButtonVariant = 'primary' | 'accent' | 'outline' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  children: React.ReactNode
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-white shadow-lg shadow-primary/20 hover:bg-primary/90',
  accent: 'bg-accent text-white shadow-lg shadow-accent/20 hover:bg-accent/90',
  outline: 'bg-transparent border-2 border-primary text-primary hover:bg-primary/5',
  ghost: 'bg-transparent text-primary hover:bg-primary/5',
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'h-10 px-4 text-sm',
  md: 'h-12 px-6 text-base',
  lg: 'h-14 px-8 text-base',
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    variant = 'primary',
    size = 'lg',
    loading = false,
    disabled,
    className,
    children,
    ...props
  }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={twMerge(
          clsx(
            // Base
            'inline-flex items-center justify-center gap-2',
            'rounded-xl font-bold',
            'transition-all duration-300 ease-in-out',
            // Micro-interações do Styleguide
            'hover:scale-[1.02] active:scale-[0.98]',
            'disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100',
            // Variante e tamanho
            variantStyles[variant],
            sizeStyles[size],
            className
          )
        )}
        {...props}
      >
        {loading ? (
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        ) : null}
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button
