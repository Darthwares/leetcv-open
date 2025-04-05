import React from "react";
import GetStartedButton from "./getStartedButton";

interface BlogSection {
  title: string;
  text: string;
  list?: { title: string; text: string }[];
}

interface BlogProps {
  title: string;
  description: {
    title: string;
    text: string;
    conclusion: string;
  };
  sections: BlogSection[];
  image: string;
  buttonUrl?: string;
}

const AiFeatureBlog = ({
  title,
  description,
  sections,
  image,
  buttonUrl,
}: BlogProps) => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10 bg-white lg:px-12">
      <article>
        <p className="bg-gray-100 text-sm inline-block font-medium text-gray-600 mb-2.5 rounded-md px-3.5 py-2">
          {title}
        </p>
        <div
          className={`mb-6 bg-no-repeat bg-center ${
            title === "AI Resume" ? "bg-contain" : "bg-cover"
          } h-60 md:h-80 lg:h-96 border border-gray-200 rounded-lg`}
          style={{ backgroundImage: `url(${image})` }}
        ></div>
        <section className="mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900">
            {description.title}
          </h2>
          <p className="mt-4 text-center text-lg text-gray-600">
            {description.text}
          </p>
        </section>
        {sections.map((section, index) => (
          <section className="mb-8" key={index}>
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
              {section.title}
            </h2>
            <p className="mt-2 leading-7 text-gray-700">{section.text}</p>
            {index === 0 && buttonUrl && (
              <div className="mt-4">
                <GetStartedButton url={buttonUrl} />
              </div>
            )}
            {section.list && (
              <ul className="list-disc pl-5 mt-2 space-y-2 text-gray-700 leading-7">
                {section.list.map((item, idx) => (
                  <li key={idx}>
                    <strong>{item.title}</strong> {item.text}
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}

        <section className="mt-6 text-gray-700">
          <p className="leading-7">{description.conclusion}</p>
        </section>
      </article>
    </div>
  );
};

export default AiFeatureBlog;
