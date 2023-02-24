import React, { useEffect, useState } from "react";
import { useContext } from "react";
import Settings, { MaybeSettings } from "../settingData";

type Subscription = {
  settings: Settings;
  setSettings: (newSettings: MaybeSettings) => void;
};

// const determineSetting = <T,>(newVal: T | undefined, oldVal: T) =>
//   newVal ?? oldVal;

const FilterSettingsContext = React.createContext<Subscription>(
  undefined as unknown as Subscription
);

interface Props {
  children: undefined | JSX.Element | JSX.Element[];
}

const FilterSettingsProvider = ({ children }: Props) => {
  const [settings, setSettings] = useState<Settings>({
    query: "",
    fields: [
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
      {
        value: "egyéb",
        label: "Egyéb",
        checked: true,
      },
    ],
    specializations: [
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
    ],
    tests: [
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
    ],
    credits: {
      min: 0,
      max: 20,
    },
  });

  useEffect(() => {
    if (typeof window !== undefined) {
      if (localStorage.getItem("filterSettings") !== null) {
        setSettings(JSON.parse(localStorage.getItem("filterSettings") || ""));
      }
    }
  }, []);

  // const updateSettings = (newSettings: MaybeSettings) => {
  //   const updatedSettings: Settings = {
  //     query: determineSetting<string>(newSettings.query, settings.query),
  //     fields: determineSetting<CheckGroup<Field>>(
  //       newSettings.fields,
  //       settings.fields
  //     ),
  //     specializations: determineSetting<CheckGroup<Specialization>>(
  //       newSettings.specializations,
  //       settings.specializations
  //     ),
  //     tests: determineSetting<CheckGroup<Test>>(
  //       newSettings.tests,
  //       settings.tests
  //     ),
  //     credits: determineSetting<CreditRange>(
  //       newSettings.credits,
  //       settings.credits
  //     ),
  //   };
  //   if (typeof window !== undefined) {
  //     window.localStorage.setItem(
  //       "filterSettings",
  //       JSON.stringify(updatedSettings)
  //     );
  //   }
  //   setSettings(updatedSettings);
  // };

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
