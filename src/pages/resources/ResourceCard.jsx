import React from "react";
import { Link } from "react-router-dom";

const ResourceCard = ({ title, description, image, id }) => {
  return (
    <div className="relative flex flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-1/3 my-10">
      <div className="relative h-56 mx-4 -mt-6 overflow-hidden text-white shadow-lg bg-clip-border rounded-xl bg-blue-gray-500 shadow-blue-gray-500/40">
        <img src={image.url} alt="card-image" />
      </div>
      <div className="p-6">
        <h5 className="block mb-2 font-sans text-md antialiased font-semibold leading-snug tracking-normal text-blue-gray-900 text-right ">
          {title}
        </h5>
        <p
          className="block font-sans text-base antialiased font-light leading-relaxed text-inherit text-right"
          style={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {description}
        </p>
      </div>
      <div className="p-6 pt-0">
        <Link
          to={`/resource/${id}`}
          className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
          type="button"
        >
          اطلاعات بیشتر
        </Link>
      </div>
    </div>
  );
};

export default ResourceCard;
