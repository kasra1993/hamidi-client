import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  userBackground,
  userIcon,
  providerBackground,
  providerIcon,
  aboutBackground,
  aboutUsIcon,
  exhibitionBackground,
  exhibitionIcon,
  offerBackground,
  vendorBackground,
  vendorIcon,
  productInfoIcon,
  productInfoBackground,
  specialOfferIcon,
} from "../images";
import { useSelector } from "react-redux";
import { Player } from "@lottiefiles/react-lottie-player";

const HomePage = () => {
  const [bg, setBg] = useState(vendorBackground);
  const { user } = useSelector((state) => state.user);
  const { provider } = useSelector((state) => state.provider);
  const [isLottie, setIsLottie] = useState(vendorBackground); // Flag to control Lottie or image background

  const boxArrays = [
    {
      id: 0,
      title: "vendor",
      bgId: vendorBackground,
      path: "/vendors",
      img: vendorIcon,
      classes:
        "rounded-2xl  col-span-2 row-span-1 h-[4rem]  object-fill w-full",
      bgType: "animation",
    },
    {
      id: 1,
      title: "exhibition",
      bgId: exhibitionBackground,
      path: "/exhibition",
      img: exhibitionIcon,
      classes:
        "rounded-2xl  col-span-2 row-span-1 h-[4rem]  object-fill w-full",
      bgType: "animation",
    },
    {
      id: 2,
      title: "productsInfo",
      bgId: productInfoBackground,
      path: "/products-info-list",
      img: productInfoIcon,
      classes:
        "rounded-2xl  col-span-2 row-span-1 h-[4rem]  object-fill w-full",
      bgType: "animation",
    },
    {
      id: 3,
      title: "provider",
      bgId: providerBackground,
      // path: "/provider-login",
      path: `${provider || user ? "/" : "/provider-login"}`,
      img: providerIcon,
      classes:
        "rounded-2xl  col-span-2 row-span-1 h-[4rem]  object-fill w-full",
      bgType: "animation",
    },
    {
      id: 4,
      title: "user",
      bgId: userBackground,
      path: `${provider || user ? "/" : "/user-login"}`,
      img: userIcon,
      classes:
        "rounded-2xl  col-span-2 row-span-1 h-[4rem]  object-fill w-full",
      bgType: "animation",
    },

    {
      id: 5,
      title: "about",
      bgId: aboutBackground,
      path: "/about",
      img: aboutUsIcon,
      classes: "rounded-2xl  col-span-2 row-span-1 h-[4rem] object-fill w-full",
      bgType: "image",
    },
    // {
    //   id: 5,
    //   title: "offer",
    //   bgId: offerBackground,
    //   path: "/offers",
    //   img: specialOfferIcon,
    //   classes:
    //     "rounded-2xl  col-span-2 row-span-1 h-[4rem]  object-fill w-full",
    // },
  ];

  return (
    <section className="flex gap-5 items-center justify-end h-screen transition-all ease-in-out bg-blend-overlay w-full pr-5">
      <div
        className="absolute inset-0 z-[-1]" // This div will be the background container
        style={{
          backgroundImage: isLottie ? "none" : `url(${bg})`,
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        {isLottie && (
          <Player
            src={isLottie}
            className="player"
            loop
            autoplay
            style={{ maxHeight: "100vh", width: "100%" }}
          />
        )}
      </div>

      <div className="w-[300px] h-fit flex flex-col pb-10 gap-2">
        {boxArrays &&
          boxArrays.map(({ id, title, bgId, path, img, classes, bgType }) => (
            <Link
              to={path}
              key={title}
              className="relative"
              onMouseOver={() => {
                if (bgType === "animation") {
                  setIsLottie(bgId); // Show Lottie animation for the "provider" button
                } else {
                  setBg(bgId); // Set static background image for other buttons
                  setIsLottie(false); // Disable Lottie animation
                }
              }}
            >
              <img src={img} alt={title} className={classes} />
            </Link>
          ))}
      </div>
    </section>
  );
};

export default HomePage;
