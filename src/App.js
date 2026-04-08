import React, { useState, useEffect } from 'react';
import './index.css';
import './App.css';
import Calendar from './components/Calendar';
import ThemeSwitcher from './components/ThemeSwitcher';

export default function App() {
  const [appTheme, setAppTheme] = useState('paper');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('calendar-app-theme');
    if (saved) setAppTheme(saved);
  }, []);

  const handleTheme = (t) => {
    setAppTheme(t);
    localStorage.setItem('calendar-app-theme', t);
  };

  const BG_COLORS = {
    paper: '#1a1714',
    night: '#010409',
    forest: '#050f05',
    ocean: '#020c18',
  };

  return (
    <div
      className={`app-root theme-${appTheme} ${mounted ? 'mounted' : ''}`}
      style={{ background: BG_COLORS[appTheme] }}
    >
      {/* Ambient background orbs */}
      <div className="bg-orbs" aria-hidden="true">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
      </div>

      {/* Header */}
      <header className="app-header">
        <div className="app-logo">
          <div className="logo-mark">◆</div>
          <span className="logo-text">Wall Calendar</span>
        </div>
        <ThemeSwitcher current={appTheme} onChange={handleTheme} />
      </header>

      {/* Main */}
      <main className="app-main">
        <div className="app-tagline" aria-hidden="true">
          <span>— Plan your time —</span>
        </div>
        <Calendar appTheme={appTheme} />
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <span>Built with React</span>
      </footer>
    </div>
  );
}
