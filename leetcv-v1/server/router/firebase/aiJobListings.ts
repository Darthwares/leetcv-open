import { createFirestoreRouter } from "../custom/createFirestoreRouter";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { v4 as guid } from "uuid";
import { Job } from "types/dashboardTypes";

interface RequestedJob {
  url: string;
  id: string;
  status: string;
  addedOn: string;
}

export const aiJobListingRouter = createFirestoreRouter()
  .query("getJobLists", {
    async resolve({ ctx }) {
      const userId = ctx.session?.user.id!;
      const jobListingsQuery = ctx.firestore.collection("ai-job-listings");

      const querySnapshot = await jobListingsQuery.get();
      let jobListings: any[] = [];

      jobListings = querySnapshot.docs
        .map((doc) => {
          const data = doc.data();
          if (!data.postings?.length) return null;

          // Filter valid postings in one pass
          const validPostings = data.postings.reduce(
            (acc: any[], posting: any) => {
              if (posting.jobUrl?.trim()) acc.push(posting);
              return acc;
            },
            []
          );

          return validPostings.length
            ? { id: doc.id, ...data, postings: validPostings }
            : null;
        })
        .filter(Boolean);

      const stripeUserDoc = await ctx.firestore
        .collection("stripePaidUsers")
        .doc(userId)
        .get();

      let isProUser = false;
      if (stripeUserDoc.exists) {
        const userData = stripeUserDoc.data();
        isProUser =
          userData?.subscriptionPlan !== "" &&
          userData?.stripeUserSubscriptionStatus === "subscribed" &&
          userData?.stripeMembershipStatus === "Active";
      }

      const visibleJobListings = isProUser
        ? jobListings
        : jobListings.slice(0, 3);

      jobListings = visibleJobListings;
      return jobListings;
    },
  })
  .mutation("addJobUrl", {
    input: z.object({
      id: z.string(),
      url: z.string(),
    }),
    async resolve({ ctx, input }) {
      if (ctx.session?.user.id !== input.id) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "User can only look up their own information",
        });
      }

      const trimmedUrl = input.url.trim();

      const userDocRef = ctx.firestore
        .collection("users")
        .doc(input.id)
        .collection("requested-job-url")
        .doc(input.id);

      const userDocSnapshot = await userDocRef.get();
      let currentJobs: RequestedJob[] = [];

      if (userDocSnapshot.exists && userDocSnapshot.data()?.jobs) {
        currentJobs = userDocSnapshot.data()?.jobs;
      }

      const urlExistsInUserJobs = currentJobs.some(
        (job) => job.url.trim() === trimmedUrl
      );
      if (urlExistsInUserJobs) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "URL is already added to your jobs",
        });
      }

      const newJob = {
        url: input.url,
        id: guid(),
        status: "pending",
        addedOn: new Date().toISOString(),
        userId: input.id,
        userEmail: ctx.session?.user.email || "",
      };

      const updatedJobs = [newJob, ...currentJobs];

      await userDocRef.set(
        {
          jobs: updatedJobs,
        },
        { merge: true }
      );

      const jobLinksRef = ctx.firestore.collection("job-urls").doc("jobLinks");

      const jobLinksSnapshot = await jobLinksRef.get();
      let jobLinksData = jobLinksSnapshot.exists
        ? jobLinksSnapshot.data()?.jobLinks || []
        : [];

      const urlExists = jobLinksData.includes(input.url);

      if (!urlExists) {
        jobLinksData.push(input.url);

        await jobLinksRef.set(
          {
            jobLinks: jobLinksData,
          },
          { merge: true }
        );
      }
    },
  })

  .query("getJobUrl", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ ctx, input }) {
      if (ctx.session?.user.id !== input.id) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "User can only look up their own information",
        });
      }

      const requestedJobUrlRef = ctx.firestore
        .collection("users")
        .doc(input.id!)
        .collection("requested-job-url")
        .doc(input.id!);

      const requestedJobRecord = await requestedJobUrlRef.get();

      const jobs = requestedJobRecord.data()?.jobs;

      return jobs || [];
    },
  })
  .mutation("deleteJobUrl", {
    input: z.object({
      userId: z.string(),
      id: z.string(),
    }),
    async resolve({ ctx, input }) {
      if (ctx.session?.user.id !== input.userId) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "User can only delete their own information",
        });
      }

      const userDocRef = ctx.firestore
        .collection("users")
        .doc(input.userId)
        .collection("requested-job-url")
        .doc(input.userId);

      const docSnapshot = await userDocRef.get();

      if (docSnapshot.exists) {
        const currentJobs = docSnapshot.data()?.jobs || [];

        const updatedJobs = currentJobs.filter(
          (job: any) => job.id !== input.id
        );

        await userDocRef.set({ jobs: updatedJobs }, { merge: true });

        return { success: true };
      } else {
        throw new Error("Document not found.");
      }
    },
  })
  .query("getTrackedJobs", {
    async resolve({ ctx }) {
      const userId = ctx.session?.user.id!;

      const trackedJobsRef = ctx.firestore
        .collection("users")
        .doc(userId)
        .collection("tracked-jobs");

      const companyDocsSnapshot = await trackedJobsRef.get();

      let allJobs: any[] = [];

      companyDocsSnapshot.forEach((companyDoc) => {
        const companyData = companyDoc.data();

        if (companyData.postings && Array.isArray(companyData.postings)) {
          allJobs = allJobs.concat(companyData.postings);
        }
      });

      return allJobs;
    },
  })
  .mutation("deleteTrackedJob", {
    input: z.object({
      userId: z.string(),
      companyName: z.string().toLowerCase(),
      jobId: z.string(),
    }),
    async resolve({ ctx, input }) {
      if (ctx.session?.user.id !== input.userId) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "User can only delete their own information",
        });
      }

      type CompanyDoc = {
        companyName: string;
        postings: Array<{
          jobId: string;
          [key: string]: any;
        }>;
      };

      const trackedJobsRef = ctx.firestore
        .collection("users")
        .doc(input.userId)
        .collection("tracked-jobs")
        .doc(input.companyName);

      const companyDoc = await trackedJobsRef.get();

      if (companyDoc.exists) {
        const companyData = companyDoc.data() as CompanyDoc;
        const currentPostings = companyData.postings || [];

        const updatedPostings = currentPostings.filter(
          (job) => job.jobId !== input.jobId
        );

        await trackedJobsRef.set(
          { postings: updatedPostings },
          { merge: true }
        );
      } else {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Delete Tracked Job failed. Please try again later.",
        });
      }
    },
  })
  .mutation("addTrackedJobs", {
    input: z.object({
      userId: z.string(),
      jobDetails: z.object({
        jobId: z.string(),
        companyName: z.string(),
        endDate: z.nullable(z.string()),
        jobTitle: z.string(),
        location: z.string(),
        startDate: z.nullable(z.string()),
        jobUrl: z.string(),
        description: z.string().optional(),
        skills: z.array(z.string()).optional(),
        yearsOfExperience: z.number().optional(),
        status: z.string().optional(),
        updatedAt: z.string().optional(),
      }),
    }),

    async resolve({ ctx, input }) {
      if (ctx.session?.user.id !== input.userId) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "User can only track their own jobs",
        });
      }
      const trackedJobsRef = ctx.firestore
        .collection("users")
        .doc(input.userId)
        .collection("tracked-jobs")
        .doc(input.jobDetails.companyName.toLowerCase());

      const companyDoc = await trackedJobsRef.get();

      let currentPostings = [];

      if (companyDoc.exists) {
        currentPostings = companyDoc.data()?.postings || [];
      }

      const isJobTracked = currentPostings.some(
        (job: Job) => job.jobId === input.jobDetails.jobId
      );

      if (isJobTracked) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Job is already being tracked",
        });
      }

      const newJobWithTrackedAt = {
        ...input.jobDetails,
      };

      const updatedPostings = [newJobWithTrackedAt, ...currentPostings];

      return await trackedJobsRef.set(
        { postings: updatedPostings },
        { merge: true }
      );
    },
  })
  .mutation("trackedAppliedJobs", {
    input: z.object({
      jobDetails: z.object({
        jobId: z.string(),
        companyName: z.string(),
        endDate: z.nullable(z.string()),
        jobTitle: z.string(),
        location: z.string(),
        startDate: z.nullable(z.string()),
        jobUrl: z.string(),
        description: z.string().optional(),
        skills: z.array(z.string()).optional(),
        yearsOfExperience: z.number().optional(),
        status: z.string().optional(),
      }),
    }),
    async resolve({ ctx, input }) {
      const userId = ctx.session?.user?.id!.trim()!;
      const { jobDetails } = input;

      const userDocRef = ctx.firestore
        .collection("users")
        .doc(userId)
        .collection("trackedAppliedJobs")
        .doc(userId);

      const docSnapshot = await userDocRef.get();

      let jobList: Array<typeof jobDetails> = [];

      if (docSnapshot.exists) {
        jobList = docSnapshot.data()?.appliedJobs || [];
      }

      jobList = jobList.filter((job) => job.jobId !== jobDetails.jobId);
      jobList.push(jobDetails);

      return await userDocRef.set({ appliedJobs: jobList });
    },
  });
