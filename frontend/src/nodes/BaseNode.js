// BaseNode.js
// Core shell for every node in the pipeline.
// Inspired by VectorShift's clean, card-based node design —
// white header accent bar, subtle border, soft shadow.

import { Handle, Position } from 'reactflow';

export const BaseNode = ({
  id,
  title,
  icon,
  accentColor = '#5b6cf9',
  children,
  handles = [],
  style = {},
}) => {
  return (
    <div
      className="vs-node"
      style={{
        position: 'relative',
        minWidth: '230px',
        background: '#161b26',
        border: '1px solid #2a3349',
        borderRadius: '12px',
        boxShadow: '0 2px 12px rgba(0,0,0,0.35)',
        fontFamily: "'Inter', sans-serif",
        overflow: 'visible',
        transition: 'box-shadow 0.2s, border-color 0.2s',
        ...style,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.boxShadow = `0 4px 24px rgba(0,0,0,0.5), 0 0 0 1px ${accentColor}55`;
        e.currentTarget.style.borderColor = `${accentColor}66`;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.35)';
        e.currentTarget.style.borderColor = '#2a3349';
      }}
    >
      {/* Top accent line — VectorShift style color bar */}
      <div style={{
        height: '3px',
        background: `linear-gradient(90deg, ${accentColor}, ${accentColor}88)`,
        borderRadius: '12px 12px 0 0',
      }} />

      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '10px 14px 8px',
        borderBottom: '1px solid #1e2840',
      }}>
        {icon && (
          <div style={{
            width: '26px',
            height: '26px',
            borderRadius: '7px',
            background: `${accentColor}20`,
            border: `1px solid ${accentColor}33`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '13px',
            flexShrink: 0,
          }}>
            {icon}
          </div>
        )}
        <span style={{
          fontSize: '12px',
          fontWeight: 600,
          color: '#c8d3e8',
          letterSpacing: '0.02em',
          textTransform: 'uppercase',
          fontSize: '11px',
        }}>
          {title}
        </span>
        {/* Live indicator dot */}
        <div style={{
          marginLeft: 'auto',
          width: '7px',
          height: '7px',
          borderRadius: '50%',
          background: accentColor,
          boxShadow: `0 0 6px ${accentColor}`,
          flexShrink: 0,
          animation: 'pulse 2s ease-in-out infinite',
        }} />
      </div>

      {/* Body */}
      <div style={{ padding: '12px 14px 14px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {children}
      </div>

      {/* Handles */}
      {handles.map((handle) => {
        const isLeft = handle.position === Position.Left;
        const sameSide = handles.filter(h => h.position === handle.position);
        const idx = sameSide.indexOf(handle);
        const topPercent = ((idx + 1) / (sameSide.length + 1)) * 100;

        return (
          <div
            key={handle.id}
            style={{
              position: 'absolute',
              top: `${topPercent}%`,
              transform: 'translateY(-50%)',
              ...(isLeft ? { left: 0 } : { right: 0 }),
              display: 'flex',
              alignItems: 'center',
              pointerEvents: 'none',
            }}
          >
            {/* Label */}
            {handle.label && (
              <span style={{
                position: 'absolute',
                fontSize: '9px',
                fontWeight: 500,
                color: '#5a6a8a',
                letterSpacing: '0.04em',
                fontFamily: "'JetBrains Mono', monospace",
                whiteSpace: 'nowrap',
                ...(isLeft ? { left: '16px' } : { right: '16px' }),
              }}>
                {handle.label}
              </span>
            )}
            <Handle
              type={handle.type}
              position={handle.position}
              id={handle.id}
              style={{
                width: '11px',
                height: '11px',
                background: '#0e1117',
                border: `2px solid ${accentColor}`,
                borderRadius: '50%',
                pointerEvents: 'all',
                ...(isLeft ? { left: '-5.5px' } : { right: '-5.5px' }),
                ...handle.style,
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

// ── Shared field components ──────────────────────────────────────────────────

export const NodeLabel = ({ children }) => (
  <span style={{
    fontSize: '10px',
    fontWeight: 600,
    color: '#4a5878',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    display: 'block',
    marginBottom: '4px',
    fontFamily: "'Inter', sans-serif",
  }}>
    {children}
  </span>
);

export const NodeInput = ({ value, onChange, placeholder, type = 'text', style = {} }) => (
  <input
    type={type}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    style={{
      width: '100%',
      background: '#0e1117',
      border: '1px solid #1e2840',
      borderRadius: '7px',
      color: '#c8d3e8',
      fontSize: '12px',
      fontFamily: "'Inter', sans-serif",
      padding: '6px 10px',
      outline: 'none',
      boxSizing: 'border-box',
      transition: 'border-color 0.15s, box-shadow 0.15s',
      ...style,
    }}
    onFocus={e => {
      e.target.style.borderColor = '#5b6cf9';
      e.target.style.boxShadow = '0 0 0 3px rgba(91,108,249,0.12)';
    }}
    onBlur={e => {
      e.target.style.borderColor = '#1e2840';
      e.target.style.boxShadow = 'none';
    }}
  />
);

export const NodeSelect = ({ value, onChange, options }) => (
  <select
    value={value}
    onChange={onChange}
    style={{
      width: '100%',
      background: '#0e1117',
      border: '1px solid #1e2840',
      borderRadius: '7px',
      color: '#c8d3e8',
      fontSize: '12px',
      fontFamily: "'Inter', sans-serif",
      padding: '6px 10px',
      outline: 'none',
      cursor: 'pointer',
      boxSizing: 'border-box',
      appearance: 'none',
      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%234a5878' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'right 10px center',
      paddingRight: '28px',
    }}
  >
    {options.map(opt => (
      <option key={opt.value ?? opt} value={opt.value ?? opt}>
        {opt.label ?? opt}
      </option>
    ))}
  </select>
);

export const NodeTextarea = ({ value, onChange, placeholder, style = {} }) => (
  <textarea
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    rows={3}
    style={{
      width: '100%',
      background: '#0e1117',
      border: '1px solid #1e2840',
      borderRadius: '7px',
      color: '#c8d3e8',
      fontSize: '12px',
      fontFamily: "'Inter', sans-serif",
      padding: '6px 10px',
      outline: 'none',
      resize: 'vertical',
      boxSizing: 'border-box',
      lineHeight: 1.6,
      transition: 'border-color 0.15s, box-shadow 0.15s',
      ...style,
    }}
    onFocus={e => {
      e.target.style.borderColor = '#5b6cf9';
      e.target.style.boxShadow = '0 0 0 3px rgba(91,108,249,0.12)';
    }}
    onBlur={e => {
      e.target.style.borderColor = '#1e2840';
      e.target.style.boxShadow = 'none';
    }}
  />
);

export const FieldGroup = ({ children }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
    {children}
  </div>
);
