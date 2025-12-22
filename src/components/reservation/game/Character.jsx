import React, { forwardRef } from "react";

const Character = forwardRef((props, ref) => {
  return (
    <img
      ref={ref}
      src="/assets/images/bob/up_stand.png"
      className="character"
      style={{
        width: props.size.width,
        height: props.size.height,
      }}
    />
  );
});

export default Character;
