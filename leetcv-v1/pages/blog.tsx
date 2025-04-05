import BlogList from "@components/blogList";
import Footer from "@components/home/footer";
import ScrollToTop from "@components/scrollToTop";
import { useBlogsList } from "@lib/helper/useBlogsList";
import { pageTitleState } from "@state/state";
import { GetStaticPropsContext } from "next";
import { useTranslations } from "next-intl";
import { NextSeo } from "next-seo";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";

function Blogger() {
  const t = useTranslations("Blog");
  const { blogList } = useBlogsList();
  const setProdTitle = useSetRecoilState(pageTitleState);

  useEffect(() => {
    setProdTitle(t("blogs"));
  }, []);

  return (
    <>
      <NextSeo
        title="Blogs | LeetCV"
        description="LeetCV's blog offers expert career advice and industry insights regularly."
        key="LeetCV, LeetCV Blogs, Career Advice, Industry Insights, Professional Development"
        canonical="https://www.leetcv.com/blog"
        openGraph={{
          url: "https://www.leetcv.com/blog",
          title: "Blogs | LeetCV - Expert Career Advice & Industry Insights",
          description:
            "Explore LeetCV's blog for expert career advice, tips, and industry insights to help boost your professional growth.",
          images: [
            {
              url: "https://res.cloudinary.com/daxmjqsy2/image/upload/v1720161898/sharable-link_v3znym.png",
              width: 1200,
              height: 630,
              alt: "LeetCV Blog",
            },
          ],
          type: "website",
          site_name: "LeetCV",
        }}
      />
      <div className="bg-white dark:bg-gray-900 pt-5 py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:max-w-7xl">
            <h2 className="text-3xl font-bold tracking-tight dark:text-white text-gray-900 sm:text-4xl">
              {t("fromBlog")}
            </h2>
            <p className="mt-2 text-lg leading-8 dark:text-gray-100 text-gray-600">
              {t("learnHow")}
            </p>
            <div className="mt-16 space-y-12 lg:mt-12">
              <BlogList posts={blogList} />
            </div>
          </div>
        </div>
      </div>
      <ScrollToTop />
      <Footer />
    </>
  );
}

export default Blogger;

export function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: require(`../messages/${locale}.json`),
      now: new Date().getTime(),
    },
  };
}
