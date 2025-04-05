import { useRecoilState, useSetRecoilState } from "recoil";
import {
  pageTitleState,
  projectState,
  resumeState,
  showProjectState,
  sideBarOpenState,
  userIdState,
  pendingNotificationsState,
} from "@state/state";
import { useTranslations } from "next-intl";
import { toast, ToastContainer } from "react-toastify";
import Switch from "react-switch";
import { trpc } from "@utils/trpc";
import RequestResources from "@components/resource/requestsResources";
import { useEffect, useState } from "react";
import { getColor, getCurrentPage } from "@constants/defaults";
import MomentTimeFormate from "@components/momentTimeFormate";
import ReUsableFilter from "@components/reUsableFilter";
import { RequestAttestation } from "data/models/Attestation";
import ReUsablePaginationButtons from "@components/reUsablePaginationButtons";
import ViewProjectModal from "@components/attestation/viewProjectModal";
import ImageFallBack from "@components/imageFallBack";
import { DocSearchSvg } from "@components/svg";

export default function RequestAttestations() {
  const [userId] = useRecoilState(userIdState);
  const [resume] = useRecoilState(resumeState);
  const [showProjectModal, setShowProjectModal] =
    useRecoilState(showProjectState);
  const setProjectState = useSetRecoilState(projectState);
  const t = useTranslations("Attestation");
  const setProdTitle = useSetRecoilState(pageTitleState);
  const [inComingAttestations, setInComingAttestations] = useState<
    RequestAttestation[]
  >([]);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState<number>(getCurrentPage());
  const [isSideBarClosed] = useRecoilState(sideBarOpenState);
  const setPendingNotifications = useSetRecoilState(pendingNotificationsState);
  const updateStatus = trpc.useMutation(["fs.review.updateStatus"]);

  const { data: requestsAttestation, refetch } = trpc.useQuery([
    "fs.attestation.getProspect",
    { id: userId, page: currentPage, status: selectedFilter },
  ]);

  const requester = trpc.useMutation(["fs.attestation.update"], {
    onSuccess: () => {
      setTimeout(() => {
        refetch();
      }, 500);
    },
  });

  const { data: attestationRequestsCount } = trpc.useQuery(
    ["fs.attestation.getProspectsCount", { userId }],
    {
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    if (requestsAttestation?.handle) {
      setTotalPages(requestsAttestation?.totalPages);
      setInComingAttestations(requestsAttestation?.handle);
    }
  }, [requestsAttestation?.handle, selectedFilter]);

  useEffect(() => {
    setProdTitle(t("incomingAttestation"));
  }, []);

  useEffect(() => {
    setPendingNotifications((prev) => ({
      ...prev,
      attestation: false,
    }));
    updateStatus.mutateAsync({ userId, type: "attestation" });
  }, []);

  async function handleChange(
    request: RequestAttestation,
    checkedValue: boolean
  ) {
    requester.mutateAsync(
      {
        email: request.email,
        emailList: request.emailList,
        image: request.image,
        name: request.name,
        approvalHandel: resume.handle,
        requesterId: request.requesterId,
        status: request.status === "Approved" ? "Denied" : "Approved",
        id: request.id,
        requesterEmail: request.requesterEmail,
        project: request.project,
        uid: request.uid,
      },
      {
        onSuccess: () => {
          checkedValue
            ? toast.success(t("requestApproved"))
            : toast.error(t("requestDenied"));
        },
      }
    );
  }

  return (
    <div className="w-full mt-5" data-testid="requests">
      {attestationRequestsCount !== 0 && (
        <div
          className={`flex items-center justify-end md:mb-6 ${
            inComingAttestations?.length === 0
              ? "md:justify-end"
              : "md:justify-between"
          }  w-full md:px-2`}
        >
          {inComingAttestations?.length !== 0 && (
            <p className="hidden md:block font-semibold text-lg dark:text-white text-gray-700">
              {t("incomingAttestation")}
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
      {inComingAttestations?.length === 0 && (
        <div className="py-3">
          <RequestResources
            title={t("receivedAttestationRequest")}
            message={t("receivedAttestationRequestSubText")}
            path={"/assets/lottie/security-lock.json"}
          />
        </div>
      )}

      <div
        className={`${
          inComingAttestations?.length !== 0 &&
          "min-h-[80vh] md:min-h-[70vh] flex flex-col justify-between"
        }`}
      >
        <ul
          role="list"
          className="md:mx-2 grid gap-6 md:grid-cols-2 xl:grid-cols-3"
        >
          {inComingAttestations?.map((request: RequestAttestation) => {
            let checked = request.status === "Approved";
            const bgColor = getColor(request.status);
            const url =
              request?.handle && `${location.origin}/r/${request?.handle}`;
            return (
              <li
                key={request.id}
                className="border dark:border-gray-700 rounded-lg incomingAttestCard dark:bg-gray-800/20"
              >
                <div className="w-full p-4 border-b dark:border-gray-700">
                  <h3
                    className={`font-semibold text-gray-800 dark:text-white capitalize truncate w-72 sm:w-96 md:w-64 ${
                      isSideBarClosed ? "lg:w-96 xl:w-80" : "lg:w-72 xl:w-64"
                    } projectTitle`}
                  >
                    {request.project.name}
                  </h3>
                </div>
                <div className="relative flex items-center gap-4 p-4 w-full">
                  <ImageFallBack
                    imgSrc={request.image}
                    fallBackText={request.name}
                    avatarClass="w-[6rem] h-[6rem] rounded-lg"
                    avatarImgClass="w-full h-full rounded-lg overflow-hidden border-gray-200 bg-indigo-100"
                    avatarFallbackClass="w-[6rem] h-[6rem] text-white rounded-lg text-5xl"
                  />
                  <div className="flex flex-col gap-3 w-full">
                    <div>
                      <a
                        href={url}
                        rel="noreferrer"
                        className={`text-gray-900 block font-medium hover:text-blue-600 text-base cursor-pointer reqUserName dark:text-gray-100 truncate w-40 sm:w-80 md:w-40  ${
                          isSideBarClosed
                            ? "lg:w-72 xl:w-56"
                            : "lg:w-44 xl:w-36"
                        }`}
                      >
                        {request.name}
                      </a>
                      <div className="-mt-1">
                        <MomentTimeFormate timeStamp={request.attestedAt} />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div
                        className={`${bgColor} flex justify-center font-medium items-start px-3 py-0.5 text-sm rounded-md`}
                      >
                        {request.status}
                      </div>
                      <div className="lg:absolute right-4 bottom-[18px]">
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
                <div className="flex items-center justify-end p-4 border-t dark:border-gray-700">
                  <button
                    className="flex gap-1.5 bg-gray-100 dark:bg-slate-700/70 dark:text-white items-center cursor-pointer py-1 text-sm px-2 sm:px-3 app-bar-btn rounded-md text-gray-900"
                    onClick={() => {
                      setShowProjectModal(true);
                      setProjectState(request.project);
                    }}
                  >
                    <DocSearchSvg />
                    {t("details")}
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
        {requestsAttestation?.handle.length !== 0 &&
          inComingAttestations?.length !== 0 &&
          totalPages !== 1 && (
            <ReUsablePaginationButtons
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
            />
          )}
      </div>
      <ToastContainer />
      <ViewProjectModal open={showProjectModal} setOpen={setShowProjectModal} />
    </div>
  );
}
