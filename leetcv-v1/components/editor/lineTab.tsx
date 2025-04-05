import { useEffect, useState } from "react";
import Link from "next/link";
import { trpc } from "@utils/trpc";
import { useRecoilState } from "recoil";
import { useRemoteConfig } from "@lib/remoteConfig/useRemoteConfig";
import { useRouter } from "next/router";
import { resumeState, userIdState } from "@state/state";
import SubMenu from "@components/subMenu";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  CogIcon,
  UserGroupIcon,
  ChatAlt2Icon,
  UsersIcon,
} from "@heroicons/react/outline";
import {
  AI_RESUME,
  ATTESTATION,
  ATTESTATIONS,
  CONNECT_FOLLOWING,
  CONNECT_FOLLOWERS,
  CONVERT_RESUME,
  COVERT_LETTER,
  DASHBOARD,
  EDITOR,
  INCOMING_ATTESTATION,
  INCOMING_REQUEST,
  OUTGOING_ATTESTATION,
  OUTGOING_REQUEST,
  REQUESTS,
  RESUME_IDEAS,
  REVIEWS,
  SETTINGS,
  CONNECTS,
  MORE,
  GET_MESSAGEs,
  COLLEAGUES,
} from "@constants/defaults";
import { ReviewsSvg } from "@components/svg";

