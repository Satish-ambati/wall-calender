import React from 'react';
import './ThemeSwitcher.css';

const THEMES = [
  { id: 'paper', label: 'Paper', bg: '#f5f0e8', text: '#0d0d0d', icon: '📄' },
  { id: 'night', label: 'Night', bg: '#0d1117', text: '#e6edf3', icon: '🌙' },
  { id: 'forest', label: 'Forest', bg: '#0f1a0f', text: '#c8e6c9', icon: '🌿' },
  { id: 'ocean', label: 'Ocean', bg: '#0a1628', text: '#b3d4f0', icon: '🌊' },
];

export default function ThemeSwitcher({ current, onChange }) {
  return (
    <div className="theme-switcher">
      {THEMES.map(t => (
        <button
          key={t.id}
          className={`theme-btn ${current === t.id ? 'active' : ''}`}
          onClick={() => onChange(t.id)}
          title={t.label}
          style={{ '--th-bg': t.bg, '--th-text': t.text }}
        >
          <span className="theme-icon">{t.icon}</span>
          <span className="theme-label">{t.label}</span>
        </button>
      ))}
    </div>
  );
}

export { THEMES };
