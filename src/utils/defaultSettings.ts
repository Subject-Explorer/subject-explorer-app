import Settings from "./settingData";

const defaultSettings: Settings = {
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
  hideDisabled: false,
};
export default defaultSettings;
