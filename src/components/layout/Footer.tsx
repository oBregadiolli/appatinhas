import React from 'react'
import { Link } from 'react-router-dom'

// ============================================================
// Footer — Componente de layout global
// ============================================================

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-surface border-t border-border">
      <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Marca */}
        <div className="flex items-center gap-2 font-bold text-primary">
          <span>🐾</span>
          <span>Appatinhas</span>
        </div>

        {/* Links */}
        <div className="flex items-center gap-6 text-sm text-primary/60">
          <Link to="/search" className="hover:text-primary transition-colors duration-300">
            Encontrar ONGs
          </Link>
          <Link to="/cadastro" className="hover:text-primary transition-colors duration-300">
            Cadastrar ONG
          </Link>
        </div>

        {/* Copyright */}
        <p className="text-sm text-primary/40">
          © {new Date().getFullYear()} Appatinhas. Feito com ❤️ para os animais.
        </p>
      </div>
    </footer>
  )
}

export default Footer
