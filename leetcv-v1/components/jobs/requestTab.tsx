import React, { useState, useCallback, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "shadcn/components/ui/table";
import { Button } from "shadcn/components/ui/button";
import { checkIsValidUrl, dummyRequests } from "@constants/defaults";
import { trpc } from "@utils/trpc";
import { useRecoilState } from "recoil";
import { userIdState } from "@state/state";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/router";
import ShowStatus from "./showStatus";
import ConfirmationModal from "./confirmationModal";

export default function RequestTab({ isProUser }: { isProUser: boolean }) {
  const [requests, setRequests] = useState(dummyRequests);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentIdToDelete, setCurrentIdToDelete] = useState<string | null>(
    null
  );
  const router = useRouter();
  const [userId] = useRecoilState(userIdState);
  const [newUrl, setNewUrl] = useState("");
  const [urlError, setUrlError] = useState<string | null>(null);
  const { data: getAllJobUrls, isLoading } = trpc.useQuery([
    "fs.aiJobListingRouter.getJobUrl",
    { id: userId },
  ]);
  const setJobUrl = trpc.useMutation(["fs.aiJobListingRouter.addJobUrl"]);
  const deleteJobUrl = trpc.useMutation(["fs.aiJobListingRouter.deleteJobUrl"]);

  useEffect(() => {
    if (getAllJobUrls && !isLoading) {
      setRequests(getAllJobUrls);
    }
  }, [getAllJobUrls, isLoading]);

  const handleDeleteClick = useCallback((id: string) => {
    setCurrentIdToDelete(id);
    setModalVisible(true);
  }, []);

  const handleConfirmDelete = useCallback(() => {
    if (currentIdToDelete !== null) {
      deleteJobUrl.mutate(
        { userId: userId!, id: currentIdToDelete },
        {
          onSuccess: () => {
            setRequests((prevRequests) =>
              prevRequests.filter((request) => request.id !== currentIdToDelete)
            );
            toast.success("Job request deleted successfully.");

            setCurrentIdToDelete(null);
            setModalVisible(false);
          },
          onError: (error) => {
            setUrlError("Error deleting job request URL!");
          },
        }
      );
    }
  }, [currentIdToDelete, deleteJobUrl, userId]);

  const handleCancelDelete = useCallback(() => {
    setCurrentIdToDelete(null);
    setModalVisible(false);
  }, []);

  const handleAddRequest = () => {
    const trimmedUrl = newUrl.trim();

    if (trimmedUrl === "") {
      setUrlError("Please add a URL.");
      return;
    }

    if (!checkIsValidUrl(trimmedUrl)) {
      setUrlError("Invalid URL format. Please enter a valid URL.");
      return;
    }

    setJobUrl.mutate(
      { id: userId!, url: trimmedUrl },
      {
        onSuccess: () => {
          setRequests((prevRequests) => [
            { id: String(Date.now()), url: trimmedUrl, status: "pending" },
            ...prevRequests,
          ]);
          toast.success("Job URL added successfully!");
          setNewUrl("");
          setUrlError(null);
        },
        onError: (error) => {
          setUrlError(error.message);
        },
      }
    );
  };

  useEffect(() => {
    import("@lottiefiles/lottie-player");
  });

  if (!isProUser) {
    return (
      <div className="flex sm:flex-row w-full flex-col max-w-5xl mx-auto items-center p-4">
        <div className="w-full">
          <h2 className="mt-4 text-xl font-semibold text-gray-700 md:text-2xl">
            Company Job Tracking Request
          </h2>
          <div className="mt-2 text-gray-500 max-w-lg">
            Upgrade to Pro to:
            <ul className="list-disc mt-2 ml-5">
              <li>Track jobs from your preferred companies.</li>
              <li>Get updates on new opportunities.</li>
              <li>Customize tracking for top companies.</li>
            </ul>
          </div>
          <button
            className="mt-4 inline-block px-6 py-2 bg-indigo-600 text-white font-medium rounded-md shadow-md hover:bg-indigo-700"
            onClick={() => router.push("/pricing")}
          >
            Upgrade to Pro
          </button>
        </div>
        <div className="h-96 w-full">
          <lottie-player
            src="/assets/lottie/request-send.json"
            background=""
            speed="1"
            loop
            autoplay
            className="bg-gradient-to-r from-indigo-100 to-pink-200"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div
        className={`${
          urlError ? "mb-2" : "mb-4"
        } flex gap-2 items-center w-full`}
      >
        <input
          type="text"
          value={newUrl}
          onChange={(e) => setNewUrl(e.target.value)}
          placeholder="Ex: https://www.vantagesecurity.com/careers"
          className={`px-2 py-1 w-full border rounded mr-2 ${
            urlError ? "border-red-500" : ""
          }`}
        />
        <Button
          onClick={handleAddRequest}
          className="px-4 py-2 bg-indigo-600 text-white whitespace-nowrap"
        >
          Add Request
        </Button>
      </div>
      {urlError && <p className="text-red-600 text-sm mb-4">{urlError}</p>}

      {isLoading ? (
        "Loading"
      ) : (
        <>
          {requests.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center p-4">
              <h2 className="mt-4 text-xl font-semibold text-gray-700 md:text-2xl">
                No requests available.
              </h2>
              <p className="mt-2 text-gray-500">
                There are no current job requests. Please check back later.
              </p>
            </div>
          ) : (
            <>
              <div className="block lg:hidden">
                {requests.map((request, index) => (
                  <div
                    key={request.id}
                    className="mb-4 p-4 border rounded shadow-sm bg-white"
                  >
                    <a
                      href={request.url}
                      target="_blank"
                      className="break-words tracking-tight cursor-pointer text-indigo-600"
                    >
                      {request.url}
                    </a>
                    <div className="flex items-center justify-between">
                      <ShowStatus status={request.status} />
                      <button
                        className="mt-4 inline-flex items-center rounded-md px-2 py-1 text-xs font-medium bg-red-600 text-white hover:bg-red-500 capitalize"
                        onClick={() => handleDeleteClick(request.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="hidden lg:block">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>#</TableHead>
                      <TableHead>URL</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {requests.map((request, index) => (
                      <TableRow key={request.id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>
                          <a
                            href={request.url}
                            target="_blank"
                            className="break-words tracking-tight cursor-pointer text-indigo-600"
                          >
                            {request.url}
                          </a>
                        </TableCell>
                        <TableCell>
                          <ShowStatus status={request.status} />
                        </TableCell>
                        <TableCell>
                          <Button
                            className={`inline-flex items-center rounded-md font-medium bg-red-600 text-white hover:bg-red-500 capitalize`}
                            onClick={() => handleDeleteClick(request.id)}
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </>
          )}
        </>
      )}

      <ConfirmationModal
        visible={modalVisible}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        title="Delete Confirmation"
        description="Are you sure you want to delete this job url?"
        confirmText="Confirm"
        cancelText="Cancel"
        showDelete={true}
      />
      <ToastContainer />
    </div>
  );
}
