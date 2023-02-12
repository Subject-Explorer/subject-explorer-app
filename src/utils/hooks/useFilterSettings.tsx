import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { Field, Specialization } from "../subjectData";

type Settings = {
  query: string;
  fields: Field[];
  specializations: Specialization[];
};

type MaybeSettings = {
  query?: string;
  fields?: Field[];
  specializations?: Specialization[];
};

type Subscription = {
  settings: Settings;
  setSettings: (newSettings: MaybeSettings) => void;
};

const FilterSettingsContext = React.createContext<Subscription>(
  undefined as unknown as Subscription
);

interface Props {
  children: undefined | JSX.Element | JSX.Element[];
}

const FilterSettingsProvider = ({ children }: Props) => {
  const [settings, updateSettings] = useState<Settings>({
    query: "",
    fields: ["mathematics", "informatics", "computers"],
    specializations: ["A", "B", "C"],
  });

  useEffect(() => {
    if (typeof window !== undefined) {
      if (localStorage.getItem("filterSettings") !== null) {
        updateSettings(
          JSON.parse(localStorage.getItem("filterSettings") || "")
        );
      }
    }
  }, []);

  const setSettings = (newSettings: MaybeSettings) => {
    const newQuery =
      newSettings.query !== undefined ? newSettings.query : settings.query;
    const newFields =
      newSettings.fields !== undefined ? newSettings.fields : settings.fields;
    const newSpecializations =
      newSettings.specializations !== undefined
        ? newSettings.specializations
        : settings.specializations;

    const updatedSettings: Settings = {
      query: newQuery,
      fields: newFields,
      specializations: newSpecializations,
    };
    if (typeof window !== undefined) {
      window.localStorage.setItem(
        "typingTestSettings",
        JSON.stringify(updatedSettings)
      );
    }

    updateSettings(updatedSettings);
  };
  return (
    <FilterSettingsContext.Provider
      value={{
        settings: settings,
        setSettings: setSettings,
      }}
    >
      {children}
    </FilterSettingsContext.Provider>
  );
};

const useFilterSettings = () => {
  return useContext(FilterSettingsContext);
};

export { FilterSettingsProvider, useFilterSettings };
