import { ToastContainer } from "react-toastify";
import { trpc } from "utils/trpc";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useTranslations } from "next-intl";
import {
  pageTitleState,
  projectState,
  showProjectState,
  sideBarOpenState,
  userIdState,
} from "@state/state";
import RequestResources from "@components/resource/requestsResources";
import { getColor, getCurrentPage } from "@constants/defaults";
import { useEffect, useState } from "react";
import MomentTimeFormate from "@components/momentTimeFormate";
import ReUsableFilter from "@components/reUsableFilter";
import { RequestAttestation } from "data/models/Attestation";
import ReUsablePaginationButtons from "@components/reUsablePaginationButtons";
import ViewProjectModal from "@components/attestation/viewProjectModal";
import ImageFallBack from "@components/imageFallBack";
import { DocSearchSvg } from "@components/svg";

export default function ProspectAttestation() {
  const [userId] = useRecoilState(userIdState);
  const setProjectState = useSetRecoilState(projectState);
  const t = useTranslations("Attestation");
  const [showProjectModal, setShowProjectModal] =
    useRecoilState(showProjectState);
  const setProdTitle = useSetRecoilState(pageTitleState);
  const [outGoingAttestations, setOutGoingAttestations] = useState<
    RequestAttestation[]
  >([]);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState<number>(getCurrentPage());
  const [isSideBarClosed] = useRecoilState(sideBarOpenState);
  const youTubeVideoSrc =
    "https://www.youtube.com/embed/veOYfdDoUMA?si=dsJKVUuEpnrfOGjt?autoplay=1&mute=1";

  const { data: prospectAttestation } = trpc.useQuery([
    "fs.attestation.getRequests",
    {
      id: userId,
      page: currentPage,
      status: selectedFilter,
    },
  ]);

  const { data: attestationProspectCount } = trpc.useQuery(
    ["fs.attestation.getRequestsCount", { userId }],
    {
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    if (prospectAttestation?.handle) {
      setTotalPages(prospectAttestation?.totalPages);
      setOutGoingAttestations(prospectAttestation?.handle);
    }
  }, [prospectAttestation?.handle, selectedFilter]);

  useEffect(() => {
    setProdTitle(t("attestationTitle"));
  }, []);

  return (
    <div className="w-full relative mt-6">
      {attestationProspectCount !== 0 && (
        <div
          className={`flex items-center justify-end md:mb-6 ${
            outGoingAttestations?.length === 0
              ? "md:justify-end"
              : "md:justify-between"
          }  w-full md:px-2`}
        >
          {outGoingAttestations?.length !== 0 && (
            <p className="hidden md:block dark:text-white font-semibold text-lg text-gray-700">
              {t("outGoingAttest")}
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
      {outGoingAttestations?.length === 0 && (
        <div className="py-6 md:py-4">
          <RequestResources
            title={t("sendRequestAttestation")}
            message={t("sendRequestAttestationSubText")}
            path={
              attestationProspectCount !== 0
                ? "/assets/lottie/outgoing.json"
                : undefined
            }
            videoSrc={
              attestationProspectCount === 0 ? youTubeVideoSrc : undefined
            }
            VideoTitle="LeetCV's Project Attestation Feature!"
          />
        </div>
      )}
      <div
        className={`${
          outGoingAttestations?.length !== 0 &&
          "min-h-[65vh] md:min-h-[60vh] flex flex-col justify-between"
        }`}
      >
        <ul
          role="list"
          className={`md:mx-2 grid gap-6 md:grid-cols-2 ${
            isSideBarClosed
              ? "xl:grid-cols-3"
              : "xl:grid-cols-2 prospect-attestation-grid"
          }`}
        >
          {outGoingAttestations?.map((prospect: RequestAttestation) => {
            const bgColor = getColor(prospect.status);
            const url =
              prospect?.approvalHandle &&
              `${location.origin}/r/${prospect?.approvalHandle}`;
            return (
              <li
                key={prospect.id}
                className="border rounded-lg relative outGoingAttestCard dark:bg-gray-800/20 dark:border-gray-700"
              >
                <div className="w-full p-4 border-b">
                  <h3
                    className={`font-semibold dark:text-white text-gray-800 capitalize truncate ${
                      isSideBarClosed ? "lg:w-80" : "lg:w-64 xl:w-96"
                    } w-72 sm:w-96 md:w-64 projectTitle`}
                  >
                    {prospect.project.name}
                  </h3>
                </div>
                <div className="flex items-center gap-4 p-4 w-full">
                  <ImageFallBack
                    imgSrc={prospect.requesterImage}
                    fallBackText={prospect.requesterName}
                    avatarClass="w-[6rem] h-[6rem] rounded-lg"
                    avatarImgClass="w-full h-full rounded-lg overflow-hidden border-gray-200 bg-indigo-100"
                    avatarFallbackClass="w-[6rem] h-[6rem] text-white rounded-lg text-5xl"
                  />
                  <div className="flex flex-col gap-3 w-full">
                    <div>
                      <a
                        href={url}
                        rel="noreferrer"
                        className={`text-gray-900 dark:text-gray-100 block font-medium hover:text-blue-600 text-base cursor-pointer reqUserName truncate w-44 sm:w-80 md:w-40 ${
                          isSideBarClosed
                            ? "lg:w-72 xl:w-56"
                            : "lg:w-44 xl:w-72"
                        }`}
                      >
                        {prospect.requesterName}
                      </a>
                      <div className="-mt-1">
                        <MomentTimeFormate timeStamp={prospect.attestedAt} />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div
                        className={`${bgColor} flex justify-center font-medium items-start px-3 py-0.5 text-sm rounded-md`}
                      >
                        {prospect.status}
                      </div>
                      <button
                        className="lg:absolute right-2.5 bottom-5 flex gap-1.5 items-center cursor-pointer py-1 text-sm px-2 sm:px-3 lg:px-2 xl:px-3 app-bar-btn bg-gray-100 dark:bg-slate-700/70 dark:text-white  text-gray-900 rounded-md"
                        onClick={() => {
                          setShowProjectModal(true);
                          setProjectState(prospect.project);
                        }}
                      >
                        <DocSearchSvg />
                        {t("details")}
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
        {prospectAttestation?.handle.length !== 0 &&
          outGoingAttestations?.length !== 0 &&
          totalPages !== 1 && (
            <ReUsablePaginationButtons
              totalPages={totalPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          )}
      </div>
      <ToastContainer />
      <ViewProjectModal open={showProjectModal} setOpen={setShowProjectModal} />
    </div>
  );
}
