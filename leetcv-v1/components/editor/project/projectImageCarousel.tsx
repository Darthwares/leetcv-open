import CarouselList from "@components/carouselList";
import { extractImageName } from "@constants/defaults";
import { ArrowLeftIcon } from "@heroicons/react/outline";
import { resumeState } from "@state/state";
import { Project } from "data/models/Project";
import { useEffect, useState } from "react";
import { ReactImageCarouselViewer } from "react-image-carousel-viewer";
import { useRecoilState } from "recoil";

interface ProjectImageCarouselProps {
  uniqueUploadedImages: string[];
  project: Project;
}

function ProjectImageCarousel({
  uniqueUploadedImages,
  project,
}: ProjectImageCarouselProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  const [index, setIndex] = useState(0);
  const [resume, setResume] = useRecoilState(resumeState);
  const [uploadedImages, setUploadedImages] = useState<any[]>([]);
  
  useEffect(() => {
    function getProfilePicture() {
      const transformedImages = uniqueUploadedImages?.map(
        (imageUrl: string) => {
          return {
            src: imageUrl,
          };
        }
      );
      setUploadedImages(transformedImages);
    }
    getProfilePicture();
  }, [uniqueUploadedImages]);

  const handleDelete = async (index: number, image: string) => {
    const imageName = extractImageName(image);
    const newProjects = resume.projects.map((p: Project) => {
      if (p.id === project.id) {
        const uploadedImages = p.uploadedImages ?? [];
        const newUploadedImages = [
          ...uploadedImages.slice(0, index),
          ...uploadedImages.slice(index + 1),
        ];
        return { ...p, uploadedImages: newUploadedImages };
      }
      return p;
    });

    setResume({ ...resume, projects: newProjects });
    

    const filePath = `/${resume.id}/projects/${project.name}/${imageName}`;

    await fetch("/api/deleteImages/deleteFiles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        filePath,
      }),
    });
   
  };
  const imageShow = location.pathname !== "/s/resumeEditor" ? 4 : 3;
  return (
    <>
      <div
        className={`${
          location.pathname === "/s/resumeEditor" ? "max-w-lg" : "max-w-3xl"
        } flex justify-start flex-col w-full items-center py-2.5 md:py-0`}
        data-testid="projectImageCarousel"
      >
        <div className="hidden lg:block w-full">
          <CarouselList
            uniqueUploadedImages={uniqueUploadedImages}
            setIsOpen={setIsOpen}
            setIndex={setIndex}
            handleDelete={handleDelete}
            show={imageShow}
          ></CarouselList>
        </div>
        <div className="md:block hidden lg:hidden w-full">
          <CarouselList
            uniqueUploadedImages={uniqueUploadedImages}
            setIsOpen={setIsOpen}
            setIndex={setIndex}
            handleDelete={handleDelete}
            show={3}
          ></CarouselList>
        </div>
        <div className="block md:hidden w-full">
          <CarouselList
            uniqueUploadedImages={uniqueUploadedImages}
            setIsOpen={setIsOpen}
            setIndex={setIndex}
            handleDelete={handleDelete}
            show={2}
          ></CarouselList>
        </div>
        <ReactImageCarouselViewer
          open={isOpen}
          onClose={() => setIsOpen(false)}
          images={uploadedImages}
          startIndex={index}
          style={{position:"relative", top:"50%"}}
          leftArrow={
            <ArrowLeftIcon
              className="carousel-arrow carousel-left-arrow"
            />
          }
          rightArrow={
            <ArrowLeftIcon
              className="carousel-arrow carousel-right-arrow rotate-90"
            />
          }
        />
      </div>
    </>
  );
}

export default ProjectImageCarousel;
