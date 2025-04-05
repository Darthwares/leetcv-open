import { useRouter } from "next/router";
import { useEffect, useState, useCallback, useMemo } from "react";
import { NewCourseCard } from "./newCourseCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "shadcn/components/ui/carousel";
import CourseCardSkeleton from "./courseCardSkeleton";
import { useRecoilState } from "recoil";
import { subscriptionPlanState } from "@state/state";
import LeetLingoModal from "./leetQuiz/leetLingoModal";
import BuyPlanModal from "./buyPlanModal";

export default function CoursesList({
  allCourses,
}: {
  readonly allCourses: readonly any[];
}) {
  const router = useRouter();
  const [newCourses, setNewCourses] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [plan] = useRecoilState(subscriptionPlanState);

  useEffect(() => {
    setNewCourses([...allCourses]);
  }, [allCourses]);

  const handleCourseClick = useCallback(
    (courseId: string, courseName: string) => {
      if (plan === "") {
        setIsModalOpen(true);
        return;
      }
      router.push(`/s/course/${courseName}_${courseId}/sections`);
    },
    [router, plan]
  );

  const skeletonItems = useMemo(() => {
    return Array.from({ length: 3 }).map((_, index) => (
      <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/3">
        <div className="p-1">
          <CourseCardSkeleton />
        </div>
      </CarouselItem>
    ));
  }, []);

  const courseItems = useMemo(() => {
    return newCourses?.map((course) => (
      <CarouselItem
        key={course.courseId}
        className="pl-1 md:basis-1/2 lg:basis-1/3"
      >
        <div className="p-4">
          <NewCourseCard
            course={course}
            onCourseClick={handleCourseClick}
            type="new"
          />
        </div>
      </CarouselItem>
    ));
  }, [newCourses, handleCourseClick]);

  return (
    <>
      <div className="py-6 max-w-7xl mx-auto space-y-8">
        <h2 className="text-xl font-semibold">Best Learning Course</h2>
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full"
        >
          <CarouselContent className="w-full sm:-ml-1 mx-auto">
            {newCourses.length === 0 ? skeletonItems : courseItems}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
      <LeetLingoModal open={isModalOpen} setOpen={setIsModalOpen}>
        <BuyPlanModal setOpen={setIsModalOpen} />
      </LeetLingoModal>
    </>
  );
}
