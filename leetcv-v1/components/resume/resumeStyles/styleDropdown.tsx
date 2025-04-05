import React, { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import ResumeStyling from "./resumeStyling";
import { fontStyleDropdownState } from "@state/state";
import { useRecoilState } from "recoil";
import StyleButton from "./styleButton";

const StyleDropdown = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen] = useRecoilState(fontStyleDropdownState);

  return (
    <Menu as="div" className="relative mt-5 print:hidden">
      <>
        <div
          className="cursor-pointer flex justify-end"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Menu.Button className="font-medium text-sm">
            <StyleButton />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items
            className={`absolute right-0 mt-2 z-50 transform md:max-w-md`}
          >
            <div
              className={`overflow-y-scroll ${
                isDropdownOpen ? "h-[590px] lg:h-[505px]" : null
              } rounded-lg shadow-lg ring-opacity-5 bg-white dark:bg-gray-900 w-full border-gray-200 border`}
            >
              <div className={`md:w-[350px]`}>
                <ResumeStyling />
              </div>
            </div>
          </Menu.Items>
        </Transition>
      </>
    </Menu>
  );
};

export default StyleDropdown;
