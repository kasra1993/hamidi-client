import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/auth_context";
import { vendorBg } from "../images";
import vendorNight from "../images/pageBackgrounds/vendor-night.png";
import vendorDay from "../images/pageBackgrounds/vendor-day.png";
import materialButton from "/material-provider-btn.png";
import partButton from "/part-provider-btn.png";
import marketbtn from "/market-info-btn.png";
import growthCenterBtn from "/growth-center-btn.png";
import jobBoardBtn from "/job-board-btn.png";
import marketInfoBtn from "/market-info-btn.png";
import resourceCenterBtn from "/resource-center-btn.png";
import offerbtn from "/offer-btn.png";
import HomeIcon from "../components/HomeIcon";

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
    name: "product-info",
    img: offerbtn,
    link: "/offers",
    style: "float-right",
    active: false,
  },
  {
    id: 3,
    name: "market",
    img: marketbtn,
    link: "/#",
    style: "w-full float-right",
    active: false,
  },
  {
    id: 4,
    name: "resource-center",
    img: resourceCenterBtn,
    link: "/#",
    style: "w-full float-right",
    active: false,
  },
  {
    id: 5,
    name: "market-info",
    img: marketInfoBtn,
    link: "/#",
    style: "w-full float-right",
    active: false,
  },
  {
    id: 6,
    name: "job-board",
    img: jobBoardBtn,
    link: "/#",
    style: "w-full float-right",
    active: false,
  },
  {
    id: 7,
    name: "growth-center",
    img: growthCenterBtn,
    link: "/#",
    style: "w-full float-right",
    active: false,
  },
];

const VendorPage = () => {
  const navigate = useNavigate();
  const [hoveredLink, setHoveredLink] = useState(null);
  const { user } = useContext(AuthContext);

  const handleMouseEnter = (name) => {
    setHoveredLink(name);
  };

  const handleMouseLeave = () => {
    setHoveredLink(null);
  };

  return (
    <div
      className="w-full h-screen flex justify-center items-center relative transition-all ease-in-out"
      style={{
        backgroundImage: `url(${user ? vendorDay : vendorNight})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
        backgroundPosition: "center",
      }}
    >
      <HomeIcon />
      <div className="absolute w-[300px] left-[250px] top-0 h-screen flex flex-col justify-center">
        {backgroundArray &&
          backgroundArray.map((item) => (
            <Link
              to={item.link}
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
              // className="border border-red-600"
            >
              <img src={item.img} alt={item.name} className={item.style} />
            </Link>
          ))}
      </div>
    </div>
  );
};

export default VendorPage;
