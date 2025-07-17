import { useEffect, useState } from "react";
import { BACKNEND_URL } from "../config";
import axios from "axios";
import type { ContentType } from "../components/Sidebar";

type Content = {
  title: string;
  link: string;
  type: ContentType;
};

export function useContent(): [Content[], () => void] {
  const [contents, setContents] = useState<Content[]>([]);

  function refresh() {
    axios
      .get(`${BACKNEND_URL}/api/v1/content`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setContents(response.data.content);
      });
  }

  useEffect(() => {
    refresh();

    const interval = setInterval(() => {
      refresh();
    }, 10 * 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return [contents, refresh];
}
