import { attestationRouter } from "./firebase/attestation";
import { createRouter } from "./context";
import { handleRouter } from "./firebase/handle";
import { privacyRouter } from "./firebase/privacy";
import { profileRouter } from "./firebase/profile";
import { prospectRouter } from "./firebase/prospects";
import { requestRouter } from "./firebase/request";
import { resumeRouter } from "./firebase/resume";
import superjson from "superjson";
import { reviewRouter } from "./firebase/review";
import { followerRouter } from "./firebase/follower";
import { ratingRouter } from "./firebase/rating";
import { publicResumeRouter } from "./firebase/publicResume";
import { publicRouter } from "./firebase/publicProfile";
import { notificationRouter } from "./firebase/notification";
import { viewCountRouter } from "./firebase/viewCounter";
import { waitListRouter } from "./firebase/waitlist";
import { stripeRouter } from "./firebase/stripe";
import { gptTokenRouter } from "./firebase/gptToken";
import { aiReviewRouter } from "./firebase/aiReview";
import { coverLetterRouter } from "./firebase/coverLetter";
import { couponRouter } from "./firebase/promoCode";
import { referRouter } from "./firebase/referUser";
import { recoverEmailRouter } from "./firebase/recoverEmail";
import { feedbackRouter } from "./firebase/feedback";
import { messageRouter } from "./firebase/message";
import { openAIRouter } from "./firebase/openaiResume";
import { streakRouter } from "./firebase/streak";
import { dashboardRouter } from "./firebase/dashboard";
import { referralSourceRouter } from "./firebase/referralSource";
import { freeAccessRouter } from "./firebase/freeAccess";
import { leetLinkRouter } from "./firebase/leetLink";
import { publicStripeRouter } from "./firebase/publicStripe";
import { aiJobListingRouter } from "./firebase/aiJobListings";
import { mockInterviewRouter } from "./firebase/mockInterview";
import { resumeStylesRouter } from "./firebase/resumeStyles";
import { browserDataRouter } from "./firebase/browserData";
import { projectIdeasRouter } from "./firebase/projectIdeas";
import { dailyUserRouter } from "./firebase/dailyUsers";
import { leetCourseRouter } from "./firebase/leetCourse";
import { allCoursesRouter } from "./firebase/course/allCourses";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("fs.handle.", handleRouter)
  .merge("fs.request.", requestRouter)
  .merge("fs.profile.", profileRouter)
  .merge("fs.resume.", resumeRouter)
  .merge("fs.public.", publicRouter)
  .merge("fs.attestation.", attestationRouter)
  .merge("fs.privacy.", privacyRouter)
  .merge("fs.review.", reviewRouter)
  .merge("fs.follower.", followerRouter)
  .merge("fs.rating.", ratingRouter)
  .merge("fs.notification.", notificationRouter)
  .merge("fs.viewCount.", viewCountRouter)
  .merge("fs.publicResume.", publicResumeRouter)
  .merge("fs.prospects.", prospectRouter)
  .merge("fs.waitList.", waitListRouter)
  .merge("fs.gptToken.", gptTokenRouter)
  .merge("fs.aiReview.", aiReviewRouter)
  .merge("fs.coverLetter.", coverLetterRouter)
  .merge("fs.stripe.", stripeRouter)
  .merge("fs.coupons.", couponRouter)
  .merge("fs.refer.", referRouter)
  .merge("fs.feedback.", feedbackRouter)
  .merge("fs.message.", messageRouter)
  .merge("fs.recoverEmail.", recoverEmailRouter)
  .merge("fs.streak.", streakRouter)
  .merge("fs.dashboard.", dashboardRouter)
  .merge("fs.openAIResume.", openAIRouter)
  .merge("fs.referralSource.", referralSourceRouter)
  .merge("fs.freeAccess.", freeAccessRouter)
  .merge("fs.leetLink.", leetLinkRouter)
  .merge("fs.publicStripe.", publicStripeRouter)
  .merge("fs.aiJobListingRouter.", aiJobListingRouter)
  .merge("fs.mockInterviewRouter.", mockInterviewRouter)
  .merge("fs.resumeStyles.", resumeStylesRouter)
  .merge("fs.browserdata.", browserDataRouter)
  .merge("fs.projectIdeas.", projectIdeasRouter)
  .merge("fs.dailyUser.", dailyUserRouter)
  .merge("fs.leetCourse.", leetCourseRouter)
  .merge("fs.leetCourseRouter.", allCoursesRouter);

export type AppRouter = typeof appRouter;
