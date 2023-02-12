import { Popover } from "@headlessui/react";
import React from "react";

export default function SpecialtyPopoverPanel() {
  return (
    <div className='overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5'>
      <div className='relative grid gap-8 bg-white p-7 lg:grid-cols-2'>{}</div>
      <div className='bg-gray-50 p-4'>
        <a
          href='##'
          className='flow-root rounded-md px-2 py-2 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50'
        >
          <span className='flex items-center'>
            <span className='text-sm font-medium text-gray-900'>
              Documentation
            </span>
          </span>
          <span className='block text-sm text-gray-500'>
            Start integrating products and tools
          </span>
        </a>
      </div>
    </div>
  );
}
