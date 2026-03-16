import React from 'react'
import { twMerge } from 'tailwind-merge'
import { clsx } from 'clsx'

// ============================================================
// Input — Componente atômico de campo de texto
// Styleguide: h-14, bg-white, border-primary/10, focus:ring-primary
// ============================================================

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, leftIcon, rightIcon, className, id, ...props }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {/* Label */}
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-semibold text-primary"
          >
            {label}
          </label>
        )}

        {/* Input Wrapper */}
        <div className="relative">
          {/* Left Icon */}
          {leftIcon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/40">
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            className={twMerge(
              clsx(
                // Base Styleguide
                'h-14 w-full rounded-xl',
                'bg-white border border-primary/10',
                'text-primary placeholder:text-primary/30',
                'text-base font-medium',
                'transition-all duration-300 ease-in-out',
                // Focus — ring do Styleguide
                'focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30',
                // Ícone padding
                leftIcon ? 'pl-12' : 'pl-4',
                rightIcon ? 'pr-12' : 'pr-4',
                // Estado de erro
                error && 'border-red-400 focus:ring-red-200 focus:border-red-400',
                className
              )
            )}
            {...props}
          />

          {/* Right Icon */}
          {rightIcon && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-primary/40">
              {rightIcon}
            </div>
          )}
        </div>

        {/* Erro / Hint */}
        {error && (
          <p className="text-sm text-red-500 font-medium">
            {error}
          </p>
        )}
        {hint && !error && (
          <p className="text-sm text-primary/40">
            {hint}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input
