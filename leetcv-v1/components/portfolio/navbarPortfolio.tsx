import { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  AcademicCapIcon,
  BookOpenIcon,
  BriefcaseIcon,
  CalendarIcon,
  CodeIcon,
  MenuIcon,
  UserIcon,
  XIcon,
} from "@heroicons/react/outline";
import { classNames } from "@utils/classNames";
import ProductLogo from "@components/appbar/productLogo";
import AppbarDropdown from "@components/appbar/appbarDropdown";
import { Button } from "../../shadcn/components/ui/button";
import AchieveMentsDropdown from "./achieveMentsDropdown";
import {
  CertificationsSvg,
  ContactSvg,
  CoursesSvg,
  ProjectSvg,
  TrophySvg,
  portfolioViewsSvg,
} from "@components/svg";
import { profileResumeState, userIdState } from "@state/state";
import { useRecoilState } from "recoil";
import { trpc } from "@utils/trpc";
import { checkExperienceDetails, shortNumber } from "@constants/defaults";

export default function NavbarPortfolio() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selected, setSelected] = useState("About");
  const [resume] = useRecoilState(profileResumeState);
  const [userId] = useRecoilState(userIdState);
  const isSkillsThere =
    resume?.skills?.length !== 0 ||
    resume.projects.some((project) => project.skills.length !== 0);
  const isProjectsThere = resume?.projects?.length !== 0;
  const isExperiencesThere = checkExperienceDetails(resume.experiences ?? []);
  const isEducationsThere = resume?.educations?.length !== 0;
  const isAwardsThere = resume?.awards?.length !== 0;
  const isCertificatesThere = resume?.certificates?.length !== 0;
  const isCoursesThere = resume?.courses?.length !== 0;
  const isPublicationsThere = resume?.publications?.length !== 0;
  const experienceAndEducationName =
    !isExperiencesThere && isEducationsThere ? "Educations" : "Experiences";
  const experienceAndEducationHref =
    !isExperiencesThere && isEducationsThere ? "#educations" : "#experiences";
  const experienceAndEducationLogo =
    !isExperiencesThere && isEducationsThere ? AcademicCapIcon : BriefcaseIcon;

  const { data: viewPortfolioCounter } = trpc.useQuery([
    "fs.viewCount.getCount",
    { id: userId, handle: resume.handle, file: "viewPortfolioCounter" },
  ]);

  const isAchievementsThere =
    isAwardsThere ||
    isCertificatesThere ||
    isCoursesThere ||
    isPublicationsThere;

  const navigationMobile = [
    { name: "About", href: "#about", icon: UserIcon, isThere: true },
    { name: "Skills", href: "#skills", icon: CodeIcon, isThere: isSkillsThere },
    {
      name: "Projects",
      href: "#projects",
      icon: ProjectSvg,
      isThere: isProjectsThere,
    },
    {
      name: experienceAndEducationName,
      href: experienceAndEducationHref,
      icon: experienceAndEducationLogo,
      isThere: isExperiencesThere || isEducationsThere,
    },
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
      icon: BookOpenIcon,
      isThere: isPublicationsThere,
    },
    { name: "Contact", href: "#contact", icon: ContactSvg, isThere: true },
    {
      name: "Views",
      href: "#",
      icon: portfolioViewsSvg,
      isThere: viewPortfolioCounter > 50,
      counter: viewPortfolioCounter,
    },
  ].filter((item) => item.isThere);

  const navigationDesktop = [
    { name: "About", href: "#about", icon: UserIcon, isThere: true },
    { name: "Skills", href: "#skills", icon: CodeIcon, isThere: isSkillsThere },
    {
      name: "Projects",
      href: "#projects",
      icon: ProjectSvg,
      isThere: isSkillsThere,
    },
    {
      name: experienceAndEducationName,
      href: experienceAndEducationHref,
      icon: experienceAndEducationLogo,
      isThere: isExperiencesThere || isEducationsThere,
    },
    {
      name: "Achievements",
      href: "",
      icon: CalendarIcon,
      isThere: isAchievementsThere,
    },
    { name: "Contact", href: "#contact", icon: ContactSvg, isThere: true },
    {
      name: "Views",
      href: "#",
      icon: portfolioViewsSvg,
      isThere: viewPortfolioCounter > 50,
      counter: viewPortfolioCounter,
    },
  ].filter((item) => item.isThere);

  return (
    <>
      <Transition show={sidebarOpen}>
        <Dialog className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
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

          <div className="fixed inset-0 flex">
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
                      className="-m-2.5 p-2.5"
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
                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4 min-h-screen">
                  <ProductLogo />
                  <nav className="flex flex-1 flex-col">
                    <ul role="list" className="-mx-2 space-y-2">
                      {navigationMobile.map((item) => (
                        <li
                          key={item.name}
                          onClick={() => {
                            setSidebarOpen(false);
                            setSelected(item.name);
                          }}
                        >
                          <a
                            href={item.href}
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
                            {item.counter && (
                              <span className="inline-flex items-center justify-center bg-gray-200 p-1 w-5 h-5 -ml-1.5 text-xs font-semibold rounded-full dark:bg-gray-700 dark:text-white">
                                {shortNumber(item.counter)}
                              </span>
                            )}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
      <header className="fixed top-0 left-0 z-50 w-full bg-white shadow-sm dark:bg-gray-950 md:px-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between py-2 lg:py-0">
          <div className="flex-shrink-0 text-xl font-semibold lg:py-2.5">
            <ProductLogo />
          </div>
          <nav className="hidden gap-2 text-sm font-medium items-center lg:flex">
            {navigationDesktop.map((link, index) => (
              <>
                {link.name === "Achievements" ? (
                  <div
                    key={index}
                    className="text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                  >
                    <AchieveMentsDropdown />
                  </div>
                ) : (
                  <a
                    key={index}
                    className="text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                    href={link.href}
                  >
                    <button className="app-bar-btn text-sm gap-1.5 mx-0 px-2">
                      <link.icon className="h-5 w-5 text-gray-500" />
                      {link.name}
                      {link.counter && (
                        <span className="inline-flex items-center justify-center bg-gray-200 p-1 w-5 h-5 text-xs font-semibold rounded-full dark:bg-gray-700 dark:text-white">
                          {shortNumber(link.counter)}
                        </span>
                      )}
                    </button>
                  </a>
                )}
              </>
            ))}
            <AppbarDropdown />
          </nav>
          <Button
            className="lg:hidden py-1.5"
            size="icon"
            onClick={() => setSidebarOpen(true)}
          >
            <MenuIcon className="h-6 w-6 text-gray-800" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </div>
      </header>
    </>
  );
}
