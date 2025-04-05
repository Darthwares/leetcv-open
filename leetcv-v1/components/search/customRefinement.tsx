import React, { useRef, useState, useEffect } from "react";
import { connectRefinementList } from "react-instantsearch-dom";
import { refinementData } from "@constants/defaults";
import { useTranslations } from "next-intl";

interface RefinementItem {
  label: string;
  value: string;
  count: number;
  isRefined: boolean;
}

const CustomRefinementList = ({
  items,
  refine,
  searchForItems,
  attribute,
}: any) => {
  const [query, setQuery] = useState<string>("");
  const [selectedItems, setSelectedItems] = useState<RefinementItem[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const suggestionListRef = useRef<HTMLUListElement>(null);
  const t = useTranslations("AlgoliaSearch");
  const refinement = refinementData(t);
  const isRemoteWork = attribute === "remoteWork";
  const notValid = ["na", "n/a", "no", "none", "nil","any"];

  const getLabelForAttribute = (attribute: string): string => {
    const refinementItem = refinement.find(
      (item) => item.attribute === attribute
    );
    return refinementItem ? refinementItem.label : attribute;
  };

  const placeholderName = getLabelForAttribute(attribute);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    setQuery(value);
  };

  const handleItemClick = (item: RefinementItem) => {
    if (
      !selectedItems.some((selectedItem) => selectedItem.value === item.value)
    ) {
      setSelectedItems([...selectedItems, item]);
      refine(item.value);
    }
    setQuery("");
    searchForItems("");
  };

  const filteredItems = items.filter(
    (item: RefinementItem) =>
      !selectedItems.some(
        (selectedItem) => selectedItem.value === item.value
      ) &&
      item.label.toLowerCase().includes(query.toLowerCase()) &&
      !item.label.toLowerCase().startsWith("ex") &&
      !notValid.includes(item.label.toLowerCase()) &&
      (attribute === "skills" || item.label.length > 1)
  );

  const handleClickOutside = (event: MouseEvent) => {
    if (
      suggestionListRef.current &&
      !suggestionListRef.current.contains(event.target as Node)
    ) {
      setIsFocused(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
      {!isRemoteWork && (
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder={`Search for a ${placeholderName}`}
            className="refinement-list-input focus:border-blue-500 w-full rounded-md border-gray-400"
            onFocus={() => setIsFocused(true)}
          />
          {query && isFocused && filteredItems.length > 0 && (
            <ul
              ref={suggestionListRef}
              className="suggestion-list capitalize absolute my-2 z-40 w-full bg-white max-h-80 overflow-auto text-sm font-semibold text-black  shadow-lg border-2 border-gray-300 rounded-lg"
            >
              {filteredItems
                .slice(0, 5)
                .map((item: RefinementItem, index: number) => (
                  <li
                    key={item.label}
                    className={`py-2 pl-2 hover:bg-gray-200 ${
                      index !== filteredItems.slice(0, 5).length - 1 &&
                      "border-b border-gray-200 "
                    }`}
                  >
                    <button
                      onClick={() => handleItemClick(item)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          handleItemClick(item);
                        }
                      }}
                      className="w-full text-left"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
            </ul>
          )}
        </div>
      )}
      <div className="text-gray-500 my-2">
        <ul className="refinement-list z-20 max-w-fit flex flex-col gap-2">
          {items
            .filter(
              (item: RefinementItem) =>
                !item.label.toLowerCase().startsWith("ex") &&
                !notValid.includes(item.label.toLowerCase()) &&
                (attribute === "skills" || item.label.length > 1)
            )
            .slice(0, 5)
            .map((item: RefinementItem) => (
              <li key={item.label}>
                <label>
                  <input
                    type="checkbox"
                    checked={item.isRefined}
                    onChange={() => refine(item.value)}
                    className="ml-1 mr-2"
                  />
                  <span className="capitalize hover:text-gray-900">{item.label}</span>
                </label>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export const CustomRefinementListComponent =
  connectRefinementList(CustomRefinementList);
