import { cn } from "@lib/utils";
import { useRef, useState } from "react";
import ProjectModal from "@components/portfolio/projectmodal";
import Modal from "@components/portfolio/modal";
import { Project } from "data/models/Project";
import FallBackImage from "@components/portfolio/fallBackImage";
import markdownToTxt from "markdown-to-txt";
export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[20rem] grid-cols-1 md:grid-cols-3 gap-8 md:gap-5 lg:gap-8 max-w-7xl mx-auto ",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  index,
  className,
  project,
}: {
  index: number;
  className?: string;
  project: Project;
}) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const cancelButtonRef = useRef<HTMLButtonElement | null>(null);

  return (
    <div
      className={cn(
        `row-span-1 h-80 rounded-xl group/bento hover:shadow-xl shadow-indigo-200 transition duration-200 shadow-sm dark:shadow-none p-4 dark:bg-black dark:border-white/[0.2] bg-white border border-transparent flex flex-col ${
          index !== 0 &&
          index % 3 === 0 &&
          "md:grid md:grid-cols-2 md:items-center py-4 gap-2"
        }`,
        className
      )}
    >
      <div
        className={`w-full min-h-[6rem] max-h-40  ${
          index !== 0 &&
          index % 3 === 0 &&
          " md:max-h-none cursor-pointer md:h-full"
        }`}
        onClick={() => setShowModal(true)}
      >
        {project.uploadedImages?.length! > 0 ? (
          <img
            src={project.uploadedImages![0]}
            className="object-cover rounded-xl h-full w-full"
            alt={project.name}
          />
        ) : (
          <FallBackImage className="h-full w-full rounded-xl cursor-pointer" />
        )}
      </div>
      <div
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            setShowModal(true);
          }
        }}
        onClick={() => setShowModal(true)}
        className="cursor-pointer"
      >
        <div
          className={`${
            project.work?.startsWith("-") && "pl-2"
          } capitalize font-sans font-bold text-indigo-600 lg:text-neutral-600 dark:text-neutral-200 mb-2 mt-2 line-clamp-1`}
        >
          {project.name}
        </div>
        <div
          className={`font-sans font-normal text-neutral-600 dark:text-neutral-300 line-clamp-4 ${
            index !== 0 && index % 3 === 0 && "md:line-clamp-[8]"
          } `}
        >
          {project.work && markdownToTxt(project.work)}
        </div>
      </div>
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        cancelButtonRef={cancelButtonRef}
        className="bg-gray-50"
      >
        <ProjectModal
          project={project}
          setShowModal={setShowModal}
          cancelButtonRef={cancelButtonRef}
        />
      </Modal>
    </div>
  );
};
