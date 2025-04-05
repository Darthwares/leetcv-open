import Footer from "@components/home/footer";
import CaseStudiesBlog from "@components/resources/caseStudiesBlog";
import PublicPageBlogs from "@components/resources/publicPageBlogs";
import { ProdTitle } from "@lib/helper/setProdTitle";
import { GetStaticPropsContext } from "next";
import { NextSeo } from "next-seo";
import React from "react";

const caseStudyRelatedProps = [
  {
    id: 8,
    title: "Standing Out in the Digital Era: Designing an AI- Enhanced Resume",
    href: "https://www.blogs.leetcv.com/p/standing-out-in-the-digital-era-designing",
    description:
      "In today's competitive job market, it's crucial to find innovative ways to stand out from the crowd...",
    imageUrl:
      "https://substackcdn.com/image/fetch/w_1456,c_limit,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F834ba177-ee3b-4993-a196-2a3be70604b3_627x418.jpeg",
    date: "Aug 2, 2023",
    datetime: "2023-00-02",
    category: {
      title: "AI- Enhanced Resume",
      href: "#",
    },
    author: {
      name: "Ankit",
      role: "Software Engineer",
      href: "https://substack.com/profile/94999178-ankit-verma",
      imageUrl:
        "https://substackcdn.com/image/fetch/w_256,h_256,c_fill,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F283908de-eed3-4f7a-a3ba-449405c64cf1_144x144.png",
    },
  },
  {
    id: 14,
    title:
      "Building a Digital Resume: Mastering Websites, Portfolios, and Social Media",
    href: "https://www.blogs.leetcv.com/p/building-a-digital-resume-mastering",
    description:
      "In a world that's more connected than ever, your digital presence can be a powerful asset in your...",
    imageUrl:
      "https://substackcdn.com/image/fetch/w_320,h_213,c_fill,f_webp,q_auto:good,fl_progressive:steep,g_center/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fa873ed2f-55f1-4596-a13a-155d31c65c04_940x788.png",
    date: "Sep 13, 2023",
    datetime: "2023-09-13",
    category: {
      title: "Digital Resume",
      href: "#",
    },
    author: {
      name: "Arish Kumar",
      role: "Social Media Manager",
      href: "https://substack.com/@arishkumar",
      imageUrl:
        "https://substackcdn.com/image/fetch/w_224,h_224,c_fill,f_webp,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fef8345f8-f9d5-4439-a0c0-70fd3bbcb68b_144x144.png",
    },
  },
  {
    id: 16,
    title: "Breaking the Mold: How LeetCV is Redefining Resume Standards",
    href: "https://www.blogs.leetcv.com/p/breaking-the-mold-how-leetcv-is-redefining",
    description:
      "Resumes, much like first impressions, have the power to make or break career opportunities...",
    imageUrl:
      "https://substackcdn.com/image/fetch/w_320,h_213,c_fill,f_webp,q_auto:good,fl_progressive:steep,g_center/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F3ee21b9d-cfbb-4a65-bc06-878bf6cc8621_500x500.png",
    date: "Oct 05, 2023",
    datetime: "2023-10-05",
    category: {
      title: "Redefining Resume Standards",
      href: "#",
    },
    author: {
      name: "Arish Kumar",
      role: "Social Media Manager",
      href: "https://substack.com/@arishkumar",
      imageUrl:
        "https://substackcdn.com/image/fetch/w_224,h_224,c_fill,f_webp,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fef8345f8-f9d5-4439-a0c0-70fd3bbcb68b_144x144.png",
    },
  },
  {
    id: 19,
    title: "Maximizing Resume Reach",
    href: "https://www.blogs.leetcv.com/p/maximizing-resume-reach",
    description:
      "In the vast ocean of the job market, casting a wide net is important, but ensuring that...",
    imageUrl:
      "https://substackcdn.com/image/fetch/w_320,h_213,c_fill,f_webp,q_auto:good,fl_progressive:steep,g_center/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd1421864-c980-4514-9015-c76f56ec9a0e_1920x1080.png",
    date: "Oct 18, 2023",
    datetime: "2023-10-18",
    category: {
      title: "Maximizing Resume Reach",
      href: "#",
    },
    author: {
      name: "Arish Kumar",
      role: "Social Media Manager",
      href: "https://substack.com/@arishkumar",
      imageUrl:
        "https://substackcdn.com/image/fetch/w_224,h_224,c_fill,f_webp,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fef8345f8-f9d5-4439-a0c0-70fd3bbcb68b_144x144.png",
    },
  },
  {
    id: 22,
    title: "The Future of Resumes: Digital CV",
    href: "https://www.blogs.leetcv.com/p/the-future-of-resumes-digital-cv",
    description:
      "In a world rapidly transitioning to digital dominance, it's surprising that many of us clung to...",
    imageUrl:
      "https://substackcdn.com/image/fetch/w_320,h_213,c_fill,f_webp,q_auto:good,fl_progressive:steep,g_center/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fc9d727ed-966f-4f1e-bdf9-5dfd03f0a49d_612x414.jpeg",
    date: "Oct 27, 2023",
    datetime: "2023-10-27",
    category: {
      title: "Digital CV",
      href: "#",
    },
    author: {
      name: "Arish Kumar",
      role: "Social Media Manager",
      href: "https://substack.com/@arishkumar",
      imageUrl:
        "https://substackcdn.com/image/fetch/w_224,h_224,c_fill,f_webp,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fef8345f8-f9d5-4439-a0c0-70fd3bbcb68b_144x144.png",
    },
  },
  {
    id: 25,
    title:
      "Age of Personal Branding: Building a Cohesive Online Presence with LeetCV",
    href: "https://www.blogs.leetcv.com/p/age-of-personal-branding-building",
    description:
      "Hello visionaries! Welcome to the age of personal branding, where your online presence is your...",
    imageUrl:
      "https://substackcdn.com/image/fetch/w_320,h_213,c_fill,f_webp,q_auto:good,fl_progressive:steep,g_center/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fc2774f23-676a-47b4-99ed-97553ad3b8c7_1640x924.png",
    date: "Nov 10, 2023",
    datetime: "2023-11-10",
    category: {
      title: "Personal Branding",
      href: "#",
    },
    author: {
      name: "Arish Kumar",
      role: "Social Media Manager",
      href: "https://substack.com/@arishkumar",
      imageUrl:
        "https://substackcdn.com/image/fetch/w_224,h_224,c_fill,f_webp,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fef8345f8-f9d5-4439-a0c0-70fd3bbcb68b_144x144.png",
    },
  },
];

const CaseStudies = () => {
  ProdTitle("");
  return (
    <div>
      <NextSeo
        title={"Case Studies | LeetCV"}
        description="Explore success stories and in-depth analyses with LeetCV's Case Studies. Gain insights into real-world applications and outcomes to enhance your professional journey."
        key={
          "Case Studies, Online Resume Success, Job Search Strategies, Interview Preparation, Real-World Success Stories, AI Resume Tools, Personalized Applications, Networking for Jobs, Continuous Skill Improvement, Job Market Trends, Career Success Stories, Effective Job Applications, Innovative Job Search, Digital Resumes, Professional Networking, AI in Job Search, Virtual Reality Interviews, Personalized Job Matching, Future of Job Searching, Career Growth Insights"
        }
        canonical={`https://www.leetcv.com/caseStudies`}
      />
      <CaseStudiesBlog />
      <PublicPageBlogs blogs={caseStudyRelatedProps} />
      <div className="mt-6 md:mt-8 w-full">
        <Footer />
      </div>
    </div>
  );
};

export default CaseStudies;

export function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: require(`../messages/${locale}.json`),
      now: new Date().getTime(),
    },
  };
}
