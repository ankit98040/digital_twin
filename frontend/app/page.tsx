import Twin from '@/components/twin';
import { Cpu, Database, ShieldCheck } from 'lucide-react';

function GithubIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function LinkedinIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen relative bg-[#07090e] text-slate-100 flex flex-col justify-between selection:bg-indigo-500/30 selection:text-indigo-200 overflow-x-hidden tech-grid-bg">
      {/* Ambient background glows */}
      <div className="glow-orb-indigo -top-20 -left-20" />
      <div className="glow-orb-cyan top-1/3 -right-20" />

      {/* Top Navigation Bar */}
      <header className="relative z-10 border-b border-white/5 bg-slate-950/70 backdrop-blur-xl px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-500 via-indigo-600 to-cyan-400 p-0.5 flex items-center justify-center shadow-lg shadow-indigo-500/20 overflow-hidden">
              <img
                src="/avatar.jpeg"
                alt="Ankit Pramanik"
                className="w-full h-full object-cover rounded-[10px]"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-sm text-white tracking-tight">
                  Ankit Pramanik
                </span>
                <span className="text-slate-500">/</span>
                <span className="text-xs text-indigo-400 font-medium flex items-center gap-1">
                  AI Digital Twin
                  <ShieldCheck className="w-3 h-3 text-indigo-400" />
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                Senior DevOps & Cloud Platform Engineer
              </p>
            </div>
          </div>

          {/* Header Badges & Quick Links */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden md:flex items-center gap-2 px-2.5 py-1 rounded-full bg-slate-900/80 border border-slate-800 text-[11px] text-slate-300">
              <Cpu className="w-3.5 h-3.5 text-indigo-400" />
              <span>AWS Bedrock</span>
              <span className="text-slate-600">•</span>
              <Database className="w-3.5 h-3.5 text-cyan-400" />
              <span>S3 Memory</span>
            </div>

            <a
              href="https://www.linkedin.com/in/ankit-pramanik-devops/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-colors"
              title="LinkedIn Profile"
            >
              <LinkedinIcon className="w-4 h-4 text-[#0A66C2]" />
            </a>

            <a
              href="https://github.com/ankit98040"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-colors"
              title="GitHub Profile"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <section className="relative z-10 flex-1 px-4 sm:px-8 py-6 flex items-center justify-center">
        <Twin />
      </section>

      {/* Modern Footer */}
      <footer className="relative z-10 border-t border-white/5 bg-slate-950/80 backdrop-blur-md px-4 sm:px-8 py-3 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Built by Ankit Pramanik • Powered by AWS Bedrock, Lambda & Next.js</span>
          </div>
          <div className="text-[11px] text-slate-400 flex items-center gap-3">
            <span>Serverless Architecture</span>
            <span>•</span>
            <span>S3 Long-Term Context</span>
          </div>
        </div>
      </footer>
    </main>
  );
}