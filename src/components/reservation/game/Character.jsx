import React, { forwardRef } from "react";

const Character = forwardRef((props, ref) => {
  return (
    <canvas
      ref={ref}
      className="character"
      width={props.size.width}
      height={props.size.height}
    />
  );
});

export default Character;
