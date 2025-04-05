import React, { useEffect, useRef, useState } from "react";
import { XIcon, ArrowDownIcon } from "@heroicons/react/outline";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import { Transition } from "@headlessui/react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../shadcn/components/ui/carousel";
import { ReactImageCarouselViewer } from "react-image-carousel-viewer";
import FallBackImage from "./fallBackImage";
import { Project } from "data/models/Project";
import Skills from "@components/skills";
import { DateRange } from "@components/resume/dateRange";
import { useTranslations } from "next-intl";
import { scrollTo } from "@constants/defaults";
import MarkdownWithTextColor from "@components/markdownWithTextColor";

interface ProjectModalProps {
  project: Project;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  cancelButtonRef: React.RefObject<HTMLButtonElement>;
}

const ProjectModal = ({
  project,
  setShowModal,
  cancelButtonRef,
}: Readonly<ProjectModalProps>) => {
  const [Images, setImages] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [index, setIndex] = useState<number>(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const [showDownButton, setShowDownButton] = useState<boolean>(false);
  const [showUpButton, setShowUpButton] = useState<boolean>(false);
  const t = useTranslations("Portfolio");

  useEffect(() => {
    function getProfilePicture() {
      const transformedImages =
        project.uploadedImages?.map((imageUrl: string) => ({
          src: imageUrl,
        })) || [];
      setImages(transformedImages);
    }
    getProfilePicture();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (contentRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = contentRef.current;
        setShowDownButton(scrollTop === 0 && scrollHeight !== clientHeight);
        setShowUpButton(
          scrollTop + clientHeight + 1 >= scrollHeight &&
            scrollHeight !== clientHeight
        );
      }
    };
    contentRef.current?.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => {
      contentRef.current?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <ReactImageCarouselViewer
        open={isOpen}
        onClose={() => setIsOpen(false)}
        images={Images}
        startIndex={index}
        style={{
          position: "relative",
          top: "50%",
          width: "100vw",
          height: "100vh",
        }}
        leftArrow={<ChevronLeftIcon />}
        rightArrow={<ChevronRightIcon />}
      />
      <div className="min-h-full m-3 sm:m-6 xl:m-0 xl:w-full flex items-center justify-center">
        <Transition.Child
          as="div"
          className="relative flex w-full xl:m-0 xl:max-w-6xl flex-col overflow-hidden shadow-lg rounded-lg bg-gradient-to-br from-gray-200 to-white p-7 outline-0 md:p-8 dark:bg-gradient-to-br dark:from-neutral-700 dark:to-zinc-950"
          enter="ease-out duration-300"
          enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          enterTo="opacity-100 translate-y-0 sm:scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 translate-y-0 sm:scale-100"
          leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        >
          <div className="flex shrink-0 items-center justify-between">
            <button
              type="button"
              className="neo_button shadow-neo relative -top-.5 -m-4 ml-auto rounded-full border-0 outline-0 p-2.5 z-10 transition-all duration-300 ease-in-out hover:bg-indigo-600 hover:text-white dark:bg-gradient-to-br dark:from-neutral-800 dark:to-zinc-900 dark:text-white dark:shadow-none"
              onClick={() => setShowModal(false)}
              ref={cancelButtonRef}
            >
              <span>
                <XIcon className="w-6 h-6" />
              </span>
            </button>
          </div>
          <div className="relative flex w-full flex-1 p-4">
            <div className="-mx-4 w-full grid grid-cols-1 lg:grid-cols-2 items-center">
              <div className="w-full flex h-80 lg:px-4 lg:h-full">
                {Images.length ? (
                  <Carousel className="w-full">
                    <CarouselContent
                      className="cursor-pointer"
                      onClick={() => setIsOpen(true)}
                    >
                      {Images.map((s, index) => (
                        <CarouselItem
                          key={index}
                          className="w-full h-80 lg:h-[28rem]"
                        >
                          <img
                            src={s.src}
                            alt={s.src}
                            className="rounded-xl w-full h-full"
                            onClick={() => setIndex(index)}
                          />
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="dark:text-gray-700" />
                    <CarouselNext className="dark:text-gray-700" />
                  </Carousel>
                ) : (
                  <FallBackImage className="h-full w-full rounded-xl" />
                )}
              </div>
              <div
                className="w-full lg:pl-6 lg:max-h-[28rem]  lg:overflow-y-auto "
                ref={contentRef}
              >
                <div className="mt-8 lg:h-full lg:m-0 relative z-10">
                  <div className="mb-3 break-words font-medium">
                    <div className="text-base flex justify-between text-gray-500 mb-3 dark:text-gray-300">
                      <DateRange
                        id={project.id}
                        start={project.start}
                        end={project.end}
                        checked={project.checked}
                      />
                    </div>
                    {project.url ? (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-3xl capitalize hover:text-indigo-600 dark:text-white"
                      >
                        {project.name}
                      </a>
                    ) : (
                      <p className="text-3xl capitalize dark:text-white">
                        {project.name}
                      </p>
                    )}
                  </div>
                  {project.skills && (
                    <div className="py-2 text-lg">
                      <Skills skills={project.skills} />
                    </div>
                  )}
                  {project.work ? (
                    <MarkdownWithTextColor content={project.work} />
                  ) : (
                    t("noDescription")
                  )}
                </div>
                {showDownButton && (
                  <button
                    className="hidden lg:block absolute animate-bounce bg-gray-100 bottom-0 right-0 z-50 p-2 m-2 rounded-full border border-gray-200 dark:bg-gray-700 dark:text-gray-300"
                    onClick={() => scrollTo("down", contentRef)}
                  >
                    <ArrowDownIcon className="w-4 h-4 text-[#4f46e5] dark:text-white" />
                  </button>
                )}
                {showUpButton && (
                  <button
                    className="hidden lg:block absolute animate-bounce bg-gray-100 bottom-0 right-0 z-50 p-2 m-2 rounded-full border border-gray-200 dark:bg-gray-700 dark:text-gray-300"
                    onClick={() => scrollTo("up", contentRef)}
                  >
                    <ArrowDownIcon className="w-4 h-4 text-[#4f46e5] transform rotate-180 dark:text-white" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </Transition.Child>
      </div>
    </>
  );
};

export default ProjectModal;
