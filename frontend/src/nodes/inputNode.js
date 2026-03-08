// inputNode.js
// Refactored to use BaseNode — was ~50 lines of repeated markup,
// now it's just the bits that are actually specific to an Input node.

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode, FieldGroup, NodeLabel, NodeInput, NodeSelect } from './BaseNode';

export const InputNode = ({ id, data }) => {
  const [name, setName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data?.inputType || 'Text');

  return (
    <BaseNode
      id={id}
      title="Input"
      icon="⌨️"
      accentColor="#10b981"
      handles={[
        {
          id: `${id}-value`,
          type: 'source',
          position: Position.Right,
          label: 'output',
        },
      ]}
    >
      <FieldGroup>
        <NodeLabel>Name</NodeLabel>
        <NodeInput
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="variable_name"
        />
      </FieldGroup>

      <FieldGroup>
        <NodeLabel>Type</NodeLabel>
        <NodeSelect
          value={inputType}
          onChange={e => setInputType(e.target.value)}
          options={[
            { value: 'Text', label: 'Text' },
            { value: 'File', label: 'File' },
          ]}
        />
      </FieldGroup>
    </BaseNode>
  );
};
