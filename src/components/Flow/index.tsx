import SubjectData, { Prerequisite } from "@/utils/subjectData";
import { useCallback, useEffect } from "react";
import ReactFlow, {
  Node,
  useNodesState,
  useEdgesState,
  Edge,
  DefaultEdgeOptions,
  SelectionMode,
} from "reactflow";
import CustomNode from "./CustomNode";
import SubjectNode, { NodeData } from "./SubjectNode";
import data from "../../../public/data.json";
import { useFilterSettings } from "@/utils/hooks/useFilterSettings";

// TODO: Make this an API request
const semesters: SubjectData[][] = data as SubjectData[][];

const nodeTypes = {
  custom: CustomNode,
  subject: SubjectNode,
};

const defaultEdgeOptions: DefaultEdgeOptions = {
  animated: false,
  type: "simplebezier",
  style: { strokeWidth: 2 },
};

function Flow() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const { settings } = useFilterSettings();

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

    let newNodes: Node<NodeData>[] = [];
    let newEdges: Edge[] = [];
    filteredSemesters.map((subjects, semesterIndex) => {
      subjects.map((subject, subjectIndex) => {
        // if null, skip
        if (subject === null) return;
        newNodes.push({
          id: subject.id,
          data: {
            subject: subject,
            disabled: !filterSubject(subject),
          },
          position: {
            x: subjectIndex * 400,
            y: semesterIndex * 400,
          },
          type: "subject",
        });
      });
    });
    newNodes.map((node) => {
      if (node.data.subject.children.length < 1) return;

      node.data.subject.children.map((child: Prerequisite) => {
        const childNode = newNodes.find((node) => node.id === child.id);
        //TODO: Handle hidden state
        if (childNode) {
          //TODO: Handle soft prerequisites
          if (child.weak) {
            newEdges.push({
              id: `e-${node.data.subject.id}-${child}_w`,
              source: node.data.subject.id,
              target: child.id,
              sourceNode: node,
              sourceHandle: `w-s`,
              targetNode: childNode,
              targetHandle: `w-t`,
            });
          }
          node.data.subject.specializations.map((spec) => {
            newEdges.push({
              id: `e-${node.data.subject.id}_${spec}-${child}_${spec}`,
              source: node.data.subject.id,
              target: child.id,
              sourceNode: node,
              sourceHandle: `${spec}-s`,
              targetNode: childNode,
              targetHandle: `${spec}-t`,
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
        fitViewOptions={{ minZoom: 0.2 }}
        defaultViewport={{ x: 0, y: 0, zoom: 0.2 }}
        panOnScroll
        panOnScrollSpeed={0.5}
        panOnDrag={false}
        proOptions={{ hideAttribution: true }}
        selectionOnDrag
        selectionMode={SelectionMode.Partial}
      />
    </div>
  );
}

export default Flow;
