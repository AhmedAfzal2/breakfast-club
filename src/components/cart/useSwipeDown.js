import React from "react";
import { useEffect } from "react";

export default function useSwipeDown(divRef, callback) {
  let startY = 0;
  let endY = 0;

  const THRESHOLD = 50;

  useEffect(() => {
    if (!divRef.current) return;
    divRef.current.addEventListener("touchstart", (e) => {
      startY =
        e.touches && e.touches.length > 0 ? e.touches[0].clientY : e.clientY;
    });

    divRef.current.addEventListener("touchend", (e) => {
      endY =
        e.touches && e.touches.length > 0 ? e.touches[0].clientY : e.clientY;
      if (endY - startY > THRESHOLD) {
        callback();
      }
    });
  }, [divRef.current]);
}
