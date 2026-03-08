// llmNode.js
// The brain of the pipeline. Takes a system prompt + user prompt,
// spits out a response. Two inputs on the left, one output on the right.
// Refactored onto BaseNode — old version had all the handle logic inline.

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode, FieldGroup, NodeLabel, NodeSelect } from './BaseNode';

export const LLMNode = ({ id, data }) => {
  // Let users pick which model powers this node
  const [model, setModel] = useState(data?.model || 'gpt-4o');

  return (
    <BaseNode
      id={id}
      title="LLM"
      icon="🧠"
      accentColor="#8b5cf6"   // purple — feels right for the AI step
      handles={[
        {
          id: `${id}-system`,
          type: 'target',
          position: Position.Left,
          label: 'system',
        },
        {
          id: `${id}-prompt`,
          type: 'target',
          position: Position.Left,
          label: 'prompt',
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
        <NodeLabel>Model</NodeLabel>
        <NodeSelect
          value={model}
          onChange={e => setModel(e.target.value)}
          options={[
            { value: 'gpt-4o', label: 'GPT-4o' },
            { value: 'gpt-4o-mini', label: 'GPT-4o Mini' },
            { value: 'claude-3-5-sonnet', label: 'Claude 3.5 Sonnet' },
            { value: 'gemini-pro', label: 'Gemini Pro' },
          ]}
        />
      </FieldGroup>
    </BaseNode>
  );
};
