import React from 'react'
import { Link } from 'react-router-dom'

// ============================================================
// Navbar — Componente de layout global
// ============================================================

const Navbar: React.FC = () => {
  return (
    <nav className="w-full bg-surface border-b border-border">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 font-bold text-xl text-primary hover:opacity-80 transition-opacity duration-300"
        >
          <span>🐾</span>
          <span>Appatinhas</span>
        </Link>

        {/* Nav Links */}
        <div className="flex items-center gap-6">
          <Link
            to="/search"
            className="text-primary/70 hover:text-primary font-medium transition-colors duration-300"
          >
            Encontrar
          </Link>
          <Link
            to="/cadastro"
            className="
              h-10 px-5 rounded-xl
              bg-accent text-white font-bold text-sm
              shadow-lg shadow-accent/20
              hover:scale-[1.02] active:scale-[0.98]
              transition-all duration-300 ease-in-out
              inline-flex items-center
            "
          >
            Cadastrar ONG
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
