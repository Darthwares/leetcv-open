import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/solid";
import { classNames } from "@utils/classNames";
import { options } from "@constants/defaults";

type HearAboutUsOptionsProps = {
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
};

const HearAboutUsOptions = ({
  selected,
  setSelected,
}: HearAboutUsOptionsProps) => {
  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <div className="relative mt-2">
          <Listbox.Button className="relative w-full cursor-pointer rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 text-sm sm:leading-6">
            <span className="block truncate">{selected}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronDownIcon
                className="h-5 w-5 text-gray-400"
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
            <Listbox.Options className="absolute z-[99] mt-1 -top-[247px] max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm scrollbar scrollbar-w-[3px] scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-track-slate-100 scrollbar-thumb-gray-300">
              {options.map((option) => (
                <Listbox.Option
                  key={option}
                  className={`${
                    selected === option
                      ? "bg-indigo-600 text-white"
                      : "text-gray-900 cursor-pointer hover:bg-indigo-50"
                  } ${
                    option === "Choose one" &&
                    "bg-transparent hover:bg-transparent pointer-events-none"
                  } relative select-none py-2 pl-3 pr-9`}
                  value={option}
                  disabled={option === "Choose one"}
                >
                  <>
                    <span
                      className={`${
                        selected === option && selected !== "Choose one"
                          ? "font-semibold"
                          : "font-normal"
                      } ${
                        option === "Choose one" && "text-gray-500"
                      } block truncate text-sm`}
                    >
                      {option}
                    </span>
                    {selected === option ? (
                      <span
                        className={classNames(
                          selected === option
                            ? "text-white"
                            : "text-indigo-600",
                          "absolute inset-y-0 right-0 flex items-center pr-4"
                        )}
                      >
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      )}
    </Listbox>
  );
};

export default HearAboutUsOptions;
