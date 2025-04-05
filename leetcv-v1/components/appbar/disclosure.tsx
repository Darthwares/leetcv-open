import { AVATAR_IMAGE } from "@constants/defaults";
import { Menu, Transition } from "@headlessui/react";
import { classNames } from "@utils/classNames";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import React, { Fragment } from "react";

const DisclosurePanel = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const t = useTranslations("Appbar");

  return (
    <div>
      {status === "authenticated" && session.user?.image && (
        <Menu as="div" className="relative z-10">
          <div>
            <Menu.Button className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-white">
              <span className="sr-only">Open user menu</span>
              <img
                className="ml-2 inline-block h-8 w-8 rounded-full"
                src={session?.user?.image || AVATAR_IMAGE}
                alt="image"
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
            <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
              <Menu.Item>
                {({ active }) => (
                  <a
                    onClick={() => {
                      router.push("/s/resume");
                    }}
                    className={classNames(
                      active ? "bg-gray-100" : "",
                      "block px-4 py-2 text-sm text-gray-700 cursor-pointer"
                    )}
                  >
                    {t("yourProfile")}
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    onClick={() => {
                      router.push("/s/settings/privacy");
                    }}
                    className={classNames(
                      active ? "bg-gray-100" : "",
                      "block px-4 py-2 text-sm text-gray-700"
                    )}
                  >
                    {t("settings")}
                  </a>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      )}
    </div>
  );
};

export default DisclosurePanel;
