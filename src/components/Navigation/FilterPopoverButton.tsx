import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";
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
                ${
                  open
                    ? "bg-accent-dark text-white"
                    : "bg-transparent text-grey-darker"
                }
                group transition-all inline-flex items-center rounded-md px-3 py-2 text-base font-medium hover:text-opacity-100 focus:outline-none bg-opacity-90 hover:bg-opacity-100`}
          >
            <span>{label}</span>
            {open ? (
              <ChevronUpIcon
                className={`${open ? "" : "text-opacity-70"}
                  ml-2 h-5 w-5 text-orange-300 transition duration-150 ease-in-out group-hover:text-opacity-80`}
                aria-hidden='true'
              />
            ) : (
              <ChevronDownIcon
                className={`${open ? "" : "text-opacity-70"}
                  ml-2 h-5 w-5 text-orange-300 transition duration-150 ease-in-out group-hover:text-opacity-80`}
                aria-hidden='true'
              />
            )}
          </Popover.Button>
          <Transition
            as={Fragment}
            enter='transition ease-in-out duration-100'
            enterFrom='opacity-0 translate-y-1'
            enterTo='opacity-100 translate-y-0'
            leave='transition ease-in-out duration-150'
            leaveFrom='opacity-100 translate-y-0'
            leaveTo='opacity-0 translate-y-1'
          >
            <Popover.Panel className='absolute left-1/2 z-10 mt-3 w-screen max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl'>
              {panel}
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}
