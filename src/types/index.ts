// ============================================================
// Appatinhas - Type Definitions
// ============================================================

export interface Ong {
  id: string
  nome: string
  cidade: string
  bio: string
  logo_url: string
  pix_key: string
  is_verified: boolean
  created_at: string
}

export interface Animal {
  id: string
  ong_id: string
  nome: string
  especie: 'cachorro' | 'gato' | 'outro'
  porte: 'pequeno' | 'medio' | 'grande'
  temperamento: string
  fotos_url: string[]
  status: 'disponivel' | 'em_adocao' | 'adotado'
  created_at: string
  ong?: Ong
}

export interface AdoptionRequest {
  id: string
  user_id: string
  animal_id: string
  status: 'pendente' | 'aprovado' | 'rejeitado'
  message: string
  created_at: string
  animal?: Animal
}

export interface User {
  id: string
  email: string
  role: 'user' | 'ong_admin' | 'admin'
}

export type City = 'Bauru' | 'Dois Córregos' | 'Pederneiras'

export interface SearchFilters {
  city?: City
  especie?: Animal['especie']
  porte?: Animal['porte']
  query?: string
}
