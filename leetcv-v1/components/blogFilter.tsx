import React, { useEffect, useState } from "react";
import { BlogListProps } from "./blogList";
import BlogFilterDropdown from "./blogFilterDropdown";

type BlogFilterProps = {
  posts: BlogListProps[];
  setBlogs: React.Dispatch<React.SetStateAction<BlogListProps[]>>;
};

const BlogFilter = ({ posts, setBlogs }: BlogFilterProps) => {
  const [selected, setSelected] = useState("All");
  const [uniqueCategories, setUniqueCategories] = useState<string[]>([]);

  useEffect(() => {
    const categories = Array.from(
      new Set(posts?.map((post: BlogListProps) => post.category.title))
    );
    setUniqueCategories(["All", ...categories]);
  }, [posts]);

  const handleClick = (topic: string) => {
    setSelected(topic);
    const filteredBlogs =
      topic === "All"
        ? posts
        : posts.filter(
            (blog) =>
              blog.category.title === topic ||
              blog.title.toLowerCase().includes(topic.toLowerCase())
          );
    setBlogs(filteredBlogs);
  };

  return (
    <>
      <BlogFilterDropdown
        blogCategories={uniqueCategories}
        selected={selected}
        handleClick={(topic: string) => handleClick(topic)}
      />
      <div
        className={`${
          location.pathname === "/blog"
            ? "hidden md:block md:pt-2 lg:pt-0"
            : "hidden"
        }`}
        data-testid="blogFilter"
      >
        <ul className="flex flex-wrap items-center gap-2.5">
          {uniqueCategories.map((topic) => (
            <li
              key={topic}
              className={`${
                selected === topic
                  ? "text-white bg-indigo-500 border-transparent"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-950 border-gray-400"
              } rounded-full px-3 py-1.5 cursor-pointer border text-sm transition-all duration-200 font-medium`}
              onClick={() => handleClick(topic)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleClick(topic);
                }
              }}
            >
              {topic}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default BlogFilter;
