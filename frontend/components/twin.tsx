'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Bot,
  User,
  Sparkles,
  RotateCcw,
  Copy,
  Check,
  Download,
  AlertCircle,
  Cpu,
  Layers,
  ArrowRight,
  Database,
  Cloud,
} from 'lucide-react';
import MarkdownView from './markdown-view';
import ProfileSidebar from './profile-sidebar';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const QUICK_CHIPS = [
  'AWS Cost Optimization',
  'Kubernetes & EKS',
  'Bedrock Architecture',
  'DevOps Career',
];

export default function Twin() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string>('');
  const [copiedMsgId, setCopiedMsgId] = useState<string | null>(null);
  const [copiedSession, setCopiedSession] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Adjust textarea height dynamically
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        140
      )}px`;
    }
  }, [input]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend !== undefined ? textToSend : input).trim();
    if (!text || isLoading) return;

    setErrorMessage(null);

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
    setIsLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: text,
          session_id: sessionId || undefined,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.detail || `Server error (${response.status})`
        );
      }

      const data = await response.json();

      if (!sessionId && data.session_id) {
        setSessionId(data.session_id);
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response || 'No response returned.',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error: any) {
      console.error('Chat error:', error);
      const errMsg = error.message || 'Failed to connect to the assistant API.';
      setErrorMessage(errMsg);

      const errorAssistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `⚠️ **Connection Issue:** ${errMsg}\n\nPlease check your network connection or try again in a moment.`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorAssistantMsg]);
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        textareaRef.current?.focus();
      }, 100);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleResetChat = () => {
    if (messages.length === 0) return;
    if (confirm('Start a fresh conversation? This will clear current session messages.')) {
      setMessages([]);
      setSessionId('');
      setErrorMessage(null);
    }
  };

  const handleCopyMessage = async (msgId: string, content: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedMsgId(msgId);
      setTimeout(() => setCopiedMsgId(null), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const handleCopySessionId = async () => {
    if (!sessionId) return;
    try {
      await navigator.clipboard.writeText(sessionId);
      setCopiedSession(true);
      setTimeout(() => setCopiedSession(false), 2000);
    } catch (err) {
      console.error('Failed to copy session id', err);
    }
  };

  const handleExportChat = () => {
    if (messages.length === 0) return;
    const exportData = {
      sessionId: sessionId || 'new-session',
      timestamp: new Date().toISOString(),
      messages: messages.map((m) => ({
        role: m.role,
        content: m.content,
        timestamp: m.timestamp.toISOString(),
      })),
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ankit-twin-chat-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto h-[calc(100vh-140px)] min-h-[640px]">
      {/* Left Profile Sidebar */}
      <ProfileSidebar
        onSelectPrompt={(prompt) => handleSendMessage(prompt)}
        sessionId={sessionId}
      />

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col glass-panel rounded-2xl overflow-hidden shadow-2xl border border-white/10 relative">
        {/* Chat Top Header */}
        <div className="px-5 py-3.5 bg-slate-900/90 border-b border-slate-800/80 flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-500 p-0.5 flex items-center justify-center shadow-md">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Bot className="w-5 h-5 text-indigo-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-white tracking-tight">
                  Ankit&apos;s AI Digital Twin
                </h3>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Online
                </span>
              </div>
              <p className="text-[11px] text-slate-400 flex items-center gap-1.5">
                <Cpu className="w-3 h-3 text-indigo-400" />
                <span>AWS Bedrock Nova 2 Lite</span>
                <span>•</span>
                <Database className="w-3 h-3 text-cyan-400" />
                <span>S3 Memory</span>
              </p>
            </div>
          </div>

          {/* Action Toolbar */}
          <div className="flex items-center gap-2">
            {sessionId && (
              <button
                onClick={handleCopySessionId}
                className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800/70 hover:bg-slate-800 border border-slate-700/60 text-slate-400 hover:text-slate-200 text-xs transition-colors"
                title="Copy Session ID"
              >
                {copiedSession ? (
                  <Check className="w-3 h-3 text-emerald-400" />
                ) : (
                  <Copy className="w-3 h-3" />
                )}
                <span className="font-mono text-[11px]">
                  ID: {sessionId.slice(0, 8)}...
                </span>
              </button>
            )}

            {messages.length > 0 && (
              <>
                <button
                  onClick={handleExportChat}
                  className="p-1.5 rounded-lg bg-slate-800/70 hover:bg-slate-800 border border-slate-700/60 text-slate-400 hover:text-slate-200 transition-colors"
                  title="Export chat history (JSON)"
                >
                  <Download className="w-4 h-4" />
                </button>

                <button
                  onClick={handleResetChat}
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-800/70 hover:bg-rose-950/40 border border-slate-700/60 hover:border-rose-500/40 text-slate-400 hover:text-rose-300 text-xs transition-colors"
                  title="Clear conversation"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">New Chat</span>
                </button>
              </>
            )}
          </div>
        </div>

        {/* Chat Messages Feed */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {messages.length === 0 ? (
            /* Empty State Hero */
            <div className="h-full flex flex-col items-center justify-center text-center max-w-lg mx-auto py-8">
              <div className="relative mb-5">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-500 to-cyan-400 p-0.5 shadow-xl animate-pulse-subtle flex items-center justify-center">
                  <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                    <Sparkles className="w-8 h-8 text-indigo-400" />
                  </div>
                </div>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
                Talk to Ankit&apos;s AI Digital Twin
              </h2>
              <p className="text-sm text-slate-400 mb-6 leading-relaxed">
                I can answer questions about Ankit&apos;s 5+ years of experience in DevOps, Kubernetes, Terraform, AWS Bedrock, and Platform Engineering.
              </p>

              {/* Action Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full text-left">
                <button
                  onClick={() =>
                    handleSendMessage('Tell me about your experience in Cloud & DevOps')
                  }
                  className="p-3.5 rounded-xl bg-slate-900/60 hover:bg-indigo-950/40 border border-slate-800/80 hover:border-indigo-500/40 transition-all text-xs text-slate-300 hover:text-white flex items-start gap-2.5 group cursor-pointer"
                >
                  <Cloud className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-slate-200 block mb-0.5">
                      Cloud & DevOps
                    </span>
                    <span className="text-slate-400 line-clamp-1">
                      Multi-account AWS, EKS, Terraform
                    </span>
                  </div>
                </button>

                <button
                  onClick={() =>
                    handleSendMessage('How did you build this Digital Twin architecture?')
                  }
                  className="p-3.5 rounded-xl bg-slate-900/60 hover:bg-indigo-950/40 border border-slate-800/80 hover:border-indigo-500/40 transition-all text-xs text-slate-300 hover:text-white flex items-start gap-2.5 group cursor-pointer"
                >
                  <Cpu className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-slate-200 block mb-0.5">
                      AI Architecture
                    </span>
                    <span className="text-slate-400 line-clamp-1">
                      AWS Bedrock & S3 Long-term Memory
                    </span>
                  </div>
                </button>

                <button
                  onClick={() =>
                    handleSendMessage('What are your top career achievements?')
                  }
                  className="p-3.5 rounded-xl bg-slate-900/60 hover:bg-indigo-950/40 border border-slate-800/80 hover:border-indigo-500/40 transition-all text-xs text-slate-300 hover:text-white flex items-start gap-2.5 group cursor-pointer"
                >
                  <Layers className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-slate-200 block mb-0.5">
                      Experience & Impact
                    </span>
                    <span className="text-slate-400 line-clamp-1">
                      Cost optimization & Platform scale
                    </span>
                  </div>
                </button>

                <button
                  onClick={() =>
                    handleSendMessage('How can I reach or hire Ankit?')
                  }
                  className="p-3.5 rounded-xl bg-slate-900/60 hover:bg-indigo-950/40 border border-slate-800/80 hover:border-indigo-500/40 transition-all text-xs text-slate-300 hover:text-white flex items-start gap-2.5 group cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-slate-200 block mb-0.5">
                      Contact & Connect
                    </span>
                    <span className="text-slate-400 line-clamp-1">
                      LinkedIn, GitHub & Email
                    </span>
                  </div>
                </button>
              </div>
            </div>
          ) : (
            messages.map((message) => {
              const isUser = message.role === 'user';
              return (
                <div
                  key={message.id}
                  className={`flex gap-3 sm:gap-4 ${
                    isUser ? 'justify-end' : 'justify-start'
                  } group`}
                >
                  {/* Assistant Avatar */}
                  {!isUser && (
                    <div className="flex-shrink-0 mt-0.5">
                      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-600 to-indigo-800 p-0.5 shadow-md flex items-center justify-center">
                        <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                          <Bot className="w-4 h-4 text-indigo-400" />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Message Bubble Container */}
                  <div
                    className={`max-w-[85%] sm:max-w-[78%] flex flex-col ${
                      isUser ? 'items-end' : 'items-start'
                    }`}
                  >
                    <div
                      className={`rounded-2xl px-4 py-3 shadow-lg relative ${
                        isUser
                          ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-tr-sm'
                          : 'bg-slate-900/80 border border-slate-800 text-slate-200 rounded-tl-sm'
                      }`}
                    >
                      {isUser ? (
                        <p className="whitespace-pre-wrap text-sm leading-relaxed">
                          {message.content}
                        </p>
                      ) : (
                        <MarkdownView content={message.content} />
                      )}
                    </div>

                    {/* Message Metadata & Toolbar */}
                    <div
                      className={`flex items-center gap-2 mt-1 px-1 text-[11px] text-slate-500 ${
                        isUser ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      <span>
                        {message.timestamp.toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>

                      {!isUser && (
                        <button
                          onClick={() =>
                            handleCopyMessage(message.id, message.content)
                          }
                          className="opacity-0 group-hover:opacity-100 transition-opacity p-0.5 hover:text-slate-300 text-slate-500 flex items-center gap-1"
                          title="Copy response"
                        >
                          {copiedMsgId === message.id ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-400" />
                              <span className="text-emerald-400 text-[10px]">
                                Copied
                              </span>
                            </>
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </button>
                      )}
                    </div>
                  </div>

                  {/* User Avatar */}
                  {isUser && (
                    <div className="flex-shrink-0 mt-0.5">
                      <div className="w-8 h-8 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300">
                        <User className="w-4 h-4" />
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}

          {/* Thinking / Loading Animation */}
          {isLoading && (
            <div className="flex gap-3 sm:gap-4 justify-start">
              <div className="flex-shrink-0 mt-0.5">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-600 to-indigo-800 p-0.5 shadow-md flex items-center justify-center animate-pulse">
                  <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                    <Bot className="w-4 h-4 text-indigo-400" />
                  </div>
                </div>
              </div>
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl rounded-tl-sm px-4 py-3.5 shadow-lg flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce" />
                  <span className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce [animation-delay:0.2s]" />
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.4s]" />
                </div>
                <span className="text-xs text-slate-400 font-medium">
                  Ankit&apos;s Twin is thinking with AWS Bedrock...
                </span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Chips (when conversation is active) */}
        {messages.length > 0 && (
          <div className="px-4 py-1.5 bg-slate-950/60 border-t border-slate-800/60 flex items-center gap-2 overflow-x-auto scrollbar-none">
            <span className="text-[10px] uppercase font-semibold text-slate-400 flex items-center gap-1 flex-shrink-0">
              <Sparkles className="w-3 h-3 text-amber-400" />
              Suggested:
            </span>
            {QUICK_CHIPS.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(`Tell me about your ${chip}`)}
                className="text-xs px-2.5 py-1 rounded-full bg-slate-900 hover:bg-indigo-950/60 border border-slate-800 hover:border-indigo-500/40 text-slate-300 hover:text-white transition-all flex-shrink-0 cursor-pointer"
              >
                {chip}
              </button>
            ))}
          </div>
        )}

        {/* Input Composer Box */}
        <div className="p-3.5 sm:p-4 bg-slate-950/90 border-t border-slate-800">
          <div className="relative flex items-end gap-2 bg-slate-900/90 border border-slate-700/70 focus-within:border-indigo-500/80 focus-within:ring-2 focus-within:ring-indigo-500/20 rounded-2xl p-2 transition-all shadow-inner">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask Ankit's Twin anything about DevOps, AWS Bedrock, K8s, or Career..."
              rows={1}
              className="flex-1 max-h-36 resize-none bg-transparent px-3 py-1.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none leading-relaxed"
              disabled={isLoading}
            />

            <button
              onClick={() => handleSendMessage()}
              disabled={!input.trim() || isLoading}
              className="p-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-md flex items-center justify-center flex-shrink-0 cursor-pointer"
              title="Send message (Enter)"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

          {/* Keyboard shortcut caption */}
          <div className="flex items-center justify-between mt-2 px-2 text-[11px] text-slate-400">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
              AWS Bedrock • S3 Persistent Memory
            </span>
            <span className="hidden sm:inline font-mono text-[10px]">
              Press <kbd className="bg-slate-800 px-1 py-0.5 rounded text-slate-300">Enter ↵</kbd> to send, <kbd className="bg-slate-800 px-1 py-0.5 rounded text-slate-300">Shift + Enter</kbd> for newline
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}