import React, { useState, useCallback, useRef, useEffect } from 'react';
import {
  DAYS_SHORT, HOLIDAYS, getDaysInMonth, getFirstDayOfMonth,
  isSameDay, isInRange, MONTHS
} from '../calendarData';
import './CalendarGrid.css';

export default function CalendarGrid({ year, month, rangeStart, rangeEnd, onDateClick, theme, animDir }) {
  const [hoverDate, setHoverDate] = useState(null);
  const [clickedDay, setClickedDay] = useState(null);
  const gridRef = useRef(null);

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const today = new Date();

  // Days from prev month
  const prevMonthDays = getDaysInMonth(year, month - 1);

  const handleClick = useCallback((date) => {
    setClickedDay(date.getDate());
    setTimeout(() => setClickedDay(null), 300);
    onDateClick(date);
  }, [onDateClick]);

  const getEffectiveEnd = () => {
    if (rangeStart && !rangeEnd && hoverDate) return hoverDate;
    return rangeEnd;
  };

  const cells = [];

  // Prev month filler days
  for (let i = 0; i < firstDay; i++) {
    cells.push({ day: prevMonthDays - firstDay + i + 1, type: 'prev' });
  }

  // Current month days
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, type: 'current' });
  }

  // Next month filler days
  const remaining = 42 - cells.length;
  for (let i = 1; i <= remaining; i++) {
    cells.push({ day: i, type: 'next' });
  }

  const effectiveEnd = getEffectiveEnd();

  return (
    <div className={`calendar-grid-wrap animate-${animDir}`} ref={gridRef}>
      {/* Day headers */}
      <div className="day-headers">
        {DAYS_SHORT.map((d) => (
          <div key={d} className={`day-header ${d === 'Sat' || d === 'Sun' ? 'weekend-header' : ''}`}>
            {d}
          </div>
        ))}
      </div>

      {/* Day cells */}
      <div className="day-cells">
        {cells.map((cell, idx) => {
          if (cell.type !== 'current') {
            return (
              <div key={`${cell.type}-${idx}`} className="day-cell filler">
                <span>{cell.day}</span>
              </div>
            );
          }

          const date = new Date(year, month, cell.day);
          const isToday = isSameDay(date, today);
          const isStart = isSameDay(date, rangeStart);
          const isEnd = isSameDay(date, rangeEnd);
          const inRange = isInRange(date, rangeStart, effectiveEnd);
          const isHovering = isSameDay(date, hoverDate);
          const isRangeHover = rangeStart && !rangeEnd && isInRange(date, rangeStart, hoverDate);
          const isWeekend = date.getDay() === 0 || date.getDay() === 6;
          const holidayKey = `${month + 1}-${cell.day}`;
          const holiday = HOLIDAYS[holidayKey];
          const isClicked = clickedDay === cell.day;

          let classes = 'day-cell current';
          if (isToday) classes += ' today';
          if (isStart) classes += ' range-start';
          if (isEnd) classes += ' range-end';
          if (inRange) classes += ' in-range';
          if (isWeekend) classes += ' weekend';
          if (isHovering) classes += ' hovering';
          if (isRangeHover) classes += ' range-hover';
          if (isClicked) classes += ' clicked';
          if (holiday) classes += ' has-holiday';

          const isEdge = isStart || isEnd;
          const showRangeLeft = inRange || isEnd;
          const showRangeRight = inRange || isStart;

          return (
            <div
              key={`day-${cell.day}`}
              className={classes}
              style={{ '--cell-idx': idx, '--theme-accent': theme.accent }}
              onClick={() => handleClick(date)}
              onMouseEnter={() => setHoverDate(date)}
              onMouseLeave={() => setHoverDate(null)}
            >
              {(inRange || isRangeHover) && (
                <div className="range-bg" />
              )}
              <div className={`day-number ${isEdge ? 'edge-dot' : ''}`}>
                {cell.day}
              </div>
              {isToday && <div className="today-ring" />}
              {holiday && (
                <div className="holiday-dot" title={holiday} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
