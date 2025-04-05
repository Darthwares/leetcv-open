import React, { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { classNames } from "@utils/classNames";
import { ChevronDownIcon } from "@heroicons/react/outline";
import { SettingOption } from "./settings";
import { useRecoilState } from "recoil";
import { subscriptionPlanState } from "@state/state";

type SettingDropdownProps = {
  selected: SettingOption;
  setSelected: React.Dispatch<React.SetStateAction<SettingOption>>;
  settings: SettingOption[];
};

const SettingDropdown = ({
  selected,
  setSelected,
  settings,
}: SettingDropdownProps) => {
  const [plan] = useRecoilState(subscriptionPlanState);

  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <div className="relative mt-8 mx-4 sm:px-2 md:hidden">
          <Listbox.Button className="relative w-full sm:w-auto cursor-pointer rounded-md bg-white py-2 pl-3 pr-10 text-left text-gray-900 shadow-sm focus:outline-none border hover:bg-gray-50 border-gray-300 text-[15px] sm:leading-6">
            <p className="block truncate text-gray-800 font-semibold">
              {selected?.name}
            </p>
            <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
              <ChevronDownIcon
                className="h-5 w-5 text-gray-500"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>

          <Transition
            show={open}
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-10 mt-1 max-h-80 sm:w-56 w-full overflow-auto bg-white rounded-md py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm scrollbar scrollbar-w-[3px] scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-track-slate-100 scrollbar-thumb-gray-300">
              {settings
                .filter(
                  (item: SettingOption) =>
                    !(
                      item.name === "Unsubscribe" &&
                      plan !== "Pro" &&
                      plan !== "Premium"
                    )
                )
                .map((item: SettingOption) => (
                  <Listbox.Option
                    key={item.name}
                    className={classNames(
                      item.name === selected?.name
                        ? "bg-gray-50 text-indigo-600 border-l-4 border-indigo-600"
                        : "text-gray-700 hover:text-indigo-600 hover:bg-gray-50 border-l-4 border-transparent",
                      `${item.className} group flex gap-x-3 lg:rounded-sm py-2.5 pl-2 pr-3 text-sm leading-6 font-semibold cursor-pointer`
                    )}
                    value={item}
                  >
                    <div
                      className={classNames(
                        item.name === selected?.name
                          ? "text-indigo-600"
                          : "text-gray-500 group-hover:text-indigo-600",
                        "h-6 w-6 shrink-0"
                      )}
                    >
                      {item.icon}
                    </div>
                    {item.name}
                  </Listbox.Option>
                ))}
            </Listbox.Options>
          </Transition>
        </div>
      )}
    </Listbox>
  );
};

export default SettingDropdown;
