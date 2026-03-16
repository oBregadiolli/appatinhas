import React from 'react'
import { twMerge } from 'tailwind-merge'
import { clsx } from 'clsx'

// ============================================================
// Card — Componente atômico de card
// Styleguide: bg-white, border-primary/5, shadow-soft
// ============================================================

interface CardProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  hoverable?: boolean
}

const Card: React.FC<CardProps> = ({ children, className, onClick, hoverable = false }) => {
  return (
    <div
      onClick={onClick}
      className={twMerge(
        clsx(
          // Base Styleguide
          'bg-white rounded-xl',
          'border border-primary/5',
          'shadow-soft',
          // Clickable
          onClick && 'cursor-pointer',
          // Hover state
          hoverable && 'hover:shadow-md hover:border-primary/10 transition-all duration-300 ease-in-out',
          className
        )
      )}
    >
      {children}
    </div>
  )
}

// Sub-componentes para composição semântica
interface CardSectionProps {
  children: React.ReactNode
  className?: string
}

export const CardHeader: React.FC<CardSectionProps> = ({ children, className }) => (
  <div className={twMerge('p-6 pb-0', className)}>
    {children}
  </div>
)

export const CardContent: React.FC<CardSectionProps> = ({ children, className }) => (
  <div className={twMerge('p-6', className)}>
    {children}
  </div>
)

export const CardFooter: React.FC<CardSectionProps> = ({ children, className }) => (
  <div className={twMerge('p-6 pt-0 border-t border-primary/5', className)}>
    {children}
  </div>
)

export default Card
