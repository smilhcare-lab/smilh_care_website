import { useState, useRef, useEffect, useCallback } from 'react'

// ── Icons (inline SVG to avoid any extra deps) ──────────────────────────────
const IconChat = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
  </svg>
)
const IconX = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
)
const IconSend = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
  </svg>
)
const IconSparkle = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L9.5 9.5 2 12l7.5 2.5L12 22l2.5-7.5L22 12l-7.5-2.5z"/>
  </svg>
)

const SUGGESTIONS = [
  "Quels services proposez-vous ?",
  "Comment prendre rendez-vous ?",
  "Zones couvertes en Tunisie ?",
  "Tarifs et remboursements ?",
]

const BOT_INTRO = "Bonjour ! Je suis l'assistant Smilh Care 👋\nComment puis-je vous aider aujourd'hui ?"

export default function ChatBot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { role: 'bot', text: BOT_INTRO, id: 0 }
  ])
  const [input, setInput] = useState('')
  const [streaming, setStreaming] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(true)
  const [unread, setUnread] = useState(0)
  const bottomRef = useRef(null)
  const inputRef = useRef(null)
  const abortRef = useRef(null)
  const msgIdRef = useRef(1)

  // scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // focus input when opened
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 300)
      setUnread(0)
    }
  }, [open])

  const sendMessage = useCallback(async (text) => {
    const userText = text || input.trim()
    if (!userText || streaming) return

    setInput('')
    setShowSuggestions(false)

    const userId = msgIdRef.current++
    const botId = msgIdRef.current++

    setMessages(prev => [
      ...prev,
      { role: 'user', text: userText, id: userId },
      { role: 'bot', text: '', id: botId, streaming: true }
    ])
    setStreaming(true)

    // abort any previous request
    if (abortRef.current) abortRef.current.abort()
    const controller = new AbortController()
    abortRef.current = controller

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userText }),
        signal: controller.signal,
      })

      if (!res.ok) throw new Error(`HTTP ${res.status}`)

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let buffer = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n')
        buffer = lines.pop() // keep incomplete line

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue
          const raw = line.slice(6).trim()
          if (!raw) continue

          try {
            const payload = JSON.parse(raw)

            if (payload.token) {
              setMessages(prev => prev.map(m =>
                m.id === botId
                  ? { ...m, text: m.text + payload.token }
                  : m
              ))
              if (!open) setUnread(n => n + 1)
            }

            if (payload.done) {
              setMessages(prev => prev.map(m =>
                m.id === botId ? { ...m, streaming: false } : m
              ))
            }

            if (payload.error) {
              setMessages(prev => prev.map(m =>
                m.id === botId
                  ? { ...m, text: payload.error, streaming: false, error: true }
                  : m
              ))
            }
          } catch { /* skip malformed */ }
        }
      }
    } catch (err) {
      if (err.name !== 'AbortError') {
        setMessages(prev => prev.map(m =>
          m.id === botId
            ? { ...m, text: 'Connexion impossible. Veuillez réessayer.', streaming: false, error: true }
            : m
        ))
      }
    } finally {
      setStreaming(false)
      setMessages(prev => prev.map(m =>
        m.id === botId ? { ...m, streaming: false } : m
      ))
    }
  }, [input, streaming, open])

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <>
      {/* ── FAB Button ── */}
      <button
        onClick={() => setOpen(o => !o)}
        aria-label={open ? 'Fermer le chat' : 'Ouvrir le chat'}
        style={{
          position: 'fixed',
          bottom: '28px',
          right: '28px',
          zIndex: 9999,
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          border: 'none',
          cursor: 'pointer',
          background: 'linear-gradient(135deg, var(--navy) 0%, var(--navy-light) 100%)',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 32px rgba(27,47,126,0.35)',
          transition: 'transform 0.25s cubic-bezier(0.22,1,0.36,1), box-shadow 0.25s',
          transform: open ? 'rotate(0deg) scale(1)' : 'scale(1)',
        }}
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.08)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
      >
        {/* pulse ring */}
        {!open && (
          <span style={{
            position: 'absolute', inset: 0, borderRadius: '50%',
            animation: 'pulse-ring 2s ease-out infinite',
            pointerEvents: 'none',
          }} />
        )}
        <span style={{
          display: 'flex',
          transition: 'transform 0.25s, opacity 0.2s',
          transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
        }}>
          {open ? <IconX /> : <IconChat />}
        </span>

        {/* unread badge */}
        {!open && unread > 0 && (
          <span style={{
            position: 'absolute', top: '2px', right: '2px',
            background: 'var(--crimson)',
            color: '#fff', fontSize: '10px', fontWeight: 700,
            width: '18px', height: '18px', borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: '2px solid #fff',
          }}>
            {unread > 9 ? '9+' : unread}
          </span>
        )}
      </button>

      {/* ── Chat Window ── */}
      <div
        role="dialog"
        aria-label="Assistant Smilh Care"
        style={{
          position: 'fixed',
          bottom: '104px',
          right: '28px',
          zIndex: 9998,
          width: 'min(380px, calc(100vw - 32px))',
          height: 'min(560px, calc(100dvh - 140px))',
          background: 'var(--warm-white)',
          borderRadius: '20px',
          boxShadow: '0 24px 80px rgba(27,47,126,0.2), 0 4px 16px rgba(27,47,126,0.1)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          border: '1px solid rgba(232,230,225,0.8)',
          // open/close animation
          opacity: open ? 1 : 0,
          transform: open
            ? 'translateY(0) scale(1)'
            : 'translateY(16px) scale(0.96)',
          pointerEvents: open ? 'auto' : 'none',
          transition: 'opacity 0.25s cubic-bezier(0.22,1,0.36,1), transform 0.25s cubic-bezier(0.22,1,0.36,1)',
          transformOrigin: 'bottom right',
        }}
      >
        {/* ── Header ── */}
        <div style={{
          background: 'linear-gradient(135deg, var(--navy-deep) 0%, var(--navy) 60%, var(--navy-light) 100%)',
          padding: '18px 20px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          flexShrink: 0,
        }}>
          {/* Avatar */}
          <div style={{
            width: '40px', height: '40px', borderRadius: '50%',
            background: 'rgba(255,255,255,0.15)',
            border: '2px solid rgba(255,255,255,0.25)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', flexShrink: 0,
          }}>
            <IconSparkle />
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{
              color: '#fff', fontWeight: 700, fontSize: '15px',
              fontFamily: "'DM Serif Display', serif",
              letterSpacing: '-0.01em',
            }}>
              Assistant Smilh Care
            </div>
            <div style={{
              color: 'rgba(255,255,255,0.7)', fontSize: '12px',
              display: 'flex', alignItems: 'center', gap: '5px', marginTop: '2px',
            }}>
              <span style={{
                width: '7px', height: '7px', borderRadius: '50%',
                background: '#4ade80', display: 'inline-block',
                boxShadow: '0 0 6px rgba(74,222,128,0.7)',
              }} />
              En ligne · Répond en français
            </div>
          </div>

          <button
            onClick={() => setOpen(false)}
            aria-label="Fermer"
            style={{
              background: 'rgba(255,255,255,0.1)', border: 'none', cursor: 'pointer',
              color: 'rgba(255,255,255,0.8)', borderRadius: '8px',
              width: '32px', height: '32px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'background 0.15s',
              flexShrink: 0,
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
          >
            <IconX />
          </button>
        </div>

        {/* ── Messages ── */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '16px 16px 8px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          scrollbarWidth: 'thin',
          scrollbarColor: 'var(--border) transparent',
        }}>
          {messages.map((msg) => (
            <div
              key={msg.id}
              style={{
                display: 'flex',
                justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                alignItems: 'flex-end',
                gap: '8px',
                animation: 'fadeUp 0.3s cubic-bezier(0.22,1,0.36,1) both',
              }}
            >
              {msg.role === 'bot' && (
                <div style={{
                  width: '28px', height: '28px', borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--navy-deep), var(--navy-light))',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#fff', flexShrink: 0,
                }}>
                  <IconSparkle />
                </div>
              )}

              <div style={{
                maxWidth: '75%',
                padding: msg.role === 'user' ? '10px 14px' : '12px 14px',
                borderRadius: msg.role === 'user'
                  ? '18px 18px 4px 18px'
                  : '18px 18px 18px 4px',
                background: msg.role === 'user'
                  ? 'linear-gradient(135deg, var(--navy) 0%, var(--navy-light) 100%)'
                  : msg.error
                    ? 'rgba(232,25,75,0.06)'
                    : 'var(--navy-pale)',
                color: msg.role === 'user'
                  ? '#fff'
                  : msg.error ? 'var(--crimson)' : 'var(--ink)',
                fontSize: '14px',
                lineHeight: '1.55',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
                boxShadow: msg.role === 'user'
                  ? '0 4px 16px rgba(27,47,126,0.2)'
                  : '0 2px 8px rgba(27,47,126,0.06)',
                border: msg.error ? '1px solid rgba(232,25,75,0.15)' : 'none',
                transition: 'none',
              }}>
                {msg.text || (msg.streaming ? '' : '…')}
                {/* streaming cursor */}
                {msg.streaming && (
                  <span style={{
                    display: 'inline-block',
                    width: '2px', height: '14px',
                    background: 'var(--navy)',
                    marginLeft: '2px',
                    borderRadius: '1px',
                    animation: 'blink 1s step-end infinite',
                    verticalAlign: 'text-bottom',
                  }} />
                )}
              </div>
            </div>
          ))}

          {/* Suggestion chips */}
          {showSuggestions && !streaming && (
            <div style={{
              display: 'flex', flexWrap: 'wrap', gap: '8px',
              animation: 'fadeIn 0.4s ease both',
              animationDelay: '0.3s',
            }}>
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => sendMessage(s)}
                  style={{
                    padding: '7px 12px',
                    borderRadius: '20px',
                    border: '1.5px solid var(--navy)',
                    background: 'transparent',
                    color: 'var(--navy)',
                    fontSize: '12px',
                    fontWeight: 500,
                    cursor: 'pointer',
                    transition: 'all 0.15s',
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'var(--navy)'
                    e.currentTarget.style.color = '#fff'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'transparent'
                    e.currentTarget.style.color = 'var(--navy)'
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* ── Input ── */}
        <div style={{
          padding: '12px 14px',
          borderTop: '1px solid var(--border)',
          background: 'var(--warm-white)',
          display: 'flex',
          gap: '10px',
          alignItems: 'flex-end',
          flexShrink: 0,
        }}>
          <textarea
            ref={inputRef}
            value={input}
            onChange={e => {
              setInput(e.target.value)
              // auto-resize
              e.target.style.height = 'auto'
              e.target.style.height = Math.min(e.target.scrollHeight, 96) + 'px'
            }}
            onKeyDown={handleKey}
            placeholder="Posez votre question…"
            rows={1}
            disabled={streaming}
            style={{
              flex: 1,
              border: '1.5px solid var(--border)',
              borderRadius: '12px',
              padding: '10px 14px',
              fontSize: '14px',
              fontFamily: "'DM Sans', sans-serif",
              color: 'var(--ink)',
              background: streaming ? '#f5f5f5' : '#fff',
              resize: 'none',
              outline: 'none',
              lineHeight: '1.4',
              overflowY: 'auto',
              maxHeight: '96px',
              transition: 'border-color 0.15s',
              scrollbarWidth: 'none',
            }}
            onFocus={e => e.target.style.borderColor = 'var(--navy)'}
            onBlur={e => e.target.style.borderColor = 'var(--border)'}
          />

          <button
            onClick={() => sendMessage()}
            disabled={!input.trim() || streaming}
            aria-label="Envoyer"
            style={{
              width: '42px', height: '42px', borderRadius: '12px',
              border: 'none', cursor: input.trim() && !streaming ? 'pointer' : 'default',
              background: input.trim() && !streaming
                ? 'linear-gradient(135deg, var(--navy) 0%, var(--navy-light) 100%)'
                : 'var(--border)',
              color: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
              transition: 'background 0.2s, transform 0.15s',
              transform: 'scale(1)',
            }}
            onMouseEnter={e => { if (!streaming && input.trim()) e.currentTarget.style.transform = 'scale(1.08)' }}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            {streaming
              ? <span style={{ width: '16px', height: '16px', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.8s linear infinite', display: 'inline-block' }} />
              : <IconSend />}
          </button>
        </div>

        {/* ── Footer branding ── */}
        <div style={{
          padding: '6px 14px 10px',
          textAlign: 'center',
          fontSize: '11px',
          color: 'var(--muted)',
          fontFamily: "'DM Sans', sans-serif",
          borderTop: '1px solid rgba(232,230,225,0.5)',
          background: 'var(--warm-white)',
          flexShrink: 0,
        }}>
          Propulsé par <strong style={{ color: 'var(--navy)' }}>Smilh Care AI</strong> · Répond en quelques secondes
        </div>
      </div>

      {/* ── Blink keyframe for cursor ── */}
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </>
  )
}
