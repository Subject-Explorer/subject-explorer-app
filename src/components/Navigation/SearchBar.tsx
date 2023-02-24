import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import React from "react";

export default function SearchBar() {
  return (
    <div className="flex min-w-[500px] flex-grow items-center">
      <MagnifyingGlassIcon className="absolute top-[38%] ml-2 w-5 text-primary-light" />
      <input
        type="text"
        id="query"
        className="placeholder-neutral-light-light h-max flex-grow rounded-lg border-none bg-neutral-dark p-2 pl-9 text-sm font-medium text-neutral-inactive focus:border-primary-dark focus:ring-primary"
        placeholder="Keresés"
        required
      />
    </div>
  );
}
