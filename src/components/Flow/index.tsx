import SubjectData, { Prerequisite } from "@/utils/subjectData";
import { useCallback, useEffect, useState } from "react";
import ReactFlow, {
  Node,
  useNodesState,
  useEdgesState,
  Edge,
  DefaultEdgeOptions,
  SelectionMode,
  MiniMap,
  ReactFlowProvider,
  useReactFlow,
  Controls,
  useKeyPress,
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

function FlowView() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const { setViewport, fitView } = useReactFlow();

  const handleTransform = useCallback(() => {
    // setViewport({ x: 500, y: 100, zoom: 0.4 }, { duration: 800 });
    fitView({ duration: 800 });
  }, [fitView]);

  const { settings } = useFilterSettings();

  const filterSubject: (subject: SubjectData) => boolean = useCallback(
    (subject: SubjectData) => subject &&
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

  const spaceKey = useKeyPress("Space");
  useEffect(() => {
    fitView({ duration: 800, padding: 0.1 });
  }, [spaceKey, fitView]);

  useEffect(() => {
    const filteredSemesters = settings.hideDisabled
      ? semesters.map((semester) => semester.filter(filterSubject))
      : semesters;

    let newNodes: Node<NodeData>[] = [];
    let newEdges: Edge[] = [];
    let even = 0;
    filteredSemesters.map((subjects, semesterIndex) => {
      even = 1 - even;
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
            x: subjectIndex * 400 + even * 200,
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
              id: `e-${node.data.subject.id}-${child.id}_w`,
              source: node.data.subject.id,
              target: child.id,
              sourceNode: node,
              sourceHandle: `w-s`,
              targetNode: childNode,
              targetHandle: `w-t`,
            });
          } else {
            node.data.subject.specializations.map((spec) => {
              newEdges.push({
                id: `e-${node.data.subject.id}_${spec}-${child.id}_${spec}`,
                source: node.data.subject.id,
                target: child.id,
                sourceNode: node,
                sourceHandle: `${spec}-s`,
                targetNode: childNode,
                targetHandle: `${spec}-t`,
              });
            });
          }
        }
      });
    });
    setNodes(newNodes);
    setEdges(newEdges);
    setNeedsViewUpdate((x) => !x);
  }, [setNodes, setEdges, settings, filterSubject, handleTransform, fitView]);

  const [needsViewUpdate, setNeedsViewUpdate] = useState(false);
  useEffect(() => {
    handleTransform();
  }, [needsViewUpdate, handleTransform]);

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
        minZoom={0}
        panOnScroll
        panOnScrollSpeed={0.5}
        proOptions={{ hideAttribution: true }}
      />
    </div>
  );
}

const Flow = () => (
  <ReactFlowProvider>
    <FlowView />
  </ReactFlowProvider>
);

export default Flow;
