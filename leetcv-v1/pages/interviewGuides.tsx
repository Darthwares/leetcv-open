import Footer from "@components/home/footer";
import InterviewGuidesBlog from "@components/resources/interviewGuidesBlog";
import PublicPageBlogs from "@components/resources/publicPageBlogs";
import { ProdTitle } from "@lib/helper/setProdTitle";
import { GetStaticPropsContext } from "next";
import { NextSeo } from "next-seo";
import React from "react";

const interViewRelatedBlogs = [
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

const InterviewGuides = () => {
  ProdTitle("");
  return (
    <div>
      <NextSeo
        title={"Interview Guides | LeetCV"}
        description="Prepare for your next job interview with expert-curated guides. LeetCV's Interview Guides offer insights and tips to ace your interviews and advance your career."
        key={
          "Interview Guide, Job Interview Tips, Interview Preparation, Mastering Job Interviews, Common Interview Questions, Post-Interview Follow-Up, Effective Communication, Interview Body Language, Phone Interview Tips, Video Interview Tips, In-Person Interview Tips, Job Interview Success, Professional Dress Code, Interview Confidence, AI-Driven Assessments, Virtual Reality Interviews, Future of Job Interviews, Interview Trends, Company Research, Interview Best Practices"
        }
        canonical={`https://www.leetcv.com/interviewGuides`}
      />
      <InterviewGuidesBlog />
      <PublicPageBlogs blogs={interViewRelatedBlogs} />
      <div className="mt-6 md:mt-8 w-full">
        <Footer />
      </div>
    </div>
  );
};

export default InterviewGuides;

export function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: require(`../messages/${locale}.json`),
      now: new Date().getTime(),
    },
  };
}
