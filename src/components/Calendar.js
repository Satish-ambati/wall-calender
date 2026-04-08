import React, { useState, useEffect, useRef } from 'react';
import HeroImage from './HeroImage';
import CalendarGrid from './CalendarGrid';
import Notes from './Notes';
import { MONTHS, MONTH_THEMES, HOLIDAYS, isSameDay, formatDate } from '../calendarData';
import './Calendar.css';

export default function Calendar({ appTheme }) {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [rangeStart, setRangeStart] = useState(null);
  const [rangeEnd, setRangeEnd] = useState(null);
  const [animDir, setAnimDir] = useState('none');
  const [showTooltip, setShowTooltip] = useState(null);
  const [showHolidayList, setShowHolidayList] = useState(false);
  const prevMonthRef = useRef(month);

  const theme = MONTH_THEMES[month];
  const monthKey = `${year}-${month}`;

  const holidaysThisMonth = Object.entries(HOLIDAYS)
    .filter(([k]) => parseInt(k.split('-')[0]) === month + 1)
    .map(([k, v]) => ({ day: parseInt(k.split('-')[1]), name: v }));

  const goNextMonth = () => {
    setAnimDir('forward');
    if (month === 11) { setMonth(0); setYear(y => y + 1); }
    else setMonth(m => m + 1);
  };

  const goPrevMonth = () => {
    setAnimDir('backward');
    if (month === 0) { setMonth(11); setYear(y => y - 1); }
    else setMonth(m => m - 1);
  };

  const goToday = () => {
    const dir = (year * 12 + month) > (today.getFullYear() * 12 + today.getMonth()) ? 'backward' : 'forward';
    setAnimDir(dir);
    setMonth(today.getMonth());
    setYear(today.getFullYear());
  };

  useEffect(() => {
    prevMonthRef.current = month;
  }, [month]);

  const handleDateClick = (date) => {
    if (!rangeStart || (rangeStart && rangeEnd)) {
      setRangeStart(date);
      setRangeEnd(null);
    } else {
      if (isSameDay(date, rangeStart)) {
        setRangeStart(null);
        setRangeEnd(null);
        return;
      }
      if (date < rangeStart) {
        setRangeEnd(rangeStart);
        setRangeStart(date);
      } else {
        setRangeEnd(date);
      }
    }
  };

  const clearRange = () => {
    setRangeStart(null);
    setRangeEnd(null);
  };

  const isCurrentMonth = month === today.getMonth() && year === today.getFullYear();

  return (
    <div
      className="calendar-shell"
      style={{
        '--theme-accent': theme.accent,
        '--theme-bg': appTheme === 'paper' ? 'var(--paper)' :
                      appTheme === 'night' ? '#0d1117' :
                      appTheme === 'forest' ? '#0f1a0f' : '#0a1628',
        '--theme-text': appTheme === 'paper' ? 'var(--ink)' :
                        appTheme === 'night' ? '#e6edf3' :
                        appTheme === 'forest' ? '#c8e6c9' : '#b3d4f0',
        '--card-bg': appTheme === 'paper' ? 'var(--paper)' :
                     appTheme === 'night' ? '#161b22' :
                     appTheme === 'forest' ? '#162016' : '#0e1e32',
        '--border-color': appTheme === 'paper' ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.06)',
      }}
    >
      <div className="calendar-card">
        {/* Top navigation bar */}
        <div className="cal-nav-bar">
          <button className="nav-arrow" onClick={goPrevMonth} aria-label="Previous month">
            <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"/>
            </svg>
          </button>

          <div className="nav-center">
            <button
              className="month-year-btn"
              onClick={() => setShowHolidayList(v => !v)}
              title="Click to see holidays"
            >
              <span className="nav-month">{MONTHS[month]}</span>
              <span className="nav-year">{year}</span>
              {holidaysThisMonth.length > 0 && (
                <span className="holiday-count">{holidaysThisMonth.length}</span>
              )}
            </button>
          </div>

          <button className="nav-arrow" onClick={goNextMonth} aria-label="Next month">
            <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"/>
            </svg>
          </button>
        </div>

        {/* Holiday tooltip */}
        {showHolidayList && holidaysThisMonth.length > 0 && (
          <div className="holiday-list" onClick={() => setShowHolidayList(false)}>
            <div className="holiday-list-title">Holidays in {MONTHS[month]}</div>
            {holidaysThisMonth.map(h => (
              <div key={h.day} className="holiday-item">
                <span className="holiday-day">{h.day}</span>
                <span className="holiday-name">{h.name}</span>
              </div>
            ))}
          </div>
        )}

        {/* Main content area */}
        <div className="cal-body">
          {/* Left: Hero image */}
          <div className="cal-left">
            <HeroImage month={month} year={year} theme={theme} />
          </div>

          {/* Right: Calendar grid + controls */}
          <div className="cal-right">
            {/* Today button & range clear */}
            <div className="cal-toolbar">
              {!isCurrentMonth && (
                <button className="today-btn" onClick={goToday}>
                  Today
                </button>
              )}
              {(rangeStart || rangeEnd) && (
                <button className="clear-range-btn" onClick={clearRange}>
                  <svg viewBox="0 0 16 16" fill="currentColor" width="10" height="10">
                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854z"/>
                  </svg>
                  Clear range
                </button>
              )}
              {rangeStart && !rangeEnd && (
                <span className="picking-hint">
                  From {formatDate(rangeStart)} — pick end date
                </span>
              )}
            </div>

            <CalendarGrid
              year={year}
              month={month}
              rangeStart={rangeStart}
              rangeEnd={rangeEnd}
              onDateClick={handleDateClick}
              theme={theme}
              animDir={animDir}
            />
          </div>
        </div>

        {/* Notes section */}
        <div className="cal-notes-section">
          <Notes
            rangeStart={rangeStart}
            rangeEnd={rangeEnd}
            monthKey={monthKey}
          />
        </div>

        {/* Bottom accent bar */}
        <div className="cal-accent-bar" style={{ background: theme.accent }} />
      </div>
    </div>
  );
}
