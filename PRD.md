# 🐾 Appatinhas - PRD (Product Requirements Document)

## 1. Visão Geral

O **Appatinhas** é um ecossistema SaaS premium para gestão de ONGs de proteção animal e facilitação de adoções. O foco é transformar a experiência caótica de adoção em algo fluido, tecnológico e acolhedor.

**CEO & Brand Mascot:** Nina (Uma gata que personifica a inteligência e o carinho da plataforma).

---

## 2. Tech Stack (Definições de Arquitetura)

- **Frontend:** React.js (Vite) + TypeScript.
- **Estilização:** Tailwind CSS (Design System "Soft-Tech").
- **Backend/Database:** Supabase (PostgreSQL + Auth + Storage).
- **Animações:** Framer Motion (Interações suaves e premium).
- **Ícones:** Lucide React.

---

## 3. Identidade Visual (Design System)

As cores devem ser seguidas rigorosamente em todos os componentes:

- **Primary:** `#1B3737` (Verde Petróleo profundo - Confiança e Profissionalismo).
- **Accent:** `#FF6B35` (Laranja Vibrante - Energia e Ação).
- **Background:** `#F9F8F6` (Off-white - Conforto visual).
- **Tipografia:** Inter ou Geist (Sans-serif moderna).

---

## 4. Estrutura de Dados (Supabase)

O Antigravity deve considerar estas tabelas principais:

1. `ongs`: (id, nome, cidade, bio, logo_url, pix_key, is_verified).
2. `animals`: (id, ong_id, nome, especie, porte, temperamento, fotos_url, status).
3. `adoption_requests`: (id, user_id, animal_id, status, message).

---

## 5. Mapa de Telas (Fluxo de Navegação)

1. **Home (`/`):** Busca inteligente por localização (Bauru, Dois Córregos, Pederneiras).
2. **Resultados (`/search`):** Grid de ONGs e Animais com filtros avançados.
3. **Onboarding (`/cadastro`):** Fluxo de 4 passos para novas ONGs.
4. **Dashboard (`/dashboard`):** Gestão interna para a ONG (Métricas e Animais).
5. **Admin (`/admin`):** "God Mode" para moderação do sistema.
6. **404 (`*`):** Tela da "Nina Perdida" para erros de rota.

---

## 6. Regras de Negócio e "Skills" do Código

- **Componentização:** Priorizar componentes reutilizáveis em `src/components/ui`.
- **Clean Code:** Código tipado (TS), sem "any", e com nomes de variáveis em inglês.
- **UX Amigável:** Mensagens de erro devem ser escritas pela "Nina" (ex: "Ops! A Nina não encontrou esse osso...").
