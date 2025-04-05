import React from "react";

type ReusableVideoCardProps = {
  title: string;
  src: string;
};

const ReusableVideoCard = ({ src, title }: ReusableVideoCardProps) => {
  const paths = [
    "/s/prospectAttestation",
    "/s/coverLetter",
    "/s/reviews",
    "/s/prospects",
    "/s/resumeIdeas",
  ];
  const isPathMatched = paths.includes(location.pathname);
  const autoplaySrc = `${src}&autoplay=1&mute=1`;

  return (
    <div className="w-full flex-1" data-testid="reusable-video-card">
      <div className="bg-white dark:bg-gray-800 rounded-lg">
        <h2
          className={`font-semibold dark:text-gray-100 dark:bg-gray-800 px-5 py-4 rounded-t-lg gap-3 ${
            isPathMatched
              ? "bg-indigo-50"
              : "bg-gradient-to-l from-indigo-50 to-pink-100 "
          } `}
          data-testid="video-title"
        >
          {title}
        </h2>
        <div
          className="min-w-96 aspect-w-16 aspect-h-9 min-h-60"
          data-testid="iframe"
        >
          <iframe
            className="w-full h-60  sm:h-80"
            src={autoplaySrc}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
};

export default ReusableVideoCard;
