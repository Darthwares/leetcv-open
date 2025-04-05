import { generateValidHref } from "@constants/defaults";
import { profileResumeState } from "@state/state";
import { useTranslations } from "next-intl";
import { useRecoilValue } from "recoil";
import { BookOpenSvg } from "@components/svg";
import { Publication } from "data/models/Publication";
import { motion } from "framer-motion";
import { useEffect } from "react";

export default function Publications() {
  const resume = useRecoilValue(profileResumeState);
  const t = useTranslations("Portfolio");
  const hasPublications = resume.publications && resume.publications.length > 0;
  const publicationLen = resume.publications?.length;

  if (!hasPublications) {
    return null;
  }

  

  let publicationClass = "";
  if (publicationLen === 1) {
    publicationClass = "max-w-lg lg:w-2/5";
  } else if (publicationLen === 2) {
    publicationClass = "md:w-80 lg:max-w-md lg:basis-full";
  } else {
    publicationClass = "md:w-72 lg:max-w-sm lg:basis-full";
  }

  return (
    <section
      id="publications"
      className="py-12 px-5 lg:px-10 lg:py-16 bg-gradient-to-r from-indigo-50 to-pink-50 dark:bg-transparent m-auto"
    >
      <h2 className="text-4xl md:text-5xl text-center font-extrabold tracking-tight text-indigo-900 mb-[4.5rem] dark:text-gray-300">
        {t("publications")}
      </h2>
      <div
        className={`max-w-7xl mx-auto gap-10 flex flex-wrap justify-center ${
          publicationLen === 1 && "gap-4 items-center justify-around"
        }`}
      >
        {publicationLen === 1 && (
          <div className="block h-[24rem] w-[24rem]">
            <img src="/publication.png" alt="publication-lottie" />
          </div>
        )}
        {resume.publications?.map((publication: Publication) => (
          <motion.div
            className={` ${publicationClass} bg-white p-5 md:p-6 rounded-xl shadow-lg dark:text-gray-300 `}
            key={publication.id}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <BookOpenSvg className="h-10 w-10 text-indigo-600 dark:text-gray-300" />
            <h3 className="mt-2 mb-1 text-xl font-bold capitalize line-clamp-3 md:line-clamp-2">
              {publication.title}
            </h3>
            <p className="text-sm text-gray-500">
              {publication.publicationDate}
            </p>
            <p className="mt-3.5 font-medium line-clamp-2">
              {publication.publisher}
            </p>
            <p className="text-gray-600 mt-2.5 mb-1.5 line-clamp-3 md:line-clamp-2 dark:text-gray-300">
              {publication.description}
            </p>
            {publication.publicationURL && (
              <a
                className="text-indigo-600 font-semibold hover:underline dark:text-gray-300"
                href={generateValidHref(publication?.publicationURL)}
                rel="noreferrer"
                target="_blank"
              >
                {t("readMore")}
              </a>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
