import ReUsableTransitionModal from "@components/reUsableTransitionModal";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import { useState } from "react";
import { PlayIcon } from "@heroicons/react/solid";
import { useSession } from "next-auth/react";
import { handleNavigation } from "@constants/defaults";

interface FeatureContentProps {
  id: number;
  src: string;
  orderStyle: string;
  directedLink: string;
  heading: string;
  subHeading: string;
  description: string;
}

const FeatureContent = ({
  id,
  src,
  orderStyle,
  heading,
  subHeading,
  description,
  directedLink,
}: FeatureContentProps) => {
  const router = useRouter();
  const t = useTranslations("Feature");
  const [isOpen, setIsOpen] = useState(false);
  const { status } = useSession();

  return (
    <div
      className={`${orderStyle} ${
        (id === 1 || id === 3) && "lg:order-1"
      } text-center max-w-lg dark:z-10 lg:max-w-xl mx-auto`}
    >
      <h2 className="font-bold tracking-tight text-gray-900 text-5xl">
        <span className="block xl:inline brand-color">{heading}</span>
        <br className="hidden xl:block" />
        <span className="block text-indigo-600 xl:inline">{subHeading}</span>
      </h2>
      <p className="mx-auto dark:text-gray-100 mt-3 max-w-md text-base text-gray-500 sm:text-lg md:mt-5 md:max-w-3xl md:text-xl">
        {description}
      </p>
      <div className="mx-auto max-w-md flex gap-4 sm:gap-2 mt-8 justify-center items-center">
        <div className="rounded-md shadow">
          <button
            onClick={() => {
              handleNavigation(directedLink, status, router);
            }}
            className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 sm:px-8 py-2 text-base font-medium text-white hover:bg-indigo-700 md:px-10 duration-200 transition-all"
          >
            {t("getStarted")}
          </button>
        </div>
        <div className="rounded-md shadow sm:ml-3 sm:mt-0">
          <button
            onClick={() => {
              setIsOpen(true);
            }}
            className="group flex w-full items-center justify-center rounded-md border border-transparent bg-white px-4 sm:px-8 py-2 text-base font-medium text-indigo-600 hover:bg-gray-50 shadow md:px-10 duration-200 transition-all"
          >
            <PlayIcon className="h-6 w-6 bg-indigo-600 text-white rounded-full mr-2 p-1" />
            {t("watchVideo")}
          </button>
          <ReUsableTransitionModal
            title={heading}
            src={src}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
        </div>
      </div>
    </div>
  );
};

export default FeatureContent;