export default function LineTab() {
  const [userId] = useRecoilState(userIdState);
  const [resume] = useRecoilState(resumeState);
  const flags = useRemoteConfig();

  const { data: attestationRequests } = trpc.useQuery(
    ["fs.attestation.getProspectsCount", { userId }],
    {
      enabled: !!userId,
      refetchOnWindowFocus: false,
    }
  );

  const { data: findColleagues } = trpc.useQuery(
    ["fs.dashboard.getColleagues", { userId: resume.id }],
    {
      refetchOnWindowFocus: false,
    }
  );

  const { data: attestationProspect } = trpc.useQuery(
    ["fs.attestation.getRequestsCount", { userId }],
    {
      refetchOnWindowFocus: false,
    }
  );

  const { data: requestsCount } = trpc.useQuery(
    ["fs.request.getCount", { userId }],
    {
      refetchOnWindowFocus: false,
    }
  );

  const { data: prospectCount } = trpc.useQuery(
    ["fs.prospects.getCount", { id: userId }],
    {
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

  const [tabs, setTabs] = useState([
    {
      name: DASHBOARD,
      href: "/s/dashboard",
      current: true,
      hidden: false,
      subMenu: [],
    },
    {
      name: AI_RESUME,
      current: false,
      hidden: false,
      href: "/s/aiResume",
      subMenu: [],
    },
    {
      name: CONVERT_RESUME,
      current: false,
      href: "/s/convert",
      subMenu: [],
      hidden: false,
    },
    {
      name: EDITOR,
      href: "/s/resumeEditor",
      current: false,
      hidden: false,
      subMenu: [],
    },
    {
      name: COVERT_LETTER,
      current: false,
      href: "/s/coverLetter",
      subMenu: [],
      hidden: false,
    },
    {
      name: RESUME_IDEAS,
      current: false,
      href: "/s/resumeIdeas",
      subMenu: [],
      hidden: false,
    },
    {
      name: REQUESTS,
      href: "",
      current: false,
      hidden: false,
      subMenu: [
        {
          label: INCOMING_REQUEST,
          icon: ArrowDownIcon,
          href: "/s/requests",
          count: requestsCount,
        },
        {
          label: OUTGOING_REQUEST,
          icon: ArrowUpIcon,
          href: "/s/prospects",
          count: prospectCount,
        },
      ],
    },
    {
      name: ATTESTATION,
      href: "",
      current: false,
      hidden: false,
      subMenu: [
        {
          label: INCOMING_ATTESTATION,
          icon: ArrowDownIcon,
          href: "/s/requestAttestation",
          count: attestationRequests!,
        },
        {
          label: OUTGOING_ATTESTATION,
          icon: ArrowUpIcon,
          href: "/s/prospectAttestation",
          count: attestationProspect!,
        },
      ],
    },
    {
      name: CONNECTS,
      href: "",
      current: false,
      hidden: false,
      subMenu: [
        {
          label: CONNECT_FOLLOWERS,
          icon: UserGroupIcon,
          href: "/s/followers",
          count: followers?.count!,
        },
        {
          label: CONNECT_FOLLOWING,
          icon: UserGroupIcon,
          href: "/s/following",
          count: following?.count!,
        },
        {
          label: COLLEAGUES,
          icon: UsersIcon,
          href: "/s/colleagues",
          count: findColleagues?.count!,
        },
      ],
    },
    {
      name: MORE,
      href: "",
      current: false,
      hidden: false,
      subMenu: [
        {
          label: GET_MESSAGEs,
          icon: ChatAlt2Icon,
          href: "/s/messages",
        },
        {
          label: REVIEWS,
          icon: ReviewsSvg,
          href: "/s/reviews",
        },
        {
          label: SETTINGS,
          icon: CogIcon,
          href: "/s/settings/privacy",
        },
      ],
    },
  ]);
  const router = useRouter();

  useEffect(() => {
    setTabs((prevTabs) =>
      prevTabs.map((tab) => {
        if (tab.name === REQUESTS) {
          return {
            ...tab,
            subMenu: [
              {
                ...tab.subMenu[0],
                count: requestsCount,
              },
              {
                ...tab.subMenu[1],
                count: prospectCount,
              },
            ],
          };
        } else if (tab.name === ATTESTATION) {
          return {
            ...tab,
            subMenu: [
              {
                ...tab.subMenu[0],
                count: attestationRequests,
              },
              {
                ...tab.subMenu[1],
                count: attestationProspect,
              },
            ],
          };
        } else if (tab.name === CONNECTS) {
          return {
            ...tab,
            subMenu: [
              {
                ...tab.subMenu[0],
                count: followers?.count!,
              },
              {
                ...tab.subMenu[1],
                count: following?.count!,
              },
              {
                ...tab.subMenu[2],
                count: findColleagues?.count!,
              },
            ],
          };
        }
        return { ...tab, current: tab.href === router.pathname };
      })
    );
  }, [
    requestsCount,
    prospectCount,
    attestationRequests,
    attestationProspect,
    followers?.count,
    following?.count,
    flags.reviewState,
  ]);

  return (
    <div
      className="flex flex-col items-center justify-center print:hidden"
      data-testid="lineTab"
    >
      <div className="hidden lg:block w-full">
        <div className="flex gap-8 -ml-2 xl:ml-1">
          <nav className="-mb-px flex space-x-3 xl:space-x-8" aria-label="Tabs">
            {tabs.map((tab) => {
              return (
                <Link
                  key={tab.name}
                  href={tab.href}
                  aria-current={tab.current ? "page" : undefined}
                >
                  <div
                    className={`${
                      tab.current && tab.name !== REQUESTS
                        ? "border-indigo-500 text-indigo-600"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    } whitespace-nowrap flex py-4 px-1 border-b-2 font-medium text-sm cursor-pointer`}
                  >
                    <div className="flex">
                      {tab.name !== REQUESTS &&
                        tab.name !== ATTESTATION &&
                        tab.name !== CONNECTS &&
                        tab.name !== MORE &&
                        tab.name}
                      {resume?.progress! < 100 &&
                        (tab.name === AI_RESUME ||
                          tab.name === CONVERT_RESUME ||
                          tab.name === EDITOR) && (
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                          </span>
                        )}
                    </div>

                    {tab.name === REQUESTS && (
                      <SubMenu menuName={REQUESTS} subMenuItems={tab.subMenu} />
                    )}
                    {tab.name === ATTESTATION && (
                      <SubMenu
                        menuName={ATTESTATIONS}
                        subMenuItems={tab.subMenu}
                      />
                    )}
                    {tab.name === CONNECTS && (
                      <SubMenu menuName={CONNECTS} subMenuItems={tab.subMenu} />
                    )}
                    {tab.name === MORE && (
                      <SubMenu menuName={MORE} subMenuItems={tab.subMenu} />
                    )}
                  </div>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
}
