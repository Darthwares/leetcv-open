import { useState } from "react";
import ButtonWithIcon from "./buttonWithIcon";
import { AVATAR_IMAGE } from "@constants/defaults";
import RedirectUser from "@components/redirectUser";
interface CheckResolvedProps {
  reviews: any;
}
export default function ReviewDetails({ reviews }: CheckResolvedProps) {
  const [expanded, setExpanded] = useState(false);
  const MAX_DISPLAY_WORDS = 30;
  const words = reviews?.content?.split(" ");
  const displayContent = expanded
    ? words?.join(" ")
    : words?.slice(0, MAX_DISPLAY_WORDS).join(" ");
  
  return (
    <ul role="list" className="space-y-4 w-full">
      <li className="bg-white px-4 py-6 shadow border border-gray-300 rounded-lg sm:p-6">
        <article>
          <div>
            <div className="flex space-x-3">
              <div className="flex-shrink-0">
                <img
                  className="h-12 w-12 rounded-full object-cover"
                  loading="lazy"
                  src={reviews?.image ?? AVATAR_IMAGE}
                  alt={reviews?.title}
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p
                  className={`${
                    reviews?.status !== "Resolved" ? "w-56" : "w-40"
                  } text-sm font-medium text-gray-900 md:w-48 truncate`}
                >
                  <RedirectUser
                    handle={reviews?.requesterHandle}
                    username={reviews?.username}
                  />
                </p>
                <p
                  className={`${
                    reviews?.status !== "Resolved" ? "w-56" : "w-40"
                  } text-sm text-gray-500 md:w-48 truncate`}
                >
                  {reviews.requesterPosition}
                </p>
              </div>
              <div>
                {reviews?.status === "Resolved" && (
                  <span className="px-3 transition-all duration-300 border border-transparent p-1 font-medium rounded-full text-green-800 text-sm bg-green-100">
                    {"Resolved"}
                  </span>
                )}
              </div>
            </div>
            <h2 className="mt-4 text-base capitalize font-medium text-gray-900">
              {reviews?.reviewTitle}
            </h2>
          </div>
          <div className="mt-2 space-y-4 text-sm text-gray-700">
            {displayContent}
            {words?.length > MAX_DISPLAY_WORDS && (
              <span
                onClick={() => setExpanded(!expanded)}
                className="text-indigo-500 hover:text-indigo-700 cursor-pointer pr-1"
              >
                {expanded ? " Read less" : "...  Read more"}
              </span>
            )}
          </div>
          <div className="mt-6 flex justify-between">
            <div className="flex w-full">
              <ButtonWithIcon reviews={reviews} />
            </div>
          </div>
        </article>
      </li>
    </ul>
  );
}
