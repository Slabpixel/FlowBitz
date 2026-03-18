import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    requestAnimationFrame(() => {
      const mainContent = document.getElementById("main-content");
      if (mainContent) {
        mainContent.scrollTop = 0;
      }
    });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
