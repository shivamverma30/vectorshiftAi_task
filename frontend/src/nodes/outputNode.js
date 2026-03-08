// outputNode.js
// Pipeline sink — data flows in from the left, nothing goes out.
// Refactored onto BaseNode, accent red so it's visually obvious
// this is where results land.

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode, FieldGroup, NodeLabel, NodeInput, NodeSelect } from './BaseNode';

export const OutputNode = ({ id, data }) => {
  const [name, setName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data?.outputType || 'Text');

  return (
    <BaseNode
      id={id}
      title="Output"
      icon="📤"
      accentColor="#ef4444"
      handles={[
        {
          id: `${id}-value`,
          type: 'target',
          position: Position.Left,
          label: 'input',
        },
      ]}
    >
      <FieldGroup>
        <NodeLabel>Name</NodeLabel>
        <NodeInput
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="output_name"
        />
      </FieldGroup>

      <FieldGroup>
        <NodeLabel>Type</NodeLabel>
        <NodeSelect
          value={outputType}
          onChange={e => setOutputType(e.target.value)}
          options={[
            { value: 'Text', label: 'Text' },
            { value: 'Image', label: 'Image' },
          ]}
        />
      </FieldGroup>
    </BaseNode>
  );
};
