import SubjectData from "@/utils/subjectData";
import { useEffect } from "react";
import ReactFlow, {
  Node,
  useNodesState,
  useEdgesState,
  Edge,
  DefaultEdgeOptions,
} from "reactflow";
import CustomNode from "./CustomNode";
import SubjectNode from "./SubjectNode";
import data from "../../../public/data.json";

import FloatingEdge from "./FloatingEdge";
import FloatingConnectionLine from "./FloatingConnectionLine";
import { createNodesAndEdges } from "./utils";
import "reactflow/dist/style.css";

// TODO: Make this an API request
const semesters: SubjectData[][] = data as SubjectData[][];

// const nodeTypes = {
//   subject: SubjectNode,
// };
const edgeTypes = {
  floating: FloatingEdge,
};
// const defaultEdgeOptions: DefaultEdgeOptions = {
//   animated: false,
//   type: "simplebezier",
//   style: { stroke: "#F2A869", strokeWidth: 2 },
// };

const { nodes: initialNodes, edges: initialEdges } = createNodesAndEdges();

function Flow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  return (
    <div className="stroke-modeler floatingedges flex-grow bg-neutral-dark">
      <ReactFlow
        nodes={nodes}
        onNodesChange={onNodesChange}
        edges={edges}
        onEdgesChange={onEdgesChange}
        // nodeTypes={nodeTypes}
        // defaultEdgeOptions={defaultEdgeOptions}
        fitView
        panOnScroll
        panOnScrollSpeed={0.5}
        proOptions={{ hideAttribution: true }}
        connectionLineComponent={FloatingConnectionLine}
      />
    </div>
  );
}

export default Flow;
