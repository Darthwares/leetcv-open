import React, { useEffect, useMemo, useState, useCallback } from "react";
import { useRouter } from "next/router";
import { Search } from "lucide-react";
import { trpc } from "@utils/trpc";
import { NextSeo } from "next-seo";
import CoursesList from "@components/leetlingo/coursesList";
import { useSession } from "next-auth/react";
import Container from "@components/container";
import Footer from "@components/home/footer";
import Header from "@components/leetlingo/header";
import NoCourseFound from "@components/leetlingo/noCourseFound";
import { useRecoilState } from "recoil";
import { subscriptionPlanState, userIdState } from "@state/state";

const POLLING_INTERVAL = 30000; // 30 seconds

const CourseList = () => {
  const router = useRouter();
  const { status } = useSession();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCourses, setFilteredCourses] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const setCourseLives = trpc.useMutation(["fs.leetCourse.setCourseLives"]);
  const [userId] = useRecoilState(userIdState);
  const [plan] = useRecoilState(subscriptionPlanState);

  const handleCourseLives = async () => {
    if (status === "authenticated" && userId) {
      setCourseLives.mutateAsync({
        id: userId,
        plan,
      });
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      handleCourseLives();
    }
  }, [status, userId]);

  const { data: allCourses, isLoading: isCoursesLoading } = trpc.useQuery(
    ["fs.leetCourseRouter.getAllCourses"],
    {
      refetchInterval: POLLING_INTERVAL,
      refetchIntervalInBackground: true,
      refetchOnWindowFocus: true,
      retry: 3,
      onError: (error) => {
        console.error("Failed to fetch courses:", error);
        setError("Failed to load courses. Please try again later.");
      },
    }
  );

  const filterCourse = useCallback(() => {
    if (!allCourses) return;

    try {
      const searchTerm = searchQuery.toLowerCase();
      const filtered = allCourses.filter(
        (course: any) =>
          course.courseName?.toLowerCase().includes(searchTerm) ||
          course.tags?.some((tag: string) =>
            tag.toLowerCase().includes(searchTerm)
          )
      );
      setFilteredCourses(filtered);
    } catch (err) {
      setError("Error filtering courses. Please try again.");
    }
  }, [allCourses, searchQuery]);

  useEffect(() => {
    if (allCourses) {
      try {
        setFilteredCourses(allCourses);
        setError(null);
      } catch (err) {
        setError("Error loading courses. Please refresh the page.");
      }
    }
  }, [allCourses]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      filterCourse();
    }, 300); // Debounce search by 300ms

    return () => clearTimeout(debounceTimer);
  }, [searchQuery, filterCourse]);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  const seoData = useMemo(
    () => ({
      title: "My Courses | LeetCV",
      description: "Sharpen Your Skills with Professional Online Courses",
      key: "LeetCV, Courses, Professional Online Courses, Sharpen Your Skills",
      url: "https://www.leetcv.com/s/courses",
      images: [
        {
          url: "https://res.cloudinary.com/daxmjqsy2/image/upload/v1720161898/sharable-link_v3znym.png",
          width: 800,
          height: 600,
          alt: "LeetCV Courses",
        },
      ],
    }),
    []
  );

  const jsonLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Courses",
      description: seoData.description,
      url: seoData.url,
    }),
    [seoData.description, seoData.url]
  );

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);
    },
    []
  );

  const handleRetry = useCallback(() => {
    setError(null);
    filterCourse();
  }, [filterCourse]);

  const renderContent = () => {
    if (error) {
      return (
        <div className="text-center py-8">
          <p className="text-red-500 text-lg mb-4">{error}</p>
          <button
            onClick={handleRetry}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Retry
          </button>
        </div>
      );
    }
    if (!isCoursesLoading && filteredCourses?.length === 0) {
      return <NoCourseFound />;
    }
    if (filteredCourses.length > 0) {
      return (
        <div id="courses-section">
          <CoursesList allCourses={filteredCourses} />
        </div>
      );
    }
    return null;
  };
  return (
    <>
      <NextSeo
        title={seoData.title}
        description={seoData.description}
        key={seoData.key}
        canonical={seoData.url}
        openGraph={{
          url: seoData.url,
          title: seoData.title,
          description: seoData.description,
          images: seoData.images,
          type: "website",
          site_name: "LeetCV",
        }}
      />
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>

      <Container loading={isCoursesLoading}>
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 py-6">
          <Header
            actionButtonText="My Courses"
            path="/s/course/my-course"
            fadedTitle="BEST LEARNING COURSES"
            title="Sharpen Your Skills with Professional Online Courses"
          />
          <div className="relative py-10">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="w-full py-3 px-12 bg-white rounded-full focus:ring-2 focus:ring-indigo-500 transition-shadow"
              placeholder="Search your course...."
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>

          {renderContent()}
        </div>
        <div className="pt-14">
          <Footer />
        </div>
      </Container>
    </>
  );
};

export default CourseList;

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      messages: require(`../../../messages/${locale}.json`),
      now: new Date().getTime(),
    },
  };
};
