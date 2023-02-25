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

  const updateSettings = (newSettings: MaybeSettings) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      ...newSettings,
    }));
    if (typeof window !== undefined) {
      window.localStorage.setItem("filterSettings", JSON.stringify(settings));
    }
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
