import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  PawPrint,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Building2,
  MapPin,
  Phone,
  Globe,
  Instagram,
  Upload,
  Heart,
  ShieldCheck,
  Loader2,
  X,
} from 'lucide-react'

// ============================================================
// Onboarding Page — Wizard 4 etapas para cadastro de ONGs
// Rota: /cadastro
// ============================================================

// ── Types ────────────────────────────────────────────────────

type Causa = 'Adoção' | 'Resgate' | 'Castração' | 'Ração' | 'Veterinário' | 'Lar Temporário'

interface FormData {
  // Etapa 1 — Dados da Instituição
  nome: string
  cnpj: string
  tipo: 'ONG' | 'Protetor Individual' | 'Abrigo Municipal' | ''
  descricao: string

  // Etapa 2 — Localização
  cidade: string
  bairro: string
  endereco: string
  cep: string

  // Etapa 3 — Contato & Redes
  whatsapp: string
  email: string
  site: string
  instagram: string

  // Etapa 4 — Causas & Responsável
  causas: Causa[]
  nomeResponsavel: string
  cpfResponsavel: string
  concordaTermos: boolean
}

const INITIAL: FormData = {
  nome: '',
  cnpj: '',
  tipo: '',
  descricao: '',
  cidade: '',
  bairro: '',
  endereco: '',
  cep: '',
  whatsapp: '',
  email: '',
  site: '',
  instagram: '',
  causas: [],
  nomeResponsavel: '',
  cpfResponsavel: '',
  concordaTermos: false,
}

const CIDADES = ['Bauru', 'Dois Córregos', 'Pederneiras', 'Agudos', 'Lençóis Paulista', 'Jaú']
const TIPOS = ['ONG', 'Protetor Individual', 'Abrigo Municipal'] as const
const CAUSAS: Causa[] = ['Adoção', 'Resgate', 'Castração', 'Ração', 'Veterinário', 'Lar Temporário']

const STEPS = [
  { label: 'Instituição', icon: Building2 },
  { label: 'Localização', icon: MapPin },
  { label: 'Contato', icon: Phone },
  { label: 'Finalizar', icon: Heart },
]

// ── Helper components ─────────────────────────────────────────

function Field({
  label,
  children,
  required,
}: {
  label: string
  children: React.ReactNode
  required?: boolean
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-semibold text-slate-700">
        {label}
        {required && <span className="text-accent ml-1">*</span>}
      </label>
      {children}
    </div>
  )
}

const inputCls =
  'w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition'

// ── Steps ─────────────────────────────────────────────────────

