import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollResetOnNavigation = () => {
  const location = useLocation();

  useEffect(() => {
    // Delay scroll until layout finishes painting
    const timeout = setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }, 150); // wait slightly longer than a paint/frame

    return () => clearTimeout(timeout);
  }, [location.pathname]);

  return null;
};

export default ScrollResetOnNavigation;
