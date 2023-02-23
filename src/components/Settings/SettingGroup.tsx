import React from "react";

export interface ICheckbox {
  value: string;
  label: string;
  checked: boolean;
}
interface Props {
  label: string;
  checkboxes: ICheckbox[];
  onChange: (value: string) => void;
}
export default function SettingGroup({ label, checkboxes, onChange }: Props) {
  return (
    <div className="mr-2">
      <div className="text-accent">{label}</div>
      <div className="h-[1px] rounded-full bg-accent"></div>
      <div className="flex max-h-24 flex-col flex-wrap gap-1">
        {checkboxes.map((checkbox) => (
          <label key={checkbox.value} className="cursor-pointer pr-2 pt-1">
            <input
              type="checkbox"
              id={checkbox.value}
              key={checkbox.value}
              name={checkbox.label}
              value={checkbox.value}
              className="mr-2 cursor-pointer rounded-sm bg-transparent text-accent-dark transition-all duration-150 checked:bg-accent"
            />
            <span>{checkbox.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
