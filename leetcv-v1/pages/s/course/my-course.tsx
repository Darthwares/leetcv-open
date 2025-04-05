import React, { useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import { trpc } from "@utils/trpc";
import { NextSeo } from "next-seo";
import { useSession } from "next-auth/react";
import Container from "@components/container";
import Footer from "@components/home/footer";
import Header from "@components/leetlingo/header";
import CourseHistory from "@components/leetlingo/courseHistory";
import NoActiveCourseFound from "@components/leetlingo/noActiveCourseFount";

const CourseList = () => {
  const router = useRouter();
  const { status } = useSession();

  const { data: courses = [], isLoading } = trpc.useQuery(
    ["fs.leetCourseRouter.getAllCourses"],
    {
      cacheTime: 1000 * 60 * 5,
      staleTime: 1000 * 60 * 2,
    }
  );
  
  useEffect(() => {
    import("@lottiefiles/lottie-player");
  }, []);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  const SEO_CONFIG = {
    title: "My Courses | LeetCV",
    description: "Sharpen Your Skills with Professional Online Courses", 
    key: "LeetCV, Courses, Professional Online Courses, Sharpen Your Skills",
    path: "/s/course/my-course",
    imageUrl: "https://res.cloudinary.com/daxmjqsy2/image/upload/v1720161898/sharable-link_v3znym.png"
  };

  const seoData = useMemo(
    () => ({
      title: SEO_CONFIG.title,
      description: SEO_CONFIG.description,
      key: SEO_CONFIG.key,
      url: `https://www.leetcv.com${SEO_CONFIG.path}`,
      images: [
        {
          url: SEO_CONFIG.imageUrl,
          width: 800,
          height: 600,
          alt: SEO_CONFIG.title,
        },
      ],
    }),
    []
  );

  const jsonLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "WebPage", 
      name: SEO_CONFIG.title,
      description: seoData.description,
      url: seoData.url,
    }),
    [seoData.description, seoData.url]
  );

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

      <Container loading={isLoading}>
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 py-6">
          <Header
            actionButtonText="Back to Courses"
            path="/s/course"
            fadedTitle="MY ACTIVE COURSES"
            title="Continue Learning with Your Courses"
          />
          {!isLoading && courses.length === 0 && <NoActiveCourseFound />}
          {courses.length > 0 && <CourseHistory allCourses={courses} />}
        </div>
        <div className="pt-14">
          <Footer />
        </div>
      </Container>
    </>
  );
};

export default CourseList;

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    messages: require(`../../../messages/${locale}.json`),
    now: Date.now(),
  },
});
