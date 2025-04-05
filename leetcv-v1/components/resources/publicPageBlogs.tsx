import BlogArticle from "@components/blogArticle";
import { BlogListProps } from "@components/blogList";
import React from "react";

type PublicPageBlogsProps = {
  blogs: BlogListProps[];
};

const PublicPageBlogs = ({ blogs }: PublicPageBlogsProps) => {
  return (
    <div className="px-4 lg:px-16 mt-8 max-w-7xl mx-auto">
      <h2 className="text-2xl lg:text-3xl font-bold dark:text-white text-gray-900">
        Related Blogs
      </h2>
      <div className="mt-6 md:mt-8 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-14">
        {blogs.map((blog) => (
          <BlogArticle key={blog.id} post={blog} />
        ))}
      </div>
    </div>
  );
};

export default PublicPageBlogs;
