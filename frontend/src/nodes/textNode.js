// textNode.js
// Auto-resizes as you type + creates handles for {{variable}} patterns.

import { useState, useEffect, useRef } from 'react';
import { Handle, Position } from 'reactflow';
import { BaseNode, NodeLabel, FieldGroup } from './BaseNode';

const VAR_REGEX = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;

const extractVariables = (text) => {
  const found = [];
  let match;
  VAR_REGEX.lastIndex = 0;
  while ((match = VAR_REGEX.exec(text)) !== null) {
    if (!found.includes(match[1])) found.push(match[1]);
  }
  return found;
};

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [variables, setVariables] = useState([]);
  const [width, setWidth] = useState(240);
  const textareaRef = useRef(null);

  useEffect(() => {
    setVariables(extractVariables(currText));
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      const lines = currText.split('\n');
      const longest = Math.max(...lines.map(l => l.length));
      setWidth(Math.min(400, Math.max(240, longest * 7.8 + 50)));
    }
  }, [currText]);

  return (
    <div style={{ position: 'relative', width, transition: 'width 0.15s ease' }}>
      <BaseNode
        id={id}
        title="Text"
        icon="📝"
        accentColor="#f59e0b"
        style={{ minWidth: '100%' }}
        handles={[{
          id: `${id}-output`,
          type: 'source',
          position: Position.Right,
          label: 'output',
        }]}
      >
        <FieldGroup>
          <NodeLabel>Content</NodeLabel>
          <textarea
            ref={textareaRef}
            value={currText}
            onChange={e => setCurrText(e.target.value)}
            placeholder="Type text... use {{variable}} to create inputs"
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
              resize: 'none',
              overflow: 'hidden',
              boxSizing: 'border-box',
              lineHeight: 1.6,
              transition: 'border-color 0.15s, box-shadow 0.15s',
            }}
            onFocus={e => {
              e.target.style.borderColor = '#f59e0b';
              e.target.style.boxShadow = '0 0 0 3px rgba(245,158,11,0.1)';
            }}
            onBlur={e => {
              e.target.style.borderColor = '#1e2840';
              e.target.style.boxShadow = 'none';
            }}
          />
        </FieldGroup>

        {/* Variable chips */}
        {variables.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
            {variables.map(v => (
              <span key={v} style={{
                fontSize: '10px',
                padding: '2px 8px',
                background: 'rgba(245,158,11,0.1)',
                border: '1px solid rgba(245,158,11,0.25)',
                borderRadius: '20px',
                color: '#f59e0b',
                fontFamily: "'JetBrains Mono', monospace",
                fontWeight: 500,
              }}>
                {`{{${v}}}`}
              </span>
            ))}
          </div>
        )}
      </BaseNode>

      {/* Dynamic variable handles */}
      {variables.map((varName, idx) => {
        const topPercent = ((idx + 1) / (variables.length + 1)) * 100;
        return (
          <div key={varName} style={{
            position: 'absolute',
            top: `${topPercent}%`,
            left: 0,
            transform: 'translateY(-50%)',
            display: 'flex',
            alignItems: 'center',
          }}>
            <span style={{
              position: 'absolute',
              left: '16px',
              fontSize: '9px',
              color: '#f59e0b',
              fontFamily: "'JetBrains Mono', monospace",
              whiteSpace: 'nowrap',
              fontWeight: 500,
            }}>
              {varName}
            </span>
            <Handle
              type="target"
              position={Position.Left}
              id={`${id}-${varName}`}
              style={{
                width: '11px', height: '11px',
                background: '#0e1117',
                border: '2px solid #f59e0b',
                borderRadius: '50%',
                left: '-5.5px',
                top: 0,
              }}
            />
          </div>
        );
      })}
    </div>
  );
};
