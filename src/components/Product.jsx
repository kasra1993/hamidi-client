import React from "react";
import { Link } from "react-router-dom";
const defaultImage = "/default-provider-image.png";
import { BsPatchCheckFill } from "react-icons/bs"; // Import the verified icon

const Product = ({
  image,
  name,
  company_name,
  _id,
  email,
  link,
  phone,
  componentType,
  isVerified,
}) => {
  return (
    <div className="w-[300px] bg-white shadow-xl rounded-lg border my-2 relative">
      {/* {isVerified && ( */}
      {isVerified && (
        <div className="absolute top-2 left-2 text-gold">
          <BsPatchCheckFill size={40} className="text-yellow-400" />{" "}
        </div>
      )}
      {/* )} */}
      <img
        className="w-full h-40 object-contain object-center"
        src={image?.url || defaultImage}
        alt={name}
      />
      <div className="flex items-center px-6 py-3 bg-gray-900">
        <h1 className="mx-3 text-white text-center w-full font-semibold text-sm mt-2">
          {name || company_name}
        </h1>
      </div>
      <div className="py-4 px-6 flex flex-col flex-wrap w-auto">
        {/* <div className="flex items-start justify-between  mt-4 text-gray-700">
          <h1 className="px-2 text-xs">{phone}</h1>
          <p>تماس</p>
        </div> */}
        {/* <div className="flex items-start justify-between  mt-4 text-gray-700">
          <h1 className="px-2 text-xs">{link}</h1>
          <p>لینک</p>
        </div> */}
        {/* <div className="flex items-start justify-between  mt-4 text-gray-700">
          <h1 className="px-2 text-xs">{email}</h1>
          <p>ایمیل</p>
        </div> */}
        <div>
          <Link
            to={`/${isVerified ? "verified" : componentType}/provider/${_id}`}
            className="btn my-7"
            style={{ backgroundColor: "#333" }}
          >
            اطلاعات بیشتر
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Product;
