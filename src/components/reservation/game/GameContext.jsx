import React, { useState } from "react";
import { createContext, useContext } from "react";

const ctx = createContext(null);

export function useGameContext() {
  return useContext(ctx);
}

export function GameContextProvider({ children }) {
  const [sizes, setSizes] = useState({
    char: { width: 40, height: 82 },
    view: { width: 1200, height: 580 },
    world: { width: 1200, height: 720 },
  });
  return <ctx.Provider value={{ sizes, setSizes }}>{children}</ctx.Provider>;
}
