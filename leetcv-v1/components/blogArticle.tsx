import { AVATAR_IMAGE } from "@constants/defaults";
import React from "react";
import { BlogListProps } from "./blogList";

type BlogArticleProps = {
  post: BlogListProps;
};

const BlogArticle = ({ post }: BlogArticleProps) => {
  return (
    <article
      key={post.id}
      className="flex flex-col items-start justify-between"
      data-testid={`article-${post.id}`}
    >
      <a href={post.href} target="_blank" rel="noreferrer">
        <div className="relative w-full">
          <img
            src={post.imageUrl}
            alt={post.title}
            data-testid={`image-${post.id}`}
            className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
          />
          <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
        </div>
      </a>
      <div className="max-w-xl">
        <div className="mt-8 flex items-center gap-x-4 text-xs">
          <time
            dateTime={post.datetime}
            className="text-gray-500 dark:text-gray-200"
            data-testid={`dataTime-${post.id}`}
          >
            {post.date}
          </time>
          <p
            className="relative z-10 rounded-full bg-gray-50 py-1.5 px-3 font-medium text-gray-600 hover:bg-gray-100"
            data-testid={`category-${post.id}`}
          >
            {post.category.title}
          </p>
        </div>
        <div className="group relative">
          <h3
            className="mt-3 text-lg font-semibold leading-6 dark:text-white text-gray-900 group-hover:text-gray-600 dark:group-hover:text-gray-300"
            data-testid={`postTitle-${post.id}`}
          >
            <a href={post.href} target="_blank" rel="noreferrer">
              <span className="absolute inset-0" />
              {post.title}
            </a>
          </h3>
          <p
            className="mt-5 text-sm leading-6 text-gray-600 dark:text-gray-100 line-clamp-3"
            data-testid={`description-${post.id}`}
          >
            {post.description}
          </p>
        </div>
        <div className="relative mt-8 flex items-center gap-x-4">
          <img
            src={post.author.imageUrl || AVATAR_IMAGE}
            alt={post.title}
            className="h-10 w-10 rounded-full bg-gray-100"
            data-testid={`authorImage-${post.id}`}
          />
          <div className="text-sm leading-6">
            <p
              className="font-semibold dark:text-white text-gray-900"
              data-testid={`authorName-${post.id}`}
            >
              <a href={post.author.href}>
                <span className="absolute inset-0" />
                {post.author.name}
              </a>
            </p>
            <p
              className="text-gray-600 dark:text-gray-200"
              data-testid={`authorRole-${post.id}`}
            >
              {post.author.role}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
};

export default BlogArticle;
