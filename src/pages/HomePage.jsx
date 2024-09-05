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

const HomePage = () => {
  const [bg, setBg] = useState(vendorBackground);
  const boxArrays = [
    {
      id: 3,
      title: "vendor",
      bgId: vendorBackground,
      path: "/vendors",
      img: vendorIcon,
      classes:
        "rounded-2xl  col-span-2 row-span-1 h-[4rem]  object-fill w-full",
    },
    {
      id: 1,
      title: "exhibition",
      bgId: exhibitionBackground,
      path: "/exhibition",
      img: exhibitionIcon,
      classes:
        "rounded-2xl  col-span-2 row-span-1 h-[4rem]  object-fill w-full",
    },
    {
      id: 5,
      title: "productsInfo",
      bgId: productInfoBackground,
      path: "/products-info-list",
      img: productInfoIcon,
      classes:
        "rounded-2xl  col-span-2 row-span-1 h-[4rem]  object-fill w-full",
    },
    {
      id: 4,
      title: "provider",
      bgId: providerBackground,
      path: "/provider-login",
      img: providerIcon,
      classes:
        "rounded-2xl  col-span-2 row-span-1 h-[4rem]  object-fill w-full",
    },
    {
      id: 4,
      title: "user",
      bgId: userBackground,
      path: "/user-login",
      img: userIcon,
      classes:
        "rounded-2xl  col-span-2 row-span-1 h-[4rem]  object-fill w-full",
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

    {
      id: 5,
      title: "about",
      bgId: aboutBackground,
      path: "/about",
      img: aboutUsIcon,
      classes: "rounded-2xl  col-span-2 row-span-1 h-[4rem] object-fill w-full",
    },
  ];

  return (
    <section
      className="flex  gap-5 items-center justify-end h-screen transition-all ease-in-out bg-blend-overlay w-full pr-5 "
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "100% 100%", // Change this line
        // backgroundSize: "cover", // Change this line
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div className="w-[300px] h-fit  flex flex-col pb-10 gap-2">
        {boxArrays &&
          boxArrays.map(({ id, title, bgId, path, img, classes }) => (
            <Link
              to={path}
              key={title}
              // className={classes}
              onMouseOver={() => setBg(bgId)}
            >
              <img src={img} alt={title} className={classes} />
            </Link>
          ))}
      </div>
    </section>
  );
};

export default HomePage;
