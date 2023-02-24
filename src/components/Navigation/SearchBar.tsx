import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import React from "react";

export default function SearchBar() {
  return (
    <div className="flex min-w-[500px] flex-grow items-center">
      <input
        type="text"
        id="query"
        className="placeholder-neutral-light-light h-max flex-grow rounded-lg border-none bg-neutral p-2 text-sm font-medium text-neutral-inactive focus:border-primary-dark focus:ring-primary"
        placeholder="Keresés"
        required
      />
    </div>
  );
}
