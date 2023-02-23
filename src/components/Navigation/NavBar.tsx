import React, { useState } from "react";
import SearchBar from "./SearchBar";
import {
  AdjustmentsHorizontalIcon,
  EyeSlashIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";
import NavBarButton from "./NavBarButton";
import FilterPopoverMenu from "./FilterPopoverMenu";

export default function NavBar() {
  const [open, setOpen] = useState<boolean>(false);

  const handleQuerySearch = () => {
    // TODO: Implement function
  };
  const handleFilterMenuOpenChange = () => {
    setOpen(!open);
  };
  const handleVisibilityChange = () => {
    // TODO: Implement function
  };
  return (
    <header className="absolute z-50 flex h-20 w-full items-center justify-center">
      <div className="items-center justify-center gap-2 rounded-md bg-primary p-2 shadow-lg sm:hidden md:flex">
        <div className="w-8">{/*TODO: PUT LOGO HERE*/}</div>
        <div className="h-8 w-[1px] rounded-lg bg-primary-inactive" />
        <SearchBar />
        <NavBarButton
          icon={<MagnifyingGlassIcon className="w-5" />}
          onClick={handleQuerySearch}
        />
        <NavBarButton
          icon={<AdjustmentsHorizontalIcon className="w-5" />}
          onClick={handleFilterMenuOpenChange}
          active={open}
        />
        <NavBarButton
          icon={<EyeSlashIcon className="w-5" />}
          onClick={handleVisibilityChange}
        />
      </div>
      <FilterPopoverMenu open={open} />
    </header>
  );
}
