import { useMemo } from "react";
import { useRouter } from "next/router";
import { footerNavigation } from "@components/home/footer";

const useStaticHeader = () => {
  const router = useRouter();

  const pathsToShowStaticHeader = useMemo(
    () => [
      ...footerNavigation.features.flatMap((item) => item.href),
      ...footerNavigation.resources.flatMap((item) => item.href),
      ...footerNavigation.company.flatMap((item) => item.href),
      ...footerNavigation.legal.flatMap((item) => item.href),
      "/",
    ],
    [footerNavigation]
  );

  const shouldShowStaticHeader = useMemo(() => {
    const currentPath = router.pathname;
    return pathsToShowStaticHeader.includes(currentPath);
  }, [router.pathname, pathsToShowStaticHeader]);

  return shouldShowStaticHeader;
};

export default useStaticHeader;
