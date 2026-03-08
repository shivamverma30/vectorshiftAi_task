// mathNode.js
// Applies a math operation to two numeric inputs.
// Simple but useful for demonstrating multi-input nodes
// and how BaseNode handles more than two handles cleanly.

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode, FieldGroup, NodeLabel, NodeSelect } from './BaseNode';

export const MathNode = ({ id, data }) => {
  const [operation, setOperation] = useState(data?.operation || 'add');

  // Map operation names to readable symbols for display
  const symbols = {
    add: '＋',
    subtract: '－',
    multiply: '×',
    divide: '÷',
    modulo: 'mod',
    power: 'xⁿ',
  };

  return (
    <BaseNode
      id={id}
      title="Math"
      icon={symbols[operation] || '∑'}
      accentColor="#3b82f6"   // blue — analytical/numeric
      handles={[
        {
          id: `${id}-a`,
          type: 'target',
          position: Position.Left,
          label: 'a',
        },
        {
          id: `${id}-b`,
          type: 'target',
          position: Position.Left,
          label: 'b',
        },
        {
          id: `${id}-result`,
          type: 'source',
          position: Position.Right,
          label: 'result',
        },
      ]}
    >
      <FieldGroup>
        <NodeLabel>Operation</NodeLabel>
        <NodeSelect
          value={operation}
          onChange={e => setOperation(e.target.value)}
          options={[
            { value: 'add', label: 'Add (a + b)' },
            { value: 'subtract', label: 'Subtract (a − b)' },
            { value: 'multiply', label: 'Multiply (a × b)' },
            { value: 'divide', label: 'Divide (a ÷ b)' },
            { value: 'modulo', label: 'Modulo (a mod b)' },
            { value: 'power', label: 'Power (aᵇ)' },
          ]}
        />
      </FieldGroup>
    </BaseNode>
  );
};
