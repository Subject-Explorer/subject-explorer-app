import { CheckGroup } from "@/utils/settingData";
import React from "react";

interface Props<T> {
  label: string;
  checkboxes: CheckGroup<T>;
  onChange: (value: string) => void;
}
export default function CheckboxGroup<T extends string>({
  label,
  checkboxes,
  onChange,
}: Props<T>) {
  return (
    <div className="mr-2">
      <div className="text-accent">{label}</div>
      <div className="h-[1px] rounded-full bg-accent"></div>
      <div className="flex max-h-32 flex-col flex-wrap gap-1">
        {checkboxes.map((checkbox) => (
          <label key={checkbox.value} className="cursor-pointer pr-2 pt-1">
            <input
              type="checkbox"
              id={checkbox.value}
              name={checkbox.label}
              value={checkbox.value}
              checked={checkbox.checked}
              onClick={() => onChange(checkbox.value)}
              className="mr-2 cursor-pointer rounded-sm bg-transparent text-accent-dark transition-all duration-150 checked:bg-accent-dark"
            />
            <span>{checkbox.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
