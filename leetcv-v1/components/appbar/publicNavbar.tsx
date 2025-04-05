import { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { classNames } from "@utils/classNames";
import ProductLogo from "./productLogo";
import { useTranslations } from "next-intl";
import {
  handleHref,
  publicCompany,
  publicFeatures,
  publicResources,
} from "@constants/defaults";
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import Link from "next/link";

type PublicNavbarProps = {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const PublicNavbar = ({ sidebarOpen, setSidebarOpen }: PublicNavbarProps) => {
  const [selected, setSelected] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Features");
  const t = useTranslations("Appbar");

  const features = {
    title: "Features",
    items: publicFeatures(t),
  };

  const resources = {
    title: "Resources",
    items: publicResources(t),
  };

  const company = {
    title: "Company",
    items: publicCompany(t),
  };

  return (
    <div>
      <Transition show={sidebarOpen}>
        <Dialog className="relative z-50 lg:hidden " onClose={setSidebarOpen}>
          <Transition.Child
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900/80" />
          </Transition.Child>

          <div className="fixed inset-0 flex overflow-y-scroll">
            <Transition.Child
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
              className={"w-3/4"}
            >
              <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                <Transition.Child
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                    <button
                      type="button"
                      className="-m-2.5 p-2.5 outline-none border-none"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>
                <div className="flex grow flex-col bg-white pb-4 min-h-screen overflow-y-scroll">
                  <div className="mb-6 px-6">
                    <ProductLogo />
                  </div>
                  <Nav
                    title={features.title}
                    lists={features.items}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    selected={selected}
                    setSelected={setSelected}
                    setSidebarOpen={setSidebarOpen}
                  />
                  <Nav
                    title={resources.title}
                    lists={resources.items}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    selected={selected}
                    setSelected={setSelected}
                    setSidebarOpen={setSidebarOpen}
                  />
                  <Nav
                    title={company.title}
                    lists={company.items}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    selected={selected}
                    setSelected={setSelected}
                    setSidebarOpen={setSidebarOpen}
                  />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

type NavProps = {
  title: string;
  lists: any[];
  selected: string;
  selectedCategory: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Nav = ({
  title,
  lists,
  selected,
  setSelected,
  setSidebarOpen,
  setSelectedCategory,
  selectedCategory,
}: NavProps) => {
  const router = useRouter();
  return (
    <nav className="flex flex-col px-px">
      <h3
        className="flex items-center justify-between w-full bg-gray-100 font-semibold mb-3.5 border-l-4 border-indigo-600 pl-3 py-2 pr-2"
        onClick={() => {
          if (selectedCategory === title) {
            setSelectedCategory("");
          } else {
            setSelectedCategory(title);
          }
        }}
      >
        {title}
        {selectedCategory === title ? (
          <ChevronDownIcon className="w-4 h-4" />
        ) : (
          <ChevronRightIcon className="w-4 h-4" />
        )}
      </h3>
      {selectedCategory === title && (
        <ul className="-mx-2 space-y-2 mb-3 px-5">
          {lists.map((item) => {
            const href = handleHref(item.href, router);
            return (
              <li
                key={item.name}
                onClick={() => {
                  setSidebarOpen(false);
                  setSelected(item.name);
                  setSelectedCategory(title);
                }}
              >
                <Link href={href!}>
                  <div
                    className={classNames(
                      selected === item.name
                        ? "bg-indigo-50 text-indigo-600"
                        : "text-gray-700 hover:text-indigo-600 hover:bg-gray-50",
                      "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                    )}
                  >
                    <item.icon
                      className={classNames(
                        selected === item.name
                          ? "text-indigo-600"
                          : "text-gray-500 group-hover:text-indigo-600",
                        "h-6 w-6 shrink-0"
                      )}
                      aria-hidden="true"
                    />
                    {item.name}
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </nav>
  );
};

export default PublicNavbar;
