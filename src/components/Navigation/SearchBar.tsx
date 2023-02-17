import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import React from "react";

export default function SearchBar() {
  return (
    <div className='flex-grow min-w-[500px] flex items-center'>
      <MagnifyingGlassIcon className='w-5 text-primary-light absolute ml-2 top-[38%]' />
      <input
        type='text'
        id='query'
        className='bg-primary-dark border-none h-max text-primary-light text-sm rounded-lg p-2 pl-9 placeholder-primary-light focus:ring-accent-dark focus:border-accent-dark flex-grow font-medium'
        placeholder='Search'
        required
      />
    </div>
  );
}
