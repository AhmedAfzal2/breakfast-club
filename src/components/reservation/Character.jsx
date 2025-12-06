import React, { useRef, useEffect } from "react";

const style = {
  character: {
    position: "absolute",
    width: 50,
    height: 50,
  },
};

function Character() {
  // movement is done by storing keys pressed in a ref
  // this ref is updated with event listeners
  // and used with reqanimframe() to move
  const charRef = useRef();
  const posRef = useRef({ x: 0, y: 0 });
  const keysPressed = useRef({});
  const speed = 2; // pixels per frame

  useEffect(() => {
    const handleKeyDown = (e) => (keysPressed.current[e.key] = true);
    const handleKeyUp = (e) => (keysPressed.current[e.key] = false);

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  useEffect(() => {
    let animationId;

    const animate = () => {
      // horizontal
      if (keysPressed.current["a"]) posRef.current.x -= speed;
      if (keysPressed.current["d"]) posRef.current.x += speed;

      // vertical
      if (keysPressed.current["w"]) posRef.current.y -= speed;
      if (keysPressed.current["s"]) posRef.current.y += speed;

      charRef.current.style.transform = `translate(${posRef.current.x}px, ${posRef.current.y}px)`;

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <img
      ref={charRef}
      src="/assets/images/bob.png"
      alt="Character"
      style={style.character}
    />
  );
}

export default Character;
