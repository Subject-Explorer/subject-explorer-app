import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "reactflow/dist/style.css";
import {createTheme, NextUIProvider} from "@nextui-org/react";
import React from "react";

const theme = createTheme({
    type: "dark", // it could be "light" or "dark"
    theme: {
        colors: {
            /*
            // brand colors
            primaryLight: '$green200',
            primaryLightHover: '$green300',
            primaryLightActive: '$green400',
            primaryLightContrast: '$green600',
            primary: '#4ADE7B',
            primaryBorder: '$green500',
            primaryBorderHover: '$green600',
            primarySolidHover: '$green700',
            primarySolidContrast: '$white',
            primaryShadow: '$green500',

            gradient: 'linear-gradient(112deg, $blue100 -25%, $pink500 -10%, $purple500 80%)',
            link: '#5E1DAD',
             */

            // custom colors
            "primary-dark": '$primary-dark',
            primary: '$primary',
            "primary-light": '$primary-light',
            "primary-inactive": '$primary-inactive',
            "accent-dark": '$accent-dark',
            accent: '$accent',
            "accent-light": '$accent-light',
            "accent-inactive": '$accent-inactive',
            "highlight-a": '$highlight-a',
            "highlight-b": '$highlight-b',
            "highlight-c": '$highlight-c',
            "highlight-favorite": '$highlight-favorite'
        },
        space: {},
        fonts: {}
    }
})
export default function App({ Component, pageProps }: AppProps) {
    return (
        <NextUIProvider theme={theme}>
            <Component {...pageProps} />
        </NextUIProvider>
    );
}