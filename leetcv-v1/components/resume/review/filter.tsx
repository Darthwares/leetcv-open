import { Dispatch, Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/solid";
import { useSetRecoilState } from "recoil";
import { activeReviewState } from "@state/state";
import { reviewsList } from "@constants/defaults";
import { classNames } from "@utils/classNames";

type FilterProps = {
  setCurrentPage?: Dispatch<React.SetStateAction<number>>;
};

export default function Filter({ setCurrentPage }: Readonly<FilterProps>) {
  const [selectedKey, setSelectedKey] = useState(reviewsList[0]);
  const setReviewTitle = useSetRecoilState(activeReviewState);

  return (
    <span data-testid="listbox">
      <Listbox value={selectedKey} onChange={setSelectedKey}>
        {({ open }) => (
          <>
            <div className="relative">
              <div className="inline-flex divide-x divide-gray-300 dark:divide-gray-700 dark:text-gray-100 text-gray-500 rounded-md shadow-sm border border-gray-300">
                <div className="inline-flex divide-x divide-gray-300 rounded-md shadow-sm">
                  <div className="inline-flex items-center rounded-l-md border border-transparent py-2 pl-3 pr-4 shadow-sm">
                    {selectedKey && (
                      <p className="text-sm font-medium">
                        {selectedKey.titleLocKey}
                      </p>
                    )}
                  </div>
                  <Listbox.Button className="inline-flex items-center rounded-l-none rounded-r-md p-2 text-sm font-medium hover:bg-indigo-600 dark:hover:bg-gray-700/30 hover:text-white">
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
                <Listbox.Options className="absolute right-0 z-30 mt-2 w-48 origin-top-right divide-y divide-gray-200 dark:divide-gray-700 overflow-hidden rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  {reviewsList.map((option) => (
                    <Listbox.Option
                      key={option.id}
                      onClick={() => {
                        const { document, titleLocKey } = option;
                        setReviewTitle({
                          document: document,
                          headingTitle: "",
                          title: titleLocKey,
                        });
                        setCurrentPage?.(1);
                      }}
                      className={({ active }) =>
                        classNames(
                          active
                            ? "text-white bg-indigo-500 dark:bg-indigo-600"
                            : "text-gray-900",
                          "cursor-pointer select-none p-4 dark:hover:text-white text-sm"
                        )
                      }
                      value={option}
                    >
                      {({ selected, active }) => (
                        <div className="flex flex-col">
                          <div className="flex justify-between">
                            <p
                              className={
                                selected
                                  ? "font-semibold dark:text-white"
                                  : "font-normal dark:text-gray-100"
                              }
                            >
                              {option.titleLocKey}
                            </p>
                            {selected ? (
                              <span
                                className={
                                  active
                                    ? "text-white"
                                    : "text-indigo-500 dark:text-white"
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
          </>
        )}
      </Listbox>
    </span>
  );
}
