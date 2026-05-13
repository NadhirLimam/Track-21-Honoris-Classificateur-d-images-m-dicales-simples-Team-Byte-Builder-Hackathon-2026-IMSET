// src/pages/Landing.jsx
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Brain, Upload, Cpu, BarChart2, ArrowRight, AlertTriangle } from 'lucide-react'
import DisclaimerBanner from '../components/layout/DisclaimerBanner'

function MockScanCard() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.4, duration: 0.5 }}
      className="relative bg-[#0F1623] border border-[#1E2D45] rounded-2xl p-4 w-full max-w-xs overflow-hidden"
    >
      {/* Simulated X-ray image */}
      <div
        className="relative h-40 rounded-xl bg-[#080D14] border border-[#1E2D45] overflow-hidden mb-4 flex items-center justify-center"
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-24 w-24 rounded-full border-4 border-[#1E2D45] opacity-40" />
          <div className="absolute h-16 w-16 rounded-full border-2 border-[#1E2D45] opacity-25" />
        </div>
        {/* Animated scan line */}
        <div
          className="absolute left-0 right-0 h-0.5 bg-primary animate-scan"
          style={{ boxShadow: '0 0 12px 4px rgba(10,132,255,0.5)' }}
        />
        <p className="text-xs text-[#3D5470] z-10">Sample X-Ray</p>
      </div>

      {/* Result */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-lg">🟢</span>
          <div>
            <p className="text-xs text-[#7A90B0]">Result</p>
            <p className="text-sm font-semibold text-[#34D399]">Normal</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs text-[#7A90B0]">Confidence</p>
          <p className="text-sm font-bold font-mono text-[#E8F0FF]">94.2%</p>
        </div>
      </div>

      {/* Gemini snippet */}
      <p className="mt-3 text-[10px] text-[#3D5470] italic leading-relaxed border-t border-[#1E2D45] pt-3">
        "No anomalies detected. Texture appears uniform…"
      </p>
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{ boxShadow: 'inset 0 0 40px rgba(52, 211, 153, 0.05)', border: '1px solid rgba(52, 211, 153, 0.2)' }}
      />
    </motion.div>
  )
}

const FEATURES = [
  {
    icon: Upload,
    title: 'Easy Upload',
    desc: 'Drag & drop medical images (JPEG/PNG/WebP). Instant preview, format validation, up to 20 MB.',
    color: '#0A84FF',
  },
  {
    icon: Cpu,
    title: 'Gemini AI Analysis',
    desc: 'Google Gemini 1.5 Flash classifies the image and returns a detailed natural-language explanation — zero training required.',
    color: '#A78BFA',
  },
  {
    icon: BarChart2,
    title: 'Analytics Dashboard',
    desc: 'Confidence distribution, daily volume, class split over time — all driven by real MongoDB data.',
    color: '#34D399',
  },
]

const STEPS = [
  { num: '01', title: 'Upload', desc: 'Drop a medical image into the upload zone (JPEG, PNG, WebP).' },
  { num: '02', title: 'Gemini Analyzes', desc: 'Google Gemini 1.5 Flash processes the image and returns a confidence score + explanation.' },
  { num: '03', title: 'View Result', desc: 'See the classification, heatmap overlay, and full Gemini explanation card.' },
]

