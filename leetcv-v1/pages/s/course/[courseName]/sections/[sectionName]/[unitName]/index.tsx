import { useRouter } from "next/router";
import { ChevronRight, BookOpen, ArrowLeft } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
} from "shadcn/components/ui/cards";
import { Button } from "shadcn/components/ui/button";
import { GetServerSidePropsContext } from "next";
import { useSession } from "next-auth/react";

const UnitLessons = () => {
  const router = useRouter();
  const { courseName, sectionName, unitName } = router.query;
  const { status } = useSession();

  if (status === "unauthenticated") {
    return router.push("/");
  }

  const lessons = [
    {
      id: "lesson-1",
      title: "Lesson 1",
      duration: "45 mins",
      description: "Introduction to the core concepts",
    },
    {
      id: "lesson-2",
      title: "Lesson 2",
      duration: "30 mins",
      description: "Advanced techniques and practical applications",
    },
  ];

  const handleBack = () => {
    router.back();
  };

  const navigateToLesson = (lesson: any) => {
    router.push(
      `/s/course/${courseName}/sections/${sectionName}/${unitName}/${lesson.id}`
    );
  };


  return (
    <div className="max-w-6xl mx-auto p-5 md:p-6 space-y-6">
      {/* Back button */}
      <Button
        variant="ghost"
        onClick={() =>
          router.push(`/s/course/${courseName}/sections/${sectionName}`)
        }
        className="mb-4 px-0 hover:underline"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Unit
      </Button>

      {/* Main content */}
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight capitalize">
            {unitName}
          </h1>
          <p className="text-gray-500 mt-2">
            Select a lesson to begin learning
          </p>
        </div>

        {/* Lessons grid */}
        <div className="grid gap-4">
          {lessons.map((lesson) => (
            <Card
              key={lesson.id}
              className="hover:bg-gray-50 transition-colors cursor-pointer"
              onClick={() => navigateToLesson(lesson)}
            >
              <CardHeader className="flex flex-row items-center justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-xl">
                    <div className="flex items-center">
                      <BookOpen className="h-5 w-5 mr-2 text-blue-500 capitalize" />
                      {lesson.title}
                    </div>
                  </CardTitle>
                  <p className="text-sm text-gray-500 pt-2">
                    {lesson.description}
                  </p>
                </div>
                <div className="flex items-center">
                  <span className="text-sm text-gray-500 mr-4">
                    {lesson.duration}
                  </span>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UnitLessons;

export async function getServerSideProps(context: GetServerSidePropsContext) {

  return {
    props: {
      messages: require(`../../../../../../../messages/${context.locale}.json`),
    },
  };
}
