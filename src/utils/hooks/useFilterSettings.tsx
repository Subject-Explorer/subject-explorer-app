import React, { useEffect, useState } from "react";
import { useContext } from "react";
import defaultSettings from "../defaultSettings";
import Settings, { MaybeSettings } from "../settingData";

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
  const [settings, setSettings] = useState<Settings>(defaultSettings);

  useEffect(() => {
    if (typeof window !== undefined) {
      if (localStorage.getItem("filterSettings") !== null) {
        setSettings(JSON.parse(localStorage.getItem("filterSettings") || ""));
      }
    }
  }, []);

  const updateSettings = (updateSettings: MaybeSettings) => {
    setSettings((prevSettings) => {
      const newSettings = {
        ...prevSettings,
        ...updateSettings,
      };
      console.log(newSettings.fields);
      if (typeof window !== undefined) {
        window.localStorage.setItem("filterSettings", JSON.stringify(settings));
      }
      return newSettings;
    });
  };

  return (
    <FilterSettingsContext.Provider
      value={{
        settings: settings,
        setSettings: updateSettings,
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
