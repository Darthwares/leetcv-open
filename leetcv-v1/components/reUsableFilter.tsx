import React, { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/solid";
import { useTranslations } from "next-intl";
import {
  setCurrentPageInLocalStorage,
  useFilterOptions,
} from "@constants/defaults";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

type ReUsableFilterProps = {
  selectedFilter: string;
  setSelectedFilter: React.Dispatch<React.SetStateAction<string>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};

export default function ReUsableFilter({
  selectedFilter,
  setSelectedFilter,
  setCurrentPage,
}: Readonly<ReUsableFilterProps>) {
  const t = useTranslations("Dashboard");
  const filterOptions = useFilterOptions(t);

  const handleSelect = (option: string) => {
    setSelectedFilter(option);
    setCurrentPageInLocalStorage();
    setCurrentPage((prev: number) => {
      if (prev !== 1) {
        return 1;
      }
      return prev;
    });
  };

  return (
    <span data-testid="listbox">
      <Listbox value={selectedFilter} onChange={setSelectedFilter}>
        {({ open }) => (
          <div className="relative">
            <div className="inline-flex divide-x divide-gray-300 text-gray-500 rounded-md shadow-sm border dark:border-gray-600 border-gray-300">
              <div className="inline-flex divide-x divide-gray-300 rounded-md shadow-sm">
                <div className="inline-flex items-center rounded-l-md border border-transparent py-2 pl-3 pr-4 shadow-sm">
                  <p className="text-sm font-medium dark:text-white">
                    {selectedFilter}
                  </p>
                </div>
                <Listbox.Button className="inline-flex items-center rounded-l-none rounded-r-md p-2 text-sm font-medium hover:bg-indigo-600 dark:hover:bg-gray-800/50 dark:text-white hover:text-white">
                  <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
                </Listbox.Button>
              </div>
            </div>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute right-0 z-30 mt-2 w-48 origin-top-right divide-y divide-gray-200 dark:divide-gray-500 overflow-hidden rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                {filterOptions.map((option) => (
                  <Listbox.Option
                    key={option}
                    onClick={() => handleSelect(option)}
                    className={classNames(
                      option === selectedFilter
                        ? "text-white bg-indigo-500 dark:bg-indigo-600"
                        : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700/30",
                      "cursor-pointer transition-all duration-300 select-none p-4 text-sm"
                    )}
                    value={option}
                  >
                    {({ selected }) => (
                      <div className="flex flex-col">
                        <div className="flex justify-between">
                          <p
                            className={
                              selected ? "font-semibold" : "font-medium"
                            }
                          >
                            {option}
                          </p>
                          {selected ? (
                            <span
                              className={
                                option === selectedFilter
                                  ? "text-white"
                                  : "text-indigo-500"
                              }
                            >
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </div>
                      </div>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        )}
      </Listbox>
    </span>
  );
}
