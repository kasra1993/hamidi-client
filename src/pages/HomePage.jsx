import React, { useState } from "react";
import about from "/about-us-back.png";
import exhibition from "/exhibition-back.png";
import offers from "/offers-back.png";
import vendor from "/vendor-back.png";
import aboutIcon from "/about-us-icon.png";
import exhibitionIcon from "/exhibition-icon.png";
import offerIcon from "/special-offer-icon.png";
import vendorIcon from "/vendor-icon.png";
import { Link } from "react-router-dom";
const HomePage = () => {
  // const [active, setActive] = useState(0);
  const [bg, setBg] = useState(about);
  const boxArrays = [
    {
      id: 0,
      title: "about",
      bgId: about,
      path: "/about",
      img: aboutIcon,
      classes: "rounded-2xl",
    },
    {
      id: 1,
      title: "exhibition",
      bgId: exhibition,
      path: "/exhibition",
      img: exhibitionIcon,
      classes: "rounded-2xl",
    },
    {
      id: 2,
      title: "vendor",
      bgId: vendor,
      path: "/vendors",
      img: vendorIcon,
      classes: "rounded-2xl",
    },
    {
      id: 3,
      title: "offers",
      bgId: offers,
      path: "/offers",
      img: offerIcon,
      classes: "rounded-2xl",
    },
  ];

  return (
    <section
      className="flex  gap-5 items-end justify-end h-screen transition-all ease-in-out bg-blend-overlay w-full rounded-3xl"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="w-1/5 flex flex-col gap-2 justify-end items-center pb-10 h-1/2">
        {boxArrays.map(({ id, title, bgId, path, img, classes }) => (
          <Link
            to={path}
            key={title}
            className="w-[200px] h-[200px] border rounded-2xl "
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
