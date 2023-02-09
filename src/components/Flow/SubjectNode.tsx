import SubjectData from "@/utils/subjectData";
import { memo, FC, useState } from "react";
import { Handle, Position, NodeProps } from "reactflow";

interface Props {
  data: SubjectData;
  xPos: number;
  yPos: number;
}

const SubjectNode: FC<NodeProps> = ({ data, xPos, yPos }: Props) => {
  const subject = data; // For readability purposes

  //TODO: Make expand button more mobile friendly (too difficult to tap on)
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <div className='p-5 bg-primary rounded-2xl w-72 shadow-md transition-transform duration-300'>
        <div className='text-sm text-subject-code'>{subject.id}</div>
        <div className='text-xl font-bold'>{subject.name}</div>
        <hr className='my-2' />
        <div className=''>{subject.credit} kredit</div>
        <div>{subject.field}</div>

        {open && (
          <>
            <hr className='my-2' />
            <div>Előadás: {subject.lessonCount.lecture}</div>
            <div>Labor: {subject.lessonCount.laboratory}</div>
            <div>Gyakorlat: {subject.lessonCount.practice}</div>
            <div>Konzultáció: {subject.lessonCount.consultation}</div>
            <div>Számonkérés: {subject.test}</div>
            <hr className='my-2' />
          </>
        )}

        <div className='flex flex-nowrap gap-2 mt-2'>
          {subject.specializations.map((spec, index) => (
            <div
              key={index}
              className={`w-10 h-10 text-lg text-secondary font-bold flex justify-center items-center rounded-md ${
                spec === "A"
                  ? "bg-modeler"
                  : spec === "B"
                  ? "bg-engineer"
                  : "bg-developer"
              }`}
            >
              {spec}
            </div>
          ))}
        </div>
        <button
          onClick={() => {
            setOpen(!open);
          }}
          className='absolute bottom-1 right-3 font-bold'
        >
          {open ? "X" : "?"}
        </button>
      </div>
      <Handle type='target' position={Position.Left} className='invisible' />
      <Handle type='source' position={Position.Right} className='invisible' />
    </>
  );
};

export default memo(SubjectNode);
