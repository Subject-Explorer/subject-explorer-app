import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import React from "react";

export default function SearchBar() {
  return (
    <div className='flex-grow min-w-[500px] flex items-center'>
      <MagnifyingGlassIcon className='w-5 text-grey-light absolute ml-2 top-[38%]' />
      <input
        type='text'
        id='query'
        className='bg-neutral-dark border-none h-max text-grey-light text-sm rounded-lg p-2 pl-9 placeholder-grey-light focus:ring-primary-dark focus:border-primary-dark flex-grow font-medium'
        placeholder='Search'
        required
      />
    </div>
  );
}
