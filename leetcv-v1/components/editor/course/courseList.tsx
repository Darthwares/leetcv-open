import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon, TrashIcon } from "@heroicons/react/outline";
import { openLastCourseState, resumeState } from "@state/state";
import { Course } from "data/models/Course";
import { useTranslations } from "next-intl";
import { useCallback, useState } from "react";
import { useRecoilState } from "recoil";
import SvgDragIcon from "../svgDragIcon";
import CourseForm from "./courseForm";
import DeleteModal from "@components/deleteModal";
import { toast } from "react-toastify";

interface AwardListProps {
  course: Course;
  id: number;
}
export default function CourseList({ course, id }: AwardListProps) {
  const t = useTranslations("Dashboard");
  const [resume, setResume] = useRecoilState(resumeState);
  const [openLastCourse] = useRecoilState(openLastCourseState);
  const [openCourseModel, setOpenCourseModel] = useState(false);

  const handleDelete = useCallback(() => {
    const newList = resume?.courses?.filter((item: Course) => {
      if (item.id != resume?.courses?.[id]["id"]) {
        return item;
      }
    });
    toast.success(t("courseDeleteToastMsg"));
    if (resume) {
      setResume({
        ...resume,
        courses: newList,
      });
    }
  }, [resume?.courses, resume]);
  return (
    <Disclosure key={course.id} defaultOpen={openLastCourse}>
      {({ open }: { open: boolean }) => (
        <div data-testid={`accordion-${id}`}>
          <Disclosure.Button className="dialog mb-[6px]">
            <span
              data-testid={`course-title-${id}`}
              className="px-5 flex space-x-2"
              title={t("courseTitle")}
            >
              <span className="drag-icon pt-0.5 md:pt-0">
                <SvgDragIcon />
              </span>
              <span>{course.name}</span>
            </span>
            <span>
              <ChevronUpIcon
                className={`${open ? "rotate-180 transform" : ""} chero-Icon2`}
                strokeWidth="3"
              />
            </span>
          </Disclosure.Button>
          <Disclosure.Panel className="w-full pb-2 text-sm rounded-b mb-7">
            <CourseForm course={course} />
            <button
              className="app-bar-btn flex text-red-500 md:gap-2 text-sm py-2 mx-auto mt-4"
              data-testid={`deleteBtn-${id}`}
              role="button"
              onClick={() => {
                setOpenCourseModel(true);
              }}
            >
              <TrashIcon
                className={`trash-icon`}
                data-testid={`deleteIcon-${id}`}
              />
              <span className="hidden md:block">{t("delete")}</span>
            </button>
            <DeleteModal
              title={course.name}
              handleDelete={() => handleDelete()}
              open={openCourseModel}
              setOpen={setOpenCourseModel}
            />
          </Disclosure.Panel>
        </div>
      )}
    </Disclosure>
  );
}
