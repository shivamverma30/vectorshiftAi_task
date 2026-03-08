// timerNode.js
// Introduces a delay in the pipeline — useful for rate-limiting
// or scheduling. Passes its input straight through after the delay.

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode, FieldGroup, NodeLabel, NodeInput, NodeSelect } from './BaseNode';

export const TimerNode = ({ id, data }) => {
  const [delay, setDelay] = useState(data?.delay || '1');
  const [unit, setUnit] = useState(data?.unit || 'seconds');

  return (
    <BaseNode
      id={id}
      title="Timer"
      icon="⏱️"
      accentColor="#f97316"   // orange — pause/wait signal
      handles={[
        {
          id: `${id}-input`,
          type: 'target',
          position: Position.Left,
          label: 'trigger',
        },
        {
          id: `${id}-output`,
          type: 'source',
          position: Position.Right,
          label: 'after delay',
        },
      ]}
    >
      <FieldGroup>
        <NodeLabel>Delay</NodeLabel>
        <NodeInput
          type="number"
          value={delay}
          onChange={e => setDelay(e.target.value)}
          placeholder="1"
        />
      </FieldGroup>

      <FieldGroup>
        <NodeLabel>Unit</NodeLabel>
        <NodeSelect
          value={unit}
          onChange={e => setUnit(e.target.value)}
          options={['milliseconds', 'seconds', 'minutes', 'hours']}
        />
      </FieldGroup>
    </BaseNode>
  );
};
