import { memo, useMemo } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  Handle,
  Position,
  MarkerType,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import "./FoodWebGraph.css";

const WebNode = memo(function WebNode({ data }) {
  return (
    <div className={`food-web-node ${data.kind}`}>
      <Handle type="target" position={Position.Left} className="food-web-handle" />
      <span className="food-web-node-emoji">{data.emoji}</span>
      <div>
        <strong>{data.label}</strong>
        <span>{data.subtitle}</span>
      </div>
      <Handle type="source" position={Position.Right} className="food-web-handle" />
    </div>
  );
});

const nodeTypes = { webNode: WebNode };

export default function FoodWebGraph({ organismo, presas, predadores }) {
  const { nodes, edges } = useMemo(() => {
    const center = {
      id: organismo.id,
      type: "webNode",
      position: { x: 310, y: 120 },
      data: {
        label: organismo.nome,
        subtitle: organismo.nivelTroficoLabel,
        emoji: organismo.emoji,
        kind: "center",
      },
    };

    const preyNodes = presas.map((presa, index) => ({
      id: `prey-${presa.id}`,
      type: "webNode",
      position: { x: 0, y: index * 92 + 28 },
      data: {
        label: presa.nome,
        subtitle: "Alimento",
        emoji: presa.emoji,
        kind: "prey",
      },
    }));

    const predatorNodes = predadores.map((predador, index) => ({
      id: `predator-${predador.id}`,
      type: "webNode",
      position: { x: 620, y: index * 92 + 28 },
      data: {
        label: predador.nome,
        subtitle: "Predador",
        emoji: predador.emoji,
        kind: "predator",
      },
    }));

    const preyEdges = presas.map((presa) => ({
      id: `${presa.id}-${organismo.id}`,
      source: `prey-${presa.id}`,
      target: organismo.id,
      animated: true,
      markerEnd: { type: MarkerType.ArrowClosed },
      style: { stroke: "#34d399", strokeWidth: 2 },
    }));

    const predatorEdges = predadores.map((predador) => ({
      id: `${organismo.id}-${predador.id}`,
      source: organismo.id,
      target: `predator-${predador.id}`,
      animated: true,
      markerEnd: { type: MarkerType.ArrowClosed },
      style: { stroke: "#f59e0b", strokeWidth: 2 },
    }));

    return {
      nodes: [center, ...preyNodes, ...predatorNodes],
      edges: [...preyEdges, ...predatorEdges],
    };
  }, [organismo, presas, predadores]);

  return (
    <div className="food-web-graph">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.25 }}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        panOnDrag={false}
        zoomOnScroll={false}
        zoomOnPinch
        preventScrolling={false}
      >
        <Background color="rgba(52, 211, 153, 0.22)" gap={18} />
        <Controls showInteractive={false} position="bottom-right" />
      </ReactFlow>
    </div>
  );
}
