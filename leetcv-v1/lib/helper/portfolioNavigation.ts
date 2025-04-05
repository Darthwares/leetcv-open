import { useRouter } from "next/router";

const useNavigationHelper = () => {
  const router = useRouter();

  const handleUsersPortfolioNavigation = (handle: string) => {
    if (typeof window !== "undefined") {
      if (window.location.pathname.startsWith("/r")) {
        router.push(`/p/${handle}`);
      } else if (window.location.pathname.startsWith("/p")) {
        router.push(`/r/${handle}`);
      }
    }
  };

  return { handleUsersPortfolioNavigation };
};

export default useNavigationHelper;
