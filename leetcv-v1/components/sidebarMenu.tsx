import React, { useEffect, useState } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  mobileMenuSidebar,
  pendingNotificationsState,
  profileResumeState,
  resumeState,
  signOutModelOpen,
  subscriptionPlanState,
  userIdState,
} from "@state/state";
import Modal from "@components/modal";
import { useTranslations } from "next-intl";
import LogOutButton from "@components/logOutButton";
import {
  BgAndTextColorChange,
  handlePortfolioShowcase,
  MainMenuItemsOne,
  MainMenuItemsTwo,
  MainMenuItemsThree,
  MenuItemsOne,
  MenuItemsTwo,
  MenuItemsThree,
} from "@constants/defaults";
import { trpc } from "@utils/trpc";
import Link from "next/link";
import { useDomainSpecificUser } from "@lib/helper/useDomainSpecificUser";

type MenuKey = "AI" | "Portfolio" | "Settings" | "Attestation" | "Requests";

interface SidebarMenuProps {
  collapsed?: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
  collapsedWidth?: string;
  width?: string;
  onHover?: (text: string, rect: DOMRect) => void;
  onLeave?: () => void;
}

const SidebarMenu = ({
  collapsed,
  className,
  collapsedWidth,
  setCollapsed,
  width,
  onHover,
  onLeave,
}: SidebarMenuProps) => {
  const router = useRouter();
  const [isSignOutModelOpen, setIsSignOutModelOpen] =
    useRecoilState(signOutModelOpen);
  const { data: session, status } = useSession();
  const t = useTranslations("Appbar");
  const [plan] = useRecoilState(subscriptionPlanState);
  const [userId] = useRecoilState(userIdState);
  const [resume] = useRecoilState(resumeState);
  const setProfileResume = useSetRecoilState(profileResumeState);
  const setIsMobileMenuSidebarOpen = useSetRecoilState(mobileMenuSidebar);
  const [pendingNotifications, setPendingNotifications] = useRecoilState(
    pendingNotificationsState
  );
  const [count, setCount] = useState({
    requestsCount: 0,
    prospectCount: 0,
    attestationRequestCount: 0,
    attestationProspectCount: 0,
    following: 0,
    followers: 0,
    colleagueCount: 0,
    pendingRequests: pendingNotifications.request,
    pendingAttestation: pendingNotifications.attestation,
    pendingReviews: pendingNotifications.review,
  });

  const { data: resumeData } = trpc.useQuery(
    ["fs.resume.get", { id: userId }],
    {
      enabled: status === "authenticated" && !!userId,
    }
  );

  const isAllowedUser = useDomainSpecificUser();

  const { data: hasVisitedOwnPortfolio } = trpc.useQuery([
    "fs.viewCount.getCount",
    { id: userId, handle: resume.handle, file: "userVisitedPortfolio" },
  ]);

  const setHasVisitedOwnPortfolio = trpc.useMutation([
    "fs.viewCount.setOwnPortfolioCount",
  ]);

  const { data: requestsCount } = trpc.useQuery(
    ["fs.request.getCount", { userId }],
    {
      enabled: status === "authenticated",
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

  const { data: findColleagues } = trpc.useQuery(
    ["fs.dashboard.getColleagues", { userId: resume.id }],
    {
      refetchOnWindowFocus: false,
      enabled: status === "authenticated",
    }
  );

  const { data: attestationRequestCount } = trpc.useQuery(
    ["fs.attestation.getProspectsCount", { userId }],
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

  const { data: pendingNotificationsData } = trpc.useQuery(
    ["fs.review.getpendingNotifications", { userId }],
    {
      enabled: status === "authenticated",
      refetchOnWindowFocus: false,
    }
  );
  const { data: following } = trpc.useQuery(
    ["fs.follower.getFollowingList", { id: userId, handle: resume.handle }],
    {
      enabled: !!userId && !!resume.handle,
    }
  );
  const { data: followers } = trpc.useQuery(
    ["fs.follower.getFollowers", { id: userId, handle: resume.handle }],
    {
      enabled: !!userId && !!resume.handle,
    }
  );

  const showAddSecondaryEmail = process.env
    .NEXT_PUBLIC_COLLEGE_EMAIL_DOMAIN!.split(",")
    .some((domain) => session?.user?.email!.endsWith(domain));

  const isActive = (path: string) => {
    return router.pathname === path;
  };

  const [sidebarKey, setSidebarKey] = useState(Date.now());

  const closeModal = () => {
    setIsSignOutModelOpen(false);
  };

  const changeColor = BgAndTextColorChange(resume?.progress!);

  const [open, setOpen] = React.useState<MenuKey | undefined>();

  const handleOpenSubMenu = (key: MenuKey) => {
    setOpen((currentOpen) => (currentOpen === key ? undefined : key));
  };

  useEffect(() => {
    setSidebarKey(Date.now());
    setCount({
      requestsCount: requestsCount!,
      prospectCount: prospectCount!,
      attestationRequestCount: attestationRequestCount!,
      attestationProspectCount: attestationProspectCount!,
      following: following?.count!,
      followers: followers?.count!,
      colleagueCount: findColleagues?.count!,
      pendingRequests: pendingNotifications.request,
      pendingAttestation: pendingNotifications.attestation,
      pendingReviews: pendingNotifications.review,
    });
  }, [
    requestsCount,
    prospectCount,
    attestationRequestCount,
    attestationProspectCount,
    following,
    followers,
    findColleagues,
    pendingNotifications,
  ]);

  useEffect(() => {
    if (pendingNotificationsData) {
      setPendingNotifications({
        review: pendingNotificationsData.review,
        attestation: pendingNotificationsData.attestation,
        request: pendingNotificationsData.request,
      });
    }
  }, [pendingNotificationsData]);

  useEffect(() => {
    if (resumeData) {
      setProfileResume(resumeData);
    }
  }, [resumeData]);

  const isSubmenuOpen = (submenuPaths: string[]) => {
    return submenuPaths.some((path: string) => router.pathname === path);
  };

  const incrementhasVisitedOwnPortfolio = () => {
    setHasVisitedOwnPortfolio.mutate({
      handle: resume.handle as string,
      count: hasVisitedOwnPortfolio + 1,
      file: "selfPortfolio",
    });
  };

  const handleAction = (menuItemText: string) => {
    setIsMobileMenuSidebarOpen(false);

    if (menuItemText === "Logout") {
      setIsSignOutModelOpen(true);
    }
  };

  const renderMainMenuItems = (items: any[]) => {
    return items.map((item) => {
      return (
        (item.label !== "Leet Prep" ||
          isAllowedUser ||
          plan === "Pro" ||
          plan === "Premium") && (
          <MenuItem
            key={item.path}
            className={`${
              isActive(item.path)
                ? "bg-indigo-500 text-white sidebar-btn"
                : "bg-transparent"
            } relative`}
            icon={<item.icon className="w-5 h-5" />}
            onClick={() => {
              if (item.path === "/s/portfolio") {
                handlePortfolioShowcase("/s/portfolio", router);
                incrementhasVisitedOwnPortfolio();
                return;
              }
              router.push(item.path);
            }}
            title={collapsed ? "" : item.label}
            active
            onMouseEnter={(e) =>
              onHover &&
              onHover(item.label, e.currentTarget.getBoundingClientRect())
            }
            onMouseLeave={onLeave}
          >
            <Link href={item.path} legacyBehavior>
              <p
                onClick={() => setIsMobileMenuSidebarOpen(false)}
                className={item.progress ? "flex gap-2 items-center" : ""}
                onKeyDown={(event) => {
                  if (event.key === "Shift") {
                    setIsMobileMenuSidebarOpen(false);
                  }
                }}
              >
                {item.label}
                {item?.progress ? (
                  <span
                    className={`${changeColor} rounded-md px-2 py-0.5 text-sm bg-indigo-50`}
                  >
                    {item.progress}%
                  </span>
                ) : null}
              </p>
            </Link>
          </MenuItem>
        )
      );
    });
  };

  const renderMenuItems = (items: any[]) => {
    return items.map((menuItem, index) => {
      return (
        <SubMenu
          label={menuItem.label}
          defaultOpen={isSubmenuOpen(menuItem.defaultOpen)}
          icon={
            <div className="relative">
              <menuItem.icon className={`${menuItem.rotate} w-5 h-5`} />
              {menuItem.hasPending && (
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-indigo-600 rounded-full animate-ping" />
              )}
            </div>
          }
          key={index}
          onClick={(e) => {
            setCollapsed(false);
            handleOpenSubMenu(menuItem.label as MenuKey);
            isSubmenuOpen(menuItem.defaultOpen);
          }}
          open={open === menuItem.label}
          title={menuItem.label}
          onMouseEnter={(e) =>
            onHover &&
            onHover(menuItem.label, e.currentTarget.getBoundingClientRect())
          }
          onMouseLeave={onLeave}
        >
          {menuItem?.items?.map((subMenuItem: any, id: number) => {
            if (
              (subMenuItem.text === "Subscription" &&
                plan !== "Pro" &&
                plan !== "Premium") ||
              (subMenuItem.text === "Add Recovery Email" &&
                !showAddSecondaryEmail)
            ) {
              return null;
            }

            return (
              <MenuItem
                className={`${
                  isActive(subMenuItem.path)
                    ? "bg-indigo-500 text-white sidebar-btn"
                    : "bg-white"
                }`}
                icon={
                  <div className="relative">
                    <subMenuItem.icon className={`${subMenuItem.class}`} />
                    {subMenuItem.hasPending && (
                      <div className="absolute -top-1 -right-1 w-2 h-2 bg-indigo-600 rounded-full animate-ping" />
                    )}
                  </div>
                }
                onClick={() => {
                  router.push(subMenuItem.path);
                }}
                key={id}
                onMouseEnter={(e) =>
                  onHover &&
                  onHover(
                    subMenuItem.text,
                    e.currentTarget.getBoundingClientRect()
                  )
                }
                onMouseLeave={onLeave}
              >
                <Link href={subMenuItem.path} legacyBehavior>
                  <div
                    className="flex gap-2 items-center"
                    onClick={() => handleAction(subMenuItem.text)}
                    onKeyDown={(event) => {
                      if (event.key === "Shift") {
                        handleAction(subMenuItem.text);
                      }
                    }}
                  >
                    <span>{subMenuItem.text}</span>
                    {subMenuItem.counter && (
                      <span
                        className={`${
                          isActive(subMenuItem.path)
                            ? "bg-white text-indigo-600"
                            : "bg-indigo-600 text-white"
                        } rounded-md px-2 py-0.5 text-xs`}
                      >
                        {subMenuItem.counter}
                      </span>
                    )}
                  </div>
                </Link>
              </MenuItem>
            );
          })}
        </SubMenu>
      );
    });
  };

  return (
    <div className={`${className} max-w-xl mx-auto`}>
      <Sidebar
        collapsed={collapsed}
        transitionDuration={700}
        collapsedWidth={collapsedWidth}
        width={width}
        key={sidebarKey}
      >
        <Menu>
          {renderMainMenuItems(MainMenuItemsOne(resume?.progress!))}
          {renderMenuItems(MenuItemsOne(count))}
          {renderMainMenuItems(MainMenuItemsTwo(resume?.progress!))}
          {renderMenuItems(MenuItemsTwo(count))}
          {renderMainMenuItems(MainMenuItemsThree(resume?.progress!))}
          {renderMenuItems(MenuItemsThree(count))}
        </Menu>
      </Sidebar>
      <Modal
        content={t("logOutDescription")}
        title={t("logOutTitle")}
        isOpen={isSignOutModelOpen}
        closeModal={closeModal}
        logOutButton={<LogOutButton />}
      />
    </div>
  );
};

export default SidebarMenu;
