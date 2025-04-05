import {
  isValidEmailDomain,
  setCurrentPageInLocalStorage,
  shortNumber,
} from "@constants/defaults";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { activeReviewState, resumeState } from "@state/state";
import { classNames } from "@utils/classNames";
import Link from "next/link";
import { Fragment, SVGProps } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";

interface SubMenuItem {
  label: string;
  icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
  href: string;
  count?: number;
}

interface SubMenuProps {
  menuName: string;
  subMenuItems: SubMenuItem[];
}

export default function SubMenu({ menuName, subMenuItems }: SubMenuProps) {
  const hasActiveSubItem = subMenuItems.some(
    (menuItem) => window.location.pathname === menuItem.href
  );
  const [resume] = useRecoilState(resumeState);
  const isEmailValid = isValidEmailDomain(resume.email);

  return (
    <Menu
      as="div"
      className={`relative inline-block text-left ${
        hasActiveSubItem ? "border-b-2 border-indigo-600" : ""
      }`}
    >
      <div>
        <Menu.Button
          className={`${
            hasActiveSubItem && "pb-4"
          } w-full font-medium text-gray-500 justify-center items-center flex text-sm`}
        >
          {menuName}
          <ChevronDownIcon
            className="-mr-1 h-5 w-5 text-gray-400"
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
        <Menu.Items
          className={`absolute ${
            menuName === "More"
              ? "right-0 origin-top-right"
              : "left-0 origin-top-left"
          } z-50 mt-2 max-w-fit divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none overflow-hidden`}
        >
          {subMenuItems.map((menuItem: SubMenuItem) => {
            if (menuItem.label === "Colleagues" && !isEmailValid) {
              return null;
            }
            return (
              <div key={menuItem.label}>
                <RenderMenuItem
                  label={menuItem.label}
                  Icon={menuItem.icon}
                  count={menuItem.count!}
                  href={menuItem.href}
                />
              </div>
            );
          })}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

type RenderMenuItemProps = {
  label: string;
  Icon: any;
  count: number;
  href: string;
};

function RenderMenuItem({
  label,
  Icon,
  count,
  href,
}: Readonly<RenderMenuItemProps>) {
  const isActive = window.location.pathname === href;
  const setActiveReview = useSetRecoilState(activeReviewState);
  return (
    <Menu.Item>
      {({ active }) => (
        <div>
          <Link href={href}>
            <a
              className={classNames(
                isActive || active
                  ? "bg-gray-100 text-indigo-600"
                  : "text-gray-500",
                "group flex items-center px-4 py-2 text-sm"
              )}
            >
              <button
                onClick={() => {
                  setActiveReview({
                    title: "Projects",
                    document: "Projects-Review",
                    headingTitle: "",
                  });
                  setCurrentPageInLocalStorage();
                }}
                className="flex items-center"
              >
                <Icon
                  className={`${
                    (isActive || active) && "text-indigo-600"
                  }  mr-3 h-4 w-4 ${
                    (label === "Incoming Request" ||
                      label === "Outgoing Request" ||
                      label === "Incoming Attestation" ||
                      label === "Outgoing Attestation") &&
                    "rotate-45"
                  } group-hover:text-indigo-600`}
                  aria-hidden="true"
                />
                {label}
                {count > 0 && (
                  <span
                    className={classNames(
                      isActive || active
                        ? "bg-indigo-100 text-indigo-600"
                        : "bg-gray-100 text-gray-900",
                      "hidden ml-3 py-0.5 px-2.5 rounded-full text-xs font-medium md:inline-block"
                    )}
                  >
                    {shortNumber(count)}
                  </span>
                )}
              </button>
            </a>
          </Link>
        </div>
      )}
    </Menu.Item>
  );
}
