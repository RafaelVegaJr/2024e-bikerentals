import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    // Skip scroll on dynamic schedule routes like /schedule/1
    const isSchedulingPage = /^\/schedule\/\d+/.test(pathname);

    if (!isSchedulingPage) {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
}
