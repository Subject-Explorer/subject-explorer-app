import { useFilterSettings } from "@/utils/hooks/useFilterSettings";
import { Check, CheckGroup, CheckTypeKeys } from "@/utils/settingData";
import { Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import CheckboxGroup from "../Settings/CheckboxGroup";
interface Props {
  open: boolean;
}

export default function FilterPopoverMenu({ open }: Props) {
  const { settings, setSettings } = useFilterSettings();

  const handleCheckChange =
    <T,>(setting: CheckGroup<T>, field: CheckTypeKeys) =>
    (value: string) => {
      const index = setting.findIndex((x) => x.value === value);
      if (index < 0) throw new Error("Cosmic ray error");
      const newField: Check<T> = {
        ...setting[index],
        checked: !setting[index]?.checked,
      };
      const newFields: CheckGroup<T> = [...setting];
      newFields.splice(index, 1, newField);
      setSettings({ [field]: newFields });
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
        <div className="mx-auto flex w-full max-w-2xl flex-wrap gap-8 rounded-lg bg-neutral py-4 px-8 shadow-lg">
          <CheckboxGroup
            label="Ismeretkör"
            checkboxes={settings.fields}
            onChange={handleCheckChange(settings.fields, "fields")}
          />
          <CheckboxGroup
            label="Specializáció"
            checkboxes={settings.specializations}
            onChange={handleCheckChange(
              settings.specializations,
              "specializations"
            )}
          />
          <CheckboxGroup
            label="Számonkérés"
            checkboxes={settings.tests}
            onChange={handleCheckChange(settings.tests, "tests")}
          />
        </div>
      </div>
    </Transition>
  );
}
