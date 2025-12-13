import { useRef, useEffect } from "react";

export default function useKeyboard() {
  // empty object for ref of keys pressed currently
  // stores { key: true/false}
  const keys = useRef({});

  // [] empty dependancy array so this runs only once on first render
  useEffect(() => {
    const down = (e) => {
      if (e.key) keys.current[e.key.toLowerCase()] = true;
    };
    const up = (e) => {
      if (e.key) keys.current[e.key.toLowerCase()] = false;
    };

    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);

    // to run as cleanup
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, []);

  return keys;
}
