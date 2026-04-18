'use client';

import { useState } from 'react';

export default function Home() {
  const [input, setInput] = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState('');

  async function rewrite() {
  if (!input.trim()) {
    setError('Please type something first.');
    return;
  }

  const today = new Date().toISOString().slice(0, 10);
  const usageKey = `usage_${today}`;

  const isDeveloper =
    typeof window !== 'undefined' &&
    localStorage.getItem('isDeveloper') === 'true';

  if (!isDeveloper) {
    const usage = Number(localStorage.getItem(usageKey) || '0');

    if (usage >= 5) {
      setError('Free limit reached. Upgrade to Pro for unlimited rewrites.');
      setResults(null);
      return;
    }

    localStorage.setItem(usageKey, String(usage + 1));
  }

  setError('');
  setLoading(true);
  setResults(null);

  try {
    const res = await fetch('/api/rewrite', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: input }),
    });

    const data = await res.json();
    if (data.error) throw new Error(data.error);

    setResults(data);
  } catch (e) {
    setError(e.message || 'Something went wrong. Please try again.');
  }

  setLoading(false);
}

  function copy(tone) {
    navigator.clipboard.writeText(results[tone]);
    setCopied(tone);
    setTimeout(() => setCopied(''), 1500);
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) rewrite();
  }

  const tones = [
    { key: 'polite',  label: 'Polite',  color: '#185FA5' },
    { key: 'neutral', label: 'Neutral', color: '#5F5E5A' },
    { key: 'firm',    label: 'Firm',    color: '#853A0B' },
  ];

  return (
    <main style={styles.main}>
      <div style={styles.app}>
        <h1 style={styles.title}>Say It Better at Work</h1>
        <p style={styles.subtitle}>Turn your message into professional workplace communication instantly.</p>

        <textarea
          style={styles.textarea}
          placeholder="e.g. I need you to finish this report by tomorrow"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <p style={styles.hint}>Press Ctrl+Enter (or Cmd+Enter on Mac) to rewrite quickly.</p>

        <button style={styles.btn} onClick={rewrite} disabled={loading}>
          {loading ? 'Rewriting…' : 'Rewrite in 3 tones'}
        </button>

        {error && <p style={styles.error}>{error}</p>}

        {results && (
          <div style={styles.results}>
            {tones.map(({ key, label, color }) => (
              <div key={key} style={styles.card}>
                <div style={styles.cardHeader}>
                  <span style={{ ...styles.cardLabel, color }}>{label}</span>
                  <button style={styles.copyBtn} onClick={() => copy(key)}>
                    {copied === key ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <p style={styles.cardText}>{results[key]}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

const styles = {
  main: {
    minHeight: '100vh',
    background: '#F7F5F0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: '3rem 1rem 4rem',
    fontFamily: "'DM Sans', sans-serif",
  },
  app: { width: '100%', maxWidth: '640px' },
  title: {
    fontFamily: "'Lora', serif",
    fontSize: '28px',
    fontWeight: 500,
    letterSpacing: '-0.02em',
    color: '#1a1a18',
    marginBottom: '6px',
  },
  subtitle: { fontSize: '15px', color: '#6b6b60', marginBottom: '1.5rem' },
  textarea: {
    width: '100%',
    minHeight: '100px',
    padding: '14px 16px',
    fontSize: '15px',
    fontFamily: "'DM Sans', sans-serif",
    color: '#1a1a18',
    background: '#fff',
    border: '1px solid #dddbd4',
    borderRadius: '10px',
    resize: 'vertical',
    outline: 'none',
    lineHeight: '1.6',
    boxSizing: 'border-box',
  },
  hint: { fontSize: '12px', color: '#aaa9a0', marginTop: '6px' },
  btn: {
    marginTop: '12px',
    padding: '11px 26px',
    fontSize: '15px',
    fontWeight: 500,
    background: '#1a1a18',
    color: '#F7F5F0',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  error: { color: '#993C1D', fontSize: '14px', marginTop: '10px' },
  results: { marginTop: '1.75rem', display: 'flex', flexDirection: 'column', gap: '12px' },
  card: {
    background: '#fff',
    border: '1px solid #e8e6df',
    borderRadius: '12px',
    padding: '1rem 1.25rem',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px',
  },
  cardLabel: { fontSize: '11px', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase' },
  copyBtn: {
    fontSize: '12px',
    padding: '3px 10px',
    background: '#F7F5F0',
    color: '#6b6b60',
    border: '1px solid #dddbd4',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  cardText: { fontSize: '15px', color: '#1a1a18', lineHeight: '1.65', margin: 0 },
};
