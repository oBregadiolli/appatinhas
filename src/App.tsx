import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Results from './pages/Results'
import Onboarding from './pages/Onboarding'
import Dashboard from './pages/Dashboard'
import Admin from './pages/Admin'
import NotFound from './pages/NotFound'

// ============================================================
// App.tsx — Roteamento principal do Appatinhas
// ============================================================

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota pública principal */}
        <Route path="/" element={<Home />} />

        {/* Busca e resultados */}
        <Route path="/search" element={<Results />} />

        {/* Onboarding de novas ONGs */}
        <Route path="/cadastro" element={<Onboarding />} />

        {/* Área logada da ONG */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Painel de administração do sistema */}
        <Route path="/admin" element={<Admin />} />

        {/* Fallback — Nina perdida 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
