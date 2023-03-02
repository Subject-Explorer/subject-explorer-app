import SubjectData from "@/utils/subjectData";
import {
  SparklesIcon,
  StarIcon,
  XMarkIcon,
  InformationCircleIcon,
  AcademicCapIcon,
} from "@heroicons/react/20/solid";
import { memo, FC, useState } from "react";
import { Handle, Position, NodeProps } from "reactflow";
import { Space_Grotesk } from "@next/font/google";

export type NodeData = { subject: SubjectData; disabled: boolean };
interface Props {
  data: { subject: SubjectData; disabled: boolean };
  //   xPos: number;
  //   yPos: number;
}

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["700"],
  display: "swap",
});

const SubjectNode: FC<NodeProps> = ({ data }: Props) => {
  const { subject, disabled } = data;
  const [open, setOpen] = useState<boolean>(false);
  const [favorite, setFavorite] = useState<boolean>(false);
  return (
    <>
      <div className="absolute -top-2 flex w-full flex-nowrap justify-center">
        <Handle
          id="A-t"
          type="target"
          position={Position.Bottom}
          className="static h-2 w-10 translate-x-0 rounded-none rounded-tl-md border-none bg-highlight-a opacity-40"
        />
        <Handle
          id="B-t"
          type="target"
          position={Position.Bottom}
          className="static h-2 w-10 translate-x-0 rounded-none border-none bg-highlight-b opacity-40"
        />
        <Handle
          id="C-t"
          type="target"
          position={Position.Bottom}
          className="static h-2 w-10 translate-x-0 rounded-none rounded-tr-md border-none bg-highlight-c opacity-40"
        />
      </div>

      <div
        className={`
        ${
          favorite
            ? "border-2 border-highlight-favorite"
            : "border-2 border-primary-dark"
        } 
        ${disabled ? "opacity-50 saturate-[.2]" : "opacity-100"} 
        w-[280px] rounded-2xl bg-primary-dark p-6 shadow-md transition-all duration-200 ease-in-out`}
      >
        <div
          className={`${
            favorite ? "text-highlight-favorite" : "text-neutral-inactive"
          } text-xs transition-colors duration-150`}
        >
          {subject.id}
        </div>
        <div className="text-2xl font-bold" style={spaceGrotesk.style}>
          {subject.name}
        </div>
        <hr className="my-2 h-px w-full text-primary-light" />
        <div className="flex flex-col flex-nowrap items-start gap-1 text-sm font-light">
          <div className="flex flex-nowrap items-center gap-2">
            <SparklesIcon
              className={`${
                favorite ? "text-highlight-favorite" : "text-primary-light"
              } h-5 w-5 text-xs transition-colors duration-150`}
            />{" "}
            {subject.credit} kredit
          </div>
          <div className="flex flex-nowrap items-center gap-2">
            <AcademicCapIcon
              className={`${
                favorite ? "text-highlight-favorite" : "text-primary-light"
              } h-5 w-5 text-xs transition-colors duration-150`}
            />{" "}
            {subject.field.charAt(0).toUpperCase() + subject.field.slice(1)}
          </div>
        </div>

        {open && (
          <div className="flex flex-col gap-1 text-sm font-light">
            <hr className="my-2 h-px w-full text-primary-light" />
            <div>Előadás: {subject.lessonCount.lecture}</div>
            <div>Labor: {subject.lessonCount.laboratory}</div>
            <div>Gyakorlat: {subject.lessonCount.practice}</div>
            <div>Konzultáció: {subject.lessonCount.consultation}</div>
            <div>Számonkérés: {subject.test}</div>
            <hr className="my-2 h-px w-full text-primary-light" />
          </div>
        )}

        <div className="mt-2 flex flex-nowrap gap-2.5">
          {subject.specializations.map((spec, index) => (
            <div
              key={index}
              className={`flex h-10 w-10 items-center justify-center rounded-md text-[20px] font-bold text-neutral-dark ${
                spec === "A"
                  ? "bg-highlight-a"
                  : spec === "B"
                  ? "bg-highlight-b"
                  : "bg-highlight-c"
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
          className="absolute bottom-4 right-4 font-bold text-neutral-inactive"
        >
          <XMarkIcon
            className={`absolute h-8 w-8 transition-opacity duration-200 ease-in-out  ${
              open ? "opacity-100" : "opacity-0"
            }`}
          />
          <InformationCircleIcon
            className={`h-8 w-8 transition-opacity duration-200 ease-in-out  ${
              !open ? "opacity-100" : "opacity-0"
            }`}
          />
        </button>
        <button
          className="absolute top-4 right-4 font-bold"
          onClick={() => setFavorite(!favorite)}
        >
          <StarIcon
            className={`absolute h-6 w-6 text-highlight-favorite transition-opacity duration-200 ease-in-out ${
              favorite ? "opacity-100" : "opacity-0"
            }`}
          />
          <StarIconOutline
            className={`h-6 w-6 text-neutral-inactive transition-opacity duration-200 ease-in-out ${
              !favorite ? "opacity-100" : "opacity-0"
            }`}
          />
        </button>
        <div
          className={`${
            favorite ? "opacity-20" : "opacity-0"
          } pointer-events-none absolute top-0 left-0 h-full w-full rounded-2xl bg-highlight-favorite mix-blend-color transition-opacity duration-150`}
        ></div>
      </div>
      <div className="absolute -bottom-2 flex w-full flex-nowrap justify-center">
        <Handle
          id="A-s"
          type="source"
          position={Position.Bottom}
          className="static h-2 w-10 translate-x-0 rounded-none rounded-bl-md border-none bg-highlight-a opacity-40"
        />
        <Handle
          id="B-s"
          type="source"
          position={Position.Bottom}
          className="static h-2 w-10 translate-x-0 rounded-none border-none bg-highlight-b opacity-40"
        />
        <Handle
          id="C-s"
          type="source"
          position={Position.Bottom}
          className="static h-2 w-10 translate-x-0 rounded-none rounded-br-md border-none bg-highlight-c opacity-40"
        />
      </div>

      <Handle
        id="w-t"
        type="target"
        position={Position.Left}
        className="-left-2 h-10 w-2 rounded-none rounded-l-md border-none bg-neutral opacity-40"
      />
      <Handle
        id="w-s"
        type="source"
        position={Position.Right}
        className="-right-2 h-10 w-2 rounded-none rounded-r-md border-none bg-neutral opacity-40"
      />
    </>
  );
};

function StarIconOutline(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
      />
    </svg>
  );
}

export default memo(SubjectNode);
