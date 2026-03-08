// apiNode.js
// Represents an external HTTP API call in the pipeline.
// Takes a URL + optional body in, returns the response out.

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode, FieldGroup, NodeLabel, NodeInput, NodeSelect } from './BaseNode';

export const APINode = ({ id, data }) => {
  const [url, setUrl] = useState(data?.url || 'https://api.example.com/');
  const [method, setMethod] = useState(data?.method || 'GET');

  return (
    <BaseNode
      id={id}
      title="API Call"
      icon="🌐"
      accentColor="#06b6d4"   // cyan — network/external feels right
      handles={[
        {
          id: `${id}-body`,
          type: 'target',
          position: Position.Left,
          label: 'body',
        },
        {
          id: `${id}-response`,
          type: 'source',
          position: Position.Right,
          label: 'response',
        },
      ]}
    >
      <FieldGroup>
        <NodeLabel>Method</NodeLabel>
        <NodeSelect
          value={method}
          onChange={e => setMethod(e.target.value)}
          options={['GET', 'POST', 'PUT', 'DELETE']}
        />
      </FieldGroup>

      <FieldGroup>
        <NodeLabel>URL</NodeLabel>
        <NodeInput
          value={url}
          onChange={e => setUrl(e.target.value)}
          placeholder="https://..."
        />
      </FieldGroup>
    </BaseNode>
  );
};
