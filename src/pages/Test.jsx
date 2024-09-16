import React from "react";
import { Player } from "@lottiefiles/react-lottie-player";

const Test = () => {
  return (
    <Player
      src="https://lottie.host/1540f721-591d-4497-b8ad-fafb8c035532/GL4q7ExmNL.json"
      className="player"
      loop
      autoplay
      style={{ height: "100%", width: "100%" }}
    />
  );
};

export default Test;
