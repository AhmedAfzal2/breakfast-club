import React from "react";
import { useEffect } from "react";

export default function useSwipeDown(divRef, callback) {
  let startY = 0;
  let endY = 0;

  const THRESHOLD = 50;

  useEffect(() => {
    if (!divRef.current) return;

    const touchStart = (e) => {
      startY =
        e.touches && e.touches.length > 0 ? e.touches[0].clientY : e.clientY;
    };

    const touchMove = (e) => {
      e.preventDefault();
    };

    const touchEnd = (e) => {
      endY =
        e.changedTouches && e.changedTouches.length > 0
          ? e.changedTouches[0].clientY
          : e.clientY;
      if (endY - startY > THRESHOLD) {
        callback();
      }
    };

    divRef.current.addEventListener("touchstart", touchStart);
    divRef.current.addEventListener("touchmove", touchMove);
    divRef.current.addEventListener("touchend", touchEnd);
  }, [divRef.current]);
}
