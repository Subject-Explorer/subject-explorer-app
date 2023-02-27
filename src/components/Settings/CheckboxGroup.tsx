import { CheckGroup } from "@/utils/settingData";
import React from "react";

interface Props<T> {
  label: string;
  checkboxes: CheckGroup<T>;
  onChange: (value: string) => void;
  className?: string;
}
export default function CheckboxGroup<T extends string>({
  label,
  checkboxes,
  onChange,
  className = "",
}: Props<T>) {
  return (
    <div className="min-w-[160px]">
      <div className="text-accent">{label}</div>
      <div className="bg-accent h-[1px] rounded-full"></div>
      <div className={"flex flex-col flex-wrap gap-1 " + className}>
        {checkboxes.map((checkbox) => (
          <label
            key={checkbox.value}
            className={`${
              checkbox.checked
                ? "bg-primary text-primary-dark"
                : "bg-neutral-light text-primary-light"
            }flex cursor-pointer flex-nowrap items-center rounded-lg  px-2 py-2 `}
          >
            <input
              type="checkbox"
              id={checkbox.value}
              name={checkbox.label}
              value={checkbox.value}
              checked={checkbox.checked}
              onChange={() => onChange(checkbox.value)}
              className={`mr-1 cursor-pointer rounded-sm border-2 border-primary-light bg-transparent text-primary-dark outline-0 ring-0 ring-offset-0 transition-all duration-150 checked:border-none checked:bg-primary-dark`}
            />
            <span
              className={`${
                checkbox.checked ? "text-primary-dark" : "text-primary-light"
              }`}
            >
              {checkbox.label}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}