const TECH = ['React 18', 'Node.js', 'MongoDB', 'Express', 'Google Gemini', 'Tailwind']

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#080D14] text-[#E8F0FF]">
      {/* Disclaimer — sticky */}
      <div className="sticky top-0 z-50">
        <DisclaimerBanner />
      </div>

      {/* Navbar */}
      <nav className="border-b border-[#1E2D45] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <Brain size={16} className="text-white" />
          </div>
          <span className="font-bold text-[#E8F0FF]">MedVision AI</span>
        </div>
        <div className="hidden md:flex items-center gap-6 text-sm text-[#7A90B0]">
          <a href="#features" className="hover:text-[#E8F0FF] transition-colors">Features</a>
          <a href="#how"      className="hover:text-[#E8F0FF] transition-colors">How it works</a>
          <a href="#tech"     className="hover:text-[#E8F0FF] transition-colors">Tech stack</a>
        </div>
        <Link
          to="/login"
          className="px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-blue-500 transition-colors"
        >
          Login →
        </Link>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-24 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[rgba(10,132,255,0.1)] border border-[rgba(10,132,255,0.25)] text-xs text-[#0A84FF] font-medium">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            BTS 2026 Hackathon Demo
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            AI-Powered{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-[#22D3EE]">
              Medical Image
            </span>{' '}
            Triage
          </h1>
          <p className="text-[#7A90B0] text-lg leading-relaxed">
            Upload radiological images and get instant classification with a real natural-language
            explanation from <strong className="text-[#A78BFA]">Google Gemini 1.5 Flash</strong>.
            Built for the hackathon — educational use only.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/login"
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-blue-500 transition-all border-glow-primary"
            >
              Start Demo <ArrowRight size={16} />
            </Link>
            <a
              href="#how"
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#161F30] text-[#E8F0FF] font-semibold border border-[#1E2D45] hover:border-[#0A84FF] transition-all"
            >
              How it works
            </a>
          </div>
        </motion.div>

        <div className="flex justify-center">
          <MockScanCard />
        </div>
      </section>

      {/* Features */}
      <section id="features" className="max-w-6xl mx-auto px-6 py-20 border-t border-[#1E2D45]">
        <h2 className="text-2xl font-bold text-center mb-12">Key Features</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {FEATURES.map(({ icon: Icon, title, desc, color }) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="bg-[#0F1623] border border-[#1E2D45] rounded-xl p-6 hover:border-[#2a3f5f] transition-colors"
            >
              <div
                className="h-10 w-10 rounded-xl flex items-center justify-center mb-4"
                style={{ background: `${color}18` }}
              >
                <Icon size={20} style={{ color }} />
              </div>
              <h3 className="font-semibold text-[#E8F0FF] mb-2">{title}</h3>
              <p className="text-sm text-[#7A90B0] leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="max-w-6xl mx-auto px-6 py-20 border-t border-[#1E2D45]">
        <h2 className="text-2xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {STEPS.map(({ num, title, desc }) => (
            <div key={num} className="flex flex-col items-center text-center gap-4">
              <div className="h-12 w-12 rounded-full bg-[rgba(10,132,255,0.1)] border border-[rgba(10,132,255,0.3)] flex items-center justify-center font-bold font-mono text-primary">
                {num}
              </div>
              <h3 className="font-semibold text-[#E8F0FF]">{title}</h3>
              <p className="text-sm text-[#7A90B0]">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tech stack */}
      <section id="tech" className="max-w-6xl mx-auto px-6 py-20 border-t border-[#1E2D45]">
        <h2 className="text-2xl font-bold text-center mb-4">Built With</h2>
        <p className="text-center text-sm text-[#7A90B0] mb-8">
          Powered by{' '}
          <span
            className="font-semibold px-2 py-0.5 rounded-full text-xs"
            style={{
              background: 'linear-gradient(135deg,rgba(10,132,255,0.15),rgba(167,139,250,0.15))',
              border: '1px solid rgba(167,139,250,0.3)',
              color: '#A78BFA',
            }}
          >
            Google Gemini 1.5 Flash
          </span>
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {TECH.map(t => (
            <span
              key={t}
              className="px-4 py-2 rounded-full bg-[#0F1623] border border-[#1E2D45] text-sm text-[#7A90B0] font-medium"
            >
              {t}
            </span>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#1E2D45] px-6 py-10 text-center space-y-3">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Brain size={16} className="text-primary" />
          <span className="font-bold text-[#E8F0FF] text-sm">MedVision AI</span>
        </div>
        <div className="max-w-xl mx-auto p-4 rounded-xl bg-[rgba(251,146,60,0.06)] border border-[rgba(251,146,60,0.15)]">
          <p className="text-xs text-[#7A90B0] flex items-center justify-center gap-1.5">
            <AlertTriangle size={12} className="text-[#FB923C]" />
            <strong className="text-[#FB923C]">Disclaimer:</strong>
            &nbsp;This is an educational prototype created for the BTS 2026 Hackathon. It is NOT a
            medical device, does NOT provide medical diagnoses, and should NEVER be used in clinical
            settings. All AI predictions are simulated demonstrations only.
          </p>
        </div>
        <p className="text-xs text-[#3D5470]">© 2026 MedVision AI · BTS Hackathon</p>
      </footer>
    </div>
  )
}
