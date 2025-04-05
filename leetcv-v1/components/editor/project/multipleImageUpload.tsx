import { UploadButton } from "react-uploader";
import { useRecoilState } from "recoil";
import { projectImageCountState, resumeState } from "@state/state";
import { Project } from "data/models/Project";
import ProjectImageCarousel from "./projectImageCarousel";
import { LightBulbIcon } from "@heroicons/react/outline";
import { useTranslations } from "next-intl";
import { uploader } from "@constants/defaults";
import { UploadSvg } from "@components/svg";
interface ImageUploaderProps {
  project: Project;
}

const MultipleImageUploader = ({ project }: ImageUploaderProps) => {
  const [resume, setResume] = useRecoilState(resumeState);
  const [totalImage] = useRecoilState(projectImageCountState);
  const t = useTranslations("Dashboard");

  const totalUploadedImages = resume.projects.reduce(
    (count: number, p: Project) => count + (p.uploadedImages?.length ?? 0),
    0
  );
 
  const handleProjectUploads = (files: any[]) => {
    if (files.length === 0) {
      return;
    }

    const removeImageFormattingParams = (url:string) => {
      const urlObject = new URL(url);
      const formattingParams = ["w", "h", "fit", "q"];
      formattingParams.forEach((param) => urlObject.searchParams.delete(param));
      return urlObject.href;
    };

    const selectedImages = files?.map((file) =>
      removeImageFormattingParams(file.fileUrl)
    );

    const remainingImageSlots = totalImage - totalUploadedImages;
    const projectImageSlots = Math.min(
      6 - project?.uploadedImages?.length!,
      remainingImageSlots
    );
    const selectedImageSlots = Math.min(
      selectedImages.length,
      projectImageSlots
    );

    if (selectedImageSlots <= 0) {
      return;
    }

    const newUploadedImages = [
      ...project.uploadedImages!,
      ...selectedImages.slice(0, selectedImageSlots),
    ];

    const newProjects = resume.projects.map((p) => {
      if (p.id === project.id) {
        return {
          ...p,
          uploadedImages: newUploadedImages,
        };
      }
      return p;
    });

    setResume({ ...resume, projects: newProjects });
  };


  return (
    <>
      <div
        className="flex justify-start flex-col md:max-w-lg items-center w-full py-2.5 md:py-0"
        data-testid="multiple-upload"
      >
        {
          <UploadButton
            uploader={uploader}
            options={{
              multi: true,
              maxFileCount:
                totalImage - totalUploadedImages > 6
                  ? 6 - project?.uploadedImages?.length!
                  : totalImage - totalUploadedImages,
              maxFileSizeBytes: 4 * 1024 * 1024,
              mimeTypes: ["image/jpeg", "image/png", "image/webp"],
              showFinishButton: true,
              path: {
                folderPath: `/${resume.id}/projects/${project.name}`,
              },
              metadata: {
                title: `${project.name}`,
              },
            }}
            onComplete={handleProjectUploads}
          >
            {({ onClick }) => (
              <div className="w-full flex justify-start">
                {
                  <button
                    data-testid="uploadImage"
                    className={`${
                      totalUploadedImages < totalImage
                        ? "bg-indigo-600"
                        : "bg-indigo-200 cursor-not-allowed"
                    } px-3 py-1.5 space-x-2 items-center rounded-md cursor-pointer overflow-hidden duration-300 flex ease-out text-white`}
                    onClick={(e) => {
                      totalUploadedImages < totalImage && onClick(e);
                    }}
                  >
                    <span>
                      <UploadSvg className="w-5 h-5"/>
                    </span>

                    <span> {t("uploadImages")}</span>
                  </button>
                }
              </div>
            )}
          </UploadButton>
        }
      </div>
      <div
        className={`${
          project?.uploadedImages?.length === 0 && "mt-0"
        } -ml-2`}
        data-testid="projectImage"
      >
        <ProjectImageCarousel
          uniqueUploadedImages={[...new Set(project.uploadedImages)]}
          project={project}
        />
      </div>
      {totalUploadedImages <= totalImage && (
        <p
          className="text-indigo-500 text-sm inline-flex md:pt-2"
          data-testid="hints"
        >
          <span>
            <LightBulbIcon className="w-5 h-5" />
          </span>
          <span>{t("maxImagesUploadedMsg")}</span>
        </p>
      )}
    </>
  );
};

export default MultipleImageUploader;
