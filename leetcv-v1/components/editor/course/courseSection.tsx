import { resumeState } from "@state/state";
import { Course } from "data/models/Course";
import React, { useCallback, useState } from "react";
import { ReactSortable } from "react-sortablejs";
import { useRecoilState } from "recoil";
import CourseList from "./courseList";

export default function CourseSection() {
  const [resumeChanged, setResumeChanged] = useState(false);
  const [userInfo, setUserInfo] = useRecoilState(resumeState);
  let course: Course[] = JSON.parse(JSON.stringify(userInfo?.courses ?? []));

  const onCourseListChange = (newCourseList: Course[]) => {
    if (userInfo && resumeChanged) {
      setUserInfo({
        ...userInfo,
        courses: newCourseList,
      });
    }
    setResumeChanged(true);
  };
  return (
    <section id="courses" className="flex w-full gap-0">
      <div
        className="w-full rounded-2xl bg-white pt-2"
        data-testid="courseList"
      >
        <ReactSortable
          className="w-full"
          list={course}
          handle=".drag-icon"
          direction="vertical"
          delayOnTouchOnly={true}
          setList={useCallback(
            (newState: Course[]) => {
              onCourseListChange(newState);
            },
            [course]
          )}
        >
          {userInfo?.courses &&
            userInfo?.courses?.map((course: Course, idx: number) => (
              <CourseList course={course} id={idx} key={course.id} />
            ))}
        </ReactSortable>
      </div>
    </section>
  );
}
