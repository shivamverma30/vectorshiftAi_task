// toolbar.js
// Left sidebar — VectorShift style with grouped node palette,
// search bar feel, and clean category labels.

import { DraggableNode } from './draggableNode';

const NODE_GROUPS = [
  {
    label: 'I / O',
    nodes: [
      { type: 'customInput', label: 'Input',  icon: '⌨️', color: '#22c55e' },
      { type: 'customOutput', label: 'Output', icon: '📤', color: '#f43f5e' },
    ],
  },
  {
    label: 'AI',
    nodes: [
      { type: 'llm', label: 'LLM', icon: '🧠', color: '#a855f7' },
    ],
  },
  {
    label: 'Data',
    nodes: [
      { type: 'text',   label: 'Text',   icon: '📝', color: '#f59e0b' },
      { type: 'math',   label: 'Math',   icon: '∑',  color: '#3b82f6' },
      { type: 'filter', label: 'Filter', icon: '🔍', color: '#ec4899' },
    ],
  },
  {
    label: 'Utilities',
    nodes: [
      { type: 'api',   label: 'API Call', icon: '🌐', color: '#06b6d4' },
      { type: 'timer', label: 'Timer',    icon: '⏱️', color: '#f97316' },
      { type: 'note',  label: 'Note',     icon: '🗒️', color: '#f59e0b' },
    ],
  },
];

export const PipelineToolbar = () => (
  <div style={{
    width: '210px',
    height: '100vh',
    background: '#111622',
    borderRight: '1px solid #1e2840',
    display: 'flex',
    flexDirection: 'column',
    position: 'fixed',
    left: 0,
    top: 0,
    zIndex: 20,
    fontFamily: "'Inter', sans-serif",
  }}>

    {/* ── Logo ── */}
    <div style={{
      padding: '18px 16px 14px',
      borderBottom: '1px solid #1a2035',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
    }}>
      <div style={{
        width: '32px',
        height: '32px',
        borderRadius: '9px',
        background: 'linear-gradient(135deg, #5b6cf9 0%, #a855f7 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '16px',
        flexShrink: 0,
        boxShadow: '0 4px 12px rgba(91,108,249,0.4)',
      }}>
        ⚡
      </div>
      <div>
        <div style={{ color: '#e8edf5', fontSize: '13px', fontWeight: 700, letterSpacing: '-0.01em' }}>
          VectorShift
        </div>
        <div style={{ color: '#3a4a6a', fontSize: '9px', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600 }}>
          Pipeline Builder
        </div>
      </div>
    </div>

    {/* ── Node palette label ── */}
    <div style={{ padding: '14px 16px 8px' }}>
      <span style={{
        fontSize: '10px',
        fontWeight: 600,
        color: '#3a4a6a',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
      }}>
        Components
      </span>
    </div>

    {/* ── Groups ── */}
    <div style={{ flex: 1, overflowY: 'auto', padding: '0 10px 16px' }}>
      {NODE_GROUPS.map(group => (
        <div key={group.label} style={{ marginBottom: '18px' }}>
          <div style={{
            fontSize: '9px',
            fontWeight: 700,
            color: '#283048',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            padding: '0 6px 6px',
          }}>
            {group.label}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
            {group.nodes.map(n => (
              <DraggableNode key={n.type} {...n} />
            ))}
          </div>
        </div>
      ))}
    </div>

    {/* ── Footer hint ── */}
    <div style={{
      padding: '12px 16px',
      borderTop: '1px solid #1a2035',
      fontSize: '10px',
      color: '#283048',
      lineHeight: 1.5,
    }}>
      Drag components onto the canvas to build your pipeline
    </div>
  </div>
);
