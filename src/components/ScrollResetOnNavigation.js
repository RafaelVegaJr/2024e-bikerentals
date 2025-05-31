import { useLocation } from "react-router-dom";
import { useLayoutEffect } from "react";

const ScrollResetOnNavigation = () => {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    // Blur active element immediately
    if (document.activeElement) {
      document.activeElement.blur();
    }

    // Scroll to top with animation frame to override mobile jump
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    });
  }, [pathname]);

  return null;
};

export default ScrollResetOnNavigation;
