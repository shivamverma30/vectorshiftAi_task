 // draggableNode.js
// Single node chip in the toolbar.
// Hover slides it right and lights up the accent color — same feel as
// VectorShift's component palette.

export const DraggableNode = ({ type, label, icon, color = '#5b6cf9' }) => {
  const onDragStart = (e) => {
    e.dataTransfer.setData('application/reactflow', JSON.stringify({ nodeType: type }));
    e.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      draggable
      onDragStart={onDragStart}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '9px',
        padding: '8px 10px',
        borderRadius: '8px',
        cursor: 'grab',
        border: '1px solid transparent',
        background: 'transparent',
        transition: 'all 0.15s ease',
        userSelect: 'none',
        fontFamily: "'Inter', sans-serif",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = '#1a2235';
        e.currentTarget.style.borderColor = `${color}33`;
        e.currentTarget.style.transform = 'translateX(3px)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = 'transparent';
        e.currentTarget.style.borderColor = 'transparent';
        e.currentTarget.style.transform = 'translateX(0)';
      }}
      onMouseDown={e => (e.currentTarget.style.cursor = 'grabbing')}
      onMouseUp={e => (e.currentTarget.style.cursor = 'grab')}
    >
      {/* Colored icon dot */}
      <div style={{
        width: '28px',
        height: '28px',
        borderRadius: '7px',
        background: `${color}15`,
        border: `1px solid ${color}30`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '13px',
        flexShrink: 0,
      }}>
        {icon}
      </div>

      <span style={{
        color: '#8b95a8',
        fontSize: '12px',
        fontWeight: 500,
      }}>
        {label}
      </span>

      {/* Drag indicator dots */}
      <div style={{
        marginLeft: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '2px',
        opacity: 0.3,
      }}>
        {[0,1,2].map(i => (
          <div key={i} style={{
            display: 'flex', gap: '2px'
          }}>
            {[0,1].map(j => (
              <div key={j} style={{
                width: '2px', height: '2px',
                borderRadius: '50%',
                background: '#8b95a8',
              }} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
