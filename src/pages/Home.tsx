import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  PawPrint,
  Moon,
  Sun,
  MapPin,
  Search,
  ArrowRight,
  Loader2,
  Star,
  ShieldCheck,
  Map,
  Heart,
  Globe,
  Mail,
  Megaphone,
} from 'lucide-react'

// ============================================================
// Home Page — Hero + Busca + Features + CTA
// Rota: /
// ============================================================

const CITIES = ['Bauru', 'Dois Córregos', 'Pederneiras', 'Agudos']

export default function Home() {
  const navigate = useNavigate()
  const [darkMode, setDarkMode] = useState(false)
  const [city, setCity] = useState(CITIES[0])
  const [query, setQuery] = useState('')
  const [searching, setSearching] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  function handleSearch() {
    if (searching) return
    setSearching(true)
    setTimeout(() => {
      setSearching(false)
      navigate(`/search?city=${encodeURIComponent(city)}&q=${encodeURIComponent(query)}`)
    }, 1200)
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') handleSearch()
  }

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="relative min-h-screen flex flex-col bg-background dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors duration-300">

        {/* ── Navigation ── */}
        <header className="fixed top-0 w-full z-50 bg-background/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-primary/10 dark:border-white/10">
          <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

            {/* Logo */}
            <div className="flex items-center gap-2 cursor-pointer group" onClick={() => navigate('/')}>
              <div className="bg-primary text-white p-2 rounded-lg">
                <PawPrint size={24} />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-primary dark:text-white">
                Appatinhas
              </span>
            </div>

            {/* Nav links */}
            <nav className="hidden md:flex items-center gap-8">
              {['Instituições', 'Como Ajudar', 'Sobre Nós'].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-sm font-semibold hover:text-primary dark:hover:text-emerald-400 transition-colors"
                >
                  {link}
                </a>
              ))}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-4">
              {/* Dark mode toggle */}
              <button
                aria-label="Alternar modo escuro"
                onClick={() => setDarkMode((d) => !d)}
                className="p-2 rounded-full hover:bg-primary/5 dark:hover:bg-white/5 transition-colors"
              >
                {darkMode ? <Sun size={22} /> : <Moon size={22} />}
              </button>

              {/* CTA button */}
              <button
                onClick={() => navigate('/cadastro')}
                className="hidden sm:flex bg-primary text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all hover:scale-[1.02]"
              >
                Cadastrar Instituição
              </button>

              {/* Avatar */}
              <div className="h-10 w-10 rounded-full border-2 border-primary/20 p-0.5 overflow-hidden">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuChozX91Hch5_Ajuc4AbfPFmJwdBELfkd6u9-0dyMh6vTluD-JyBoxyxRrfq9KmVbcVQuvFV7daeeVNiPaOWqzjmMx143ehHhmqmxw0CBTyuBZmECyUm_PZTEUZQ8TPTteGMKE1LVTGDQaBhTNAqORIr3uDVjVSNaGe99uw-xU_LWTjWzfo1BgTUfOpmuWfHV1PrTF_ykaFlhDMM4LPAp87YSsiSxLfAj6WngNylIOgKhpsI3Tkll4LjPuSOQ0A2a0ilf7amKUWyj0"
                  alt="User profile"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </div>
          </div>
        </header>

        {/* ── Hero Section ── */}
        <main className="flex-grow pt-32 pb-20 px-6">
          <div className="max-w-7xl mx-auto flex flex-col items-center text-center">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 dark:bg-primary/20 text-primary dark:text-emerald-400 border border-primary/20 mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              <span className="text-xs font-bold uppercase tracking-wider">Nova atualização em Bauru</span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 max-w-4xl leading-[1.1]">
              Pequenas ONGs, <br />
              <span className="text-primary dark:text-emerald-400">grandes heróis.</span>
            </h1>

            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mb-12 leading-relaxed">
              Conectando você às instituições que transformam vidas animais na região de Bauru.
              Doe, adote ou seja voluntário.
            </p>

            {/* Search Bar */}
            <div className="w-full max-w-3xl mb-16">
              <div className="bg-surface dark:bg-slate-800 p-2 rounded-full shadow-2xl shadow-primary/10 flex flex-col md:flex-row items-center gap-2 border border-slate-100 dark:border-slate-700">

                {/* City dropdown */}
                <div className="flex items-center w-full md:w-auto px-4 gap-2 border-r border-slate-200 dark:border-slate-700">
                  <MapPin size={18} className="text-slate-400 shrink-0" />
                  <select
                    aria-label="Selecionar cidade"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="bg-transparent border-none focus:ring-0 text-sm font-semibold w-full md:w-40 text-slate-700 dark:text-slate-200 outline-none"
                  >
                    {CITIES.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </div>

                {/* Text input */}
                <div className="flex items-center flex-1 w-full px-4 gap-2">
                  <Search size={18} className="text-slate-400 shrink-0" />
                  <input
                    ref={inputRef}
                    aria-label="Buscar ONGs por nome ou serviço"
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Buscar ONGs por nome ou serviço..."
                    className="bg-transparent border-none focus:ring-0 w-full text-sm font-medium text-slate-700 dark:text-slate-200 placeholder:text-slate-400 outline-none"
                  />
                </div>

                {/* Search button */}
                <button
                  id="search-button"
                  onClick={handleSearch}
                  disabled={searching}
                  className="w-full md:w-auto bg-primary hover:bg-primary/90 text-white px-8 py-4 md:py-3.5 rounded-full text-sm font-bold transition-all hover:scale-[1.03] active:scale-95 flex items-center justify-center gap-2 disabled:opacity-80 disabled:cursor-not-allowed"
                >
                  {searching ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Buscando...
                    </>
                  ) : (
                    <>
                      Search
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Hero image with testimonial overlay */}
            <div className="relative w-full max-w-5xl rounded-2xl overflow-hidden shadow-2xl group">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB3AvWVhlZk-OVwekW4OoNf7ccY3MCZQn9opAar-8OYFQRfN69NZ-xA8V6B7kjHJdkcLiB4gZ40tl2D88t2evJcXVYl_8YAPHiGDPXH_ULm5b--PK1eGe6ZX8Lmp0e-sO1qo3qpq9WU_KSNePIMktvLtd4oY9J1AUxvLdeCiSZCCs1-4Aa6tjx5WnBES3Tes8Tl3zYW11vfDUB993Trsf_-oTyMW2Z27SDZj7DLVDhogx_0IPmyV26IVRzCBRSIbrPttCgZEYtaEwk"
                alt="Cachorro feliz olhando para a câmera"
                className="w-full aspect-video object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              {/* Gradient overlay + testimonial */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent flex items-end p-8 md:p-12">
                <div className="text-left">
                  <div className="flex gap-1 mb-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={18} className="text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-white text-lg font-medium max-w-md italic">
                    "Graças ao Appatinhas, encontramos o abrigo perfeito para o Max em Pederneiras."
                  </p>
                  <p className="text-white/80 text-sm mt-2 font-semibold">— Família Souza</p>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* ── Features Section ── */}
        <section className="bg-surface dark:bg-slate-900 py-24 px-6 border-t border-slate-100 dark:border-slate-800">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-3 gap-12">

              {/* Feature 1 */}
              <div className="flex flex-col items-start gap-4 p-6 rounded-2xl hover:bg-background dark:hover:bg-slate-800/50 transition-colors">
                <div className="w-14 h-14 bg-primary/5 dark:bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                  <ShieldCheck size={28} />
                </div>
                <h3 className="text-xl font-bold">Transparência Total</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  Verificamos pessoalmente cada instituição cadastrada para garantir que sua ajuda chegue onde é necessária.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="flex flex-col items-start gap-4 p-6 rounded-2xl hover:bg-background dark:hover:bg-slate-800/50 transition-colors">
                <div className="w-14 h-14 bg-primary/5 dark:bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                  <Map size={28} />
                </div>
                <h3 className="text-xl font-bold">Foco Local</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  Apoiamos o ecossistema regional de Bauru, fortalecendo pequenos protetores que muitas vezes não têm visibilidade.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="flex flex-col items-start gap-4 p-6 rounded-2xl hover:bg-background dark:hover:bg-slate-800/50 transition-colors">
                <div className="w-14 h-14 bg-primary/5 dark:bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                  <Heart size={28} />
                </div>
                <h3 className="text-xl font-bold">Múltiplas Formas de Ajudar</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  Seja através de doações financeiras, ração, apadrinhamento ou voluntariado direto nas sedes.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA Section ── */}
        <section className="py-20 px-6">
          <div className="max-w-5xl mx-auto bg-primary rounded-[2.5rem] p-8 md:p-16 relative overflow-hidden text-center text-white">
            {/* Background icon */}
            <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
              <PawPrint size={240} />
            </div>

            <h2 className="text-4xl md:text-5xl font-black mb-6 relative z-10 leading-tight">
              Pronto para ser o herói <br className="hidden md:block" /> de um focinho hoje?
            </h2>
            <p className="text-white/80 text-lg mb-10 max-w-xl mx-auto relative z-10 leading-relaxed">
              Centenas de animais em Bauru e região esperam por um gesto de carinho.
              Junte-se à nossa comunidade de protetores.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
              <button
                onClick={() => navigate('/search')}
                className="w-full sm:w-auto bg-white text-primary px-10 py-4 rounded-full font-bold text-lg hover:bg-slate-50 transition-all hover:scale-[1.05] active:scale-95"
              >
                Explorar ONGs
              </button>
              <button className="w-full sm:w-auto bg-primary/20 backdrop-blur-sm border border-white/20 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-all">
                Ver estatísticas
              </button>
            </div>
          </div>
        </section>

        {/* ── Footer ── */}
        <footer className="bg-background dark:bg-slate-900 py-12 px-6 border-t border-slate-200 dark:border-slate-800">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">

            {/* Brand */}
            <div className="flex items-center gap-2">
              <div className="bg-primary text-white p-1.5 rounded-md">
                <PawPrint size={20} />
              </div>
              <span className="text-lg font-extrabold tracking-tight text-primary dark:text-white uppercase">
                Appatinhas
              </span>
            </div>

            <p className="text-sm text-slate-500 dark:text-slate-400">
              © 2024 Appatinhas. Feito com amor em Bauru.
            </p>

            {/* Social links */}
            <div className="flex gap-6">
              <a href="#" aria-label="Site" className="text-slate-400 hover:text-primary transition-colors">
                <Globe size={22} />
              </a>
              <a href="#" aria-label="E-mail" className="text-slate-400 hover:text-primary transition-colors">
                <Mail size={22} />
              </a>
              <a href="#" aria-label="Campanha" className="text-slate-400 hover:text-primary transition-colors">
                <Megaphone size={22} />
              </a>
            </div>
          </div>
        </footer>

      </div>
    </div>
  )
}
