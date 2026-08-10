'use client';

import React from 'react';
import {
  Sparkles,
  MapPin,
  Briefcase,
  Mail,
  Cpu,
  Layers,
  Database,
  Cloud,
  ArrowUpRight,
  ShieldCheck,
  Zap,
} from 'lucide-react';

interface ProfileSidebarProps {
  onSelectPrompt: (prompt: string) => void;
  sessionId?: string;
}

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

const STARTER_PROMPTS = [
  {
    category: 'Cloud & DevOps',
    icon: Cloud,
    iconColor: 'text-cyan-400',
    prompt: 'How do you design multi-account AWS architecture and cost optimization?',
  },
  {
    category: 'AI & Bedrock',
    icon: Sparkles,
    iconColor: 'text-indigo-400',
    prompt: 'How is this Digital Twin built using AWS Bedrock and S3 memory?',
  },
  {
    category: 'Experience & Impact',
    icon: Briefcase,
    iconColor: 'text-emerald-400',
    prompt: 'Tell me about your 5+ years of experience and key career milestones.',
  },
  {
    category: 'Tech Stack',
    icon: Layers,
    iconColor: 'text-amber-400',
    prompt: 'What are your top skills in Kubernetes, Terraform, and GitOps?',
  },
];

const SKILL_TAGS = [
  'AWS & GCP',
  'Kubernetes (EKS)',
  'Terraform (IaC)',
  'CI/CD & GitOps',
  'AWS Bedrock & GenAI',
  'DevSecOps',
  'FastAPI & Python',
  'Platform Engineering',
];

export default function ProfileSidebar({ onSelectPrompt }: ProfileSidebarProps) {
  return (
    <aside className="w-full lg:w-[360px] flex-shrink-0 flex flex-col gap-4">
      {/* Profile Card */}
      <div className="glass-panel rounded-2xl p-5 relative overflow-hidden shadow-xl border border-white/10">
        {/* Subtle decorative top gradient line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-indigo-500 via-cyan-400 to-emerald-400" />

        {/* Profile Header */}
        <div className="flex items-start gap-3.5 mb-4">
          <div className="relative">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-600 via-indigo-700 to-slate-900 p-0.5 shadow-lg flex items-center justify-center">
              <div className="w-full h-full rounded-[14px] bg-slate-950 flex items-center justify-center text-white font-bold text-xl tracking-wider">
                AP
              </div>
            </div>
            {/* Live Indicator Badge */}
            <span className="absolute -bottom-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-slate-900"></span>
            </span>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <h2 className="text-lg font-bold text-white tracking-tight truncate">
                Ankit Pramanik
              </h2>
              <ShieldCheck className="w-4 h-4 text-indigo-400 flex-shrink-0" />
            </div>
            <p className="text-xs font-medium text-indigo-300">
              Senior DevOps & AI Platform Engineer
            </p>
            <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-400">
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-slate-500" />
                Hyderabad, India
              </span>
              <span>•</span>
              <span className="text-emerald-400 font-medium">5+ Yrs Exp</span>
            </div>
          </div>
        </div>

        {/* Short Bio */}
        <p className="text-xs text-slate-300 leading-relaxed mb-4">
          Specializing in Kubernetes, cloud infrastructure, automation, and AI-powered platform engineering on AWS & GCP.
        </p>

        {/* Social Links */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <a
            href="https://www.linkedin.com/in/ankit-pramanik-devops/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg bg-slate-800/80 hover:bg-indigo-600/30 border border-slate-700/60 hover:border-indigo-500/40 text-slate-300 hover:text-white text-xs transition-all font-medium"
          >
            <LinkedinIcon className="w-3.5 h-3.5 text-[#0A66C2]" />
            <span>LinkedIn</span>
          </a>
          <a
            href="https://github.com/ankit98040"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/60 hover:border-slate-500/40 text-slate-300 hover:text-white text-xs transition-all font-medium"
          >
            <GithubIcon className="w-3.5 h-3.5 text-slate-200" />
            <span>GitHub</span>
          </a>
          <a
            href="mailto:pramanik.85849@gmail.com"
            className="flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg bg-slate-800/80 hover:bg-cyan-600/30 border border-slate-700/60 hover:border-cyan-500/40 text-slate-300 hover:text-white text-xs transition-all font-medium"
          >
            <Mail className="w-3.5 h-3.5 text-cyan-400" />
            <span>Email</span>
          </a>
        </div>

        {/* Specialty Skills Tags */}
        <div className="pt-3 border-t border-slate-800/80">
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Zap className="w-3 h-3 text-indigo-400" />
            Core Competencies
          </div>
          <div className="flex flex-wrap gap-1.5">
            {SKILL_TAGS.map((skill, index) => (
              <span
                key={index}
                className="text-[11px] px-2 py-0.5 rounded-md bg-slate-800/60 text-slate-300 border border-slate-700/40 hover:border-slate-600/70 transition-colors"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Suggested Prompts Card */}
      <div className="glass-panel rounded-2xl p-4 shadow-xl border border-white/10 flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-3">
          <div className="text-xs font-semibold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Suggested Questions</span>
          </div>
          <span className="text-[10px] text-slate-400 font-mono">Click to ask</span>
        </div>

        <div className="space-y-2 flex-1">
          {STARTER_PROMPTS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <button
                key={idx}
                onClick={() => onSelectPrompt(item.prompt)}
                className="w-full text-left p-2.5 rounded-xl bg-slate-900/60 hover:bg-indigo-950/40 border border-slate-800/80 hover:border-indigo-500/40 transition-all group cursor-pointer"
              >
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1 group-hover:text-indigo-300">
                    <Icon className={`w-3 h-3 ${item.iconColor}`} />
                    {item.category}
                  </span>
                  <ArrowUpRight className="w-3 h-3 text-slate-500 group-hover:text-indigo-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
                <p className="text-xs text-slate-300 group-hover:text-white leading-snug line-clamp-2">
                  &ldquo;{item.prompt}&rdquo;
                </p>
              </button>
            );
          })}
        </div>

        {/* Live Architecture Status footer */}
        <div className="mt-4 pt-3 border-t border-slate-800/80">
          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <div className="flex items-center gap-1.5">
              <Cpu className="w-3 h-3 text-indigo-400" />
              <span>AWS Bedrock Nova</span>
            </div>
            <div className="flex items-center gap-1.5 text-emerald-400 font-mono text-[10px]">
              <Database className="w-3 h-3" />
              <span>S3 Memory Active</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
