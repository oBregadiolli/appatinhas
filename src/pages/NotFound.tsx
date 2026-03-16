import React from 'react'
import { Link } from 'react-router-dom'

// ============================================================
// NotFound Page — Tela da "Nina Perdida" para erros de rota
// Rota: * (fallback)
// ============================================================

const NotFound: React.FC = () => {
  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-8xl mb-6">🐾</div>
        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-primary mb-3">
          Ops! A Nina se perdeu...
        </h2>
        <p className="text-primary/60 mb-8">
          A Nina não encontrou essa página. Talvez ela tenha ido brincar em outro lugar! 🐱
        </p>
        <Link
          to="/"
          className="
            inline-flex items-center justify-center
            h-14 px-8 rounded-xl
            bg-accent text-white font-bold
            shadow-lg shadow-accent/20
            hover:scale-[1.02] active:scale-[0.98]
            transition-all duration-300 ease-in-out
          "
        >
          Voltar para o início
        </Link>
      </div>
    </main>
  )
}

export default NotFound
