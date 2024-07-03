import React, { useState } from "react";
import aboutIcon from "/about-us-icon.png";
import exhibitionIcon from "/exhibition-icon.png";
import offerIcon from "/special-offer-icon.png";
import vendorIcon from "/vendor-icon.png";
import { Link } from "react-router-dom";
import offers from "/offer-background.png";
import exhibition from "/exhibition-background.png";
import about from "/about-background.png";
import vendor from "/vendor-background.png";

const HomePage = () => {
  const [bg, setBg] = useState(vendor);
  const boxArrays = [
    {
      id: 0,
      title: "about",
      bgId: about,
      path: "/about",
      img: aboutIcon,
      classes: "rounded-2xl h-[185px] w-full row-span-2",
    },
    {
      id: 1,
      title: "exhibition",
      bgId: exhibition,
      path: "/exhibition",
      img: exhibitionIcon,
      classes: "rounded-2xl  row-span-1",
    },
    {
      id: 2,
      title: "offers",
      bgId: offers,
      path: "/offers",
      img: offerIcon,
      classes: "rounded-2xl row-span-1",
    },
    {
      id: 3,
      title: "vendor",
      bgId: vendor,
      path: "/vendors",
      img: vendorIcon,
      classes: "rounded-2xl  col-span-2 row-span-1",
    },
  ];

  return (
    <section
      className="flex  gap-5 items-center justify-end h-screen transition-all ease-in-out bg-blend-overlay w-full pr-5 "
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="w-[300px] h-1/2   grid grid-cols-2 grid-rows-3 pb-10 gap-x-3 gap-y-10 ">
        {boxArrays &&
          boxArrays.map(({ id, title, bgId, path, img, classes }) => (
            <Link
              to={path}
              key={title}
              className={classes}
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