function Step1({
  data,
  set,
}: {
  data: FormData
  set: (k: keyof FormData, v: string) => void
}) {
  return (
    <div className="flex flex-col gap-5">
      <Field label="Nome da Instituição" required>
        <input
          className={inputCls}
          placeholder="Ex: ONG Patinhas do Bem"
          value={data.nome}
          onChange={(e) => set('nome', e.target.value)}
        />
      </Field>

      <Field label="Tipo de Organização" required>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {TIPOS.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => set('tipo', t)}
              className={`px-4 py-3 rounded-xl border text-sm font-semibold transition-all ${
                data.tipo === t
                  ? 'bg-primary text-white border-primary shadow-md'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-primary/40 hover:bg-primary/5'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </Field>

      <Field label="CNPJ (opcional para Protetor Individual)">
        <input
          className={inputCls}
          placeholder="00.000.000/0000-00"
          value={data.cnpj}
          onChange={(e) => set('cnpj', e.target.value)}
        />
      </Field>

      <Field label="Descrição breve" required>
        <textarea
          className={`${inputCls} resize-none`}
          rows={4}
          placeholder="Conta um pouco sobre o trabalho da sua instituição, os animais que ajuda e como as pessoas podem colaborar..."
          value={data.descricao}
          onChange={(e) => set('descricao', e.target.value)}
        />
        <span className="text-xs text-slate-400 text-right">{data.descricao.length}/300</span>
      </Field>
    </div>
  )
}

function Step2({
  data,
  set,
}: {
  data: FormData
  set: (k: keyof FormData, v: string) => void
}) {
  return (
    <div className="flex flex-col gap-5">
      <Field label="Cidade" required>
        <select
          className={inputCls}
          value={data.cidade}
          onChange={(e) => set('cidade', e.target.value)}
        >
          <option value="">Selecione a cidade...</option>
          {CIDADES.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </Field>

      <div className="grid grid-cols-2 gap-4">
        <Field label="CEP" required>
          <input
            className={inputCls}
            placeholder="17000-000"
            value={data.cep}
            onChange={(e) => set('cep', e.target.value)}
          />
        </Field>
        <Field label="Bairro">
          <input
            className={inputCls}
            placeholder="Centro"
            value={data.bairro}
            onChange={(e) => set('bairro', e.target.value)}
          />
        </Field>
      </div>

      <Field label="Endereço">
        <input
          className={inputCls}
          placeholder="Rua, número, complemento..."
          value={data.endereco}
          onChange={(e) => set('endereco', e.target.value)}
        />
      </Field>

      {/* Map placeholder */}
      <div className="relative w-full h-44 rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 flex items-center justify-center">
        <div className="flex flex-col items-center gap-2 text-slate-400">
          <MapPin size={32} />
          <span className="text-sm font-medium">
            Preencha o CEP para visualizar no mapa
          </span>
        </div>
      </div>
    </div>
  )
}

function Step3({
  data,
  set,
}: {
  data: FormData
  set: (k: keyof FormData, v: string) => void
}) {
  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="WhatsApp" required>
          <div className="relative">
            <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              className={`${inputCls} pl-9`}
              placeholder="(14) 99999-9999"
              value={data.whatsapp}
              onChange={(e) => set('whatsapp', e.target.value)}
            />
          </div>
        </Field>

        <Field label="E-mail" required>
          <input
            className={inputCls}
            type="email"
            placeholder="contato@ong.org.br"
            value={data.email}
            onChange={(e) => set('email', e.target.value)}
          />
        </Field>
      </div>

      <Field label="Site (opcional)">
        <div className="relative">
          <Globe size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            className={`${inputCls} pl-9`}
            placeholder="https://www.suaong.org.br"
            value={data.site}
            onChange={(e) => set('site', e.target.value)}
          />
        </div>
      </Field>

      <Field label="Instagram (opcional)">
        <div className="relative">
          <Instagram size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            className={`${inputCls} pl-9`}
            placeholder="@suaong"
            value={data.instagram}
            onChange={(e) => set('instagram', e.target.value)}
          />
        </div>
      </Field>

      {/* Upload logo */}
      <Field label="Logo / Foto da Instituição">
        <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 flex flex-col items-center gap-3 text-slate-400 hover:border-primary/40 hover:bg-primary/5 cursor-pointer transition group">
          <div className="w-12 h-12 bg-slate-100 group-hover:bg-primary/10 rounded-full flex items-center justify-center transition">
            <Upload size={22} className="group-hover:text-primary transition" />
          </div>
          <div className="text-center">
            <p className="text-sm font-semibold text-slate-600">Clique para enviar ou arraste aqui</p>
            <p className="text-xs mt-1">PNG, JPG ou WEBP — máximo 2 MB</p>
          </div>
        </div>
      </Field>
    </div>
  )
}

function Step4({
  data,
  set,
  toggleCausa,
}: {
  data: FormData
  set: (k: keyof FormData, v: string | boolean) => void
  toggleCausa: (c: Causa) => void
}) {
  return (
    <div className="flex flex-col gap-6">
      {/* Causas */}
      <Field label="Causas que sua instituição apoia" required>
        <div className="flex flex-wrap gap-2 mt-1">
          {CAUSAS.map((causa) => {
            const active = data.causas.includes(causa)
            return (
              <button
                key={causa}
                type="button"
                onClick={() => toggleCausa(causa)}
                className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all ${
                  active
                    ? 'bg-accent text-white border-accent shadow-md shadow-accent/20'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-accent/40 hover:bg-accent/5'
                }`}
              >
                {active && <X size={12} className="inline mr-1" />}
                {causa}
              </button>
            )
          })}
        </div>
      </Field>

      {/* Responsável */}
      <div className="pt-2 border-t border-slate-100">
        <p className="text-sm font-bold text-slate-700 mb-4">Responsável Legal</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Nome completo" required>
            <input
              className={inputCls}
              placeholder="Maria da Silva"
              value={data.nomeResponsavel}
              onChange={(e) => set('nomeResponsavel', e.target.value)}
            />
          </Field>
          <Field label="CPF" required>
            <input
              className={inputCls}
              placeholder="000.000.000-00"
              value={data.cpfResponsavel}
              onChange={(e) => set('cpfResponsavel', e.target.value)}
            />
          </Field>
        </div>
      </div>

      {/* Termos */}
      <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={data.concordaTermos}
            onChange={(e) => set('concordaTermos', e.target.checked)}
            className="mt-0.5 h-4 w-4 rounded border-slate-300 accent-primary flex-shrink-0"
          />
          <span className="text-sm text-slate-600 leading-relaxed">
            Declaro que as informações fornecidas são verídicas e concordo com os{' '}
            <a href="#" className="text-primary font-semibold underline underline-offset-2">
              Termos de Uso
            </a>{' '}
            e a{' '}
            <a href="#" className="text-primary font-semibold underline underline-offset-2">
              Política de Privacidade
            </a>{' '}
            do Appatinhas.
          </span>
        </label>
      </div>
    </div>
  )
}

