import React from 'react'

// ============================================================
// Dashboard Page — Gestão interna da ONG (Métricas e Animais)
// Rota: /dashboard
// ============================================================

const Dashboard: React.FC = () => {
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-primary">
          Dashboard da ONG
        </h1>
        <p className="text-primary/60 mt-1">
          Gerencie seus animais e acompanhe as métricas.
        </p>
      </div>
    </main>
  )
}

export default Dashboard
