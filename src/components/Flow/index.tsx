import SubjectData from "@/utils/subjectData";
import { useCallback, useEffect, useRef, useState } from "react";
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
// import data from "../../../public/data.json";
import test from "./test.json";
const getSemesters: () => SubjectData[][] = () => {
  let semesters: SubjectData[][] = [];
  const semesterCount = 6;
  for (let i = 0; i < semesterCount; i++) {
    semesters.push([]);
  }
  (test as SubjectData[]).forEach((subject) => {
    semesters[subject.semesters[0]].push(subject);
  });
  return semesters;
};

const nodeTypes = {
  custom: CustomNode,
  subject: SubjectNode,
};

const defaultEdgeOptions: DefaultEdgeOptions = {
  animated: true,
  type: "simplebezier",
  style: { stroke: "#F2A869", strokeWidth: 5 },
};

function Flow() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const [semesters, setSemesters] = useState<SubjectData[][]>(getSemesters());
  // const semesters: SubjectData[][] = getSemesters();
  // console.log(semesters);
  // const semesters: SubjectData[][] = useRef(getSemesters());
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
              id: `e-${prerequisite}-${subject.id}`,
              source: prerequisite.parent,
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
