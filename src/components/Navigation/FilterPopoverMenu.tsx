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
      <div className="absolute left-1/2 top-full z-10 flex min-w-[200px] max-w-xl -translate-x-1/2 transform flex-wrap justify-center gap-8 rounded-lg bg-neutral p-4 shadow-lg sm:px-0">
        <CheckboxGroup
          label="Ismeretkör"
          checkboxes={settings.fields}
          onChange={handleCheckChange(settings.fields, "fields")}
          className="max-h-52"
        />
        <CheckboxGroup
          label="Specializáció"
          checkboxes={settings.specializations}
          onChange={handleCheckChange(
            settings.specializations,
            "specializations"
          )}
          className="max-h-52"
        />
        <CheckboxGroup
          label="Számonkérés"
          checkboxes={settings.tests}
          onChange={handleCheckChange(settings.tests, "tests")}
          className="max-h-40"
        />
        <div className="min-w-full bg-primary-dark">Credit</div>
      </div>
    </Transition>
  );
}
