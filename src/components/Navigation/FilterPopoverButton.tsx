import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon} from "@heroicons/react/20/solid";
import { Fragment } from "react";

interface Props {
  label: string;
  panel: JSX.Element;
}

export default function FilterPopoverButton({ label, panel }: Props) {
  return (
    <Popover className='relative'>
      {({ open }) => (
        <>
          <Popover.Button
            className={`
                ${open ? "" : "text-opacity-90"}
                ${open ? "bg-accent-dark text-primary-light" : "bg-transparent "}
                group transition-all inline-flex items-center justify-center rounded-md px-3 py-2 text-base font-medium hover:text-opacity-100 focus:outline-none bg-opacity-90 hover:bg-opacity-100 min-w-[145px]`}
          >
            <span>{label}</span>

            <ChevronDownIcon
              className={`${open ? "-rotate-180 transform" : "text-opacity-70"}
                  ml-2 h-5 w-5 text-orange-300 transition duration-150 ease-in-out group-hover:text-opacity-80`}
              aria-hidden='true'
            />
          </Popover.Button>
          <Transition
            as={Fragment}
            enter='transition ease-in-out duration-200'
            enterFrom='opacity-0 translate-x-1'
            enterTo='opacity-100 translate-x-0'
            leave='transition ease-in-out duration-200'
            leaveFrom='opacity-100 translate-x-0'
            leaveTo='opacity-0 translate-x-1'
          >
            <Popover.Panel className='absolute left-1/2 z-10 mt-3 max-w-sm -translate-x-1/2 transform px-4 sm:px-0 min-w-[200px]'>
              {panel}
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}
