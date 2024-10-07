import React, { useState } from "react";
import { vendorBg } from "../images";
// import vendorNight from "../images/pageBackgrounds/vendor-night.png";
// import vendorDay from "../images/pageBackgrounds/vendor-day.png";
import { vendorDay, vendorNight } from "../images";
import materialButton from "/material-provider-btn.png";
import partButton from "/part-provider-btn.png";
import marketbtn from "/market-info-btn.png";
import growthCenterBtn from "/growth-center-btn.png";
import jobBoardBtn from "/job-board-btn.png";
import discussionForumBtn from "/discussion-forum-btn.png";
import resourceCenterBtn from "/resource-center-btn.png";
import offerbtn from "/offer-btn.png";
import HomeIcon from "../components/HomeIcon";
import { useSelector } from "react-redux";
import { Player } from "@lottiefiles/react-lottie-player";

const backgroundArray = [
  {
    id: 0,
    name: "material",
    img: materialButton,
    link: "/materials",
    style: " ",
    active: false,
  },
  {
    id: 1,
    name: "part",
    img: partButton,
    link: "/parts",
    style: "",
    active: false,
  },
  {
    id: 2,
    name: "offers",
    img: offerbtn,
    link: "/offers",
    style: "float-right",
    active: false,
  },
  {
    id: 3,
    name: "market",
    img: marketbtn,
    link: "/markets",
    style: "w-full float-right",
    active: false,
  },
  {
    id: 4,
    name: "resource-center",
    img: resourceCenterBtn,
    link: "/resources",
    style: "w-full float-right",
    active: false,
  },
  {
    id: 5,
    name: "discussion-forum",
    img: discussionForumBtn,
    link: "https://www.autos.ca/forum/index.php?board=2479.0",
    style: "w-full float-right",
    active: false,
    openInNewTab: true,
  },
  {
    id: 6,
    name: "job-board",
    img: jobBoardBtn,
    link: "/coming-soon",
    style: "w-full float-right",
    active: false,
  },
  {
    id: 7,
    name: "growth-center",
    img: growthCenterBtn,
    link: "https://uni.rierco.net/research/innovation-center",
    style: "w-full float-right",
    active: false,
    openInNewTab: true,
  },
];

const VendorPage = () => {
  const [hoveredLink, setHoveredLink] = useState(null);
  const { user } = useSelector((state) => state.user);

  const handleMouseEnter = (name) => {
    setHoveredLink(name);
  };

  const handleMouseLeave = () => {
    setHoveredLink(null);
  };

  return (
    <div className="w-full h-screen flex justify-center items-center relative transition-all ease-in-out">
      <HomeIcon />
      <Player
        src={user ? vendorDay : vendorNight}
        className="player"
        loop
        autoplay
        style={{
          height: "100%",
          width: "100%",
          aspectRatio: "16/9", // Replace with your specific aspect ratio
        }}
      />
      <div className="absolute w-[300px] left-[250px] top-0 h-screen flex flex-col justify-center">
        {backgroundArray &&
          backgroundArray.map((item) => (
            <a
              href={item.link}
              target={item.openInNewTab ? "_blank" : "_self"} // Conditional target
              rel={item.openInNewTab ? "noopener noreferrer" : ""} // Conditional rel
              key={item.id}
              onMouseEnter={() => handleMouseEnter(item.name)}
              onMouseLeave={handleMouseLeave}
              style={{
                paddingX: "10px",
                border:
                  hoveredLink === item.name ? "2px solid #2a4667" : "none",
                borderRadius: "10px",
                transition: "border 0.3s",
                zIndex: 50,
              }}
            >
              <img src={item.img} alt={item.name} className={item.style} />
            </a>
          ))}
      </div>
    </div>
  );
};

export default VendorPage;
