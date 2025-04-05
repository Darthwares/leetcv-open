import { LockClosedIcon } from "@heroicons/react/outline";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { sideBarOpenState, userIdState } from "@state/state";
import { trpc } from "@utils/trpc";
import dynamic from "next/dynamic";
import { defaultProspectsTour, getTourConfig } from "@lib/helper/tourConfig";
import { useEffect, useState } from "react";
import RequestResources from "./resource/requestsResources";
import { getCurrentPage } from "@constants/defaults";
import MomentTimeFormate from "./momentTimeFormate";
import ReUsableFilter from "./reUsableFilter";
import { Prospect } from "data/models/Prospect";
import ReUsablePaginationButtons from "./reUsablePaginationButtons";
import { useSession } from "next-auth/react";
import ImageFallBack from "./imageFallBack";

const Stepper = dynamic(() => import("./onboarding"), {
  ssr: false,
});

function OutgoingRequest() {
  const { status } = useSession();
  const [userId] = useRecoilState(userIdState);
  const t = useTranslations("OutgoingRequest");
  const [outGoingReq, setOutGoingReq] = useState<Prospect[]>([]);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(getCurrentPage());
  const [totalPages, setTotalPages] = useState(0);
  const [isSideBarClosed] = useRecoilState(sideBarOpenState);
  const youTubeVideoSrc =
    "https://www.youtube.com/embed/MgrxDGxe2YI?si=vxMjPJuD_31FwLIU?autoplay=1&mute=1";

  const { data: prospects } = trpc.useQuery([
    "fs.prospects.getAll",
    { id: userId, page: currentPage, status: selectedFilter },
  ]);

  const { data: prospectCount } = trpc.useQuery(
    ["fs.prospects.getCount", { id: userId }],
    {
      enabled: status === "authenticated" && !!userId,
      refetchOnWindowFocus: false,
    }
  );

  const router = useRouter();
  const tour = getTourConfig();

  const step = [
    {
      target: ".prospectCard",
      content: t("checkRequest"),
    },
    {
      target: ".visitProfile",
      content: t("clickCard"),
    },
    {
      target: ".passcode",
      content: t("visitViaPasscode"),
    },
    {
      target: ".status",
      content: t("visitViaClick"),
    },
  ];

  useEffect(() => {
    if (prospects?.handle) {
      defaultProspectsTour();
      setTotalPages(prospects?.totalPages);
      setOutGoingReq(prospects?.handle);
    }
  }, [prospects?.handle, selectedFilter]);

  return (
    <div data-testid="outgoingRequest">
      <div className="w-full relative mt-6">
        {prospectCount !== 0 && (
          <div
            className={`flex items-center justify-end md:mb-6 ${
              outGoingReq?.length === 0
                ? "md:justify-end"
                : "md:justify-between"
            }  w-full md:px-2`}
          >
            {outGoingReq?.length !== 0 && (
              <p className="hidden md:block font-semibold text-lg dark:text-white text-gray-700">
                {t("outGoingReq")}
              </p>
            )}
            <div className="mb-4 md:mb-0">
              <ReUsableFilter
                selectedFilter={selectedFilter}
                setSelectedFilter={setSelectedFilter}
                setCurrentPage={setCurrentPage}
              />
            </div>
          </div>
        )}
        {outGoingReq?.length === 0 && (
          <div className="py-6 md:py-4">
            <RequestResources
              title={t("sendRequests")}
              message={t("sendRequestsSubText")}
              path={
                prospectCount !== 0 ? "/assets/lottie/outgoing.json" : undefined
              }
              videoSrc={prospectCount === 0 ? youTubeVideoSrc : undefined}
              VideoTitle="LeetCV's Search and Request Feature!"
            />
          </div>
        )}
      </div>
      <div className="hidden md:block">
        {outGoingReq?.length !== 0 && tour.prospectsTour == "false" && (
          <Stepper tourConfig={step} />
        )}
      </div>

      <div
        className={`${
          outGoingReq?.length !== 0 &&
          "min-h-[65vh] md:min-h-[60vh] flex flex-col justify-between"
        }`}
      >
        <ul
          role="list"
          className="md:mx-2 grid gap-6 md:grid-cols-2 xl:grid-cols-3"
          data-testid="hasProspects"
        >
          {outGoingReq?.map((prospect: Prospect) => {
            const urlWithPassCode = `${window.location.origin}/r/${prospect.handle}?passcode=${prospect.passCode}`;
            const url =
              prospect.status === "Approved"
                ? urlWithPassCode
                : `${location.origin}/r/${prospect?.handle}`;
            return (
              <li
                data-testid={`prospect-${prospect.id}`}
                key={prospect.id}
                className={`prospectCard relative outGoingReqCard divide-gray-200 dark:bg-gray-800/20 dark:border-gray-700 rounded-lg bg-white border hover:bg-gray-50
            ${prospect.status === "Approved" && "cursor-pointer"}
            `}
                onClick={() => {
                  prospect.status === "Approved" &&
                    router.push(urlWithPassCode);
                }}
              >
                <div className="flex w-full items-center gap-4 p-4">
                  <ImageFallBack
                    imgSrc={prospect.image}
                    fallBackText={prospect.name}
                    avatarClass="w-[5.5rem] h-[5.5rem] rounded-lg"
                    avatarImgClass="w-full h-full rounded-lg overflow-hidden border-gray-200 bg-indigo-100"
                    avatarFallbackClass="w-[5.5rem] h-[5.5rem] text-white rounded-lg text-5xl"
                  />
                  <div className="flex flex-col w-full gap-3">
                    <div>
                      <a
                        href={url}
                        rel="noreferrer"
                        className={`text-gray-900 block dark:text-white hover:text-blue-600 text-base visitProfile cursor-pointer reqUserName capitalize truncate font-medium w-40 sm:w-96 md:w-40 ${
                          isSideBarClosed
                            ? "lg:w-72 xl:w-52"
                            : "lg:w-44 xl:w-40"
                        }`}
                      >
                        {prospect.name}
                      </a>
                      <div className="-mt-1">
                        <MomentTimeFormate timeStamp={prospect.prospectAt} />
                      </div>
                    </div>
                    <div className="flex items-center justify-between w-full">
                      <p
                        className={`${
                          prospect.status === "Approved" &&
                          "bg-green-100 text-green-800"
                        }
                  ${prospect.status === "Denied" && "bg-red-100 text-red-800"}
                  ${
                    prospect.status === "Pending" &&
                    "bg-yellow-100 text-yellow-800"
                  } flex justify-center font-medium items-start px-2 lg:px-3 py-0.5 text-sm rounded-md`}
                      >
                        {prospect.status}
                      </p>
                      {prospect.status === "Approved" && (
                        <div className="truncate lg:absolute right-4 bottom-5 text-sm font-medium rounded-md px-2 py-0.5 bg-gray-100 text-gray-500 flex gap-1 items-center passcode max-w-fit">
                          <LockClosedIcon className="w-5" />
                          <span className="relative top-[1.5px]">
                            {prospect.passCode}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
        {prospects?.handle.length !== 0 &&
          outGoingReq?.length !== 0 &&
          totalPages !== 1 && (
            <ReUsablePaginationButtons
              totalPages={totalPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          )}
      </div>
    </div>
  );
}

export default OutgoingRequest;
