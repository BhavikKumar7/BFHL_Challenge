import {
  ReactFlow,
  Background
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

function TreeGraph({ tree }) {
  const nodes = [];
  const edges = [];

  let nodeId = 1;

  function traverse(nodeName, childrenObj, x, y, parentId = null) {
    const currentId = `${nodeId++}`;

    nodes.push({
      id: currentId,
      position: { x, y },
      data: { label: nodeName },
      style: {
        background: "#1f2937",
        color: "white",
        border: "1px solid #3b82f6",
        borderRadius: 12,
        padding: 10,
        width: 100,
        textAlign: "center"
      }
    });

    if (parentId) {
      edges.push({
        id: `${parentId}-${currentId}`,
        source: parentId,
        target: currentId,
        animated: true,
        style: {
          stroke: "#60a5fa",
          strokeWidth: 2
        }
      });
    }

    const children = Object.entries(childrenObj);

    const width = 300;

    children.forEach(([child, grandChildren], index) => {
      const childX =
        x +
        (index - (children.length - 1) / 2) *
        (width / Math.max(children.length, 1));

      traverse(
        child,
        grandChildren,
        childX,
        y + 120,
        currentId
      );
    });
  }

  const root = Object.keys(tree)[0];

  traverse(root, tree[root], 400, 50);

  return (
    <div className="h-[500px] rounded-2xl overflow-hidden bg-black">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView
        proOptions={{ hideAttribution: true }}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
      >
        <Background
          color="#374151"
          gap={24}
          size={1}
        />
      </ReactFlow>
    </div>
  );
}

export default TreeGraph;