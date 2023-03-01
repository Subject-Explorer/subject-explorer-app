import SubjectData from "@/utils/subjectData";
import { useCallback, useEffect } from "react";
import ReactFlow, {
  Node,
  useNodesState,
  useEdgesState,
  Edge,
  DefaultEdgeOptions
} from "reactflow";
import CustomNode from "./CustomNode";
import SubjectNode from "./SubjectNode";
import data from "../../../public/data.json";
import { useFilterSettings } from "@/utils/hooks/useFilterSettings";

// TODO: Make this an API request
const semesters: SubjectData[][] = data as SubjectData[][];

const nodeTypes = {
  custom: CustomNode,
  subject: SubjectNode
};

const defaultEdgeOptions: DefaultEdgeOptions = {
  animated: false,
  type: "simplebezier",
  style: {strokeWidth: 2}
};

function Flow() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const {settings} = useFilterSettings();

  const filterSubject: (subject: SubjectData) => boolean = useCallback(
    (subject: SubjectData) =>
      subject.name.toLowerCase().includes(settings.query.toLowerCase()) &&
      settings.fields.some(
        (fieldCheckbox) =>
          subject.field === fieldCheckbox.value && fieldCheckbox.checked
      ) &&
      settings.specializations.some(
        (specCheckbox) =>
          subject.specializations.includes(specCheckbox.value) &&
          specCheckbox.checked
      ) &&
      settings.tests.some(
        (testCheckbox) =>
          subject.test === testCheckbox.value && testCheckbox.checked
      ) &&
      settings.credits.min <= subject.credit &&
      settings.credits.max >= subject.credit,
    [settings]
  );

  useEffect(() => {
    const filteredSemesters = settings.hideDisabled
      ? semesters.map((semester) => semester.filter(filterSubject))
      : semesters;

    let newNodes: Node[] = [];
    let newEdges: Edge[] = [];
    filteredSemesters.map((subjects, semesterIndex) => {
      subjects.map((subject, subjectIndex) => {
        // if null, skip
        if (subject === null) return;
        newNodes.push({
          id: subject.id,
          data: {subject: subject, disabled: !filterSubject(subject)},
          position: {
            x: subjectIndex * 400,
            y: semesterIndex * 400
          },
          type: "subject"
        });
        if (subject.children.length > 0) {
          //TODO: Handle soft prerequisites
          subject.children.map((child) => {
            newEdges.push({
              id: `e-${subject.id}-${child}`,
              source: subject.id,
              target: child
            });
          });
        }
      });
    });
    setNodes(newNodes);
    setEdges(newEdges);
  }, [setNodes, setEdges, settings, filterSubject]);

  return (
    <div className="stroke-modeler flex-grow bg-neutral-dark">
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
        selectionOnDrag={false}
      />
    </div>
  );
}

export default Flow;
