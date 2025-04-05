import { useRecoilState, useSetRecoilState } from "recoil";
import {
  sideBarOpenState,
  userIdState,
  pendingNotificationsState,
} from "@state/state";
import { useTranslations } from "next-intl";
import { toast, ToastContainer } from "react-toastify";
import { Request } from "data/models/Request";
import { trpc } from "../utils/trpc";
import RequestResources from "./resource/requestsResources";
import dynamic from "next/dynamic";
import { defaultRequestsTour, getTourConfig } from "@lib/helper/tourConfig";
import { useEffect, useState } from "react";
import { getColor, getCurrentPage } from "@constants/defaults";
import MomentTimeFormate from "./momentTimeFormate";
import Switch from "react-switch";
import ReUsableFilter from "./reUsableFilter";
import ReUsablePaginationButtons from "./reUsablePaginationButtons";
import ImageFallBack from "./imageFallBack";

const Stepper = dynamic(() => import("./onboarding"), {
  ssr: false,
});

export default function IncomingRequest() {
  const [userId] = useRecoilState(userIdState);
  const t = useTranslations("Request");
  const [inComingReq, setInComingReq] = useState<Request[]>([]);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(getCurrentPage());
  const [totalPages, setTotalPages] = useState(0);
  const [isSideBarClosed] = useRecoilState(sideBarOpenState);
  const updateStatus = trpc.useMutation(["fs.review.updateStatus"]);
  const setPendingNotifications = useSetRecoilState(pendingNotificationsState);

  const { data: requests, refetch } = trpc.useQuery([
    "fs.request.getAll",
    { userId, page: currentPage, status: selectedFilter },
  ]);

  const { data: requestsCount } = trpc.useQuery(
    ["fs.request.getCount", { userId }],
    {
      refetchOnWindowFocus: false,
    }
  );

  const setStatus = trpc.useMutation(["fs.request.setStatus"], {
    onSuccess: () => {
      refetch();
    },
  });

  const sendApprovalNotification = trpc.useMutation([
    "fs.notification.sendApprovalNotification",
  ]);

  useEffect(() => {
    if (requests?.handle) {
      defaultRequestsTour();
      setTotalPages(requests?.totalPages);
      setInComingReq(requests?.handle);
    }
  }, [requests?.handle, selectedFilter]);

  useEffect(() => {
    setPendingNotifications((prev) => ({
      ...prev,
      request: false,
    }));
    updateStatus.mutateAsync({ userId, type: "request" });
  }, []);

  const tour = getTourConfig();

  const step = [
    {
      target: ".requestCard",
      content: t("requestReceived"),
    },
    {
      target: ".approveOrDeny",
      content: t("requestButtons"),
    },
  ];

  async function handleChange(request: Request, checkedValue: boolean) {
    setStatus.mutate({
      requestId: request.id,
      userId: userId,
      status: request.status === "Approved" ? "Denied" : "Approved",
    });
    checkedValue
      ? toast.success(t("requestApproved"))
      : toast.error(t("requestDenied"));

    if (checkedValue) {
      sendApprovalNotification.mutate({
        handle: request.requesterHandle!,
        userId,
      });
    }
  }

  return (
    <div className="w-full mt-6">
      {requestsCount !== 0 && (
        <div
          className={`flex items-center justify-end md:mb-6 ${
            inComingReq?.length === 0 ? "md:justify-end" : "md:justify-between"
          }  w-full md:px-2`}
        >
          {inComingReq?.length !== 0 && (
            <p className="hidden md:block font-semibold text-lg dark:text-white text-gray-700">
              {t("inComingReq")}
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
      {inComingReq?.length === 0 && (
        <div className="py-3">
          <RequestResources
            title={t("receiveRequests")}
            message={t("receiveRequestsSubText")}
            path={"/assets/lottie/security-lock.json"}
          />
        </div>
      )}
      <div className="hidden md:block" data-testid="requests">
        {tour.requestsTour === "false" && <Stepper tourConfig={step} />}
      </div>
      <div
        data-testid="requests"
        className={`${
          inComingReq?.length !== 0 &&
          "min-h-[65vh] md:min-h-[60vh] flex flex-col justify-between"
        }`}
      >
        <ul
          role="list"
          className="md:mx-2 grid gap-6 md:grid-cols-2 xl:grid-cols-3"
        >
          {inComingReq?.map((request) => {
            let checked = request.status === "Approved";
            const bgColor = getColor(request?.status);
            const url =
              request?.requesterHandle &&
              `${location.origin}/r/${request?.requesterHandle}`;
            return (
              <li
                key={request?.id}
                data-testid={`request-${request?.id}`}
                className="border rounded-lg relative incomingReqCard dark:bg-gray-800/20 dark:border-gray-700"
              >
                <div className="flex items-center gap-4 p-4 w-full">
                  <ImageFallBack
                    imgSrc={request.image}
                    fallBackText={request.name}
                    avatarClass="w-[5.5rem] h-[5.5rem] rounded-lg"
                    avatarImgClass="w-full h-full rounded-lg overflow-hidden border-gray-200 bg-indigo-100"
                    avatarFallbackClass="w-[5.5rem] h-[5.5rem] text-white rounded-lg text-5xl"
                  />
                  <div className="flex flex-col gap-3 w-full">
                    <div>
                      <a
                        href={url}
                        rel="noreferrer"
                        className={`text-gray-900 dark:text-white block font-medium hover:text-blue-600 text-base cursor-pointer truncate reqUserName w-40 sm:w-96 md:w-40 ${
                          isSideBarClosed
                            ? "lg:w-72 xl:w-56"
                            : "lg:w-48 xl:w-40"
                        }`}
                      >
                        {request?.name}
                      </a>
                      <div className="-mt-1">
                        <MomentTimeFormate timeStamp={request.requestAt} />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div
                        className={`${bgColor} flex justify-center font-medium items-start px-3 py-0.5 text-sm rounded-md`}
                      >
                        {request.status}
                      </div>
                      <div className="xl:absolute right-4 bottom-4">
                        <Switch
                          onChange={async (e) => {
                            checked = !checked;
                            await handleChange(request, e);
                          }}
                          checked={checked}
                          height={20}
                          width={40}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
        {requests?.handle.length !== 0 &&
          inComingReq?.length !== 0 &&
          totalPages !== 1 && (
            <ReUsablePaginationButtons
              totalPages={totalPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          )}
      </div>
      <ToastContainer />
    </div>
  );
}
