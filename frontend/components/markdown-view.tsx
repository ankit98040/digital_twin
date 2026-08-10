'use client';

import React, { useState } from 'react';
import { Copy, Check, Terminal } from 'lucide-react';

interface MarkdownViewProps {
  content: string;
}

export default function MarkdownView({ content }: MarkdownViewProps) {
  // Parse content into blocks (code blocks vs text paragraphs)
  const blocks = parseMarkdownBlocks(content);

  return (
    <div className="space-y-3 text-[14.5px] leading-relaxed text-slate-200">
      {blocks.map((block, idx) => {
        if (block.type === 'code') {
          return (
            <CodeBlock
              key={idx}
              language={block.language || 'code'}
              code={block.content}
            />
          );
        }

        return <TextBlock key={idx} text={block.content} />;
      })}
    </div>
  );
}

function CodeBlock({ language, code }: { language: string; code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code', err);
    }
  };

  return (
    <div className="relative my-3 rounded-xl overflow-hidden border border-slate-700/60 bg-slate-950/80 shadow-md font-mono text-[13px]">
      <div className="flex items-center justify-between px-3.5 py-2 bg-slate-900/90 border-b border-slate-800 text-slate-400 text-xs select-none">
        <div className="flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-indigo-400" />
          <span className="font-semibold uppercase tracking-wider text-[11px] text-slate-300">
            {language}
          </span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 px-2 py-0.5 rounded text-xs text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
          title="Copy code"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <pre className="p-3.5 overflow-x-auto text-emerald-300 leading-normal scrollbar-thin">
        <code>{code}</code>
      </pre>
    </div>
  );
}

function TextBlock({ text }: { text: string }) {
  const lines = text.split('\n');

  return (
    <div className="space-y-1.5">
      {lines.map((line, lineIdx) => {
        const trimmed = line.trim();

        // Empty line
        if (!trimmed) {
          return <div key={lineIdx} className="h-1.5" />;
        }

        // Headings
        if (trimmed.startsWith('### ')) {
          return (
            <h3
              key={lineIdx}
              className="text-base font-semibold text-indigo-300 mt-2 mb-1 flex items-center gap-1.5"
            >
              {renderFormattedInline(trimmed.replace(/^###\s+/, ''))}
            </h3>
          );
        }
        if (trimmed.startsWith('## ')) {
          return (
            <h2
              key={lineIdx}
              className="text-lg font-bold text-slate-100 mt-3 mb-1.5 border-b border-slate-800 pb-1"
            >
              {renderFormattedInline(trimmed.replace(/^##\s+/, ''))}
            </h2>
          );
        }
        if (trimmed.startsWith('# ')) {
          return (
            <h1
              key={lineIdx}
              className="text-xl font-extrabold text-white mt-3 mb-2"
            >
              {renderFormattedInline(trimmed.replace(/^#\s+/, ''))}
            </h1>
          );
        }

        // Bullet point lists
        if (/^[-*•]\s+/.test(trimmed)) {
          return (
            <div key={lineIdx} className="flex items-start gap-2 pl-2">
              <span className="text-indigo-400 text-base leading-none select-none mt-1">
                •
              </span>
              <span className="flex-1">
                {renderFormattedInline(trimmed.replace(/^[-*•]\s+/, ''))}
              </span>
            </div>
          );
        }

        // Numbered list
        const numMatch = trimmed.match(/^(\d+)\.\s+(.*)/);
        if (numMatch) {
          return (
            <div key={lineIdx} className="flex items-start gap-2 pl-2">
              <span className="font-mono text-xs font-bold text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-1.5 py-0.5 rounded select-none mt-0.5">
                {numMatch[1]}
              </span>
              <span className="flex-1">{renderFormattedInline(numMatch[2])}</span>
            </div>
          );
        }

        // Blockquotes
        if (trimmed.startsWith('> ')) {
          return (
            <blockquote
              key={lineIdx}
              className="border-l-2 border-indigo-500/60 bg-indigo-500/5 px-3 py-1.5 rounded-r-lg my-1.5 text-slate-300 italic text-sm"
            >
              {renderFormattedInline(trimmed.replace(/^>\s+/, ''))}
            </blockquote>
          );
        }

        // Standard paragraph line
        return (
          <p key={lineIdx} className="text-slate-200">
            {renderFormattedInline(line)}
          </p>
        );
      })}
    </div>
  );
}

/**
 * Parses markdown inline formats: bold (**text**), italics (*text*), inline code (`code`), and markdown links [text](url)
 */
function renderFormattedInline(text: string): React.ReactNode {
  // Regex to split by inline code, bold, italic, and links
  const tokens = text.split(/(`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)]+\))/g);

  return tokens.map((token, index) => {
    if (!token) return null;

    // Inline code `code`
    if (token.startsWith('`') && token.endsWith('`') && token.length >= 2) {
      return (
        <code
          key={index}
          className="mx-0.5 font-mono text-[13px] px-1.5 py-0.5 rounded-md bg-slate-800/90 text-indigo-300 border border-slate-700/70 select-all"
        >
          {token.slice(1, -1)}
        </code>
      );
    }

    // Bold **text**
    if (token.startsWith('**') && token.endsWith('**') && token.length >= 4) {
      return (
        <strong key={index} className="font-semibold text-slate-50">
          {token.slice(2, -2)}
        </strong>
      );
    }

    // Italic *text*
    if (token.startsWith('*') && token.endsWith('*') && token.length >= 2) {
      return (
        <em key={index} className="italic text-slate-300">
          {token.slice(1, -1)}
        </em>
      );
    }

    // Links [title](url)
    const linkMatch = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      return (
        <a
          key={index}
          href={linkMatch[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-400 hover:text-indigo-300 underline underline-offset-2 transition-colors font-medium"
        >
          {linkMatch[1]}
        </a>
      );
    }

    return <React.Fragment key={index}>{token}</React.Fragment>;
  });
}

/**
 * Splits raw markdown into block chunks of text and fenced code blocks
 */
function parseMarkdownBlocks(content: string): Array<{ type: 'text' | 'code'; content: string; language?: string }> {
  const blocks: Array<{ type: 'text' | 'code'; content: string; language?: string }> = [];
  const lines = content.split('\n');

  let inCodeBlock = false;
  let currentLanguage = '';
  let currentCodeLines: string[] = [];
  let currentTextLines: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.trim().startsWith('```')) {
      if (!inCodeBlock) {
        // Flush previous text
        if (currentTextLines.length > 0) {
          blocks.push({ type: 'text', content: currentTextLines.join('\n') });
          currentTextLines = [];
        }
        inCodeBlock = true;
        currentLanguage = line.trim().replace(/^```/, '').trim();
        currentCodeLines = [];
      } else {
        // End of code block
        blocks.push({
          type: 'code',
          content: currentCodeLines.join('\n'),
          language: currentLanguage || 'code',
        });
        inCodeBlock = false;
        currentLanguage = '';
        currentCodeLines = [];
      }
    } else {
      if (inCodeBlock) {
        currentCodeLines.push(line);
      } else {
        currentTextLines.push(line);
      }
    }
  }

  // Flush remaining buffers
  if (inCodeBlock && currentCodeLines.length > 0) {
    blocks.push({
      type: 'code',
      content: currentCodeLines.join('\n'),
      language: currentLanguage || 'code',
    });
  } else if (currentTextLines.length > 0) {
    blocks.push({ type: 'text', content: currentTextLines.join('\n') });
  }

  return blocks;
}
