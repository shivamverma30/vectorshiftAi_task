// noteNode.js
// Just a sticky-note style node for leaving comments/documentation
// inside the pipeline canvas. No handles — it's purely informational.
// Good demo of how BaseNode works for non-functional nodes too.

import { useState } from 'react';
import { BaseNode, NodeTextarea } from './BaseNode';

export const NoteNode = ({ id, data }) => {
  const [text, setText] = useState(data?.text || 'Add a note...');

  return (
    <BaseNode
      id={id}
      title="Note"
      icon="🗒️"
      accentColor="#fbbf24"
      handles={[]}   // intentionally no connections — it's just a note
    >
      <NodeTextarea
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Write a note for your teammates..."
      />
    </BaseNode>
  );
};
