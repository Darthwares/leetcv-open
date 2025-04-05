import React from "react";
import { Popover } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { handleHref } from "@constants/defaults";
import { useRouter } from "next/router";
import Link from "next/link";

type Options = {
  name: string;
  description: string;
  href?: string;
  icon: any;
  onClick?: () => void;
};

type NavigationDropdownProps = {
  title: string;
  width?: string;
  dropdownOptions: Options[];
};

const NavigationDropdown = ({
  title,
  width,
  dropdownOptions,
}: NavigationDropdownProps) => {
  const router = useRouter();

  return (
    <Popover className="relative z-50">
      {({ close }) => (
        <>
          <Popover.Button className="inline-flex outline-none border-none items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
            <span>{title}</span>
            <ChevronDownIcon aria-hidden="true" className="h-5 w-5" />
          </Popover.Button>

          <Popover.Panel
            className={`absolute ${
              dropdownOptions.length > 6 ? "left-[18rem]" : "left-1/2"
            } z-10 mt-5 flex w-screen max-w-max -translate-x-1/2 px-4 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in`}
          >
            <div
              className={`w-screen ${
                width ? width : "max-w-[39rem]"
              }  flex-auto overflow-hidden rounded-lg bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5`}
            >
              <div
                className={`p-3.5 ${
                  dropdownOptions.length > 6 ? "grid grid-cols-2" : ""
                }`}
              >
                {dropdownOptions.map((item) => {
                  const href = handleHref(item.href!, router);

                  return (
                    <div
                      key={item.name}
                      className="group relative flex gap-x-4 rounded-lg p-3 cursor-pointer hover:bg-gray-100"
                    >
                      <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                        <item.icon
                          aria-hidden="true"
                          className="h-6 w-6 text-gray-600 group-hover:text-indigo-600"
                        />
                      </div>
                      <div onClick={close}>
                        <Link href={href!}>
                          <div className="font-semibold text-gray-900">
                            {item.name}
                            <span className="absolute inset-0" />
                          </div>
                        </Link>
                        <p className="mt-1 text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Popover.Panel>
        </>
      )}
    </Popover>
  );
};

export default NavigationDropdown;
