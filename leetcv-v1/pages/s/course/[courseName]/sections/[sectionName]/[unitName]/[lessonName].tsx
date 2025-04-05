import { useRouter } from "next/router";
import { ChevronRight, BookOpen, Clock, ArrowLeft } from "lucide-react";
import { GetServerSidePropsContext } from "next";
import { useRecoilState } from "recoil";
import { isQuizVisibleState } from "@state/state";

const LessonDetail = () => {
  const router = useRouter();
  const { courseName, sectionName, unitName, lessonName } = router.query;
  const [isQuizVisible] = useRecoilState(isQuizVisibleState);

  return (
    <>
      {!isQuizVisible ? (
        <div className="min-h-screen bg-gray-50">
          {/* Navigation Breadcrumb */}
          <nav className="bg-white border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center h-16">
                <button
                  onClick={() =>
                    router.push(
                      `/s/course/${courseName}/sections/${sectionName}/${unitName}`
                    )
                  }
                  className="flex items-center text-gray-500 hover:text-gray-700"
                >
                  <ArrowLeft className="h-5 w-5 mr-2" />
                  Back
                </button>
                <div className="ml-4 flex items-center text-sm text-gray-500">
                  <span className="hover:text-gray-700 cursor-pointer">
                    {courseName}
                  </span>
                  <ChevronRight className="h-4 w-4 mx-2" />
                  <span className="hover:text-gray-700 cursor-pointer">
                    {sectionName}
                  </span>
                  <ChevronRight className="h-4 w-4 mx-2" />
                  <span className="hover:text-gray-700 cursor-pointer">
                    {unitName}
                  </span>
                  <ChevronRight className="h-4 w-4 mx-2" />
                  <span className="text-gray-900 font-medium">
                    {lessonName}
                  </span>
                </div>
              </div>
            </div>
          </nav>

          {/* Main Content */}
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-white rounded-lg shadow">
              {/* Lesson Header */}
              <div className="px-6 py-8 border-b">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  {lessonName}
                </h1>
                <div className="flex items-center space-x-6 text-sm text-gray-500">
                  <div className="flex items-center">
                    <BookOpen className="h-5 w-5 mr-2" />
                    <span>Part of: {unitName}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 mr-2" />
                    <span>30 min estimated time</span>
                  </div>
                </div>
              </div>

              {/* Lesson Content */}
              <div className="px-6 py-8">
                <div className="prose max-w-none">
                  <h2 className="text-xl font-semibold mb-4">Overview</h2>
                  <p className="text-gray-600 mb-6">
                    This lesson covers fundamental concepts and practical
                    applications. You will learn through a combination of theory
                    and hands-on exercises.
                  </p>

                  <h2 className="text-xl font-semibold mb-4">
                    Learning Objectives
                  </h2>
                  <ul className="list-disc pl-6 text-gray-600 space-y-2">
                    <li>Understand core principles and concepts</li>
                    <li>Apply knowledge through practical exercises</li>
                    <li>Master key techniques and methodologies</li>
                    <li>Develop problem-solving skills</li>
                  </ul>

                  <h2 className="text-xl font-semibold mt-8 mb-4">
                    Main Content
                  </h2>
                  <div className="bg-gray-50 rounded-lg p-6">
                    <p className="text-gray-600">
                      This is where the main lesson content would be displayed.
                      It could include text, images, videos, interactive
                      elements, and other learning materials.
                    </p>
                  </div>
                </div>
              </div>

              {/* Navigation Footer */}
              <div className="px-6 py-4 bg-gray-50 rounded-b-lg border-t flex justify-between items-center">
                <button className="px-4 bg-gray-200 rounded-md py-2 text-sm font-medium text-gray-700 hover:text-gray-900 flex items-center">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Previous Lesson
                </button>
                <button
                  className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
                // onClick={() => setIsQuizVisible(true)}
                >
                  Next Lesson
                  <ChevronRight className="h-4 w-4 ml-2" />
                </button>
              </div>
            </div>
          </main>
        </div>
      ) : (
        <div className="mt-8 px-4 lg:px-8">
          quiz
        </div>
      )}
    </>
  );
};

export default LessonDetail;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      messages: require(`../../../../../../../messages/${context.locale}.json`),
    },
  };
}
