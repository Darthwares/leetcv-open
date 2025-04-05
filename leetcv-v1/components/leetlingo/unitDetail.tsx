import { Progress } from "shadcn/components/ui/progress";
import { BookOpen, CheckCircle, Star, Award, Clock } from "lucide-react";
import { useRouter } from "next/router";

interface UnitDetailProps {
    activeUnit: {
        unitIndex: number;
        unitId: string;
        unitName: string;
        unitDescription: string;
        noOfLessons: number;
        color: string;
        isCompleted?: boolean;
        lessons: {
            lessonId: number;
            questions: {
                id: string;
                questions: string;
                multipleChoices: string[];
                answer: string;
                correctAnswer: string;
                userAnswer: string;
            }[];
            courseDetails: Record<string, any>;
            currentLesson: string;
            isStarted: boolean;
            isCompleted?: boolean;
        }[];
    };
}

const UnitDetail: React.FC<UnitDetailProps> = ({ activeUnit }) => {
    const router = useRouter();
    const { courseName } = router.query;
    const [courseTitle, courseId] = Array.isArray(courseName)
        ? courseName[0].split("_")
        : courseName?.split("_") || [];

    const totalLessons = activeUnit.lessons.length;
    const completedLessons = activeUnit.lessons.filter(lesson => lesson.isCompleted).length;
    const progress = Math.round((completedLessons / totalLessons) * 100);
    const unitColor = activeUnit.color?.trim() ? activeUnit.color : "rgba(88,204,2,1)"; // Default to emerald-500 if color is empty/whitespace

    return (
        <div className="my-8 py-8 px-2 sm:px-0 max-w-xl mx-auto">
            <div
                className="relative overflow-hidden rounded-2xl p-8 mb-8 text-white shadow-xl"
                style={{
                    backgroundColor: unitColor,
                    backgroundImage: "radial-gradient(circle at 90% -10%, rgba(255, 255, 255, 0.2) 0%, transparent 60%)"
                }}
            >
                <div className="absolute top-0 right-0 p-4">
                    {activeUnit.isCompleted ? (
                        <Award className="h-12 w-12 text-yellow-300 drop-shadow-lg animate-pulse" />
                    ) : (
                        <Star className="h-12 w-12 text-white/30" />
                    )}
                </div>

                <h2 className="text-xl lg:text-3xl font-bold mb-2">{courseTitle} - {activeUnit.unitName}</h2>
                <p className="text-white/90 mb-6 max-w-2xl text-sm">{activeUnit.unitDescription}</p>

                <div className="flex flex-wrap items-center gap-4 mb-6 text-sm">
                    <div className="flex items-center bg-black/10 rounded-full px-3 py-1.5">
                        <BookOpen className="h-4 w-4 mr-1.5" />
                        <span>{totalLessons} Lessons</span>
                    </div>
                    <div className="flex items-center bg-black/10 rounded-full px-3 py-1.5">
                        <CheckCircle className="h-4 w-4 mr-1.5" />
                        <span>{completedLessons} Completed</span>
                    </div>

                </div>

                <div className="space-y-1.5 ">
                    <Progress value={progress} className="h-2.5 w-full bg-black/20" />
                    <p className="text-sm font-medium flex justify-between text-white/90">
                        <span>{progress}% Complete</span>
                        <span>{completedLessons}/{totalLessons} Lessons</span>
                    </p>
                </div>
            </div>

            <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-200">
                <h3 className="text-xl font-bold mb-6 text-gray-800">Lesson Overview</h3>
                <div className="space-y-3 text-sm sm:text-base">
                    {activeUnit.lessons.map((lesson, index) => (
                        <div
                            key={lesson.lessonId}
                            className={`relative group rounded-xl p-4 transition-all duration-200
                                ${lesson.isCompleted ? 'bg-emerald-50 border border-emerald-100' : 'bg-gray-50 hover:bg-gray-100 border border-gray-200'}`}
                        >
                            <div className="flex justify-between items-center">
                                <div className="flex-1">
                                    <h4 className="font-medium text-gray-900 group-hover:text-emerald-700 transition-colors">
                                        Lesson {index + 1}: {lesson.currentLesson}
                                    </h4>
                                    <div className="flex items-center gap-3 mt-1.5 text-sm text-gray-500">
                                        <span className="flex items-center">
                                            <BookOpen className="h-4 w-4 mr-1 text-gray-400" />
                                            {lesson.questions.length} Questions
                                        </span>
                                        {lesson.isCompleted && (
                                            <span className="flex items-center text-emerald-600">
                                                <CheckCircle className="h-4 w-4 mr-1" />
                                                Completed
                                            </span>
                                        )}
                                    </div>
                                </div>
                                {lesson.isCompleted ? (
                                    <div className="h-9 w-9 rounded-full bg-emerald-100 flex items-center justify-center">
                                        <CheckCircle className="h-5 w-5 text-emerald-500" />
                                    </div>
                                ) : (
                                    <div className="h-9 w-9 rounded-full bg-gray-200 flex items-center justify-center">
                                        <Clock className="h-5 w-5 text-gray-400" />
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UnitDetail;
