import { AVATAR_IMAGE } from "@constants/defaults";
import React, { useEffect, useState } from "react";
import BlogFilter from "./blogFilter";
import NoBlogs from "./noBlogs";
import { useTranslations } from "next-intl";
import { ChevronDoubleDownIcon } from "@heroicons/react/solid";
import useLoadMore from "./useLoadMore";
import { LoadMoreSvg } from "./svg";
import BlogArticle from "./blogArticle";

export interface BlogListProps {
  id: number;
  title: string;
  href: string;
  description: string;
  imageUrl: string;
  date: string;
  datetime: string;
  category: {
    title: string;
    href: string;
  };
  author: {
    name: string;
    role: string;
    href: string;
    imageUrl: string;
  };
}

export interface BlogListArrayProps {
  posts: BlogListProps[];
}

const BlogList = ({ posts }: BlogListArrayProps) => {
  const t = useTranslations("Blog");
  const [blogs, setBlogs] = useState<BlogListProps[]>([]);
  const { visibleBlogs, loading, loadMore } = useLoadMore(6, 6);
  const path = location.pathname;

  useEffect(() => {
    if (posts) {
      setBlogs(posts);
    }
  }, [posts]);

  return (
    <>
      <div
        className={`${path === "/blog" && "-mt-12 -mb-5 lg:-mt-5 lg:-mb-3"}`}
      >
        <BlogFilter posts={posts} setBlogs={setBlogs} />
      </div>
      {blogs.length === 0 ? (
        <NoBlogs />
      ) : (
        <>
          <div
            className={`${
              path === "/" && "mt-5"
            } mx-auto grid max-w-2xl grid-cols-1 gap-y-20 gap-x-8 lg:mx-0 lg:max-w-none lg:grid-cols-3 overflow-y-auto`}
            data-testid="blogList"
          >
            {blogs?.slice(0, visibleBlogs).map((post) => (
              <BlogArticle key={post.id} post={post} />
            ))}
          </div>
          {path !== "/" && visibleBlogs < blogs.length && (
            <div className="flex items-center justify-center">
              <button
                className="px-4 app-bar-btn flex text-gray-800 items-center py-2 gap-1.5 text-sm border border-gray-400"
                onClick={loadMore}
              >
                <span>{t("loadMore")}</span>
                {loading ? (
                  <LoadMoreSvg />
                ) : (
                  <ChevronDoubleDownIcon className="h-[18px] w-5" />
                )}
              </button>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default BlogList;
