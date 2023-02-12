import React from "react";
import FieldPopoverPanel from "./FieldPopoverPanel";
import FilterPopoverButton from "./FilterPopoverButton";
import SearchBar from "./SearchBar";
import SpecializationPopoverPanel from "./SpecializationPopoverPanel";

export default function NavBar() {
  return (
    <header className='h-20 absolute flex items-center justify-center w-full z-50'>
      <div className='bg-grey rounded-md p-2 gap-2 shadow-lg sm:hidden md:flex'>
        <SearchBar />
        <FilterPopoverButton label='Ismeretkör' panel={<FieldPopoverPanel />} />
        <FilterPopoverButton
          label='Specializáció'
          panel={<SpecializationPopoverPanel />}
        />
      </div>
    </header>
  );
}
