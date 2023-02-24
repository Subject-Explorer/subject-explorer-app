import { useFilterSettings } from "@/utils/hooks/useFilterSettings";
import { Field } from "@/utils/subjectData";
import React, { useEffect, useState } from "react";

interface SpecOption {
  id: Field;
  label: string;
}

const specializationOptions: SpecOption[] = [
  {
    id: "matematika",
    label: "Matematika",
  },
  {
    id: "informatika",
    label: "Informatika",
  },
  {
    id: "számítástechnika",
    label: "Számítástechnika",
  },
];

export default function SpecializationPopoverPanel() {
  const { settings, setSettings } = useFilterSettings();
  const [selected, setSelected] = useState(settings.fields);

  useEffect(() => {
    setSettings({ fields: selected });
  }, [selected, setSettings]);

  const handleSelectedChange = (id: Field) => {
    let newSelected = selected;
    newSelected.includes(id)
      ? newSelected.splice(newSelected.indexOf(id), 1)
      : newSelected.push(id);
    setSelected(newSelected);
  };

    return (
        <div className='mx-auto w-full max-w-md bg-neutral-light rounded-lg p-2 flex flex-col gap-2 shadow-lg'>
            {specializationOptions.map((option, index) => (
                <button
                    key={index}
                    onClick={() => handleSelectedChange(option.id)}
                    className={`${selected.includes(option.id)
                        ? "bg-neutral-inactive"
                        : "bg-neutral-dark"
                    }
                    relative flex cursor-pointer rounded-lg px-5 py-2 min-h-[40px] shadow-md focus:outline-none w-full transition-colors duration-150 ease-in-out`}
                >
                    <div className='flex w-full items-center justify-start gap-4'>
                        <div className={`${
                            selected.includes(option.id) ? "opacity-100" : "opacity-0"
                        } transition-opacity duration-150 ease-in-out`}
                        >
                            <CheckIcon showTick={selected.includes(option.id)}/>
                        </div>
                        <div className='flex items-center'>
                            <div className={`text-sm ${
                                selected.includes(option.id)
                                    ? "text-neutral-dark font-semibold"
                                    : "text-neutral-inactive"
                            } `}
                            >
                                {option.label}
                            </div>
                        </div>
                    </div>
                </button>
            ))}
        </div>
    );
}

interface CheckIconProps {
  showTick: boolean;
}

function CheckIcon({showTick}: CheckIconProps) {
    return (
        <svg viewBox='0 0 24 24' fill='none' className='h-6 w-6'>
            <rect
                x={2}
                y={2}
                width={20}
                height={20}
                rx={4}
                className='fill-primary-dark'
            />
            {showTick && (
                <path
                    d='M7 13l3 3 7-7'
                    className='stroke-neutral-inactive stroke-2'
                    strokeWidth={1.5}
                    strokeLinecap='round'
                    strokeLinejoin='round'
                />
            )}
        </svg>
    );
}