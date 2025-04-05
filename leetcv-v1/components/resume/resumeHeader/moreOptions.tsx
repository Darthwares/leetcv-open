import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import {
  DotsVerticalIcon,
  DownloadIcon,
  ShareIcon,
} from "@heroicons/react/outline";
import { useTranslations } from "next-intl";
import { useSetRecoilState } from "recoil";
import { shareProfileModalState } from "@state/state";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function MoreOptions() {
  const t = useTranslations("MoreOptions");
  const setShareProfileModal = useSetRecoilState(shareProfileModalState);

  const shareProfile = () => {
    setShareProfileModal(true);
  };

  const handlePrint = () => {
    window.print();
  };

  const moreOptionsList = [
    {
      id: 0,
      name: t("download"),
      icon: <DownloadIcon className="w-5" />,
      action: handlePrint,
      disabled: "block",
    },
    {
      id: 1,
      name: t("share"),
      icon: <ShareIcon className="w-5" />,
      action: shareProfile,
      disabled: "block",
    },
  ];

  return (
      <div className="flex items-center w-full justify-center">
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-full bg-white p-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
              <DotsVerticalIcon className="w-5 cursor-pointer" />
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
            <Menu.Items className="absolute right-0 z-10 mt-2 max-w-fit origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                {moreOptionsList.map((option) => {
                  return (
                    <Menu.Item key={option.id}>
                      {({ active }) => (
                        <div
                          onClick={() => {
                            option.action();
                          }}
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            option.disabled,
                            "block px-4 py-2 text-sm cursor-pointer"
                          )}
                        >
                          <div className="flex items-center gap-1">
                            <span>{option.icon}</span>
                            <span>{option.name}</span>
                          </div>
                        </div>
                      )}
                    </Menu.Item>
                  );
                })}
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
  );
}
