import {
  Droplet,
  Lock,
  LayoutDashboard,
  CreditCard,
  FolderOpen,
  BarChart2,
  Car,
  Utensils,
  PiggyBank,
  ShieldCheck,
  Mail,
  KeyRound,
  CheckCircle,
  TrendingUp,
  Star,
} from 'lucide-react'

export type AuthSidePanelVariant = 'default' | 'security' | 'reset'

interface AuthSidePanelProps {
  variant?: AuthSidePanelVariant
}

// ── App Mockup (Login + Signup) ─────────────────────────────────

const sidebarNav = [
  { icon: LayoutDashboard, active: true },
  { icon: CreditCard, active: false },
  { icon: FolderOpen, active: false },
  { icon: BarChart2, active: false },
]

const envelopes = [
  { Icon: Car, name: 'Transport', pct: 63, amount: '₦28.5k' },
  { Icon: Utensils, name: 'Feeding', pct: 61, amount: '₦18.2k' },
  { Icon: PiggyBank, name: 'Savings', pct: 87, amount: '₦52k' },
]

function AppMockupPanel() {
  return (
    <>
      <div className="text-center mb-8">
        <h2 className="text-[26px] font-bold text-white leading-snug tracking-tight mb-2">
          Lock your money.<br />Drip it daily.
        </h2>
        <p className="text-sm" style={{ color: 'rgba(255,255,255,0.65)' }}>
          Financial discipline, automated for you.
        </p>
      </div>

      <div className="relative w-full">
        {/* Floating badge — top left */}
        <div
          className="absolute -left-6 top-8 z-20 flex items-center gap-2 rounded-xl px-3 py-2"
          style={{ background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.6)', boxShadow: '0 8px 24px rgba(0,0,0,0.18)' }}
        >
          <div className="h-7 w-7 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#dcfce7' }}>
            <Droplet className="h-3.5 w-3.5" style={{ color: '#16a34a' }} />
          </div>
          <div>
            <p className="text-xs font-semibold leading-none" style={{ color: '#1a3c28' }}>Drip released</p>
            <p className="text-xs mt-0.5" style={{ color: '#6b7280' }}>₦4,200 today</p>
          </div>
        </div>

        {/* Floating badge — bottom right */}
        <div
          className="absolute -right-4 bottom-10 z-20 flex items-center gap-2 rounded-xl px-3 py-2"
          style={{ background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.6)', boxShadow: '0 8px 24px rgba(0,0,0,0.18)' }}
        >
          <div className="h-7 w-7 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#dcfce7' }}>
            <Lock className="h-3.5 w-3.5" style={{ color: '#15803d' }} />
          </div>
          <div>
            <p className="text-xs font-semibold leading-none" style={{ color: '#1a3c28' }}>Locked</p>
            <p className="text-xs mt-0.5" style={{ color: '#6b7280' }}>₦98,500 safe</p>
          </div>
        </div>

        {/* Browser window */}
        <div className="rounded-2xl overflow-hidden shadow-2xl" style={{ border: '1px solid rgba(255,255,255,0.15)' }}>
          {/* Browser chrome */}
          <div className="flex items-center gap-1.5 px-3 py-2.5" style={{ background: '#1a1a2e' }}>
            <div className="h-2.5 w-2.5 rounded-full bg-red-500" />
            <div className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
            <div className="h-2.5 w-2.5 rounded-full bg-green-500" />
            <div className="flex-1 mx-3 rounded-md px-3 py-1 text-xs"
              style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.4)' }}>
              app.dailydrip.ng
            </div>
          </div>

          <div className="flex" style={{ background: '#f8faf8', minHeight: '280px' }}>
            {/* Sidebar */}
            <div className="flex flex-col items-center gap-4 py-4 px-2.5" style={{ background: '#166534', width: '44px' }}>
              <div className="h-7 w-7 rounded-lg flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.15)' }}>
                <Droplet className="h-4 w-4 text-white" />
              </div>
              <div className="flex flex-col gap-3 mt-2">
                {sidebarNav.map(({ icon: Icon, active }, i) => (
                  <div key={i} className="h-7 w-7 rounded-lg flex items-center justify-center cursor-pointer"
                    style={{ background: active ? 'rgba(255,255,255,0.2)' : 'transparent' }}>
                    <Icon className="h-3.5 w-3.5 text-white" style={{ opacity: active ? 1 : 0.5 }} />
                  </div>
                ))}
              </div>
            </div>

            {/* Dashboard content */}
            <div className="flex-1 p-4 flex flex-col gap-3">
              <div className="rounded-xl p-3" style={{ background: 'linear-gradient(135deg, #16a34a, #15803d)' }}>
                <p className="text-xs mb-0.5" style={{ color: 'rgba(255,255,255,0.7)' }}>Total Balance</p>
                <p className="text-white font-bold text-lg leading-none">₦143,700</p>
                <div className="flex gap-2 mt-2">
                  <div className="rounded-lg px-2 py-1" style={{ background: 'rgba(255,255,255,0.15)' }}>
                    <p className="text-white text-xs font-medium">₦45,200 free</p>
                  </div>
                  <div className="rounded-lg px-2 py-1" style={{ background: 'rgba(255,255,255,0.15)' }}>
                    <p className="text-white text-xs font-medium">₦98,500 locked</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                {envelopes.map(({ Icon, name, pct, amount }) => (
                  <div key={name} className="rounded-xl px-3 py-2" style={{ background: '#fff', border: '1px solid #e8f5e9' }}>
                    <div className="flex justify-between items-center mb-1.5">
                      <div className="flex items-center gap-1.5">
                        <Icon className="h-3 w-3" style={{ color: '#16a34a' }} />
                        <span className="text-xs font-medium" style={{ color: '#1a3c28' }}>{name}</span>
                      </div>
                      <span className="text-xs" style={{ color: '#6b7280' }}>{amount}</span>
                    </div>
                    <div className="h-1.5 rounded-full" style={{ background: '#e8f5e9' }}>
                      <div className="h-full rounded-full" style={{ width: `${pct}%`, background: '#16a34a' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-8 mt-8">
        {[{ value: '50K+', label: 'Users' }, { value: '₦2.4B+', label: 'Saved' }, { value: '94%', label: 'On budget' }].map(({ value, label }) => (
          <div key={label} className="text-center">
            <p className="text-white font-bold text-base leading-none">{value}</p>
            <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.55)' }}>{label}</p>
          </div>
        ))}
      </div>
    </>
  )
}

// ── Security Panel (Forgot Password) ───────────────────────────

const resetSteps = [
  { icon: Mail, label: 'Enter your email', desc: 'We find your account securely' },
  { icon: KeyRound, label: 'Get a reset link', desc: 'Arrives in your inbox in seconds' },
  { icon: Lock, label: 'Set new password', desc: 'Choose something strong' },
  { icon: CheckCircle, label: 'Back in business', desc: 'Log in with your new password' },
]

function SecurityPanel() {
  return (
    <>
      <div className="text-center mb-10">
        <h2 className="text-[26px] font-bold text-white leading-snug tracking-tight mb-2">
          Your account is<br />always protected.
        </h2>
        <p className="text-sm" style={{ color: 'rgba(255,255,255,0.65)' }}>
          Secure, fast, and effortless recovery.
        </p>
      </div>

      {/* Shield hero */}
      <div className="flex justify-center mb-8">
        <div className="relative">
          <div className="h-24 w-24 rounded-full flex items-center justify-center"
            style={{ background: 'rgba(255,255,255,0.12)', border: '2px solid rgba(255,255,255,0.2)' }}>
            <div className="h-16 w-16 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(255,255,255,0.92)', boxShadow: '0 8px 32px rgba(0,0,0,0.2)' }}>
              <ShieldCheck className="h-8 w-8" style={{ color: '#16a34a' }} />
            </div>
          </div>
          {/* Pulse ring */}
          <div className="absolute inset-0 rounded-full animate-ping"
            style={{ background: 'rgba(255,255,255,0.08)', animationDuration: '2s' }} />
        </div>
      </div>

      {/* Steps */}
      <div className="w-full space-y-3">
        {resetSteps.map(({ icon: Icon, label, desc }, i) => (
          <div key={label} className="flex items-center gap-3 rounded-2xl px-4 py-3"
            style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)' }}>
            <div className="h-8 w-8 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(255,255,255,0.92)', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>
              <Icon className="h-3.5 w-3.5" style={{ color: '#16a34a' }} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-xs font-semibold">{label}</p>
              <p className="text-xs" style={{ color: 'rgba(255,255,255,0.6)' }}>{desc}</p>
            </div>
            <div className="h-5 w-5 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(255,255,255,0.15)' }}>
              <span className="text-white text-xs font-bold">{i + 1}</span>
            </div>
          </div>
        ))}
      </div>

      {/* SSL badge */}
      <div className="mt-8 flex items-center gap-2 rounded-xl px-4 py-2.5"
        style={{ background: 'rgba(255,255,255,0.92)', boxShadow: '0 4px 16px rgba(0,0,0,0.15)' }}>
        <Lock className="h-4 w-4 flex-shrink-0" style={{ color: '#16a34a' }} />
        <p className="text-xs font-semibold" style={{ color: '#1a3c28' }}>256-bit SSL Encrypted · Tokens expire in 1 hour</p>
      </div>
    </>
  )
}

// ── Motivation Panel (Reset Password) ──────────────────────────

const bars = [38, 55, 42, 68, 51, 74, 87]
const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S']

function ResetPanel() {
  return (
    <>
      <div className="text-center mb-8">
        <h2 className="text-[26px] font-bold text-white leading-snug tracking-tight mb-2">
          A fresh start<br />awaits you.
        </h2>
        <p className="text-sm" style={{ color: 'rgba(255,255,255,0.65)' }}>
          Thousands are already winning with DailyDrip.
        </p>
      </div>

      {/* Savings chart card */}
      <div className="w-full rounded-2xl p-5 mb-4"
        style={{ background: 'rgba(255,255,255,0.92)', boxShadow: '0 12px 40px rgba(0,0,0,0.2)' }}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-xs font-medium" style={{ color: '#6b7280' }}>Avg. weekly savings</p>
            <p className="text-xl font-bold" style={{ color: '#1a3c28' }}>₦47,200</p>
          </div>
          <div className="flex items-center gap-1 rounded-full px-2.5 py-1" style={{ background: '#dcfce7' }}>
            <TrendingUp className="h-3 w-3" style={{ color: '#16a34a' }} />
            <span className="text-xs font-semibold" style={{ color: '#16a34a' }}>+23%</span>
          </div>
        </div>

        {/* Bar chart */}
        <div className="flex items-end gap-1.5" style={{ height: '72px' }}>
          {bars.map((h, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full rounded-t-md"
                style={{ height: `${h}%`, background: i === 6 ? '#16a34a' : '#e8f5e9' }} />
              <span className="text-xs" style={{ color: '#9ca3af' }}>{days[i]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonial card */}
      <div className="w-full rounded-2xl p-4"
        style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)' }}>
        <div className="flex gap-0.5 mb-2">
          {[...Array(5)].map((_, i) => <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />)}
        </div>
        <p className="text-sm text-white leading-relaxed mb-3" style={{ color: 'rgba(255,255,255,0.9)' }}>
          &ldquo;After resetting my password I came back and saved ₦120,000 in just 3 months. Best decision ever.&rdquo;
        </p>
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold text-white"
            style={{ background: 'rgba(255,255,255,0.2)' }}>A</div>
          <div>
            <p className="text-white text-xs font-semibold">Amaka B.</p>
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.55)' }}>Port Harcourt, Nigeria</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-8 mt-8">
        {[{ value: '₦47K', label: 'Avg. saved/mo' }, { value: '30 days', label: 'To new habits' }, { value: '94%', label: 'Stay on track' }].map(({ value, label }) => (
          <div key={label} className="text-center">
            <p className="text-white font-bold text-base leading-none">{value}</p>
            <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.55)' }}>{label}</p>
          </div>
        ))}
      </div>
    </>
  )
}

// ── Root Component ──────────────────────────────────────────────

export function AuthSidePanel({ variant = 'default' }: AuthSidePanelProps) {
  return (
    <div
      className="hidden lg:flex lg:flex-1 relative overflow-hidden flex-col items-center justify-center"
      style={{ background: 'linear-gradient(135deg, #16a34a 0%, #15803d 50%, #166534 100%)' }}
    >
      {/* Subtle background circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-80px] right-[-80px] w-[380px] h-[380px] rounded-full"
          style={{ background: 'rgba(255,255,255,0.06)' }} />
        <div className="absolute bottom-[-100px] left-[-60px] w-[320px] h-[320px] rounded-full"
          style={{ background: 'rgba(255,255,255,0.05)' }} />
        <div className="absolute top-[40%] left-[10%] w-[180px] h-[180px] rounded-full"
          style={{ background: 'rgba(255,255,255,0.04)' }} />
      </div>

      <div className="relative z-10 flex flex-col items-center px-10 w-full max-w-[480px]">
        {variant === 'default' && <AppMockupPanel />}
        {variant === 'security' && <SecurityPanel />}
        {variant === 'reset' && <ResetPanel />}
      </div>
    </div>
  )
}
