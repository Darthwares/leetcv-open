import { UploadButton } from "react-uploader";
import { useRecoilState } from "recoil";
import { resumeState } from "@state/state";
import { extractImageName, uploader } from "@constants/defaults";
import { useTranslations } from "next-intl";
import { ToastContainer, toast } from "react-toastify";
import HideImageAndQrCode from "@components/hideImageAndQrCode";
import { TrashIcon } from "@heroicons/react/solid";
import DeleteModal from "@components/deleteModal";
import { useState } from "react";
import ImageFallBack from "@components/imageFallBack";

const AvatarUploader = () => {
  const [resume, setResume] = useRecoilState(resumeState);
  const t = useTranslations("Dashboard");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const imageName = extractImageName(resume.image!);
  const filePath = `/${resume.id}/avatar/${imageName}`;

  const deleteImage = async () => {
    try {
      if (!filePath) {
        console.error("filePath is undefined");
        return;
      }

      await fetch("/api/deleteImages/deleteFiles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          filePath,
        }),
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = () => {
    setResume({ ...resume, image: resume.displayName });
    deleteImage();
    toast.success(t("profileDeleteToastMsg"));
  };

  return (
    <div className="space-y-3">
      <div className="flex justify-between md:max-w-lg items-center w-full py-2.5 md:py-0">
        <div className="flex items-center gap-4">
          <ImageFallBack
            imgSrc={resume.image!}
            fallBackText={resume.displayName}
            avatarClass="h-14 w-14 rounded-full transition-all duration-200 hover:scale-150"
            avatarImgClass="w-full h-full rounded-lg overflow-hidden border-gray-200 bg-indigo-100"
            avatarFallbackClass="h-14 w-14 rounded-full text-white text-3xl"
          />
          {resume.image !== resume.displayName && (
            <>
              <div className="group relative flex justify-center">
                <button
                  onClick={() => setIsDeleteModalOpen(true)}
                  className="bg-red-100 hover:bg-red-200 group transition-all duration-200 rounded-full p-1.5"
                >
                  <TrashIcon className="w-5 h-5 text-red-500 group-hover:text-red-600" />
                </button>
                <span className="absolute bottom-10 scale-0 transition-all rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100">
                  {t("delete")}
                </span>
              </div>
              <DeleteModal
                title={t("deleteConfirmation")}
                handleDelete={() => handleDelete()}
                open={isDeleteModalOpen}
                setOpen={setIsDeleteModalOpen}
                deleteProfileMsg={t("deleteProfileMsg")}
              />
            </>
          )}
        </div>
        { !resume.hiddenImage && (
          <div>
            <UploadButton
              uploader={uploader}
              options={{
                multi: false,
                maxFileCount: 1,
                maxFileSizeBytes: 1024 ** 2,
                mimeTypes: ["image/jpeg", "image/png", "image/webp"],
                path: {
                  folderPath: `/${resume.id}/avatar`,
                },
                editor: {
                  images: {
                    cropShape: "circ",
                  },
                },
              }}
              onComplete={async (files) => {
                const avatarUrl = files.map((x) => x.fileUrl);
                if (files.length > 0) {
                  setResume({
                    ...resume,
                    image: avatarUrl[files.length - 1],
                  });
                  toast.success(t("uploadedImage"));
                  try {
                    await deleteImage();
                  } catch (error) {
                    console.error(error);
                  }
                }
              }}
            >
              {({ onClick }) => (
                <button
                  className="px-4 py-1.5 bg-indigo-600 items-center rounded-md cursor-pointer overflow-hidden duration-300 ease-out text-white"
                  onClick={onClick}
                >
                  {t("uploadAvatar")}
                </button>
              )}
            </UploadButton>
          </div>
        )}

        <ToastContainer />
      </div>
      <div className="relative space-y-1 items-start">
        <HideImageAndQrCode />
      </div>
    </div>
  );
};

export default AvatarUploader;
