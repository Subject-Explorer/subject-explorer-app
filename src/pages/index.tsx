import { Inter } from "@next/font/google";
import Flow from "@/components/Flow";
import NavBar from "@/components/Navigation/NavBar";
import Metadata from "@/components/SEO/Metadata";
import { FilterSettingsProvider } from "@/utils/hooks/useFilterSettings";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="flex h-full flex-col">
      <Metadata />
      <FilterSettingsProvider>
        <NavBar />
        <Flow />
      </FilterSettingsProvider>
    </div>
  );
}
