import React from 'react'

// ============================================================
// Admin Page — "God Mode" para moderação do sistema
// Rota: /admin
// ============================================================

const Admin: React.FC = () => {
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-2xl">🛡️</span>
          <h1 className="text-3xl font-bold text-primary">
            Painel Admin
          </h1>
        </div>
        <p className="text-primary/60">
          Modo de moderação e controle total do sistema.
        </p>
      </div>
    </main>
  )
}

export default Admin
