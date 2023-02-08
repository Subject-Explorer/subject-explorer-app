import { Inter } from "@next/font/google";
import Flow from "@/components/Flow";
import NavBar from "@/components/Navigation/NavBar";
import Metadata from "@/components/SEO/Metadata";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className='h-full flex flex-col'>
      <Metadata />
      <NavBar />
      <Flow />
    </div>
  );
}
