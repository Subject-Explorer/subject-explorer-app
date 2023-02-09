/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // blue: "#1fb6ff",
        // purple: "#7e5bef",
        // pink: "#ff49db",
        // orange: "#ff7849",
        // green: "#13ce66",
        // yellow: "#ffc82c",
        // "gray-dark": "#273444",
        // gray: "#8492a6",
        // "gray-light": "#d3dce6",
        primary: "#5D5D5A",
        secondary: "#343432",
        tertiary: "#82827D",
        modeler: "#F2A869",
        engineer: "#F7CFAF",
        developer: "#FDF4E5",
        "subject-code": "#C5C5C5",
        credit: "#F4CF0B",
      },
    },
  },
  plugins: [],
};
