// filterNode.js
// Filters data passing through the pipeline based on a condition.
// Passes matching data to 'true' output, non-matching to 'false'.
// Classic conditional branch — two outputs on the right.

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode, FieldGroup, NodeLabel, NodeInput, NodeSelect } from './BaseNode';

export const FilterNode = ({ id, data }) => {
  const [field, setField] = useState(data?.field || '');
  const [operator, setOperator] = useState(data?.operator || 'contains');
  const [value, setValue] = useState(data?.value || '');

  return (
    <BaseNode
      id={id}
      title="Filter"
      icon="🔍"
      accentColor="#ec4899"   // pink — stands out as a branch point
      handles={[
        {
          id: `${id}-input`,
          type: 'target',
          position: Position.Left,
          label: 'data',
        },
        {
          id: `${id}-true`,
          type: 'source',
          position: Position.Right,
          label: 'match ✓',
        },
        {
          id: `${id}-false`,
          type: 'source',
          position: Position.Right,
          label: 'no match ✗',
        },
      ]}
    >
      <FieldGroup>
        <NodeLabel>Field</NodeLabel>
        <NodeInput
          value={field}
          onChange={e => setField(e.target.value)}
          placeholder="field_name"
        />
      </FieldGroup>

      <FieldGroup>
        <NodeLabel>Condition</NodeLabel>
        <NodeSelect
          value={operator}
          onChange={e => setOperator(e.target.value)}
          options={['contains', 'equals', 'starts with', 'ends with', 'is empty']}
        />
      </FieldGroup>

      <FieldGroup>
        <NodeLabel>Value</NodeLabel>
        <NodeInput
          value={value}
          onChange={e => setValue(e.target.value)}
          placeholder="match value"
        />
      </FieldGroup>
    </BaseNode>
  );
};
