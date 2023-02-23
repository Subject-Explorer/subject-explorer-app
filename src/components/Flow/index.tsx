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

// TODO: Make this an API request
const semesters: SubjectData[][] = data as SubjectData[][];

const nodeTypes = {
  custom: CustomNode,
  subject: SubjectNode,
};

const defaultEdgeOptions: DefaultEdgeOptions = {
    animated: false,
    type: "simplebezier",
    style: { stroke: "#F2A869", strokeWidth: 2 },
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
        if (subject.children.length > 0) {
          //TODO: Handle soft prerequisites
          subject.children.map((child) => {
            newEdges.push({
              id: `e-${subject.id}-${child}`,
              source: subject.id,
              target: child,
            });
          });
        }
      });
    });
    setNodes(newNodes);
    setEdges(newEdges);
  }, []);

    return (
        <div className='flex-grow bg-neutral-dark stroke-modeler'>
            <ReactFlow
                nodes={nodes}
                onNodesChange={onNodesChange}
                edges={edges}
                onEdgesChange={onEdgesChange}
                nodeTypes={nodeTypes}
                defaultEdgeOptions={defaultEdgeOptions}
                fitView
                panOnScroll
                panOnScrollSpeed={0.5}
                proOptions={{hideAttribution: true}}
            />
        </div>
    );
}

export default Flow;
