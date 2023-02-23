import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import React from "react";

export default function SearchBar() {
  return (
    <div className="flex min-w-[400px] flex-grow items-center">
      <input
        type="text"
        id="query"
        className="h-max flex-grow rounded-lg border-none bg-primary px-2 text-sm font-medium text-primary-inactive placeholder-primary-inactive"
        placeholder="Keresés"
        required
      />
    </div>
  );
}
