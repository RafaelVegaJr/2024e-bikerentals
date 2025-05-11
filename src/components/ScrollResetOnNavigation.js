import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollResetOnNavigation = () => {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    document.activeElement.blur(); // Prevents scroll caused by auto-focused input
  }, [pathname]);

  return null;
};

export default ScrollResetOnNavigation;
