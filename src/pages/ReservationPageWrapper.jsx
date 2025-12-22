import React from "react";
import { GameContextProvider } from "../components/reservation/game/GameContext";
import ReservationPage from "./ReservationPage";

export default function ReservationPageWrapper() {
  return (
    <GameContextProvider>
      <ReservationPage></ReservationPage>
    </GameContextProvider>
  );
}
