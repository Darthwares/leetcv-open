import React, { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { classNames } from "@utils/classNames";

type BlogFilterDropdownProps = {
  blogCategories: string[];
  selected: string;
  handleClick: (topic: string) => void;
};

const BlogFilterDropdown = ({
  blogCategories,
  selected,
  handleClick,
}: BlogFilterDropdownProps) => {
  return (
    <Menu
      as="div"
      className={`${
        location.pathname === "/" && "hidden"
      } relative flex justify-end md:hidden`}
    >
      <div data-testid="blogFilterDropdown">
        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white dark:bg-gray-800 dark:hover:bg-gray-800 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 dark:text-gray-100 hover:bg-gray-50">
          {selected}
          <ChevronDownIcon
            className="-mr-1 h-5 w-5 text-gray-400 dark:text-gray-200"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-50 mt-8 top-2 w-56 max-h-[19rem] overflow-hidden overflow-y-scroll origin-top-right rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none scrollbar scrollbar-w-[3px] scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-track-slate-100 scrollbar-thumb-gray-300">
          <ul className="py-1">
            {blogCategories.map((topic) => {
              return (
                <Menu.Item key={topic}>
                  <li
                    className={classNames(
                      selected === topic
                        ? "bg-indigo-50 dark:bg-gray-600/20 text-indigo-500 font-medium border-l-indigo-600"
                        : "text-gray-700 dark:text-gray-200 border-l-transparent",
                      " border-l-4 block px-4 py-2 text-sm"
                    )}
                    onClick={() => handleClick(topic)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleClick(topic);
                      }
                    }}
                  >
                    {topic}
                  </li>
                </Menu.Item>
              );
            })}
          </ul>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default BlogFilterDropdown;
