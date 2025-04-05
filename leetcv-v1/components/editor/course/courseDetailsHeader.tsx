import { getDefaultCourse, tipsCourse } from "@constants/defaults";
import { openLastCourseState, resumeState } from "@state/state";
import { useTranslations } from "next-intl";
import React, { useRef, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useDetectSticky } from "@lib/helper/detectSticky";
import HeaderContainer from "@components/headerContainer";

export default function CourseDetailsHeader() {
  const [userInfo, setUserInfo] = useRecoilState(resumeState);
  const setOpenLastCourse = useSetRecoilState(openLastCourseState);
  const t = useTranslations("Dashboard");
  const [courseTipButton, setCourseTipButton] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const [isCourseHeaderSticky, setIsCourseHeaderSticky] = useState(false);
  useDetectSticky(headerRef, setIsCourseHeaderSticky);

  const handleAdd = () => {
    const seed = (userInfo?.courses?.length || 0) + 1;
    const newCourse = getDefaultCourse(seed);

    if (userInfo) {
      setUserInfo({
        ...userInfo,
        courses: [...userInfo?.courses!, newCourse],
      });
    }
    setOpenLastCourse(true);
  };

  return (
    <div className="headerDetails" data-testid="courseDetailsHeader">
      <HeaderContainer
        headerRef={headerRef}
        isHeaderSticky={isCourseHeaderSticky}
        handleAdd={handleAdd}
        tipButton={courseTipButton}
        setTipButton={setCourseTipButton}
        tipsData={tipsCourse}
        title={t("add-course")}
        heading={t("course-details")}
      />
    </div>
  );
}
