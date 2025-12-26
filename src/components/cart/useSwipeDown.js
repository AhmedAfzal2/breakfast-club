import React from "react";
import { useEffect } from "react";

export default function useSwipeDown(divRef, callback, topRef) {
  let startY = null;
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
      if (startY === null) return;
      endY =
        e.changedTouches && e.changedTouches.length > 0
          ? e.changedTouches[0].clientY
          : e.clientY;
      if (endY - startY > THRESHOLD) {
        callback();
      }
      startY = null;
    };

    if (topRef && topRef.current) {
      topRef.current.addEventListener("touchstart", touchStart);
      topRef.current.addEventListener("touchmove", touchMove);
      topRef.current.addEventListener("mousedown", touchStart);
      topRef.current.addEventListener("mousemove", touchMove);
    } else {
      divRef.current.addEventListener("touchstart", touchStart);
      divRef.current.addEventListener("touchmove", touchMove);
    }
    divRef.current.addEventListener("touchend", touchEnd);
    divRef.current.addEventListener("mouseup", touchEnd);

    return () => {
      if (topRef && topRef.current) {
        topRef.current.removeEventListener("touchstart", touchStart);
        topRef.current.removeEventListener("touchmove", touchMove);
        topRef.current.removeEventListener("mousedown", touchStart);
        topRef.current.removeEventListener("mousemove", touchMove);
      } else if (divRef.current) {
        divRef.current.removeEventListener("touchstart", touchStart);
        divRef.current.removeEventListener("touchmove", touchMove);
      }
      if (divRef.current) {
        divRef.current.removeEventListener("touchend", touchEnd);
        divRef.current.removeEventListener("mouseup", touchEnd);
      }
    };
  }, [divRef, topRef, callback]);
}
