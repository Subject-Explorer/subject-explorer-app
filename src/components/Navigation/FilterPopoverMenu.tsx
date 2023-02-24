import { useFilterSettings } from "@/utils/hooks/useFilterSettings";
import { Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import CheckboxGroup from "../Settings/CheckboxGroup";
interface Props {
  open: boolean;
}

export default function FilterPopoverMenu({ open }: Props) {
  const { settings, setSettings } = useFilterSettings();

  const handleFieldCheckChange = (value: string) => {
    //TODO: Implement function
  };
  const handleSpecCheckChange = (value: string) => {
    //TODO: Implement function
  };
  const handleTestCheckChange = (value: string) => {
    //TODO: Implement function
  };
  const handleSubjectTypeCheckChange = (value: string) => {
    //TODO: Implement function
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
          <CheckboxGroup
            label="Ismeretkör"
            checkboxes={settings.fields}
            onChange={handleFieldCheckChange}
          />
          <CheckboxGroup
            label="Specializáció"
            checkboxes={settings.specializations}
            onChange={handleSpecCheckChange}
          />
          <CheckboxGroup
            label="Számonkérés"
            checkboxes={settings.tests}
            onChange={handleTestCheckChange}
          />
        </div>
      </div>
    </Transition>
  );
}
