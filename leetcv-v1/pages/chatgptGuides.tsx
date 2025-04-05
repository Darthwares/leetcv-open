import Footer from "@components/home/footer";
import ChatgptGuidesBlog from "@components/resources/chatgptGuidesBlog";
import PublicPageBlogs from "@components/resources/publicPageBlogs";
import { ProdTitle } from "@lib/helper/setProdTitle";
import { GetStaticPropsContext } from "next";
import { NextSeo } from "next-seo";
import React from "react";

const chatgptRelatedBlog = [
  {
    id: 2,
    title: "Using AI to refine and generate text that's crisp",
    href: "https://www.blogs.leetcv.com/p/using-ai-to-refine-and-generate-text",
    description:
      "Artificial intelligence (AI) is revolutionizing the way we work, play, and communicate. From virtual assistants to autonomous vehicles, AI is changing our world in ways we couldn't have imagined just a few years ago...",
    imageUrl:
      "https://images.unsplash.com/photo-1542435503-956c469947f6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
    date: "March 9, 2023",
    datetime: "2023-03-09",
    category: {
      title: "AI Resume Creating",
      href: "#",
    },
    author: {
      name: "Shailendra",
      role: "Software Engineer",
      href: "https://substack.com/profile/99508904-shailendra-kumar",
      imageUrl:
        "https://substackcdn.com/image/fetch/w_64,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ff51da3dd-9424-487d-a31f-a749f9cf7785_144x144.png",
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
    id: 10,
    title:
      "AI and Education: Enhancing Learning Experiences with Intelligent Systems",
    href: "https://www.blogs.leetcv.com/p/building-a-living-resume-thats-always",
    description:
      "Artificial Intelligence (AI) is no longer the stuff of science fiction. It's embedded in our everyday...",
    imageUrl:
      "https://substackcdn.com/image/fetch/w_320,h_213,c_fill,f_webp,q_auto:good,fl_progressive:steep,g_center/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fe120b0b6-0f4f-497e-88dc-62f3c629a024_1500x1000.jpeg",
    date: "Aug 16, 2023",
    datetime: "2023-08-16",
    category: {
      title: "AI and Education",
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
    id: 11,
    title:
      "How AI is revolutionizing the Recruitment Process - Starting with Resumes",
    href: "https://www.blogs.leetcv.com/p/how-ai-is-revolutionizing-the-recruitment",
    description:
      "Artificial Intelligence (AI) is shaking up our work lives, including how we hire people. It can do...",
    imageUrl:
      "https://substackcdn.com/image/fetch/w_1456,c_limit,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fc8e5974b-d46e-45c1-bb0b-3ead55fb3dcf_1920x1080.jpeg",
    date: "Aug 23, 2023",
    datetime: "2023-08-23",
    category: {
      title: "Recruitment Process",
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
    id: 15,
    title: "Human Touch vs AI : Efficiency in Resume Writing",
    href: "https://www.blogs.leetcv.com/p/human-touch-vs-ai-efficiency-in-resume",
    description:
      "In today's fast-paced world, where every second counts, artificial intelligence (AI) has become an ...",
    imageUrl:
      "https://substackcdn.com/image/fetch/w_320,h_213,c_fill,f_webp,q_auto:good,fl_progressive:steep,g_center/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F02690f7d-b698-4937-8dd8-db526401ce2a_770x476.jpeg",
    date: "Sep 20, 2023",
    datetime: "2023-09-20",
    category: {
      title: "Human Touch vs AI",
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
    id: 18,
    title: "Harnessing AI in Resume Building",
    href: "https://www.blogs.leetcv.com/p/harnessing-ai-in-resume-building",
    description:
      "Artificial intelligence is no longer just a buzzword of the tech-savvy or the domain of sci-fi...",
    imageUrl:
      "https://substackcdn.com/image/fetch/w_320,h_213,c_fill,f_webp,q_auto:good,fl_progressive:steep,g_center/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F824de2fa-17a8-4fd4-8f0c-5b51fab946de_940x788.png",
    date: "Oct 13, 2023",
    datetime: "2023-10-13",
    category: {
      title: "Harnessing AI",
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
    id: 21,
    title: "Overcoming Common Resume Mistakes with AI",
    href: "https://www.blogs.leetcv.com/p/overcoming-common-resume-mistakes",
    description:
      "Your resume is your golden ticket to the professional world—a document that can open doors to...",
    imageUrl:
      "https://substackcdn.com/image/fetch/w_320,h_213,c_fill,f_webp,q_auto:good,fl_progressive:steep,g_center/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F5d444eb3-46ca-4942-8843-da9c2c4cba10_840x438.jpeg",
    date: "Oct 25, 2023",
    datetime: "2023-10-25",
    category: {
      title: "Resume Mistakes with AI",
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

const ChatgptGuides = () => {
  ProdTitle("");
  return (
    <div>
      <NextSeo
        title={"ChatGPT Guides | LeetCV"}
        description="Unlock the potential of ChatGPT with comprehensive guides. LeetCV's ChatGPT Guides help you leverage AI technology for enhanced productivity and creativity."
        key={
          "ChatGPT Job Guide, Job Search with ChatGPT, Interview Preparation with ChatGPT, AI Resume Building, Writing Cover Letters with ChatGPT, Optimizing Job Search, ChatGPT Interview Tips, Personalized Resume Advice, Tailored Cover Letters, Effective Job Applications, AI Job Matching, Virtual Job Preparation, Real-Time Job Matching, ChatGPT Career Tips, AI-Driven Job Search, Enhanced Interview Simulations, Future of Job Searching, ChatGPT in Career Development, Advanced Job Search Strategies, AI-Powered Career Tools"
        }
        canonical={`https://www.leetcv.com/chatgptGuides`}
      />
      <ChatgptGuidesBlog />
      <PublicPageBlogs blogs={chatgptRelatedBlog} />
      <div className="mt-6 md:mt-8 w-full">
        <Footer />
      </div>
    </div>
  );
};

export default ChatgptGuides;

export function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: require(`../messages/${locale}.json`),
      now: new Date().getTime(),
    },
  };
}
