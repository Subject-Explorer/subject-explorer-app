import React from "react";
import FieldPopoverPanel from "./FieldPopoverPanel";
import FilterPopoverButton from "./FilterPopoverButton";
import SpecializationPopoverPanel from "./SpecializationPopoverPanel";
import { Input } from "@nextui-org/react";

export default function NavBar() {
  return (
    <header className='h-20 absolute flex items-center justify-center w-full z-50'>
      <div className='bg-primary rounded-md p-2 gap-2 shadow-lg sm:hidden md:flex'>
          <Input
              clearable
              underlined
              placeholder="Keresés..."
              className="w-96"
          />
        <FilterPopoverButton label='Ismeretkör' panel={<FieldPopoverPanel />} />
        <FilterPopoverButton
          label='Specializáció'
          panel={<SpecializationPopoverPanel />}
        />
      </div>
    </header>
  );
}
