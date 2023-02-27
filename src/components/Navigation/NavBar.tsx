import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import {
  AdjustmentsHorizontalIcon,
  EyeIcon,
  EyeSlashIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";
import NavBarButton from "./NavBarButton";
import FilterPopoverMenu from "./FilterPopoverMenu";
import { useFilterSettings } from "@/utils/hooks/useFilterSettings";

export default function NavBar() {
  const [open, setOpen] = useState<boolean>(false);

  const { settings, setSettings } = useFilterSettings();

  const [query, setQuery] = useState<string>(settings.query);

  useEffect(() => {
    setQuery(settings.query);
  }, [setQuery, settings]);

  const handleQuerySearch = () => {
    setSettings({ query: query });
  };
  const handleFilterMenuOpenChange = () => {
    setOpen(!open);
  };
  const handleVisibilityChange = () => {
    setSettings({ hideDisabled: !settings.hideDisabled });
  };
  return (
    <header className="absolute z-50 flex h-20 w-full items-center justify-center">
      <div className="items-center justify-center gap-2 rounded-md bg-neutral p-2 shadow-lg sm:hidden md:flex">
        <div className="w-8">{/*TODO: PUT LOGO HERE*/}</div>
        <div className="h-8 w-[1px] rounded-lg bg-neutral-inactive" />
        <SearchBar
          query={query}
          setQuery={setQuery}
          onSubmit={handleQuerySearch}
        />
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
          icon={
            settings.hideDisabled ? (
              <EyeIcon className="w-5" />
            ) : (
              <EyeSlashIcon className="w-5" />
            )
          }
          onClick={handleVisibilityChange}
        />
      </div>
      <FilterPopoverMenu open={open} />
    </header>
  );
}
