import { useCallback } from "react";
import ReactFlow, {
  Node,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  ConnectionLineType,
} from "reactflow";
import CustomNode from "./CustomNode";

const initialNodes: Node[] = [
  {
    id: "1",
    data: { label: "Node 1" },
    position: { x: 0, y: 0 },
    type: "custom",
  },
  {
    id: "2",
    data: { label: "Node 2" },
    position: { x: 600, y: 0 },
    type: "custom",
  },
  {
    id: "3",
    data: { label: "Node 3" },
    position: { x: 600, y: 500 },
    type: "custom",
  },
  {
    id: "4",
    data: { label: "Node 4" },
    position: { x: 1200, y: 0 },
    type: "custom",
  },
  {
    id: "5",
    data: { label: "Node 5" },
    position: { x: 1200, y: 500 },
    type: "custom",
  },
  {
    id: "6",
    data: { label: "Node 6" },
    position: { x: 1200, y: 1000 },
    type: "custom",
  },
];

const initialEdges: Edge[] = [
  { id: "e1-2", source: "1", target: "2" },
  { id: "e1-3", source: "1", target: "3" },
  { id: "e1-3", source: "2", target: "4" },
  { id: "e1-3", source: "3", target: "4" },
  { id: "e1-3", source: "2", target: "5" },
  { id: "e1-3", source: "3", target: "5" },
  { id: "e1-3", source: "2", target: "6" },
];

const nodeTypes = {
  custom: CustomNode,
};

const defaultEdgeOptions = {
  animated: false,
  type: "simplebezier",
};

function Flow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect = useCallback(
    (params: Connection | Edge) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <div className='flex-grow'>
      <ReactFlow
        nodes={nodes}
        onNodesChange={onNodesChange}
        edges={edges}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        defaultEdgeOptions={defaultEdgeOptions}
        connectionLineType={ConnectionLineType.SmoothStep}
        fitView
      />
    </div>
  );
}

export default Flow;
