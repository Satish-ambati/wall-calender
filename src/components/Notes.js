import React, { useState, useEffect, useRef } from 'react';
import { formatDate, getDaysBetween } from '../calendarData';
import './Notes.css';

export default function Notes({ rangeStart, rangeEnd, monthKey }) {
  const [notes, setNotes] = useState({});
  const [activeTab, setActiveTab] = useState('range');
  const [newTag, setNewTag] = useState('');
  const [tags, setTags] = useState({});
  const textareaRef = useRef(null);

  // Load from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('calendar-notes');
      if (stored) setNotes(JSON.parse(stored));
      const storedTags = localStorage.getItem('calendar-tags');
      if (storedTags) setTags(JSON.parse(storedTags));
    } catch (e) {}
  }, []);

  const save = (newNotes) => {
    setNotes(newNotes);
    try { localStorage.setItem('calendar-notes', JSON.stringify(newNotes)); } catch (e) {}
  };

  const saveTags = (newTags) => {
    setTags(newTags);
    try { localStorage.setItem('calendar-tags', JSON.stringify(newTags)); } catch (e) {}
  };

  const rangeKey = rangeStart && rangeEnd
    ? `${rangeStart.toISOString().split('T')[0]}_${rangeEnd.toISOString().split('T')[0]}`
    : null;

  const currentNote = activeTab === 'range'
    ? (rangeKey ? notes[rangeKey] || '' : '')
    : (notes[monthKey] || '');

  const currentTags = activeTab === 'range'
    ? (rangeKey ? tags[rangeKey] || [] : [])
    : (tags[monthKey] || []);

  const handleChange = (val) => {
    const key = activeTab === 'range' ? rangeKey : monthKey;
    if (!key) return;
    save({ ...notes, [key]: val });
  };

  const addTag = (e) => {
    e.preventDefault();
    if (!newTag.trim()) return;
    const key = activeTab === 'range' ? rangeKey : monthKey;
    if (!key) return;
    const updated = [...currentTags, newTag.trim()];
    saveTags({ ...tags, [key]: updated });
    setNewTag('');
  };

  const removeTag = (t) => {
    const key = activeTab === 'range' ? rangeKey : monthKey;
    if (!key) return;
    saveTags({ ...tags, [key]: currentTags.filter(x => x !== t) });
  };

  const days = getDaysBetween(rangeStart, rangeEnd);
  const hasRange = rangeStart && rangeEnd;

  return (
    <div className="notes-panel">
      <div className="notes-header">
        <div className="notes-title-row">
          <span className="notes-icon">✎</span>
          <span className="notes-title">Notes</span>
          {hasRange && (
            <span className="range-badge" style={{ animation: 'floatBadge 3s ease-in-out infinite' }}>
              {days}d
            </span>
          )}
        </div>

        <div className="notes-tabs">
          <button
            className={`notes-tab ${activeTab === 'range' ? 'active' : ''}`}
            onClick={() => setActiveTab('range')}
          >
            Range
          </button>
          <button
            className={`notes-tab ${activeTab === 'month' ? 'active' : ''}`}
            onClick={() => setActiveTab('month')}
          >
            Month
          </button>
        </div>
      </div>

      {/* Range info */}
      {activeTab === 'range' && (
        <div className="range-info">
          {hasRange ? (
            <>
              <div className="range-dates">
                <span className="range-date start">{formatDate(rangeStart)}</span>
                <span className="range-arrow">→</span>
                <span className="range-date end">{formatDate(rangeEnd)}</span>
              </div>
              <div className="range-duration">{days} day{days !== 1 ? 's' : ''} selected</div>
            </>
          ) : rangeStart ? (
            <div className="range-hint">Click another date to complete the range</div>
          ) : (
            <div className="range-hint">Click a date to start selecting a range</div>
          )}
        </div>
      )}

      {/* Tags */}
      <div className="tags-section">
        {currentTags.map((tag, i) => (
          <span key={i} className="tag" onClick={() => removeTag(tag)}>
            #{tag} <span className="tag-x">×</span>
          </span>
        ))}
        <form onSubmit={addTag} className="tag-form">
          <input
            className="tag-input"
            placeholder="+ add tag"
            value={newTag}
            onChange={e => setNewTag(e.target.value)}
            disabled={activeTab === 'range' && !rangeKey}
          />
        </form>
      </div>

      {/* Lined textarea */}
      <div className="lined-paper">
        <textarea
          ref={textareaRef}
          className="notes-textarea"
          placeholder={
            activeTab === 'range' && !rangeKey
              ? 'Select a date range to add notes...'
              : 'Write your notes here...'
          }
          value={currentNote}
          onChange={e => handleChange(e.target.value)}
          disabled={activeTab === 'range' && !rangeKey}
          spellCheck={false}
        />
        <div className="paper-lines" aria-hidden="true">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="paper-line" />
          ))}
        </div>
      </div>

      {/* Note count */}
      <div className="notes-footer">
        <span className="char-count">{currentNote.length} chars</span>
        {currentNote.length > 0 && (
          <button className="clear-btn" onClick={() => handleChange('')}>
            Clear
          </button>
        )}
      </div>
    </div>
  );
}
