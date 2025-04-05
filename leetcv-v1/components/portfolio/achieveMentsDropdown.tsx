import { useSession } from "next-auth/react";
import React, { Fragment, useEffect, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import {
  BookOpenPortfolioSvg,
  CertificationsSvg,
  CoursesSvg,
  TrophySvg,
} from "@components/svg";
import { useRecoilState } from "recoil";
import { profileResumeState } from "@state/state";

const AchieveMentsDropdown = () => {
  const { status } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [resume] = useRecoilState(profileResumeState);
  const isAwardsThere = resume?.awards?.length !== 0;
  const isCertificatesThere = resume?.certificates?.length !== 0;
  const isCoursesThere = resume?.courses?.length !== 0;
  const isPublicationsThere = resume?.publications?.length !== 0;
  const desktopNavigation = [
    {
      name: "Awards",
      href: "#awards",
      icon: TrophySvg,
      isThere: isAwardsThere,
    },
    {
      name: "Certifications",
      href: "#certifications",
      icon: CertificationsSvg,
      isThere: isCertificatesThere,
    },
    {
      name: "Courses",
      href: "#courses",
      icon: CoursesSvg,
      isThere: isCoursesThere,
    },
    {
      name: "Publications",
      href: "#publications",
      icon: BookOpenPortfolioSvg,
      isThere: isPublicationsThere,
    },
  ].filter((item) => item.isThere);
  const [selected, setSelected] = useState(desktopNavigation[0].name);
  const [selectedIcon, setSelectedIcon] = useState(desktopNavigation[0].icon);
  const [selectedHref, setSelectedHref] = useState(desktopNavigation[0].href);

  useEffect(() => {
    setSelected(desktopNavigation[0].name);
    setSelectedIcon(desktopNavigation[0].icon);
    setSelectedHref(desktopNavigation[0].href);
  }, [resume]);

  return (
    <Menu as="div" className="relative hidden lg:block">
      {({ close }) => (
        <>
          {status === "authenticated" && (
            <>
              {desktopNavigation?.length > 1 ? (
                <div
                  className="cursor-pointer"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  <Menu.Button className="app-bar-btn mx-0 flex gap-1 items-center dark:bg-gray-900 dark:text-white text-sm">
                    <span className="sr-only">Open user menu</span>
                    <span className="w-6 h-6 text-gray-500">
                      {selectedIcon}
                    </span>
                    {selected}
                    <ChevronDownIcon className="w-[18px] h-[18px]" />
                  </Menu.Button>
                </div>
              ) : (
                <a href={selectedHref} className="cursor-pointer">
                  <button className="app-bar-btn mx-0 flex gap-1 items-center dark:bg-gray-900 dark:text-white text-sm">
                    <span className="sr-only">Open user menu</span>
                    <span className="w-6 h-6 text-gray-500">
                      {selectedIcon}
                    </span>
                    {selected}
                  </button>
                </a>
              )}
            </>
          )}
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
              className={`absolute -right-6 mt-4 z-50 transform px-2 md:max-w-[400px]`}
            >
              <div className="overflow-hidden rounded-lg shadow-lg ring-opacity-5 bg-white dark:bg-gray-900 w-full">
                <div className={`lg:w-[180px]`}>
                  <div className="relative grid bg-white dark:bg-gray-900 md:gap-7 md:p-7 w-full place-content-center lg:grid-cols-1">
                    {desktopNavigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="-m-3 flex items-center rounded-lg p-2.5 transition duration-200 ease-in-out hover:bg-gray-100 dark:hover:bg-gray-800/50 cursor-pointer"
                        onClick={() => {
                          setSelected(item.name);
                          setSelectedIcon(item.icon);
                          setSelectedHref(item.href);
                          close();
                        }}
                      >
                        <item.icon />
                        <div className="ml-2">
                          <p className="text-[15px] flex items-center gap-2 -mt-[2px] font-medium text-gray-900 dark:text-gray-100 dark:hover:text-gray-200 hover:text-gray-900 transition-all duration-200">
                            {item.name}
                          </p>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
};

export default AchieveMentsDropdown;
