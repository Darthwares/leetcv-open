import React from "react";
import { Listbox } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/solid";
import { useRecoilState } from "recoil";
import {
  fontStyleDropdownState,
  resumeFontState,
  userIdState,
} from "@state/state";
import { trpc } from "@utils/trpc";
import { FontStyleProps } from "data/models/ResumeStyle";

const fonts = [
  {
    value: "open-sans",
    name: "Open Sans (Default)",
    className: "font-sans",
  },
  {
    value: "roboto-mono",
    name: "Roboto Mono",
    className: "font-roboto-mono",
  },
  {
    value: "times-new-roman",
    name: "Times New Roman",
    className: "font-times",
  },
  {
    value: "helvetica",
    name: "Helvetica",
    className: "font-helvetica",
  },
  {
    value: "tahoma",
    name: "Tahoma",
    className: "font-tahoma",
  },
  { value: "calibri", name: "Calibri", className: "font-calibri" },
  { value: "cambria", name: "Cambria", className: "font-cambria" },
  { value: "arial", name: "Arial", className: "font-arial" },
  {
    value: "garamond",
    name: "Garamond",
    className: "font-garamond",
  },
  { value: "gill-sans", name: "Gill Sans", className: "font-gill-sans" },
  { value: "georgia", name: "Georgia", className: "font-georgia" },
];

export default function FontSelector() {
  const [isDropdownOpen, setIsDropdownOpen] = useRecoilState(
    fontStyleDropdownState
  );
  const [selected, setSelected] = useRecoilState(resumeFontState);
  const setFontStyle = trpc.useMutation(["fs.resumeStyles.updateFontStyle"]);
  const [userId] = useRecoilState(userIdState);

  const handleSelectFontStyle = (font: FontStyleProps) => {
    setSelected(font);
    setFontStyle.mutate({
      id: userId,
      font: font,
    });
  };

  return (
    <Listbox
      value={selected}
      onChange={handleSelectFontStyle}
      as="div"
      className="relative mt-2"
    >
      {({ open }) => {
        if (open !== isDropdownOpen) {
          setIsDropdownOpen(open);
        }

        return (
          <>
            <Listbox.Button className="relative w-full cursor-pointer rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 text-[15px] focus:ring-indigo-600 sm:leading-6">
              <span className={`${selected?.className} block truncate`}>
                {selected.name}
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronDownIcon className="h-5 w-5 text-gray-400" />
              </span>
            </Listbox.Button>
            <Listbox.Options className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none scrollbar scrollbar-w-[3px] scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-track-slate-100 scrollbar-thumb-gray-300">
              {fonts.map((font) => (
                <Listbox.Option
                  key={font.value}
                  value={font}
                  className={({ active }) =>
                    `relative select-none py-2 pl-10 pr-4 ${
                      active ? "bg-gray-100 text-indigo-600" : "text-gray-900"
                    } ${
                      font.value === selected.value
                        ? "bg-indigo-600 text-white cursor-default"
                        : "cursor-pointer"
                    }`
                  }
                >
                  <>
                    <span
                      className={`${
                        selected.value === font.value
                          ? "font-medium"
                          : "font-normal"
                      } ${font.className} block truncate`}
                    >
                      {font.name}
                    </span>
                    {selected.value === font.value ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-white">
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </>
        );
      }}
    </Listbox>
  );
}
