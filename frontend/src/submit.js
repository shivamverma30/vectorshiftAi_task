// submit.js
// Bottom bar — shows canvas stats + submit button.
// Result modal styled like VectorShift's clean card dialogs.

import { useState } from 'react';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';

const selector = (state) => ({ nodes: state.nodes, edges: state.edges });

// ── Result Modal ──────────────────────────────────────────────────────────────
const ResultModal = ({ result, onClose }) => {
  if (!result) return null;
  const { num_nodes, num_edges, is_dag } = result;

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0,
        background: 'rgba(5, 8, 18, 0.8)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 1000,
        backdropFilter: 'blur(6px)',
        animation: 'fadeIn 0.15s ease',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: '#161b26',
          border: '1px solid #2a3349',
          borderRadius: '16px',
          padding: '0',
          width: '360px',
          boxShadow: '0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(91,108,249,0.1)',
          overflow: 'hidden',
          fontFamily: "'Inter', sans-serif",
        }}
      >
        {/* Accent top bar */}
        <div style={{
          height: '3px',
          background: is_dag
            ? 'linear-gradient(90deg, #22c55e, #5b6cf9)'
            : 'linear-gradient(90deg, #f43f5e, #f97316)',
        }} />

        {/* Header */}
        <div style={{ padding: '20px 22px 16px', borderBottom: '1px solid #1e2840' }}>
          <div style={{ fontSize: '10px', color: '#3a4a6a', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, marginBottom: '4px' }}>
            Pipeline Analysis
          </div>
          <div style={{ fontSize: '18px', fontWeight: 700, color: '#e8edf5', letterSpacing: '-0.02em' }}>
            Submission Result
          </div>
        </div>

        {/* Stats */}
        <div style={{ padding: '16px 22px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <StatCard label="Total Nodes" value={num_nodes} color="#5b6cf9" icon="◈" />
          <StatCard label="Total Edges" value={num_edges} color="#a855f7" icon="→" />
          <StatCard
            label="Valid DAG"
            value={is_dag ? 'Yes' : 'No'}
            color={is_dag ? '#22c55e' : '#f43f5e'}
            icon={is_dag ? '✓' : '✗'}
          />
        </div>

        {/* Info box */}
        <div style={{
          margin: '0 22px 16px',
          padding: '10px 14px',
          background: '#0e1117',
          borderRadius: '8px',
          border: '1px solid #1e2840',
          fontSize: '11px',
          color: '#4a5878',
          lineHeight: 1.6,
        }}>
          {is_dag
            ? '✓ No cycles detected. Data flows in one direction — pipeline is ready to run.'
            : '⚠ Cycle detected in pipeline. Check connections to remove loops before running.'}
        </div>

        {/* Close */}
        <div style={{ padding: '0 22px 20px' }}>
          <button
            onClick={onClose}
            style={{
              width: '100%',
              padding: '11px',
              background: 'linear-gradient(135deg, #5b6cf9 0%, #a855f7 100%)',
              border: 'none',
              borderRadius: '9px',
              color: '#fff',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              letterSpacing: '0.01em',
              fontFamily: "'Inter', sans-serif",
              transition: 'opacity 0.15s',
            }}
            onMouseEnter={e => (e.target.style.opacity = '0.9')}
            onMouseLeave={e => (e.target.style.opacity = '1')}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ label, value, color, icon }) => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '10px 12px',
    background: '#0e1117',
    borderRadius: '9px',
    border: '1px solid #1e2840',
  }}>
    <div style={{
      width: '32px', height: '32px',
      borderRadius: '8px',
      background: `${color}18`,
      border: `1px solid ${color}33`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: '14px',
      color,
      fontWeight: 700,
      flexShrink: 0,
    }}>
      {icon}
    </div>
    <div>
      <div style={{ fontSize: '10px', color: '#3a4a6a', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
        {label}
      </div>
      <div style={{ fontSize: '16px', fontWeight: 700, color, marginTop: '1px' }}>
        {value}
      </div>
    </div>
  </div>
);

// ── Submit Bar ────────────────────────────────────────────────────────────────
export const SubmitButton = () => {
  const { nodes, edges } = useStore(selector, shallow);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('http://localhost:8000/pipelines/parse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nodes, edges }),
      });
      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      setResult(await res.json());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const empty = nodes.length === 0;

  return (
    <>
      <div style={{
        background: '#111622',
        borderTop: '1px solid #1a2035',
        padding: '10px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontFamily: "'Inter', sans-serif",
        gap: '12px',
      }}>
        {/* Canvas stats */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <StatPill label="Nodes" value={nodes.length} color="#5b6cf9" />
          <StatPill label="Edges" value={edges.length} color="#a855f7" />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {error && (
            <span style={{ fontSize: '11px', color: '#f43f5e' }}>
              ⚠ {error}
            </span>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading || empty}
            style={{
              padding: '9px 22px',
              background: loading || empty
                ? '#1a2235'
                : 'linear-gradient(135deg, #5b6cf9 0%, #a855f7 100%)',
              border: '1px solid',
              borderColor: loading || empty ? '#1e2840' : 'transparent',
              borderRadius: '9px',
              color: loading || empty ? '#3a4a6a' : '#fff',
              fontSize: '12px',
              fontWeight: 600,
              cursor: loading || empty ? 'not-allowed' : 'pointer',
              fontFamily: "'Inter', sans-serif",
              letterSpacing: '0.01em',
              transition: 'all 0.15s',
              display: 'flex',
              alignItems: 'center',
              gap: '7px',
            }}
          >
            {loading ? (
              <>
                <span style={{
                  width: '10px', height: '10px',
                  border: '2px solid #3a4a6a',
                  borderTopColor: '#5b6cf9',
                  borderRadius: '50%',
                  display: 'inline-block',
                  animation: 'spin 0.7s linear infinite',
                }} />
                Analyzing...
              </>
            ) : (
              <>
                <span style={{ fontSize: '14px' }}>▶</span>
                Submit Pipeline
              </>
            )}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>

      <ResultModal result={result} onClose={() => setResult(null)} />
    </>
  );
};

const StatPill = ({ label, value, color }) => (
  <div style={{
    display: 'flex', alignItems: 'center', gap: '6px',
    padding: '4px 10px',
    background: `${color}10`,
    border: `1px solid ${color}25`,
    borderRadius: '20px',
  }}>
    <span style={{ fontSize: '13px', fontWeight: 700, color }}>{value}</span>
    <span style={{ fontSize: '10px', color: '#3a4a6a', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
      {label}
    </span>
  </div>
);
