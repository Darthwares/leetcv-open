import React from "react";
import CourseDetailsHeader from "./courseDetailsHeader";
import CourseSection from "./courseSection";

export default function CourseDetails() {
  return (
    <div data-testid="courseDetails" id="courses">
      <CourseDetailsHeader />
      <CourseSection />
    </div>
  );
}
