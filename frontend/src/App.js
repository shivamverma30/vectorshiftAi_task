// App.js
// Root layout — fixed sidebar left, canvas + topbar fills the rest.

import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';

function App() {
  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: '#0e1117' }}>
      <PipelineToolbar />

      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        marginLeft: '210px',
        height: '100vh',
        overflow: 'hidden',
      }}>
        {/* Top bar */}
        <div style={{
          height: '44px',
          background: '#111622',
          borderBottom: '1px solid #1a2035',
          display: 'flex',
          alignItems: 'center',
          padding: '0 20px',
          gap: '12px',
          flexShrink: 0,
          fontFamily: "'Inter', sans-serif",
        }}>
          <span style={{ fontSize: '12px', color: '#3a4a6a', fontWeight: 500 }}>
            Untitled Pipeline
          </span>
          <span style={{ color: '#1e2840', fontSize: '12px' }}>·</span>
          <span style={{
            fontSize: '10px',
            padding: '2px 8px',
            background: '#1a2235',
            border: '1px solid #1e2840',
            borderRadius: '20px',
            color: '#3a4a6a',
            fontWeight: 600,
            letterSpacing: '0.06em',
          }}>
            DRAFT
          </span>
        </div>

        {/* Canvas — fills remaining space */}
        <div style={{ flex: 1, minHeight: 0 }}>
          <PipelineUI />
        </div>

        {/* Submit bar */}
        <SubmitButton />
      </div>
    </div>
  );
}

export default App;
