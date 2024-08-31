import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { vendorBg } from "../images";
import materialButton from "/material-provider-btn.png";
import partButton from "/part-provider-btn.png";
import marketbtn from "/market-btn.png";
import offerbtn from "/offer-btn.png";
import HomeIcon from "../components/HomeIcon";

const backgroundArray = [
  {
    id: 0,
    name: "material",
    img: materialButton,
    link: "/materials",
    style: "ml-4 ",
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
    id: 2,
    name: "market",
    img: marketbtn,
    link: "/#",
    style: "w-1/4 float-right",
    active: false,
  },
];

const VendorPage = () => {
  const navigate = useNavigate();
  const [hoveredLink, setHoveredLink] = useState(null);

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
        backgroundImage: `url(${vendorBg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <HomeIcon />
      <div className="absolute w-[300px] h-[500px] left-[250px] top-30 flex flex-col gap-10 justify-end">
        {backgroundArray &&
          backgroundArray.map((item) => (
            <Link
              to={item.link}
              key={item.id}
              onMouseEnter={() => handleMouseEnter(item.name)}
              onMouseLeave={handleMouseLeave}
              style={{
                padding: "10px",
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
