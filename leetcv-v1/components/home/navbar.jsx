import { useEffect, useRef, useState } from "react";
import { Popover } from "@headlessui/react";
import clsx from "clsx";
import { useTranslations } from "next-intl";

export default function NavBar() {
  const tHome = useTranslations("HomePage");
  let navBarRef = useRef();
  let [activeIndex, setActiveIndex] = useState(-1);
  const sections = [
    { id: "pricing", title: "Pricing" },
    { id: "share", title: "Share" },
    { id: "design", title: "Design" },
    { id: "blogs", title: "Blogs" },
  ];

  useEffect(() => {
    function updateActiveIndex() {
      let newActiveIndex = -1;
      let bodyRect = document.body.getBoundingClientRect();
      if (window.scrollY >= Math.floor(bodyRect.height) - window.innerHeight) {
        setActiveIndex(sections.length - 1);
        return;
      }
      setActiveIndex(newActiveIndex);
    }
    updateActiveIndex();
    window.addEventListener("resize", updateActiveIndex);
    window.addEventListener("scroll", updateActiveIndex, { passive: true });
    return () => {
      window.removeEventListener("resize", updateActiveIndex);
      window.removeEventListener("scroll", updateActiveIndex, {
        passive: true,
      });
    };
  }, [sections.length]);

  return (
    <div ref={navBarRef} className="sticky -top-0.5 z-30" data-testid="navbar">
      <Popover className="sm:hidden">
        {({ open }) => (
          <>
            <div
              className={clsx("relative flex items-center py-3 px-4", {
                "bg-white/95 dark:bg-gray-900 shadow-sm [@supports(backdrop-filter:blur(0))]:bg-white/80 [@supports(backdrop-filter:blur(0))]:backdrop-blur":
                  !open,
              })}
              data-testid="mobileNavbar"
            >
              {!open && (
                <>
                  <span
                    aria-hidden="true"
                    className="font-mono text-sm text-blue-600"
                    data-testid="mobileNavbarNumber"
                  >
                    {(Math.max(0, activeIndex) + 1).toString().padStart(2, "0")}
                  </span>
                  <span
                    className="ml-4 text-base font-medium dark:text-white text-slate-900"
                    data-testid="mobileNavbarText"
                  >
                    {sections[Math.max(0, activeIndex)].title}
                  </span>
                </>
              )}
              <Popover.Button
                className={clsx(
                  "-mr-1 ml-auto flex h-8 w-8 items-center justify-center",
                  { "relative z-10": open }
                )}
              >
                {!open && <span className="absolute inset-0" />}
                <span className="sr-only">{tHome("navbarToggle")}</span>
                <svg
                  aria-hidden="true"
                  className="h-6 w-6 stroke-slate-700"
                  fill="none"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path
                    d={
                      open
                        ? "M17 7 7 17M7 7l10 10"
                        : "m15 16-3 3-3-3M15 8l-3-3-3 3"
                    }
                  />
                </svg>
              </Popover.Button>
            </div>
            <Popover.Panel
              className="absolute inset-x-0 top-0 bg-white/95 dark:bg-gray-900 py-3.5 shadow-sm [@supports(backdrop-filter:blur(0))]:bg-white/80 [@supports(backdrop-filter:blur(0))]:backdrop-blur"
              data-testid="popover"
            >
              {({ close }) =>
                sections.map((section, index) => (
                  <a
                    key={section.id}
                    href={`#${section.title}`}
                    className="flex items-center py-1.5 px-4"
                    onClick={close}
                    data-testid={`section-${section.id}`}
                  >
                    <span
                      aria-hidden="true"
                      className="font-mono text-sm text-blue-600"
                    >
                      {(index + 1).toString().padStart(2, "0")}
                    </span>
                    <span className="ml-4 text-base font-medium text-slate-900 dark:text-white">
                      {section.title}
                    </span>
                  </a>
                ))
              }
            </Popover.Panel>
            <div className="absolute inset-x-0 bottom-full z-10 h-4 bg-white dark:bg-gray-900" />
          </>
        )}
      </Popover>
      <div className="hidden sm:flex sm:h-24 sm:justify-center sm:border-b sm:border-slate-200 sm:dark:border-slate-600 dark:bg-gray-800/90 dark:-mt-px sm:bg-white/95 sm:[@supports(backdrop-filter:blur(0))]:bg-white/80 sm:[@supports(backdrop-filter:blur(0))]:backdrop-blur">
        <ol className="-mb-[2px] grid auto-cols-[minmax(0,15rem)] grid-flow-col text-base font-medium text-slate-900 [counter-reset:section]">
          {sections.map((section, index) => (
            <li
              key={section.id}
              className="flex [counter-increment:section]"
              data-testid={`list-${section.id}`}
            >
              <a
                href={`#${section.title}`}
                className={clsx(
                  "flex w-full flex-col items-center justify-center border-b-2 before:mb-2 before:font-mono before:text-sm before:content-[counter(section,decimal-leading-zero)]",
                  {
                    "border-blue-600 bg-blue-50 dark:bg-slate-800/30 dark:text-white text-blue-600 before:text-blue-600":
                      index === activeIndex,
                    "border-transparent before:text-slate-500 hover:bg-blue-50/40 dark:text-white dark:hover:bg-slate-700/30 hover:before:text-slate-900 dark:before:text-gray-400 dark:hover:before:text-slate-900":
                      index !== activeIndex,
                  }
                )}
              >
                {section.title}
              </a>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