// ── Success Screen ─────────────────────────────────────────────

function SuccessScreen({ nome, onBack }: { nome: string; onBack: () => void }) {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col items-center text-center gap-6 py-8">
      <div className="relative">
        <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center">
          <CheckCircle2 size={52} className="text-primary" />
        </div>
        <span className="absolute -top-1 -right-1 text-2xl">🐾</span>
      </div>
      <div>
        <h2 className="text-2xl font-extrabold text-slate-800 mb-2">
          Cadastro enviado!
        </h2>
        <p className="text-slate-500 text-sm max-w-sm leading-relaxed">
          Obrigado, <strong>{nome || 'sua instituição'}</strong>! Nossa equipe vai analisar as informações
          e ativar seu perfil em até <strong>48 horas</strong>. Você receberá um e-mail de confirmação.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={() => navigate('/')}
          className="px-8 py-3 bg-primary text-white rounded-full font-bold text-sm hover:bg-primary/90 transition-all hover:scale-[1.02]"
        >
          Voltar ao início
        </button>
        <button
          onClick={onBack}
          className="px-8 py-3 border border-slate-200 text-slate-600 rounded-full font-semibold text-sm hover:bg-slate-50 transition"
        >
          Novo cadastro
        </button>
      </div>
    </div>
  )
}

// ── Main Component ─────────────────────────────────────────────

