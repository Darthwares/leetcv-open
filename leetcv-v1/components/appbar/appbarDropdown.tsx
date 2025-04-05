import { Menu, Transition } from "@headlessui/react";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  ChartBarIcon,
  CogIcon,
  DocumentTextIcon,
  PencilAltIcon,
  RefreshIcon,
  ChevronDownIcon,
  ChatAlt2Icon,
  UserGroupIcon,
  BriefcaseIcon,
} from "@heroicons/react/outline";
import { useProgressPercent } from "@utils/progressPercent";
import { resumeState, subscriptionPlanState, userIdState } from "@state/state";
import { trpc } from "@utils/trpc";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import React, { Fragment, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import DropDownIcon from "@components/dropDownIcon";
import {
  handlePortfolioShowcase,
  menuOptions,
  setCurrentPageInLocalStorage,
} from "@constants/defaults";
import ImageFallBack from "@components/imageFallBack";
import useStaticHeader from "@lib/helper/useStaticHeader";
import { RocketSvg } from "@components/svg";

const AppbarDropdown = () => {
  const router = useRouter();
  const { status } = useSession();
  const t = useTranslations("Appbar");
  const [userInfo, setUserInfo] = useRecoilState(resumeState);
  const [userId] = useRecoilState(userIdState);
  const { result } = useProgressPercent();
  const [plan] = useRecoilState(subscriptionPlanState);
  const [menuSelected, setMenuSelected] = useState<string>(t("dropDownHome"));
  const shouldShowStaticDropdown = useStaticHeader();

  const { data: hasVisitedOwnPortfolio } = trpc.useQuery([
    "fs.viewCount.getCount",
    { id: userId, handle: userInfo.handle, file: "userVisitedPortfolio" },
  ]);

  const setHasVisitedOwnPortfolio = trpc.useMutation([
    "fs.viewCount.setOwnPortfolioCount",
  ]);

  const { data: resume } = trpc.useQuery(["fs.resume.get", { id: userId }], {
    enabled: status === "authenticated" && !!userId,
    refetchOnWindowFocus: false,
  });
  const { data: attestationRequests } = trpc.useQuery(
    ["fs.attestation.getProspectsCount", { userId }],
    {
      enabled: status === "authenticated" && !!userId,
      refetchOnWindowFocus: false,
    }
  );

  const { data: prospectCount } = trpc.useQuery(
    ["fs.prospects.getCount", { id: userId }],
    {
      enabled: status === "authenticated",
      refetchOnWindowFocus: false,
    }
  );

  const { data: requestCount } = trpc.useQuery(
    ["fs.request.getCount", { userId }],
    {
      enabled: status === "authenticated",
      refetchOnWindowFocus: false,
    }
  );

  const { data: attestationProspectCount } = trpc.useQuery(
    ["fs.attestation.getRequestsCount", { userId }],
    {
      enabled: status === "authenticated",
      refetchOnWindowFocus: false,
    }
  );

  const getGeneratedResume = localStorage.getItem("confirmSubmitting");
  const activeResume = localStorage.getItem("aiGeneratedResume");
  let updatedResume =
    getGeneratedResume === "true"
      ? { ...JSON.parse(activeResume!), id: userId }
      : userInfo || resume;
  function checkAIResume() {
    setUserInfo(updatedResume);
    localStorage.removeItem("confirmSubmitting");
    localStorage.removeItem("generatedResume");
    localStorage.removeItem("aiGeneratedResume");
  }
  useEffect(() => {
    if (resume) {
      if (getGeneratedResume === "true") {
        return checkAIResume();
      }
      setUserInfo({ ...resume, id: userId, progress: result });
    }
  }, [resume]);
  useEffect(() => {
    if (userInfo) {
      setUserInfo({
        ...userInfo,
        progress: result,
      });
    }
  }, [result]);

  const othersDropDown = [
    {
      name: t("messages"),
      onClick: () => {
        router.push("/s/messages");
      },
      icon: <ChatAlt2Icon className="w-6 h-6" />,
      description: "Communicate with others.",
    },
    {
      name: t("reviews"),
      onClick: () => {
        router.push("/s/reviews");
      },
      icon: <DropDownIcon path="/assets/ai/review.png" />,
      description: "Respond to your reviews.",
    },
    {
      name: t("followers"),
      onClick: () => {
        router.push("/s/followers");
      },
      icon: <UserGroupIcon className="w-6 h-6" />,
      description: "Track your connects.",
    },
    {
      name: t("followings"),
      onClick: () => {
        router.push("/s/following");
      },
      icon: <UserGroupIcon className="w-6 h-6" />,
      description: "Manage your network.",
    },
    {
      name: t("requests"),
      onClick: () => {
        router.push("/s/requests");
      },
      icon: <ArrowDownIcon className="rotate-45 h-6 w-6" />,
      count: requestCount,
      description: "View your incoming requests.",
    },
    {
      name: t("prospects"),
      onClick: () => {
        router.push("/s/prospects");
      },
      icon: <ArrowUpIcon className="rotate-45 w-6 h-6" />,
      count: prospectCount,
      description: "Manage your prospects.",
    },
    {
      name: t("requestAttestation"),
      onClick: () => {
        router.push("/s/requestAttestation");
      },
      icon: <ArrowDownIcon className="rotate-45 h-6 w-6" />,
      count: attestationRequests,
      description: "Handle incoming attestation.",
    },
    {
      name: t("prospectsAttestation"),
      onClick: () => {
        router.push("/s/prospectAttestation");
      },
      icon: <ArrowUpIcon className="rotate-45 w-6 h-6" />,
      count: attestationProspectCount,
      description: "Manage attestation prospects.",
    },
  ];

  const profileDropDown = [
    {
      name: t("dashboard"),
      onClick: () => {
        router.push("/s/dashboard");
      },
      icon: <ChartBarIcon className="w-6 h-6" />,
      description: "View your dashboard.",
    },
    {
      name: t("resume"),
      onClick: () => {
        router.push("/s/resume");
      },
      icon: <DocumentTextIcon className="w-6 h-6" />,
      description: "View your resume information.",
    },
    {
      name: t("editor"),
      onClick: () => {
        router.push("/s/resumeEditor");
      },
      icon: <PencilAltIcon className="w-6 h-6" />,
      description: "Edit & customize your resume.",
    },
    {
      name: t("settings"),
      onClick: () => {
        router.push("/s/settings/privacy");
      },
      icon: <CogIcon className="w-6 h-6" />,
      description: "Manage your account settings.",
    },
  ];

  const profileDropDownWithLeetLink = [
    ...profileDropDown.slice(0, -1),
    {
      name: "Leet Link",
      onClick: () => {
        router.push("/s/leetLink");
      },
      icon: <RocketSvg className="w-5 h-5" />,
      description: "Manage & share your leet link.",
    },
    profileDropDown[profileDropDown.length - 1],
  ];

  const incrementhasVisitedOwnPortfolio = () => {
    setHasVisitedOwnPortfolio.mutate({
      handle: userInfo.handle as string,
      count: hasVisitedOwnPortfolio + 1,
      file: "selfPortfolio",
    });
  };

  return (
    <Menu as="div" className="relative">
      {({ close }) => (
        <>
          {status === "authenticated" && (
            <div
              className="cursor-pointer"
              onClick={() => setMenuSelected(t("dropDownHome"))}
            >
              <Menu.Button className="rounded-full flex items-center text-sm">
                <span className="sr-only">Open user menu</span>
                <ImageFallBack
                  imgSrc={userInfo?.image!}
                  fallBackText={userInfo?.displayName}
                  avatarClass="w-9 h-9 rounded-full"
                  avatarImgClass="w-full h-full overflow-hidden"
                  avatarFallbackClass="w-9 h-9 text-white rounded-full text-xl"
                />
                <span className={`${plan ? "deskPro-label" : ""} plan`}>
                  {plan === "Pro" && t("capitalCasePro")}
                  {plan === "Premium" && t("premium")}
                </span>
              </Menu.Button>
            </div>
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
            {shouldShowStaticDropdown ? (
              <Menu.Items
                className={`absolute -right-6 mt-3.5 z-50 transform px-2 md:max-w-[600px]`}
              >
                <div className="overflow-hidden rounded-lg shadow-lg ring-opacity-5 bg-white dark:bg-gray-900 w-full">
                  <div className="relative grid bg-white dark:bg-gray-900 p-4 lg:grid-cols-1 md:w-[320px]">
                    <div className="flex items-center gap-4 px-4 pb-1 border-b border-gray-100 dark:border-gray-700">
                      <ImageFallBack
                        imgSrc={userInfo?.image!}
                        fallBackText={userInfo?.displayName}
                        avatarClass="w-12 h-12 rounded-md"
                        avatarImgClass="w-full h-full overflow-hidden"
                        avatarFallbackClass="w-12 h-12 text-white rounded-md text-3xl"
                      />
                      <div className="flex flex-col mb-4">
                        <div className="mt-1.5 text-lg font-medium w-52 truncate">
                          {userInfo.displayName}
                        </div>
                        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 w-40 truncate">
                          @{userInfo.handle}
                        </p>
                      </div>
                    </div>
                    {profileDropDownWithLeetLink.map((item) => (
                      <div
                        key={item.name}
                        className="group relative flex gap-x-4 rounded-lg p-3 cursor-pointer hover:bg-gray-100"
                        onClick={() => {
                          item.onClick();
                          close();
                        }}
                      >
                        <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                          <div className="h-5 w-5 text-gray-600 group-hover:text-indigo-600">
                            {item.icon}
                          </div>
                        </div>
                        <div>
                          <div className="font-semibold text-sm text-gray-900">
                            {item.name}
                            <span className="absolute inset-0" />
                          </div>
                          <p className="mt-1 text-gray-600 text-sm">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Menu.Items>
            ) : (
              <Menu.Items
                className={`absolute -right-4 mt-4 z-50 transform px-2 md:max-w-[600px]`}
              >
                <div className="overflow-hidden rounded-lg shadow-lg ring-opacity-5 bg-white dark:bg-gray-900 w-full">
                  <div className="flex items-center justify-center gap-8 py-3 -mt-2 dark:border-gray-600 border-b">
                    {menuOptions.map((option) => (
                      <div
                        key={option}
                        onMouseEnter={() => setMenuSelected(option)}
                        className={`flex group ${
                          menuSelected === option
                            ? "menu-option-selected text-indigo-600"
                            : "text-gray-800 dark:text-gray-200"
                        } px-1 py-1 pb-0.5 text-[15px] cursor-pointer font-medium items-center gap-1 relative menu-option`}
                      >
                        <p className="font-semibold gray-900">{option}</p>
                        <ChevronDownIcon className="w-3 h-3 font-semibold group-hover:rotate-180 transition-all duration-300" />
                      </div>
                    ))}
                  </div>
                  <div className={`md:w-[580px]`}>
                    {menuSelected === t("dropDownHome") && (
                      <div className="flex justify-evenly w-[90%] mx-auto">
                        <div className="select-none flex-col justify-start rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md">
                          <ImageFallBack
                            imgSrc={userInfo?.image!}
                            fallBackText={userInfo?.displayName}
                            avatarClass="w-[8rem] h-[8rem] rounded-md"
                            avatarImgClass="w-full h-full overflow-hidden"
                            avatarFallbackClass="w-[8rem] h-[8rem] text-white rounded-md text-6xl"
                          />
                          <div className="flex flex-col mb-4">
                            <div className="mt-1.5 text-lg font-medium w-44 truncate">
                              {userInfo.displayName}
                            </div>
                            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 w-40 truncate">
                              @{userInfo.handle}
                            </p>
                          </div>

                          <div
                            onClick={() => {
                              handlePortfolioShowcase("/s/portfolio", router);
                              incrementhasVisitedOwnPortfolio();
                              close();
                            }}
                            className="-m-3 flex items-center rounded-lg p-2.5 transition duration-200 ease-in-out hover:bg-gray-100 dark:hover:bg-gray-800/50 cursor-pointer"
                          >
                            <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-md bg-indigo-500 dark:bg-indigo-600 text-white">
                              <BriefcaseIcon className="w-6 h-6" />
                            </div>
                            <div className="ml-3">
                              <p className="text-[15px] -mt-[2px] font-medium dark:text-gray-100 text-gray-700 hover:text-gray-900 transition-all duration-200">
                                {t("portfolio")}
                              </p>
                              <p className="line-clamp-2 -mt-[2px] text-sm dark:text-gray-300 text-gray-500 leading-snug text-muted-foreground">
                                {t("viewPortfolio")}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="relative grid bg-white dark:bg-gray-900 md:gap-6 md:px-6 md:py-7 lg:grid-cols-1">
                          {profileDropDown.map((item) => (
                            <div
                              key={item.name}
                              onClick={() => {
                                item.onClick();
                                close();
                              }}
                              className="-m-3 flex items-center rounded-lg p-2.5 transition duration-200 ease-in-out hover:bg-gray-100 dark:hover:bg-gray-800/50 cursor-pointer"
                            >
                              <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-md bg-indigo-500 dark:bg-indigo-600 text-white">
                                {item.icon}
                              </div>
                              <div className="ml-3">
                                <p className="text-[15px] -mt-[2px] font-medium dark:text-gray-100 text-gray-700 hover:text-gray-900 transition-all duration-200">
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
                    )}
                    {menuSelected === t("dropDownMore") && (
                      <div className="relative grid bg-white dark:bg-gray-900 md:gap-7 md:p-7 w-full place-content-center md:grid-cols-2">
                        {othersDropDown.map((item) => (
                          <div
                            key={item.name}
                            onClick={() => {
                              item.onClick();
                              close();
                              setCurrentPageInLocalStorage();
                            }}
                            className="-m-3 flex items-center rounded-lg p-2.5 transition duration-200 ease-in-out hover:bg-gray-100 dark:hover:bg-gray-800/50 group cursor-pointer"
                          >
                            <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-md bg-indigo-500 dark:bg-indigo-600 text-white">
                              {item.icon}
                            </div>
                            <div className="ml-3">
                              <p className="text-[15px] flex items-center gap-2 -mt-[2px] font-medium text-gray-700 dark:text-gray-100 dark:hover:text-gray-200 hover:text-gray-900 transition-all duration-200">
                                {item.name}
                                {item.count && item.count !== 0 ? (
                                  <span className="text-indigo-600 text-xs group-hover:bg-indigo-100 duration-200 transition-all bg-indigo-50 rounded-full w-5 font-medium h-5 flex items-center justify-center">
                                    {item.count}
                                  </span>
                                ) : null}
                              </p>
                              <p className="line-clamp-2 -mt-[2px] text-sm dark:text-gray-300 text-gray-500 leading-snug text-muted-foreground">
                                {item.description}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </Menu.Items>
            )}
          </Transition>
        </>
      )}
    </Menu>
  );
};
export default AppbarDropdown;
