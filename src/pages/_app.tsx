import "@/styles/globals.css";
import type {AppProps} from "next/app";
import "reactflow/dist/style.css";
import {Sora} from "@next/font/google";

const sora = Sora({
    subsets: ["latin"],
    weight: ["300", "700"],
    display: "swap"
});

export default function App({Component, pageProps}: AppProps) {
    return <>
        <style jsx global>{`
        html {
          font-family: ${sora.style.fontFamily};
          font-weight: ${sora.style.fontWeight};
        }
      `}</style>
        <Component {...pageProps} />
    </>
}
