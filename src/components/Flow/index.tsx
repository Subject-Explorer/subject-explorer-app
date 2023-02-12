import SubjectData from "@/utils/subjectData";
import { useCallback, useEffect } from "react";
import ReactFlow, {
  Node,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  ConnectionLineType,
  DefaultEdgeOptions,
} from "reactflow";
import CustomNode from "./CustomNode";
import SubjectNode from "./SubjectNode";

const subjects: SubjectData[] = [
  {
    id: "IP-18aDMME",
    name: "Diszkrét matematikai modellek és alkalmazásaik",
    lessonCount: {
      lecture: 2,
      practice: 0,
      laboratory: 0,
      consultation: 1,
    },
    test: "K",
    credit: 3,
    semesters: [5],
    prerequisites: ["IP-18DM1E"],
    field: "mathematics",
    specializations: ["A", "B", "C"],
  },
  {
    id: "IP-18DM1E",
    name: "Diszkrét matematika I",
    lessonCount: {
      lecture: 2,
      practice: 0,
      laboratory: 0,
      consultation: 0,
    },
    test: "K",
    credit: 2,
    semesters: [2],
    prerequisites: ["IP-18DM1G"],
    field: "mathematics",
    specializations: ["A", "B", "C"],
  },
  {
    id: "IP-18DM1G",
    name: "Diszkrét matematika I",
    lessonCount: {
      lecture: 0,
      practice: 2,
      laboratory: 0,
      consultation: 1,
    },
    test: "FG",
    credit: 3,
    semesters: [2],
    prerequisites: ["IP-18MATAG"],
    field: "mathematics",
    specializations: ["A", "B", "C"],
  },
  {
    id: "IP-18MATAG",
    name: "Matematikai alapok",
    lessonCount: {
      lecture: 0,
      practice: 4,
      laboratory: 0,
      consultation: 0,
    },
    test: "FG",
    credit: 4,
    semesters: [1],
    prerequisites: [],
    field: "mathematics",
    specializations: ["A", "B", "C"],
  },
];

// const initialNodes: Node[] = [
//   {
//     id: "1",
//     data: { label: "Node 1" },
//     position: { x: 0, y: 0 },
//     type: "subject",
//   },
//   {
//     id: "2",
//     data: { label: "Node 2" },
//     position: { x: 600, y: 0 },
//     type: "subject",
//   },
//   {
//     id: "3",
//     data: { label: "Node 3" },
//     position: { x: 600, y: 500 },
//     type: "subject",
//   },
//   {
//     id: "4",
//     data: { label: "Node 4" },
//     position: { x: 1200, y: 0 },
//     type: "subject",
//   },
//   {
//     id: "5",
//     data: { label: "Node 5" },
//     position: { x: 1200, y: 500 },
//     type: "subject",
//   },
//   {
//     id: "6",
//     data: { label: "Node 6" },
//     position: { x: 1200, y: 1000 },
//     type: "subject",
//   },
// ];

// const initialEdges: Edge[] = [
//   { id: "e1-2", source: "1", target: "2" },
//   { id: "e1-3", source: "1", target: "3" },
//   { id: "e1-3", source: "2", target: "4" },
//   { id: "e1-3", source: "3", target: "4" },
//   { id: "e1-3", source: "2", target: "5" },
//   { id: "e1-3", source: "3", target: "5" },
//   { id: "e1-3", source: "2", target: "6" },
// ];

const nodeTypes = {
  custom: CustomNode,
  subject: SubjectNode,
};

const defaultEdgeOptions: DefaultEdgeOptions = {
  animated: true,
  type: "simplebezier",
  style: { stroke: "#F2A869", strokeWidth: 5 },
  // className: "stroke-modeler",
};

function Flow() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  //TODO: Implement filters state

  useEffect(() => {
    let newNodes: Node[] = [];
    let newEdges: Edge[] = [];

    subjects.map((subject) => {
      newNodes.push({
        id: subject.id,
        data: subject,
        position: { x: 0 + subject.semesters[0] * 400, y: 0 },
        type: "subject",
      });
      if (subject.prerequisites.length > 0) {
        //TODO: Handle soft prerequisites
        subject.prerequisites.map((prerequisite) => {
          newEdges.push({
            id: `e-${prerequisite}-${subject.id}`,
            source: prerequisite,
            target: subject.id,
          });
        });
      }
    });
    setNodes(newNodes);
    setEdges(newEdges);
  }, []);

  // const onConnect = useCallback(
  //   (params: Connection | Edge) => setEdges((eds) => addEdge(params, eds)),
  //   [setEdges]
  // );

  return (
    <div className='flex-grow bg-grey-darker stroke-modeler'>
      <ReactFlow
        nodes={nodes}
        onNodesChange={onNodesChange}
        edges={edges}
        onEdgesChange={onEdgesChange}
        // onConnect={onConnect}
        nodeTypes={nodeTypes}
        defaultEdgeOptions={defaultEdgeOptions}
        // connectionLineType={ConnectionLineType.Straight}
        fitView
        proOptions={{ hideAttribution: true }}
      />
    </div>
  );
}

export default Flow;
