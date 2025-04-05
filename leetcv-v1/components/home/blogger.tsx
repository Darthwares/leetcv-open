import BlogList from "@components/blogList";
import { ArrowRightSvg } from "@components/svg";
import { useBlogsList } from "@lib/helper/useBlogsList";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";

export default function Blog() {
  const router = useRouter();
  const t = useTranslations("Blog");
  const { blogList } = useBlogsList();

  return (
    <section
      className="bg-white dark:bg-gray-900 pt-12 pb-16 dark:border-t border-b dark:border-gray-700 border-gray-100"
      id="Blogs"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-bold tracking-tight text-gray-900 brand-header text-5xl md:text-6xl">
            <span className="block xl:inline brand-color">{t("fromBlog")}</span>
          </h2>
          <p className="-mt-4 md:text-lg md:leading-8 dark:text-gray-100 text-gray-600">
            {t("learnHow")}
          </p>
        </div>
        <div className="md:max-w-2xl lg:max-w-7xl mx-auto mt-4 lg:mt-0 flex justify-end relative right-0 text-indigo-500 cursor-pointer">
          <button
            className="px-2.5 app-bar-btn flex items-center py-0.5 gap-1 text-sm border border-gray-400"
            onClick={() => {
              router.push("/blog");
            }}
          >
            <span>{t("getStarted")}</span>
            <ArrowRightSvg />
          </button>
        </div>
        <BlogList posts={blogList?.slice(0, 3)} />
      </div>
    </section>
  );
}
