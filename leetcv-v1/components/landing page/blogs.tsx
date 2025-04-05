import React from "react";
import { Card, CardContent } from "shadcn/components/ui/card";

type BlogCardProps = {
  imageSrc: string;
  avatarSrc: string;
  avatarFallback: string;
  author: string;
  description: string;
  title: string;
  storyLink: string;
};

const BlogCard: React.FC<BlogCardProps> = ({
  imageSrc,
  avatarSrc,
  avatarFallback,
  author,
  description,
  title,
  storyLink,
}) => {
  return (
    <Card className="max-w-xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="relative">
        <img
          src={imageSrc}
          alt={title}
          width={400}
          height={200}
          className="w-full h-full object-contain"
        />
      </div>
      <CardContent className="p-6">
        <h3 className="text-xl font-bold text-gray-800">{title}</h3>
        <p className="mt-4 text-gray-600">{description}</p>
        <div className="flex items-center justify-between mt-4">
          <div className="ml-2">
            <h2 className="text-lg text-blue-600 font-bold">{author}</h2>
          </div>
          <a
            href={storyLink}
            className="text-indigo-600 text-primary font-bold block"
          >
            Read Story
          </a>
        </div>
      </CardContent>
    </Card>
  );
};

const Blog: React.FC = () => {
  const blogCards = [
    {
      imageSrc: "/assets/blog/reviews.png",
      avatarSrc:
        "https://substackcdn.com/image/fetch/w_80,c_limit,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F77297cf7-f975-4619-95dc-16cd672e4219_1080x1080.jpeg",
      avatarFallback: "AK",
      date: "AUG 30, 2023",
      author: "",
      id: "blog-1",
      description:
        "Your resume is often your first chance to make an impression on a potential employer. It's crucial to get it right, and one of the best ways to ensure this is by seeking reviews.",
      title: "Getting Reviews on Your Resume: A Step-by-Step Guide",
      storyLink:
        "https://www.blogs.leetcv.com/p/getting-reviews-on-your-resume-a?utm_source=publication-search",
    },
    {
      imageSrc: "/assets/blog/continuousReviews.png",
      avatarSrc:
        "https://substackcdn.com/image/fetch/w_80,c_limit,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F77297cf7-f975-4619-95dc-16cd672e4219_1080x1080.jpeg",
      avatarFallback: "AK",
      date: "AUG 30, 2023",
      id: "blog-2",
      author: "",
      description:
        "The journey to the perfect resume is seldom a straight path. It's more akin to a sculptor chiselling away, with each stroke refining the masterpiece.",
      title:
        "Feedback Loop: How Continuous Reviews Shape a Winning Resume on Leetcv",
      storyLink:
        "https://www.blogs.leetcv.com/p/feedback-loop-how-continuous-reviews?utm_source=publication-search",
    },
    {
      imageSrc: "/assets/blog/expertReviews.png",
      avatarSrc:
        "https://substackcdn.com/image/fetch/w_320,h_213,c_fill,f_webp,q_auto:good,fl_progressive:steep,g_center/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F28091e95-09f7-45d1-97ec-6cf4bb4c50c7_1080x1080.png",
      avatarFallback: "AK",
      date: "NOV 03, 2023",
      id: "blog-2",
      author: "",
      description:
        "Your resume is more than just a document – it's a representation of your professional journey. It speaks for you before you get a chance to.",
      title:
        "Revamp Your Resume with Expert Reviews: Leetcv's Exclusive Request & Review Feature",
      storyLink:
        "https://www.blogs.leetcv.com/p/revamp-your-resume-with-expert-reviews?utm_source=publication-search",
    },
    {
      imageSrc: "/assets/blog/convertResume.png",
      avatarSrc:
        "https://substackcdn.com/image/fetch/w_80,c_limit,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F77297cf7-f975-4619-95dc-16cd672e4219_1080x1080.jpeg",
      avatarFallback: "AK",
      date: "NOV 30, 2023",
      id: "blog-2",
      author: "",
      description:
        "Boost your job prospects by converting your traditional resume into a dynamic digital format. Revolutionize your resume presentation to stand out to potential employers.",
      title:
        "Upgrade Your Resume Game with Leetcv's 'Convert Resumes' – Your Digital Resume Revolution!",
      storyLink:
        "https://www.blogs.leetcv.com/p/getting-reviews-on-your-resume-a?utm_source=publication-search",
    },
    {
      imageSrc: "/assets/blog/upToDateResume.png",
      avatarSrc:
        "https://substackcdn.com/image/fetch/w_80,c_limit,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F77297cf7-f975-4619-95dc-16cd672e4219_1080x1080.jpeg",
      avatarFallback: "AK",
      date: "AUG 09, 2023",
      id: "blog-2",
      author: "",
      description:
        "In today’s fast job market, traditional resumes fall short. Job seekers must show real-time skills, achievements, and adaptability. This is where the 'living resume' concept shines.",
      title: "Building a living resume that’s always up to date",
      storyLink:
        "https://www.blogs.leetcv.com/p/building-a-living-resume-thats-always?utm_source=publication-search",
    },
    {
      imageSrc: "/assets/blog/attestation.png",
      avatarSrc:
        "https://substackcdn.com/image/fetch/w_80,c_limit,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F77297cf7-f975-4619-95dc-16cd672e4219_1080x1080.jpeg",
      avatarFallback: "AK",
      date: "OCT 07, 2023",
      id: "blog-2",
      author: "",
      description:
        "In a world of instant information, authenticity is key. While a strong resume can impress, how do recruiters verify project claims? Leetcv solves this with its innovative Project Attestation feature.",
      title: "Ensuring Authenticity with Project Attestation:",
      storyLink:
        "https://www.blogs.leetcv.com/p/ensuring-authenticity-with-project",
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 mx-auto w-full gap-6">
      {blogCards.map((card, index) => (
        <BlogCard key={index} {...card} />
      ))}
    </div>
  );
};

const Blogs: React.FC = () => {
  return (
    <div
      className="space-y-10 py-10 mx-auto ]
"
    >
      <div className="section no-top-space bg-primary-3 flex flex-col items-center justify-center w-full bg-indigo-950 py-10">
        <img
          src="/assets/curve.svg"
          alt="leetCV asset"
          className="divider blog-divider-top"
        />
        <div className="blog-container px-4 md:px-8 lg:px-9">
          <h2 className="pb-5 sm:text-4xl text-2xl text-center font-bold text-white relative -top-7">
            De-stress your job search with LeetCV.
          </h2>
          <Blog />
        </div>
      </div>
    </div>
  );
};

export default Blogs;
