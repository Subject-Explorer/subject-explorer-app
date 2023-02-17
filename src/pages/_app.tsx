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
            // primary: '#4ADE7B',
            primaryBorder: '$green500',
            primaryBorderHover: '$green600',
            primarySolidHover: '$green700',
            primarySolidContrast: '$white',
            primaryShadow: '$green500',

            gradient: 'linear-gradient(112deg, $blue100 -25%, $pink500 -10%, $purple500 80%)',
            link: '#5E1DAD',
             */

            // custom colors
            primary_dark: '#191919',
            primary: '#3D3D3D',
            primary_light: '#5F5F5F',
            accent_dark: '#263236',
            accent: '#C4E2EC',
            accent_light: '#FFFFFF',
            inactive: '#BDBDBD',
            highlight_A: '#C0F48B',
            highlight_B: '#FFDC84',
            highlight_C: '#FFA98E',
            highlight_favorite: '#F4CF0B',
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