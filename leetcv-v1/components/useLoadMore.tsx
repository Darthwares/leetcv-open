import { useState } from "react";

interface LoadMoreHook {
  visibleBlogs: number;
  loading: boolean;
  loadMore: () => void;
}

const useLoadMore = (
  initialVisibleCount: number,
  incrementAmount: number
): LoadMoreHook => {
  const [visibleBlogs, setVisibleBlogs] = useState(initialVisibleCount);
  const [loading, setLoading] = useState(false);

  const loadMore = () => {
    setLoading(true);

    setTimeout(() => {
      setVisibleBlogs((prevVisibleBlogs) => prevVisibleBlogs + incrementAmount);
      setLoading(false);
      window.scrollTo({
        top: window.scrollY + 600,
        behavior: "smooth",
      });
    }, 1000);
  };

  return { visibleBlogs, loading, loadMore };
};

export default useLoadMore;
