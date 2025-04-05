import { useRemoteConfig } from "@lib/remoteConfig/useRemoteConfig";
import { useEffect, useState } from "react";

export function useBlogsList() {
  const { blogs } = useRemoteConfig();
  const [blogList, setBlogList] = useState([]);

  useEffect(() => {
    const getBlogsList = () => {
      try {
        return JSON.parse(blogs || "");
      } catch (error) {
        return null;
      }
    };
    const list = getBlogsList();
    setBlogList(list);
  }, [blogs]);

  return {
    blogList,
  };
}
