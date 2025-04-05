import { XIcon } from "@heroicons/react/outline";
import { mobileMenuSidebar, subscriptionPlanState } from "@state/state";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import ProUser from "./proUser";
import NonProUser from "./nonProUser";
import SidebarMenu from "@components/sidebarMenu";

const SideBarMenuContainer = () => {
  const [plan] = useRecoilState(subscriptionPlanState);
  const [isMobileMenuSidebarOpen, setIsMobileMenuSidebarOpen] =
    useRecoilState(mobileMenuSidebar);
  const router = useRouter();
  const parentDivRef = useRef<HTMLDivElement>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const [_collapsed, setCollapsed] = React.useState(false);
  const toggleDrawer = () => {
    setIsMobileMenuSidebarOpen(false);
  };

  useEffect(() => {
    const parentDiv = parentDivRef.current;
    if (parentDiv) {
      const handleScroll = () => {
        parentDiv.scrollTop > 80 ? setIsScrolling(true) : setIsScrolling(false);
      };
      parentDiv.addEventListener("scroll", handleScroll);

      return () => {
        parentDiv.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  useEffect(() => {
    if (isMobileMenuSidebarOpen) {
      const parentDiv = parentDivRef.current;
      parentDiv?.scrollTo(0, 0);
    }
  }, [isMobileMenuSidebarOpen]);

  return (
    <div
      className={`fixed top-0 right-0 z-50 mobile-sidebar-menu block lg:hidden h-full overflow-y-auto transition-transform duration-300 ${
        !isMobileMenuSidebarOpen && "translate-x-full"
      } bg-white dark:bg-gray-900`}
      aria-labelledby="drawer-navigation-label"
      ref={parentDivRef}
    >
      <div
        className={`${
          isScrolling && "bg-white dark:bg-gray-900 shadow-md"
        } z-50 sticky transition-all duration-200 top-0`}
      >
        <div
          aria-controls="drawer-navigation"
          className="text-gray-500 px-4 py-3 hover:text-gray-700 text-sm justify-between w-full flex items-center bg-white"
        >
          <button type="button" onClick={() => router.push("/")}>
            <img src="/logo.png" className="w-16" alt="logo" />
          </button>
          <XIcon
            onClick={toggleDrawer}
            className="h-8 w-8 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 bg-white shadow rounded-md p-1"
            aria-hidden="true"
          />
          <span className="sr-only">Close menu</span>
        </div>
      </div>
      <div className="pb-5">
        {plan !== "" && <ProUser />}
        {plan === "" && <NonProUser />}
        <div className="mt-5 relative z-40">
          <SidebarMenu
            setCollapsed={setCollapsed}
            width="100%"
            className="block pb-20 bg-[#F9FAFB] px-2 lg:hidden"
          />
        </div>
      </div>
    </div>
  );
};

export default SideBarMenuContainer;
