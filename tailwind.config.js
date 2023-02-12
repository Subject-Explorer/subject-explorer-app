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
        blue: "#1fb6ff",
        purple: "#7e5bef",
        pink: "#ff49db",
        orange: "#ff7849",
        green: "#13ce66",
        "accent-darker": "#834B1C",
        "accent-dark": "#F2A869",
        accent: "#F7CFAF",
        "accent-light": "#ECD5C4",
        "accent-lighter": "#FDF4E5",
        "grey-darker": "#343432",
        "grey-dark": "#5D5D5A",
        grey: "#82827D",
        "grey-light": "#C5C5C5",
        white: "#FFFFFF",
        favorite: "#F4CF0B",
      },
    },
  },
  plugins: [],
};
