import React, { forwardRef } from "react";

const style = {
  character: {
    position: "absolute",
    left: "50%",
    top: "50%",
  },
};

const Character = forwardRef((props, ref) => {
  return (
    <img
      ref={ref}
      src="/assets/images/bob/up_stand.png"
      style={{
        ...style.character,
        width: props.size.width,
        height: props.size.height,
      }}
    />
  );
});

export default Character;
