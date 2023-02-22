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

                "neutral-dark": '#191919',
                neutral: '#3D3D3D',
                "neutral-light": '#5F5F5F',
                "neutral-inactive": '#BDBDBD',
                "primary-dark": '#263236',
                primary: '#C4E2EC',
                "primary-light": '#FFFFFF',
                "primary-inactive": '#53656A',
                "highlight-a": '#C0F48B',
                "highlight-b": '#FFDC84',
                "highlight-c": '#FFA98E',
                "highlight-favorite": '#F4CF0B'
            },
        },
    },
    plugins: [],
};
