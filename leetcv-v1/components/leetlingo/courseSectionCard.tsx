import { memo } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "shadcn/components/ui/carousel";
import { NewCourseCard } from "./newCourseCard";

export const CourseSectionCard = memo(
  ({
    title,
    courses,
    onCourseClick,
    type,
  }: {
    title: string;
    courses: any[];
    onCourseClick: (courseId: string, courseName: string) => void;
    type: "enrolled" | "new" | "completed";
  }) => {

    return (
      <>
        <h2 className="text-xl font-semibold">{title}</h2>
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full"
        >
          <CarouselContent className="w-full -ml-1">
            {courses?.map((course) => (
              <CarouselItem
                key={course.courseId}
                className="pl-1 md:basis-1/2 lg:basis-1/3"
              >
                <div className="p-4">
                  <NewCourseCard course={course} onCourseClick={onCourseClick} type={type} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </>
    );
  }
);

CourseSectionCard.displayName = "CourseSectionCard";
