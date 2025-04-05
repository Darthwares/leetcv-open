import DropDownIcon from "@components/dropDownIcon";
import {
  LightBulbIcon,
  RefreshIcon,
  SparklesIcon,
} from "@heroicons/react/outline";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import React, { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { CoverLetterSvg } from "@components/svg";
import { useSession } from "next-auth/react";

const AiFeaturesMenu = () => {
  const t = useTranslations("Appbar");
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { status } = useSession();

  const handleClick = (blogUrl: string, featureUrl: string) => {
    if (status === "unauthenticated") {
      router.push(blogUrl);
      return;
    }
    router.push(featureUrl);
  };

  const features = [
    {
      name: t("aiResume"),
      onClick: () => {
        handleClick("/aiResume", "/s/aiResume");
      },
      icon: <DropDownIcon path="/assets/ai/ai-1.png" />,
      description: "Create AI powered resume.",
    },
    {
      name: t("convertResume"),
      onClick: () => {
        handleClick("/convertResume", "/s/convert");
      },
      path: "/s/convert",
      icon: <RefreshIcon className="w-6 h-6" />,
      description: "Convert your resumes.",
    },
    {
      name: t("coverLetter"),
      onClick: () => {
        handleClick("/coverLetter", "/s/coverLetter");
      },
      icon: <CoverLetterSvg className="w-6 h-6" />,
      description: "Create cover letters.",
    },
    {
      name: t("resumeIdeas"),
      onClick: () => {
        handleClick("/resumeIdeas", "/s/resumeIdeas");
      },
      icon: <LightBulbIcon className="w-6 h-6" />,
      description: "Boost your resume ideas.",
    },
  ];

  return (
    <Menu as="div" className="relative hidden lg:block">
      {({ close }) => (
        <>
          <div
            className="cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu.Button className="app-bar-btn flex gap-1 items-center dark:bg-gray-900 dark:text-white text-sm">
              <span className="sr-only">Open user menu</span>
              <SparklesIcon className="w-5 h-5 text-gray-800" />
              {t("aiFeatures")}
            </Menu.Button>
          </div>
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
              className={`absolute -right-6 mt-4 z-50 transform px-2 md:max-w-[600px]`}
            >
              <div className="overflow-hidden rounded-lg shadow-lg ring-opacity-5 bg-white dark:bg-gray-900 w-full">
                <div className={`lg:w-[280px]`}>
                  <div className="relative grid bg-white dark:bg-gray-900 md:gap-7 md:p-7 w-full place-content-center lg:grid-cols-1">
                    {features.map((item) => (
                      <div
                        key={item.name}
                        onClick={() => {
                          item.onClick();
                          close();
                        }}
                        className="-m-3 flex items-center rounded-lg p-2.5 transition duration-200 ease-in-out hover:bg-gray-100 dark:hover:bg-gray-800/50 group cursor-pointer"
                      >
                        <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-md bg-indigo-500 dark:bg-indigo-600 text-white">
                          {item.icon}
                        </div>
                        <div className="ml-3">
                          <p className="text-[15px] flex items-center gap-2 -mt-[2px] font-medium text-gray-700 dark:text-gray-100 dark:hover:text-gray-200 hover:text-gray-900 transition-all duration-200">
                            {item.name}
                          </p>
                          <p className="line-clamp-2 -mt-[2px] text-sm dark:text-gray-300 text-gray-500 leading-snug text-muted-foreground">
                            {item.description}
                          </p>
                        </div>
                      </div>
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

export default AiFeaturesMenu;
