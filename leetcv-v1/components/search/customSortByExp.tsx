import { ChevronDownIcon } from "@heroicons/react/outline";
import { experienceSortingState } from "@state/state";
import { useTranslations } from "next-intl";
import { Menu } from "@headlessui/react";
import { useRecoilState } from "recoil";

const CustomSortByExp = () => {
  const [expSorting, setExpSorting] = useRecoilState(experienceSortingState);
  const t = useTranslations("AlgoliaSearch");

  const handleSortChange = (val: string) => {
    setExpSorting(val);
  };
  const sortingAttributes = [
    { value: "relevance", name: t("relevance") },
    { value: "exp-asc", name: t("ExpLowToHigh") },
    { value: "exp-desc", name: t("ExpHighToLow") },
  ];

  const currentAttr = sortingAttributes.find(
    (attr) => attr.value === expSorting
  );
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          {currentAttr?.name}
          <ChevronDownIcon
            aria-hidden="true"
            className="-mr-1 h-5 w-5 text-gray-400"
          />
        </Menu.Button>
      </div>
      <Menu.Items className="absolute -right-6 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in">
        <div className="py-1">
          {sortingAttributes.map((s) => (
            <Menu.Item key={s.value}>
              <span
                className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 hover:bg-gray-200 cursor-pointer"
                onClick={() => handleSortChange(s.value)}
              >
                {s.name}
              </span>
            </Menu.Item>
          ))}
        </div>
      </Menu.Items>
    </Menu>
  );
};
export default CustomSortByExp;
