import SubjectData from "@/utils/subjectData";
import {
  BookOpenIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  EllipsisHorizontalCircleIcon,
  SparklesIcon,
  StarIcon,
  XCircleIcon,
} from "@heroicons/react/20/solid";
import { memo, FC, useState } from "react";
import { Handle, Position, NodeProps } from "reactflow";

interface Props {
  data: SubjectData;
  xPos: number;
  yPos: number;
}

const SubjectNode: FC<NodeProps> = ({ data, xPos, yPos }: Props) => {
  const subject = data; // For readability purposes

  const [open, setOpen] = useState<boolean>(false);
  const [favorite, setFavorite] = useState<boolean>(false);
  return (
    <>
      <div
        className={`${
          favorite ? "border-favorite border-2" : "border-grey-dark border-2"
        }
         p-5 bg-grey-dark rounded-2xl w-72 shadow-md transition-all duration-200 ease-in-out`}
      >
        <div className='text-sm text-subject-code'>{subject.id}</div>
        <div className='text-xl font-bold'>{subject.name}</div>
        <hr className='my-2' />
        <div className='flex flex-nowrap gap-2 font-semibold items-center'>
          <SparklesIcon className='h-5 w-5' /> {subject.credit} kredit
        </div>
        <div className='flex flex-nowrap gap-2 font-semibold items-center'>
          <BookOpenIcon className='h-5 w-5' /> {subject.field}
        </div>

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
              className={`w-10 h-10 text-lg text-grey-darker font-bold flex justify-center items-center rounded-md ${
                spec === "A"
                  ? "bg-accent-dark"
                  : spec === "B"
                  ? "bg-accent"
                  : "bg-accent-lighter"
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
          className='absolute bottom-2 right-3 font-bold'
        >
          <ChevronUpIcon
            className={`h-8 w-8 absolute transition-opacity duration-200 ease-in-out  ${
              open ? "opacity-100" : "opacity-0"
            }`}
          />
          <ChevronDownIcon
            className={`h-8 w-8 transition-opacity duration-200 ease-in-out  ${
              !open ? "opacity-100" : "opacity-0"
            }`}
          />
        </button>
        <button
          className='absolute top-3 right-3 font-bold'
          onClick={() => setFavorite(!favorite)}
        >
          <StarIcon
            className={`h-6 w-6 absolute transition-opacity duration-200 ease-in-out text-favorite ${
              favorite ? "opacity-100" : "opacity-0"
            }`}
          />
          <StarIconOutline
            className={`h-6 w-6 transition-opacity duration-200 ease-in-out text-white ${
              !favorite ? "opacity-100" : "opacity-0"
            }`}
          />
        </button>
      </div>
      <Handle type='target' position={Position.Left} className='invisible' />
      <Handle type='source' position={Position.Right} className='invisible' />
    </>
  );
};

function StarIconOutline(props: any) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth={1.5}
      stroke='currentColor'
      {...props}
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z'
      />
    </svg>
  );
}

export default memo(SubjectNode);
