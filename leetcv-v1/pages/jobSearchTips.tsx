import Footer from "@components/home/footer";
import JobSearchTipsBlog from "@components/resources/jobSearchTipsBlog";
import PublicPageBlogs from "@components/resources/publicPageBlogs";
import { ProdTitle } from "@lib/helper/setProdTitle";
import { GetStaticPropsContext } from "next";
import { NextSeo } from "next-seo";
import React from "react";

const jobsRelatedBlogs = [
  {
    id: 3,
    title: "Crafting a Stand-Out Resume: Tips for Success",
    href: "https://www.blogs.leetcv.com/p/crafting-a-stand-out-resume-tips",
    description:
      "Creating a new resume can be a daunting task, especially if you haven't done it in a while. Your resume is often the first...",
    imageUrl:
      "https://images.unsplash.com/photo-1485988412941-77a35537dae4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1196&q=80",
    date: "Mar 14, 2023",
    datetime: "2023-03-14",
    category: {
      title: "Tips",
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
    id: 7,
    title: "The Power of AI in Resume Writing: Enhancing Your Job Search",
    href: "https://www.blogs.leetcv.com/p/how-to-make-your-resume-stand-out",
    description:
      "In the modern job market, standing out amongst the competition is crucial, and presenting a...",
    imageUrl:
      "https://substackcdn.com/image/fetch/w_1456,c_limit,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F0821be71-106b-4fcb-9464-2b96eb45d66c_854x360.jpeg",
    date: "Jul 28, 2023",
    datetime: "2023-07-28",
    category: {
      title: "AI Power",
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
    id: 26,
    title:
      "Beyond Job Hunting: Using LeetCV for Networking and Personal Growth",
    href: "https://www.blogs.leetcv.com/p/beyond-job-hunting-using-leetcv-for",
    description:
      "Hello, explorers of opportunities! Imagine using your resume not just as a key to unlock job...",
    imageUrl:
      "https://substackcdn.com/image/fetch/w_320,h_213,c_fill,f_webp,q_auto:good,fl_progressive:steep,g_center/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd313f463-c4ad-414c-b76c-3314c2416eda_1920x1080.png",
    date: "Nov 15, 2023",
    datetime: "2023-11-15",
    category: {
      title: "Networking & Personal Growth",
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
    id: 13,
    title: "Are you thinking about switching to new career?",
    href: "https://www.blogs.leetcv.com/p/are-you-thinking-about-switching",
    description:
      "Are you thinking about switching to a new career? Whether you want to change within your field ...",
    imageUrl:
      "https://substackcdn.com/image/fetch/w_320,h_213,c_fill,f_webp,q_auto:good,fl_progressive:steep,g_center/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F72896be3-4273-4065-b8a4-bfc4a744b013_1920x1080.jpeg",
    date: "Sep 6, 2023",
    datetime: "2023-09-06",
    category: {
      title: "Career",
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
    id: 6,
    title: "How to Make Your Resume Stand Out in a Crowded Job Market",
    href: "https://www.blogs.leetcv.com/p/how-to-make-your-resume-stand-out",
    description:
      "In today's competitive job market, it's essential to have a resume that stands out from the crowd...",
    imageUrl:
      "https://substackcdn.com/image/fetch/w_1456,c_limit,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F2daf7723-d508-49f6-acd5-653a05fa374d_500x750.jpeg",
    date: "Mar 24, 2023",
    datetime: "2023-03-24",
    category: {
      title: "Resume",
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
    id: 26,
    title:
      "Beyond Job Hunting: Using LeetCV for Networking and Personal Growth",
    href: "https://www.blogs.leetcv.com/p/beyond-job-hunting-using-leetcv-for",
    description:
      "Hello, explorers of opportunities! Imagine using your resume not just as a key to unlock job...",
    imageUrl:
      "https://substackcdn.com/image/fetch/w_320,h_213,c_fill,f_webp,q_auto:good,fl_progressive:steep,g_center/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd313f463-c4ad-414c-b76c-3314c2416eda_1920x1080.png",
    date: "Nov 15, 2023",
    datetime: "2023-11-15",
    category: {
      title: "Networking & Personal Growth",
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

const JobSearchTips = () => {
  ProdTitle("");
  return (
    <div>
      <NextSeo
        title={"Job Search Tips | LeetCV"}
        description="Discover effective job search strategies with LeetCV's Job Search Tips. Learn how to navigate the job market and secure your dream job with expert advice."
        key={
          "Job Search Tips, Effective Job Search Strategies, Resume Crafting, Cover Letter Tips, Networking for Job Search, Online Job Portals, Interview Preparation, Job Application Tips, Professional Networking, Job Market Trends, AI Job Matching, Virtual Job Fairs, Remote Work Opportunities, Continuous Learning, Industry Trends, Job Search Goals, Staying Organized, Follow-Up Strategies, Career Advancement, Job Search Success"
        }
        canonical={`https://www.leetcv.com/jobSearchTips`}
      />
      <JobSearchTipsBlog />
      <PublicPageBlogs blogs={jobsRelatedBlogs} />
      <div className="mt-6 md:mt-8 w-full">
        <Footer />
      </div>
    </div>
  );
};

export default JobSearchTips;

export function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: require(`../messages/${locale}.json`),
      now: new Date().getTime(),
    },
  };
}
