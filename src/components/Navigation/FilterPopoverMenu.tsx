import { Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import SettingGroup, { ICheckbox } from "../Settings/SettingGroup";
interface Props {
  open: boolean;
}

const fieldChecks: ICheckbox[] = [
  {
    value: "matematika",
    label: "Matematika",
    checked: true,
  },
  {
    value: "számítástechnika",
    label: "Számítástechnika",
    checked: true,
  },
  {
    value: "informatika",
    label: "Informatika",
    checked: true,
  },
];
const specChecks: ICheckbox[] = [
  {
    value: "A",
    label: "Modellező (A)",
    checked: true,
  },
  {
    value: "B",
    label: "Tervező (B)",
    checked: true,
  },
  {
    value: "C",
    label: "Fejlesztő (C)",
    checked: true,
  },
];
const testChecks: ICheckbox[] = [
  {
    value: "G",
    label: "G",
    checked: true,
  },
  {
    value: "K",
    label: "K",
    checked: true,
  },
  {
    value: "FG",
    label: "FG",
    checked: true,
  },
  {
    value: "XG",
    label: "XG",
    checked: true,
  },
  {
    value: "XFG",
    label: "XFG",
    checked: true,
  },
  {
    value: "XK",
    label: "XK",
    checked: true,
  },
];
export default function FilterPopoverMenu({ open }: Props) {
  const handleFieldCheckChange = (value: string) => {
    //TODO: Impelment function
  };
  const handleSpecCheckChange = (value: string) => {
    //TODO: Impelment function
  };
  const handleTestCheckChange = (value: string) => {
    //TODO: Impelment function
  };
  const handleSubjectTypeCheckChange = (value: string) => {
    //TODO: Impelment function
  };
  return (
    <Transition
      as={Fragment}
      enter="transition ease-in-out duration-200"
      enterFrom="opacity-0 translate-x-1"
      enterTo="opacity-100 translate-x-0"
      leave="transition ease-in-out duration-200"
      leaveFrom="opacity-100 translate-x-0"
      leaveTo="opacity-0 translate-x-1"
      show={open}
    >
      <div className="absolute left-1/2 top-full z-10 min-w-[200px] max-w-xl -translate-x-1/2 transform px-4 sm:px-0">
        <div className="mx-auto flex w-full max-w-2xl flex-wrap gap-8 rounded-lg bg-primary py-4 px-8 shadow-lg">
          <SettingGroup
            label="Ismeretkör"
            checkboxes={fieldChecks}
            onChange={handleFieldCheckChange}
          />
          <SettingGroup
            label="Specializáció"
            checkboxes={specChecks}
            onChange={handleSpecCheckChange}
          />
          <SettingGroup
            label="Számonkérés"
            checkboxes={testChecks}
            onChange={handleTestCheckChange}
          />
        </div>
      </div>
    </Transition>
  );
}
