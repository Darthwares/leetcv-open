import { TRPCError } from "@trpc/server";
import { PracticeQuestionSetSchema } from "data/schemas/leetCourses.schema";
import { DocumentData } from "firebase/firestore";
import { createFirestoreRouter } from "server/router/custom/createFirestoreRouter";
import { PracticeQuestionSet } from "types/courses";
import { z } from "zod";

export const allCoursesRouter = createFirestoreRouter()
  //all courses from leetQuestionBnk
  .query("getAllCourses", {
    async resolve({ ctx }) {
      const courseRef = await ctx.firestore
        .collection("leetQuestionBank")
        .get();

      const courseList = await Promise.all(
        courseRef.docs.map(async (doc) => {
          const courseData = doc.data();
          const courseId = doc.id;

          // Fetch sub-collections for the course: easyList, advancedList, expertList
          const sections = ["easyList", "advancedList", "expertList"];
          let totalUnits = 0;

          await Promise.all(
            sections.map(async (section) => {
              const sectionRef = await ctx.firestore
                .collection("leetQuestionBank")
                .doc(courseId)
                .collection(section)
                .get();

              // Add the number of documents (units) in this section to totalUnits
              totalUnits += sectionRef.docs.length;
            })
          );

          return {
            ...courseData,
            totalNoOfUnits: totalUnits, // Add total units to the course details
          };
        })
      );

      return courseList;
    },
  })

  //add courses from leetQuestionBank to user's leet-course when user clciks start for any level
  .mutation("setCourseDetails", {
    input: z.object({
      courseId: z.string(),
      difficulty: z.string(),
    }),
    async resolve({ ctx, input }) {
      const lessonsSnapshot = await isCourseIdValidated(ctx, input);

      const lessonsList = lessonsSnapshot.docs.map((doc: any) => doc.data());
      const { courseName } = lessonsList[0];

      const mainDocRef = ctx.firestore
        .collection("leetQuestionBank")
        .doc(courseName);

      const subcollections = await mainDocRef.listCollections();
      const difficultyExists = subcollections.some(
        (col) => col.id === input.difficulty
      );

      if (!difficultyExists) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "This section is not available at this time",
        });
      }

      const userLeetCourseRef = ctx.firestore
        .collection("users")
        .doc(ctx?.session?.user?.id!)
        .collection("leet-course")
        .doc(courseName)
        .collection(input.difficulty);

      const difficultyRef = mainDocRef.collection(input.difficulty);

      await copyCollection(difficultyRef, userLeetCourseRef);

      async function copyCollection(
        sourceRef: FirebaseFirestore.CollectionReference,
        destinationRef: FirebaseFirestore.CollectionReference
      ) {
        const snapshot = await sourceRef.get();

        for (const doc of snapshot.docs) {
          const docRef = destinationRef.doc(doc.id);
          const existingDoc = await docRef.get();

          if (existingDoc.exists) {
            // If document exists, merge only if there are changes
            const existingData = existingDoc.data();
            const newData = doc.data();

            // Handle questions array specially if it exists
            if (existingData?.questions && newData?.questions) {
              // Create map of existing questions by id for quick lookup
              const existingQuestionsMap = new Map(
                existingData?.questions?.map((q: any) => [q.id, q])
              );

              // Update questions while preserving user answers
              newData.questions = newData?.questions?.map((newQ: any) => {
                const existingQ: any = existingQuestionsMap.get(newQ.id);
                if (existingQ) {
                  return {
                    ...newQ,
                    userAnswer: existingQ?.userAnswer,
                  };
                }
                return newQ;
              });
            }

            // Check if there are any changes
            if (JSON.stringify(existingData) !== JSON.stringify(newData)) {
              await docRef.set(newData, { merge: true });
            }
          } else {
            // If document doesn't exist, create it
            await docRef.set(doc.data());
          }

          const subcollections = await doc.ref.listCollections();
          for (const subcollection of subcollections) {
            await copyCollection(
              subcollection,
              docRef.collection(subcollection.id)
            );
          }
        }
      }

      const mainDocSnapshot = await mainDocRef.get();
      if (mainDocSnapshot.exists) {
        const mainDocData = mainDocSnapshot.data();

        await ctx.firestore
          .collection("users")
          .doc(ctx?.session?.user?.id!)
          .collection("leet-course")
          .doc(courseName)
          .set(
            {
              ...mainDocData,
            },
            {
              merge: true,
            }
          );
      } else {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: ` This ${courseName} does not exist.`,
        });
      }

      return {
        success: true,
      };
    },
  })
  .mutation("setPracticeQuestions", {
    input: z.object({
      courseName: z.string(),
      difficulty: z.string(),
    }),
    async resolve({ ctx, input }) {
      const mainDocRef = ctx.firestore
        .collection("leetQuestionBank")
        .doc(input.courseName);

      const subcollections = await mainDocRef.listCollections();
      const difficultyExists = subcollections.some(
        (col) => col.id === input.difficulty
      );

      if (!difficultyExists) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "This section is not available at this time",
        });
      }

      const userLeetCourseRef = ctx.firestore
        .collection("users")
        .doc(ctx?.session?.user?.id!)
        .collection("leet-course")
        .doc(input.courseName)
        .collection(input.difficulty);

      const difficultyRef = mainDocRef.collection(input.difficulty);

      await copyCollection(difficultyRef, userLeetCourseRef);

      async function copyCollection(
        sourceRef: FirebaseFirestore.CollectionReference,
        destinationRef: FirebaseFirestore.CollectionReference
      ) {
        const snapshot = await sourceRef.get();

        for (const doc of snapshot.docs) {
          const docRef = destinationRef.doc(doc.id);
          await docRef.set(doc.data(), { merge: true });

          const subcollections = await doc.ref.listCollections();
          for (const subcollection of subcollections) {
            await copyCollection(
              subcollection,
              docRef.collection(subcollection.id)
            );
          }
        }
      }

      const mainDocSnapshot = await mainDocRef.get();
      if (mainDocSnapshot.exists) {
        const mainDocData = mainDocSnapshot.data();

        await ctx.firestore
          .collection("users")
          .doc(ctx?.session?.user?.id!)
          .collection("leet-course")
          .doc(input.courseName)
          .set(
            {
              ...mainDocData,
            },
            {
              merge: true,
            }
          );
      } else {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: ` This ${input.courseName} does not exist.`,
        });
      }

      return {
        success: true,
      };
    },
  })
  .query("getAllUnits", {
    input: z.object({
      courseId: z.string(),
    }),
    async resolve({ ctx, input }) {
      const currentCourseRef = await ctx.firestore
        .collection("users")
        .doc(ctx.session?.user?.id!)
        .collection("current-leet-course")
        .doc("current-course")
        .get();

      const currentCourseData = currentCourseRef.data();

      if (!currentCourseData) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "No current course found",
        });
      }

      if (currentCourseData) {
        const unitSnapshot = await ctx.firestore
          .collection("users")
          .doc(ctx.session?.user?.id!)
          .collection("leet-course")
          .doc(currentCourseData.course)
          .collection(currentCourseData.difficulty)
          .get();

        const unitList = unitSnapshot.docs.map((doc) => doc.data());

        return unitList;
      }
    },
  })

  //get all units,lessons for current course and difficulty from users leet-course to render learning path and checking progress within section
  .query("getCoursesAllUnits", {
    input: z.object({
      courseName: z.string(),
      difficulty: z.string(), // Include difficulty in the input
    }),
    async resolve({ ctx, input }) {
      const { courseName, difficulty } = input;

      try {
        // Fetch units for the given course and difficulty
        const unitSnapshot = await ctx.firestore
          .collection("users")
          .doc(ctx.session?.user?.id!)
          .collection("leet-course")
          .doc(courseName)
          .collection(difficulty)
          .get();

        if (unitSnapshot.empty) {
          console.log("No units found for the given course and difficulty.");
          return [];
        }

        // Construct the units with lessons
        const units = await Promise.all(
          unitSnapshot.docs.map(async (unitDoc, index) => {
            const unitData = unitDoc.data();

            // Fetch lessons for each unit
            const lessonsSnapshot = await ctx.firestore
              .collection("users")
              .doc(ctx.session?.user?.id!)
              .collection("leet-course")
              .doc(courseName)
              .collection(difficulty)
              .doc(unitDoc.id)
              .collection("lessons")
              .get();

            const lessons = lessonsSnapshot.docs.map(
              (lessonDoc, lessonIndex) => {
                const lessonData = lessonDoc.data();
                return {
                  lessonId: lessonIndex + 1, // Add an ID for clarity
                  ...lessonData, // Include all properties from lessonData
                };
              }
            );

            return {
              unitIndex: index + 1,
              unitId: unitData.unitId,
              unitName: unitData.unitName,
              unitDescription: unitData.unitDescription,
              noOfLessons: lessons.length,
              color: unitData.unitColor,
              isCompleted: unitData.isCompleted ?? false,
              lessons,
            };
          })
        );

        return units;
      } catch (error) {
        console.error("Error fetching units:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An error occurred while fetching data.",
        });
      }
    },
  })

  .mutation("setCurrentUnit1", {
    input: z.object({
      unitName: z.string(),
      unitId: z.string(),
      unitColor: z.string(),
    }),
    async resolve({ ctx, input }) {
      await ctx.firestore
        .collection("users")
        .doc(ctx.session?.user?.id!)
        .collection("current-leet-course")
        .doc("current-course")
        .set(
          {
            unitName: input.unitName,
            unitId: input.unitId,
            unitColor: input.unitColor,
          },
          {
            merge: true,
          }
        );

      return input;
    },
  })

  //update user's current-leet-course (depedning upon course and difficulty) when user submits any lesson for the first time or when user clciks basic for the first time
  .mutation("setCurrentUnit", {
    input: z.object({
      courseName: z.string(),
      courseId: z.string(),
      difficulty: z.object({
        level: z.string(),
        unit: z.number(),
        lesson: z.number(),
      }),
    }),
    async resolve({ ctx, input }) {
      const userDocRef = ctx.firestore
        .collection("users")
        .doc(ctx.session?.user?.id!);

      const courseDocRef = userDocRef
        .collection("current-leet-course")
        .doc("current-course");

      const courseSnapshot = await courseDocRef.get();

      if (courseSnapshot.exists) {
        const currentData = courseSnapshot.data();
        const courses = currentData?.courses || [];

        // Check if the course already exists
        const existingCourseIndex = courses.findIndex(
          (course: any) => course.courseId === input.courseId
        );

        if (existingCourseIndex !== -1) {
          // Course exists, replace difficulty
          courses[existingCourseIndex] = {
            ...courses[existingCourseIndex],
            difficulty: input.difficulty, // Store as single object
            updatedAt: new Date().toISOString(),
          };
        } else {
          // Add new course
          courses.push({
            courseName: input.courseName,
            courseId: input.courseId,
            updatedAt: new Date().toISOString(),
            difficulty: input.difficulty,
          });
        }

        // Update Firestore with modified courses array
        await courseDocRef.set({ courses }, { merge: true });
      } else {
        // Create new document with input course
        await courseDocRef.set(
          {
            courses: [
              {
                courseName: input.courseName,
                courseId: input.courseId,
                updatedAt: new Date().toISOString(),
                difficulty: input.difficulty,
              },
            ],
          },
          { merge: true }
        );
      }

      return input;
    },
  })

  .query("getAllLessons", {
    input: z.object({
      courseId: z.string(),
    }),
    async resolve({ ctx, input }) {
      const lessonsSnapshot = await ctx.firestore
        .collection("leetQuestionBank")
        .where("courseId", "==", input.courseId)
        .get();

      if (lessonsSnapshot.empty) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `No lessons found for courseId: ${input.courseId}`,
        });
      }

      const currentCourseRef = await ctx.firestore
        .collection("users")
        .doc(ctx.session?.user?.id!)
        .collection("current-leet-course")
        .doc("current-course")
        .get();

      const currentCourseData = currentCourseRef.data();

      const lessonRef = await ctx.firestore
        .collection("users")
        .doc(ctx.session?.user?.id!)
        .collection("leet-course")
        .doc(currentCourseData?.course)
        .collection(currentCourseData?.difficulty)
        .doc(currentCourseData?.unitName)
        .collection("lessons")
        .get();

      const lessonList = lessonRef.docs.map((doc) => doc.data());

      return {
        lessonList,
        unitColor: currentCourseData?.unitColor,
        currentUnit: currentCourseData?.unitName,
      };
    },
  })

  //check if any course has that difficulty level or not in leetQuestionBank
  .query("hasUnits", {
    input: z.object({
      courseName: z.string(),
      level: z.string(),
    }),
    async resolve({ ctx, input }) {
      const { courseName, level } = input;

      try {
        // Query Firestore for the specified course and level
        const lessonsSnapshot = await ctx.firestore
          .collection("leetQuestionBank")
          .doc(courseName)
          .collection(level)
          .get();

        // Check if the snapshot is empty
        if (lessonsSnapshot.empty) {
          return { exists: false };
        }
        return {
          exists: true,
        };
      } catch (error) {
        console.error("Error fetching data from Firestore:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An error occurred while fetching data.",
        });
      }
    },
  })

  //fetching all units ,lesson for current course and difficulty from leetquestionBnk [not used]
  .query("getUnits", {
    input: z.object({
      courseName: z.string(),
      level: z.string(),
    }),
    async resolve({ ctx, input }) {
      const { courseName, level } = input;

      try {
        // Get units under the level collection
        const unitsSnapshot = await ctx.firestore
          .collection("leetQuestionBank")
          .doc(courseName)
          .collection(level)
          .get();

        if (unitsSnapshot.empty) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: `No units found for course: ${courseName} and level: ${level}`,
          });
        }

        // Map through each unit to construct the desired format
        const units = await Promise.all(
          unitsSnapshot.docs.map(async (unitDoc, index) => {
            const unitData = unitDoc.data();

            // Fetch lessons for each unit
            const lessonsSnapshot = await ctx.firestore
              .collection("leetQuestionBank")
              .doc(courseName)
              .collection(level)
              .doc(unitDoc.id)
              .collection("lessons")
              .get();

            const lessons = lessonsSnapshot.docs.map(
              (lessonDoc, lessonIndex) => {
                const lessonData = lessonDoc.data();
                return {
                  lessonId: lessonIndex + 1,
                  lessonName:
                    lessonData.lessonName || `Lesson ${lessonIndex + 1}`,
                  noOfQuestions: lessonData.questions?.length || 0,
                  questions: lessonData.questions || [],
                };
              }
            );

            return {
              unitIndex: index + 1,
              unitId: unitData.unitId,
              unitName: unitData.unitName,
              unitDescription: unitData.unitDescription,
              noOfLessons: lessons.length,
              color: unitData.unitColor,
              lessons,
            };
          })
        );

        // console.log("units", units);
        // Return the constructed object
        return units;
      } catch (error) {
        console.error("Error fetching data:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An error occurred while fetching data.",
        });
      }
    },
  })

  //get total no of units per difficulty from leetQuestionBank which is used to calculate progress
  .query("getTotalNoOfUnits", {
    input: z.object({
      courseName: z.string(),
    }),
    async resolve({ ctx, input }) {
      const { courseName } = input;
      const levels = ["easyList", "advancedList", "expertList"];

      try {
        const stats = await Promise.all(
          levels.map(async (level) => {
            const unitsSnapshot = await ctx.firestore
              .collection("leetQuestionBank")
              .doc(courseName)
              .collection(level)
              .get();

            return {
              level,
              totalUnits: unitsSnapshot.size,
            };
          })
        );

        return stats.reduce((acc, curr) => {
          acc[curr.level] = curr.totalUnits;
          return acc;
        }, {} as Record<string, number>);
      } catch (error) {
        console.error("Error fetching level stats:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to fetch course level statistics",
        });
      }
    },
  })

  //get all the courses within users current-leet-course collection
  .query("getUserCurrentCourses", {
    input: z.object({
      userId: z.string(),
    }),
    async resolve({ ctx, input }) {
      const { userId } = input;
      const userCoursesSnapshot = await ctx.firestore
        .collection("users")
        .doc(userId)
        .collection("current-leet-course")
        .doc("current-course")
        .get();

      const userCourses = userCoursesSnapshot.exists
        ? userCoursesSnapshot.data()?.courses || []
        : [];

      return userCourses;
    },
  })

  //get only the difficulty{level,unit,lesson} for a course from users current-leet-course collection
  .query("getUserCourseDifficulty", {
    input: z.object({
      userId: z.string(),
      courseName: z.string(), // Adding courseName to input
    }),
    async resolve({ ctx, input }) {
      const { courseName } = input;
      const userId = ctx.session?.user?.id!;

      // Fetch the user's current courses from Firestore
      const userCoursesSnapshot = await ctx.firestore
        .collection("users")
        .doc(userId)
        .collection("current-leet-course")
        .doc("current-course")
        .get();

      // If courses exist, filter by courseName and return its difficulty
      const userCourses = userCoursesSnapshot.exists
        ? userCoursesSnapshot.data()?.courses || []
        : [];

      // Find the course with the matching courseName
      const course = userCourses.find(
        (course: any) => course.courseName === courseName
      );

      // If course found, return its difficulty, otherwise return an empty object
      return course ? course.difficulty : {};
    },
  })

  //mark lesson as completed in users leet-course collection when a user completes a lesson
  .mutation("markLessonCompleted", {
    input: z.object({
      courseName: z.string(),
      difficulty: z.string(),
      unitName: z.string(),
      lessonName: z.string(),
    }),
    async resolve({ ctx, input }) {
      const { courseName, difficulty, unitName, lessonName } = input;
      // console.log("lessonName", lessonName, courseName, difficulty, unitName);

      try {
        // Reference the lessons collection within the unit
        const lessonsRef = ctx.firestore
          .collection("users")
          .doc(ctx.session?.user?.id!)
          .collection("leet-course")
          .doc(courseName)
          .collection(difficulty)
          .doc(unitName)
          .collection("lessons");
        // console.log("lessonsRef", lessonsRef);

        // Query to find the lesson document with the matching lessonName
        const lessonSnapshot = await lessonsRef
          .where("currentLesson", "==", lessonName)
          .get();
        // console.log("lessonSnapshot", lessonSnapshot);
        if (lessonSnapshot.empty) {
          // console.log("lessonSnapshot empty", lessonSnapshot);
          throw new TRPCError({
            code: "NOT_FOUND",
            message: `Lesson '${lessonName}' not found in unit '${unitName}'.`,
          });
        }

        // Assuming lessonName is unique, take the first matching document
        const lessonDoc = lessonSnapshot.docs[0];
        // console.log("lessonDoc", lessonDoc);

        // Update the lesson document to mark it as completed
        await lessonDoc.ref.update({ isCompleted: true });

        const unitRef = ctx.firestore
          .collection("users")
          .doc(ctx.session?.user?.id!)
          .collection("leet-course")
          .doc(courseName)
          .collection(difficulty)
          .doc(unitName);

        // Validate unit exists

        // Get lessons completion status
        const lessonsSnapshot = await lessonsRef.get();
        const totalCount = lessonsSnapshot.size;
        const completedLessons = lessonsSnapshot.docs.filter(
          (doc) => doc.data()?.isCompleted ?? false
        ).length;

        // Update unit completion status
        if (completedLessons === totalCount) {
          await unitRef.set({ isCompleted: true }, { merge: true });
        }

        const difficultyRef = ctx.firestore
          .collection("users")
          .doc(ctx.session?.user?.id!)
          .collection("leet-course")
          .doc(courseName)
          .collection(difficulty);

        // Get all units in this difficulty level
        const unitsSnapshot = await difficultyRef.get();
        const totalUnits = unitsSnapshot.size;
        const completedUnits = unitsSnapshot.docs.filter(
          (doc) => doc.data()?.isCompleted ?? false
        ).length;

        const courseRef = ctx.firestore
          .collection("users")
          .doc(ctx.session?.user?.id!)
          .collection("leet-course")
          .doc(courseName);

        if (completedUnits === totalUnits) {
          await courseRef.update({
            [`is${difficulty}Completed`]: true,
          });
        }

        return {
          success: true,
          message: `Lesson '${lessonName}' in unit '${unitName}' marked as completed.`,
        };
      } catch (error) {
        console.error("Error marking lesson as completed:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An error occurred while marking the lesson as completed.",
        });
      }
    },
  })
  //mark unit as completed in users leet-course collection when a user completes the last leeson of a unit
  .mutation("markUnitCompleted", {
    input: z.object({
      courseName: z.string(),
      difficulty: z.string(),
      unitName: z.string(),
    }),
    async resolve({ ctx, input }) {
      const { courseName, difficulty, unitName } = input;

      // Validate user session

      const userId = ctx?.session?.user?.id!;

      try {
        // Create references with validated paths
        const userRef = ctx.firestore.collection("users").doc(userId);
        const courseRef = userRef.collection("leet-course").doc(courseName);
        const difficultyRef = courseRef.collection(difficulty);
        const unitRef = difficultyRef.doc(unitName);
        const lessonsRef = unitRef.collection("lessons");

        // Validate unit exists
        const unitSnapshot = await unitRef.get();
        if (!unitSnapshot.exists) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: `Unit '${unitName}' does not exist in the course '${courseName}' with difficulty '${difficulty}'.`,
          });
        }

        // Get lessons completion status
        const lessonsSnapshot = await lessonsRef.get();
        const totalCount = lessonsSnapshot.size;

        // const completedLessons = lessonsSnapshot.docs.filter(
        //   (doc) => doc.data()?.isCompleted ?? false
        // ).length;
        const completedLessons = lessonsSnapshot.docs.map((doc) => doc.data());

        return {
          success: true,
          message: `Unit '${unitName}' completion status updated.`,
        };
      } catch (error) {
        console.error("Error marking unit as completed:", error);

        // Handle specific Firestore errors
        if (error instanceof Error && error.message.includes("resource path")) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message:
              "Invalid resource path. Please check all parameters are valid.",
          });
        }

        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An error occurred while updating the unit status.",
        });
      }
    },
  })

  //mark course as completed in users current-leet-course collection when a user completes the last unit of a course and also mark the course as completed in user's current-leet-course collection
  .mutation("markCourseCompleted", {
    input: z.object({
      courseName: z.string(),
      userId: z.string(),
    }),
    async resolve({ ctx, input }) {
      const { courseName, userId } = input;

      try {
        // Reference the course document
        const courseRef = ctx.firestore
          .collection("users")
          .doc(ctx.session?.user?.id!)
          .collection("leet-course")
          .doc(courseName);

        // Check if the course exists
        const courseSnapshot = await courseRef.get();
        if (!courseSnapshot.exists) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: `Course '${courseName}' does not exist.`,
          });
        }

        // Update the course document to mark it as completed
        await courseRef.update({ isCompleted: true });
        const userCoursesSnapshot = await ctx.firestore
          .collection("users")
          .doc(userId)
          .collection("current-leet-course")
          .doc("current-course")
          .get();
        const userCourses = userCoursesSnapshot.exists
          ? userCoursesSnapshot.data()?.courses || []
          : [];
        const course = userCourses.find(
          (course: any) => course.courseName === courseName
        );
        if (course) {
          course.isCompleted = true;
        }

        return {
          success: true,
          message: `Course '${courseName}' marked as completed.`,
        };
      } catch (error) {
        console.error("Error marking course as completed:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An error occurred while marking the course as completed.",
        });
      }
    },
  })

  .query("getDifficultySectionCompleted", {
    input: z.object({
      userId: z.string(),
      courseName: z.string().optional(), // Adding courseName to input
      difficulty: z.string().optional(),
    }),
    async resolve({ ctx, input }) {
      const { userId, courseName } = input;
      const currentUserId = ctx?.session?.user?.id;

      if (currentUserId !== input.userId) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You are not authorized to access this resource.",
        });
      }

      // Get reference to the course document

      if (!courseName) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Course name is required.",
        });
      }

      const courseRef = ctx.firestore
        .collection("users")
        .doc(userId)
        .collection("leet-course")
        .doc(courseName!);

      // Get references to all difficulty sections
      const easyRef = courseRef.collection("easyList");
      const advancedRef = courseRef.collection("advancedList");
      const expertRef = courseRef.collection("expertList");

      // Get all units for each difficulty
      const [easySnapshot, advancedSnapshot, expertSnapshot] =
        await Promise.all([easyRef.get(), advancedRef.get(), expertRef.get()]);

      const checkCompletion = (snapshot: any) => {
        if (snapshot.empty) return false;
        return snapshot.docs.every(
          (doc: FirebaseFirestore.QueryDocumentSnapshot) =>
            doc.data().isCompleted
        );
      };

      return {
        easyList: checkCompletion(easySnapshot),
        advancedList: checkCompletion(advancedSnapshot),
        expertList: checkCompletion(expertSnapshot),
      };
    },
  })

  .query("getAllCompletedUnits", {
    input: z.object({
      courseName: z.string(), // Include difficulty in the input
    }),
    async resolve({ ctx, input }) {
      const { courseName } = input;

      try {
        // Fetch units for the given course and difficulty
        const userRef = ctx.firestore
          .collection("users")
          .doc(ctx.session?.user?.id!)
          .collection("leet-course")
          .doc(courseName);

        const [easySnapshot, advancedSnapshot, expertSnapshot] =
          await Promise.all([
            userRef.collection("easyList").get(),
            userRef.collection("advancedList").get(),
            userRef.collection("expertList").get(),
          ]);

        const getUnitStats = (snapshot: FirebaseFirestore.QuerySnapshot) => {
          if (snapshot.empty) return { progress: 0, completed: 0, total: 0 };
          const total = snapshot.docs.length;
          const completed = snapshot.docs.reduce((count, doc) => {
            const unitData = doc.data();
            return count + (unitData.isCompleted === true ? 1 : 0);
          }, 0);
          const progress = total === 0 ? 0 : (completed / total) * 100;
          return { progress, completed, total };
        };

        return {
          easyList: getUnitStats(easySnapshot),
          advancedList: getUnitStats(advancedSnapshot),
          expertList: getUnitStats(expertSnapshot),
        };

        // Construct the units with lessons
      } catch (error) {
        console.error("Error fetching units:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An error occurred while fetching data.",
        });
      }
    },
  })
  .mutation("updatePracticeQuestions", {
    input: z.object({
      courseName: z.string(),
      currentLesson: z.string(),
    }),
    async resolve({ ctx, input }) {
      const userPracticeQuestionsRef = ctx.firestore
        .collection("users")
        .doc(ctx?.session?.user?.id!)
        .collection("leet-course")
        .doc(input.courseName)
        .collection("practiceList")
        .doc("Practice")
        .collection("lessons");

      const snapshot = await userPracticeQuestionsRef.get();

      if (snapshot.empty) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `No lessons found for course: ${input.courseName}, lesson: ${input.currentLesson}`,
        });
      }

      // Get all lessons and find the target lesson
      const lessons = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const matchedLesson = lessons.find(
        (lesson) => lesson.id === input.currentLesson
      );

      if (!matchedLesson) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `Lesson ${input.currentLesson} not found in practiceList.`,
        });
      }

      // Update the target lesson
      await userPracticeQuestionsRef.doc(matchedLesson.id).update({
        isStarted: true,
      });

      return { message: `Lesson ${input.currentLesson} has been started.` };
    },
  })
  .query("getQuestionBankPracticeQuestions", {
    input: z.object({
      courseName: z.string(),
    }),
    async resolve({ ctx, input }) {
      const userPracticeQuestionsRef = ctx.firestore
        .collection("leetQuestionBank")
        .doc(input.courseName)
        .collection(`practiceList`)
        .doc(`Practice`)
        .collection(`lessons`);

      const snapshot = await userPracticeQuestionsRef.get();

      if (snapshot.empty) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `No questions found for course: ${input.courseName}, difficulty: PracticeList`,
        });
      }

      const questions = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const practiceQuestions = questions.filter(
        (question: any) => question.isStarted === false
      );

      return practiceQuestions as PracticeQuestionSet[];
    },
  })
  .query("getPracticeQuestions", {
    input: z.object({
      courseName: z.string(),
      difficulty: z.string(),
    }),
    async resolve({ ctx, input }) {
      const userPracticeQuestionsRef = ctx.firestore
        .collection("users")
        .doc(ctx?.session?.user?.id!)
        .collection("leet-course")
        .doc(input.courseName)
        .collection(input.difficulty)
        .doc("Practice")
        .collection("lessons");

      const snapshot = await userPracticeQuestionsRef.get();

      if (snapshot.empty) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `No questions found for course: ${input.courseName}, difficulty: ${input.difficulty}`,
        });
      }

      const questions = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const practiceQuestions = questions.filter(
        (question: any) => question.isStarted === false
      );

      return practiceQuestions as PracticeQuestionSet[];
    },
  })
  .mutation("incrementActiveLearners", {
    input: z.object({
      courseName: z.string(), // The course name, e.g., "DBMS"
    }),
    async resolve({ input, ctx }) {
      const courseRef = ctx.firestore
        .collection("leetQuestionBank")
        .doc(input.courseName);

      try {
        const doc = await courseRef.get();

        if (!doc.exists) {
          throw new Error("Course document does not exist");
        }

        const currentData = doc.data();

        if (currentData) {
          const newCount = (currentData.activeLearners ?? 0) + 1;
          await courseRef.update({
            activeLearners: newCount,
          });
        }

        return {
          success: true,
          message: "Active learners updated successfully.",
        };
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(`Failed to update active learners: ${error.message}`);
        }
        throw new Error("Failed to update active learners");
      }
    },
  })
  .query("getUnitsDescription", {
    input: z.object({
      courseName: z.string(), // e.g., "DBMS"
      sectionName: z.string(), // e.g., "easyList"
    }),
    async resolve({ input, ctx }) {
      const { courseName, sectionName } = input;

      try {
        // Reference to the specific section under the course
        const sectionRef = ctx.firestore
          .collection("leetQuestionBank")
          .doc(courseName)
          .collection(sectionName);

        // Fetch all unit documents
        const unitsSnapshot = await sectionRef.get();

        // Map over the documents to extract unitName and unitDescription
        const units = unitsSnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            unitName: data.unitName,
            unitDescription: data.unitDescription,
          };
        });

        return units;
      } catch (error) {
        console.error("Error fetching units Description:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An error occurred while fetching data.",
        });
      }
    },
  })
  .query("getCourseDetails", {
    input: z.object({
      courseId: z.string(),
    }),
    async resolve({ ctx, input }) {
      const { courseId } = input;

      const courseSnapshot = await ctx.firestore
        .collection("leetQuestionBank")
        .where("courseId", "==", courseId)
        .get();

      if (courseSnapshot.empty) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `Sorry, we couldn't find the course. It may no longer exist or could have been moved. Feel free to explore other courses`,
        });
      }

      const courseData = courseSnapshot.docs.map((doc) => doc.data());
      return courseData[0];
    },
  })

  //prevent User From Accessing Unlocked Course
  .query("preventUserFromAccessingUnlockedCourse", {
    input: z.object({
      courseId: z.string(),
      difficulty: z.string(),
    }),
    async resolve({ ctx, input }) {
      const { courseId, difficulty } = input;

      const courseSnapshot = await ctx.firestore
        .collection("leetQuestionBank")
        .where("courseId", "==", courseId)
        .get();

      if (courseSnapshot.empty) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `Sorry, we couldn't find the course. It may no longer exist or could have been moved. Feel free to explore other courses`,
        });
      }

      const courseName = courseSnapshot.docs[0].data().courseName;
      const courseRef = ctx.firestore
        .collection("users")
        .doc(ctx.session?.user?.id!)
        .collection("leet-course")
        .doc(courseName);

      // Check if difficulty exists in users collection

      const easyListRef = await courseRef.collection("easyList").get();

      if (easyListRef.empty) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message:
            "You are not enrolled in this course. Please enroll in the course first to access its content.",
        });
      }

      if (difficulty !== "easyList") {
        const difficultyRef = await courseRef.collection(difficulty).get();
        if (!difficultyRef.empty) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "You are not authorized to access this section",
          });
        }
      }

      // Helper function to check completion of a level
      const checkLevelCompletion = async (level: string) => {
        const levelRef = await courseRef.collection(level).get();
        if (levelRef.empty) {
          throw new TRPCError({
            code: "FORBIDDEN",
            message: `You must complete the ${
              level === "easyList" ? "basic" : "advanced"
            } level first before you can access this section.`,
          });
        }

        const units = levelRef.docs.map((doc) => doc.data());
        const isCompleted = units.every((unit) => unit.isCompleted === true);

        if (!isCompleted) {
          throw new TRPCError({
            code: "FORBIDDEN",
            message: `You must complete all ${
              level === "easyList" ? "basic" : "advanced"
            } level units first before you can access this section.`,
          });
        }
      };

      // Check prerequisites based on difficulty
      if (difficulty === "advancedList") {
        await checkLevelCompletion("easyList");
      } else if (difficulty === "expertList") {
        await checkLevelCompletion("easyList");
        await checkLevelCompletion("advancedList");
      }
    },
  })

  .query("getAllCompletedLessons", {
    input: z.object({
      courseName: z.string(),
    }),
    async resolve({ ctx, input }) {
      const { courseName } = input;

      if (!courseName) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Course name is required",
        });
      }

      // Get user reference once
      const userRef = ctx.firestore
        .collection("users")
        .doc(ctx.session?.user?.id!)
        .collection("leet-course")
        .doc(courseName);

      // Helper function to efficiently process lesson stats
      const getLessonStats = async (
        snapshot: FirebaseFirestore.QuerySnapshot
      ) => {
        if (snapshot.empty) {
          return {
            totalUnits: 0,
            totalLessons: 0,
            completedLessons: 0,
            percentage: 0,
          };
        }

        // Process all units in parallel for better performance
        const unitStats = await Promise.all(
          snapshot.docs.map(async (unitDoc) => {
            const lessonsSnapshot = await unitDoc.ref
              .collection("lessons")
              .get();
            const lessonCount = lessonsSnapshot.size;

            // Use more efficient reduce with early termination possibility
            const completedCount = lessonsSnapshot.docs.reduce((count, doc) => {
              return count + (doc.data().isCompleted === true ? 1 : 0);
            }, 0);

            return { lessonCount, completedCount };
          })
        );

        // Aggregate stats
        const totalUnits = snapshot.size;
        const totalLessons = unitStats.reduce(
          (sum, { lessonCount }) => sum + lessonCount,
          0
        );
        const completedLessons = unitStats.reduce(
          (sum, { completedCount }) => sum + completedCount,
          0
        );
        const percentage =
          totalLessons > 0
            ? Math.round((completedLessons / totalLessons) * 100)
            : 0;

        return { totalUnits, totalLessons, completedLessons, percentage };
      };

      // Fetch all snapshots in parallel
      const [easySnapshot, advancedSnapshot, expertSnapshot] =
        await Promise.all([
          userRef.collection("easyList").get(),
          userRef.collection("advancedList").get(),
          userRef.collection("expertList").get(),
        ]);

      // Process all difficulty levels in parallel
      const [easyStats, advancedStats, expertStats] = await Promise.all([
        getLessonStats(easySnapshot),
        getLessonStats(advancedSnapshot),
        getLessonStats(expertSnapshot),
      ]);

      // Calculate overall stats
      const overall = {
        totalUnits:
          easyStats.totalUnits +
          advancedStats.totalUnits +
          expertStats.totalUnits,
        totalLessons:
          easyStats.totalLessons +
          advancedStats.totalLessons +
          expertStats.totalLessons,
        completedLessons:
          easyStats.completedLessons +
          advancedStats.completedLessons +
          expertStats.completedLessons,
        percentage: Math.round(
          (easyStats.percentage +
            advancedStats.percentage +
            expertStats.percentage) /
            3
        ),
      };

      return {
        courseName,
        easyList: easyStats,
        advancedList: advancedStats,
        expertList: expertStats,
        overall,
      };
    },
  });

async function isCourseIdValidated(
  ctx: any,
  input: { courseId: string; difficulty: string }
) {
  const lessonsSnapshot = await ctx.firestore
    .collection("leetQuestionBank")
    .where("courseId", "==", input.courseId)
    .get();

  if (lessonsSnapshot.empty) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: `No lessons found for courseId: ${input.courseId}`,
    });
  }
  return lessonsSnapshot;
}
