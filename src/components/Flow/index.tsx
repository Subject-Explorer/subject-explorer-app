import SubjectData from "@/utils/subjectData";
import { useEffect} from "react";
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

// TODO: Make this an API request
const semesters: SubjectData[][] = data as SubjectData[][];

const nodeTypes = {
  custom: CustomNode,
  subject: SubjectNode,
};

const defaultEdgeOptions: DefaultEdgeOptions = {
  animated: false,
  type: "simplebezier",
  style: { stroke: "#F2A869", strokeWidth: 5 },
};

function Flow() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  //TODO: Implement filters state

  useEffect(() => {
    let newNodes: Node[] = [];
    let newEdges: Edge[] = [];
    semesters.map((subjects, semesterIndex) => {
      subjects.map((subject, subjectIndex) => {
        newNodes.push({
          id: subject.id,
          data: subject,
          position: {
            x: subjectIndex * 400,
            y: semesterIndex * 400,
          },
          type: "subject",
        });
        if (subject.prerequisites.length > 0) {
          //TODO: Handle soft prerequisites
          subject.prerequisites.map((prerequisite) => {
            newEdges.push({
              id: `e-${prerequisite.id}-${subject.id}`,
              source: prerequisite.id,
              target: subject.id,
            });
          });
        }
      });
    });
    setNodes(newNodes);
    setEdges(newEdges);
  }, []);

  // const onConnect = useCallback(
  //   (params: Connection | Edge) => setEdges((eds) => addEdge(params, eds)),
  //   [setEdges]
  // );

  return (
    <div className='flex-grow bg-primary-darker stroke-modeler'>
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
