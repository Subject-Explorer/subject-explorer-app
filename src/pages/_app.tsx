import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "reactflow/dist/style.css";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
