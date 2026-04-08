import React, { useState, useEffect } from 'react';
import { HERO_IMAGES, MONTHS, MONTH_THEMES } from '../calendarData';
import './HeroImage.css';

export default function HeroImage({ month, year, theme }) {
  const [loaded, setLoaded] = useState(false);
  const [prevMonth, setPrevMonth] = useState(null);
  const [animating, setAnimating] = useState(false);

  const imgUrl = HERO_IMAGES[month];
  const monthName = MONTHS[month];

  useEffect(() => {
    if (prevMonth !== null && prevMonth !== month) {
      setAnimating(true);
      setLoaded(false);
      const t = setTimeout(() => setAnimating(false), 500);
      return () => clearTimeout(t);
    }
    setPrevMonth(month);
  }, [month]);

  return (
    <div className="hero-wrap" style={{ '--hero-accent': theme.accent }}>
      {/* Spiral rings */}
      <div className="spiral-rings" aria-hidden="true">
        {Array.from({ length: 14 }).map((_, i) => (
          <div key={i} className="ring" style={{ '--ring-i': i }} />
        ))}
      </div>

      {/* Image */}
      <div className={`hero-image-container ${animating ? 'flipping' : ''}`}>
        {!loaded && (
          <div className="image-skeleton">
            <div className="skeleton-shimmer" />
          </div>
        )}
        <img
          src={imgUrl}
          alt={`${monthName} landscape`}
          className={`hero-img ${loaded ? 'visible' : ''}`}
          onLoad={() => setLoaded(true)}
        />
        {/* Overlay gradient */}
        <div className="hero-overlay" style={{ background: `linear-gradient(to bottom, transparent 40%, ${theme.bg}cc 100%)` }} />
        {/* Month label on image */}
        <div className="hero-month-label">
          <span className="hero-year">{year}</span>
          <span className="hero-month-name" style={{ color: theme.accent }}>{monthName}</span>
        </div>
      </div>

      {/* Page curl effect */}
      <div className="page-curl" aria-hidden="true" />
    </div>
  );
}
