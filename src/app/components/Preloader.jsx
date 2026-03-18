import React, { useState, useEffect, useCallback } from "react";
import Logo from "./logo";

const Preloader = ({ onComplete }) => {
  const [isReady, setIsReady] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const exit = useCallback(() => {
    setIsExiting(true);
    const timer = setTimeout(() => onComplete(), 500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  useEffect(() => {
    let minTimerDone = false;
    let assetsLoaded = document.readyState === "complete";

    const tryFinish = () => {
      if (minTimerDone && assetsLoaded) setIsReady(true);
    };

    const minTimer = setTimeout(() => {
      minTimerDone = true;
      tryFinish();
    }, 1000);

    const handleLoad = () => {
      assetsLoaded = true;
      tryFinish();
    };

    if (!assetsLoaded) {
      window.addEventListener("load", handleLoad);
    } else {
      tryFinish();
    }

    return () => {
      clearTimeout(minTimer);
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  useEffect(() => {
    if (isReady) exit();
  }, [isReady, exit]);

  return (
    <div
      className={`fixed inset-0 z-[100] bg-background flex items-center justify-center transition-opacity duration-500 ${
        isExiting ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Logo container sits above the line */}
      <div className="relative z-10 bg-background px-4">
        <Logo className="h-[3.375rem] w-auto" />
      </div>
    </div>
  );
};

export default Preloader;
