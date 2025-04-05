import React from "react";
import {
  Carousel,
  Card,
} from "../../shadcn/components/ui/apple-cards-carousel";

const features = [
  {
    category: "AI Resume",
    url: "/aiResume",
    src: "/assets/homeCarousel/aiResume.jpeg",
    title:
      "Provide your details, and our AI will create a tailored resume to impress.",
  },
  {
    category: "Convert Resume",
    url: "/convertResume",
    src: "/assets/homeCarousel/convertResume.jpeg",
    title: "Upload your PDF, and our AI will enhance your resume.",
  },
  {
    category: "Cover Letter",
    url: "/coverLetter",
    src: "/assets/homeCarousel/coverLetter.png",
    title:
      "Use LeetCV's AI to create impactful cover letters showcasing strengths.",
  },
  {
    category: "Resume Ideas",
    url: "/resumeIdeas",
    src: "/assets/homeCarousel/resumeIdeas.jpeg",
    title: "Add job descriptions, our AI suggests tailored resumes.",
  },
  {
    category: "Portfolio",
    url: "/portfolio",
    src: "/assets/homeCarousel/portfolio.jpeg",
    title: "Create a portfolio to showcase skills and impress recruiters..",
  },
  {
    category: "Messages",
    url: "/messages",
    src: "/assets/homeCarousel/messages.jpeg",
    title: "Connect with peers on LeetCV to boost career growth.",
  },
  {
    category: "Reviews",
    url: "/reviews",
    src: "/assets/homeCarousel/reviews.png",
    title: "Give and receive feedback on resumes to enhance profiles.",
  },
  {
    category: "Requests",
    url: "/requests",
    src: "/assets/homeCarousel/requests.png",
    title: "Approve requests to view your resume, then access theirs",
  },
  {
    category: "Attestation",
    url: "/attestation",
    src: "/assets/homeCarousel/attestation.png",
    title: "Approve validations, request attestations, and review resumes.",
  },
];

export function AllFeaturesLists() {
  const cards = features.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    <div className="w-full h-full py-10 max-w-7xl m-auto px-5">
      <div className="flex flex-col space-y-2 w-full items-center justify-center text-center gap-3">
        <h2 className="text-2xl sm:text-4xl font-bold leading-tight">
          Key Features of Our Product
        </h2>
        <p className="text-gray-600 max-w-md">
          We are constantly building and growing our list of tools and resources
          to help you get hired...
        </p>
        <p className="text-lg font-bold text-indigo-600">
          10x your job search now
        </p>
      </div>
      <Carousel items={cards} />
    </div>
  );
}