export default function Onboarding() {
  const navigate = useNavigate()
  const [step, setStep] = useState(0) // 0–3
  const [done, setDone] = useState(false)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<FormData>(INITIAL)

  function set(k: keyof FormData, v: string | boolean) {
    setData((prev) => ({ ...prev, [k]: v }))
  }

  function toggleCausa(c: Causa) {
    setData((prev) => ({
      ...prev,
      causas: prev.causas.includes(c)
        ? prev.causas.filter((x) => x !== c)
        : [...prev.causas, c],
    }))
  }

  function canAdvance() {
    if (step === 0) return data.nome.trim() && data.tipo && data.descricao.trim()
    if (step === 1) return data.cidade && data.cep.trim()
    if (step === 2) return data.whatsapp.trim() && data.email.trim()
    if (step === 3) return data.causas.length > 0 && data.nomeResponsavel.trim() && data.concordaTermos
    return true
  }

  async function handleNext() {
    if (step < 3) {
      setStep((s) => s + 1)
      return
    }
    // Último passo — simula envio
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1800))
    setLoading(false)
    setDone(true)
  }

  if (done) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-lg bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-12">
          <SuccessScreen nome={data.nome} onBack={() => { setData(INITIAL); setStep(0); setDone(false) }} />
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-start px-4 py-10">

      {/* ── Header ── */}
      <div className="w-full max-w-lg mb-8 flex items-center justify-between">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-slate-500 hover:text-primary text-sm font-semibold transition"
        >
          <ArrowLeft size={16} />
          Voltar
        </button>

        <div className="flex items-center gap-2">
          <div className="bg-primary text-white p-1.5 rounded-lg">
            <PawPrint size={18} />
          </div>
          <span className="font-extrabold text-primary tracking-tight">Appatinhas</span>
        </div>
      </div>

      {/* ── Card ── */}
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">

        {/* Progress bar */}
        <div className="h-1.5 bg-slate-100">
          <div
            className="h-full bg-primary transition-all duration-500 ease-in-out"
            style={{ width: `${((step + 1) / 4) * 100}%` }}
          />
        </div>

        <div className="p-8 md:p-10">

          {/* Step indicators */}
          <div className="flex items-center justify-between mb-8">
            {STEPS.map((s, i) => {
              const Icon = s.icon
              const completed = i < step
              const current = i === step
              return (
                <div key={s.label} className="flex flex-col items-center gap-1.5">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                      completed
                        ? 'bg-primary text-white'
                        : current
                        ? 'bg-primary/10 text-primary ring-2 ring-primary'
                        : 'bg-slate-100 text-slate-400'
                    }`}
                  >
                    {completed ? <CheckCircle2 size={18} /> : <Icon size={18} />}
                  </div>
                  <span
                    className={`text-xs font-semibold hidden sm:block ${
                      current ? 'text-primary' : completed ? 'text-slate-500' : 'text-slate-300'
                    }`}
                  >
                    {s.label}
                  </span>
                </div>
              )
            })}
          </div>

          {/* Step title */}
          <div className="mb-6">
            <p className="text-xs font-bold text-accent uppercase tracking-widest mb-1">
              Passo {step + 1} de {STEPS.length}
            </p>
            <h1 className="text-2xl font-extrabold text-slate-800">
              {step === 0 && 'Dados da Instituição'}
              {step === 1 && 'Onde vocês estão?'}
              {step === 2 && 'Como as pessoas chegam até vocês?'}
              {step === 3 && 'Causas e responsável'}
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              {step === 0 && 'Conte-nos sobre sua organização e o trabalho que realiza.'}
              {step === 1 && 'Informe a localização para que as pessoas possam encontrar vocês.'}
              {step === 2 && 'Adicione os canais de contato e suas redes sociais.'}
              {step === 3 && 'Selecione as causas e confirme os dados do responsável.'}
            </p>
          </div>

          {/* Step content */}
          <div>
            {step === 0 && <Step1 data={data} set={(k, v) => set(k, v as string)} />}
            {step === 1 && <Step2 data={data} set={(k, v) => set(k, v as string)} />}
            {step === 2 && <Step3 data={data} set={(k, v) => set(k, v as string)} />}
            {step === 3 && <Step4 data={data} set={set} toggleCausa={toggleCausa} />}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-100">
            <button
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-slate-200 text-slate-600 text-sm font-semibold hover:bg-slate-50 transition disabled:opacity-0 disabled:pointer-events-none"
            >
              <ArrowLeft size={16} />
              Anterior
            </button>

            <button
              onClick={handleNext}
              disabled={!canAdvance() || loading}
              className="flex items-center gap-2 px-7 py-3 rounded-full bg-primary text-white text-sm font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 hover:scale-[1.03] transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100"
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Enviando...
                </>
              ) : step === 3 ? (
                <>
                  <ShieldCheck size={16} />
                  Enviar Cadastro
                </>
              ) : (
                <>
                  Próximo
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Footer note */}
      <p className="text-xs text-slate-400 mt-6 text-center max-w-xs leading-relaxed">
        Seus dados são protegidos e usados apenas para a aprovação do cadastro no Appatinhas.
      </p>
    </main>
  )
}
