import React from "react";
import { Link } from "react-router-dom";
const defaultImage = "/default-provider-image.png";
const Product = ({ image, name, _id, email, link, description, phone }) => {
  return (
    <div className="max-w-sm bg-white shadow-xl rounded-lg border overflow-hidden my-2">
      <img
        className="w-full h-56 object-cover object-center"
        src={image?.url || defaultImage}
        alt={name}
      />
      <div className="flex items-center px-6 py-3 bg-gray-900">
        <h1 className="mx-3 text-white text-center w-full font-semibold text-sm">
          {name}
        </h1>
      </div>
      <div className="py-4 px-6">
        {/* <h1 className="text-2xl font-semibold text-gray-800">
          {name}
        </h1> */}
        <p className="py-2 text-xs text-right text-gray-700">{description}</p>
        <div className="flex items-start justify-between  mt-4 text-gray-700">
          {/* <Phone /> */}
          تماس
          <h1 className="px-2 text-xs">{phone}</h1>
        </div>
        <div className="flex items-start justify-between  mt-4 text-gray-700">
          {/* <LinkSharp /> */}
          لینک
          <h1 className="px-2 text-xs">{link}</h1>
        </div>
        <div className="flex items-start justify-between  mt-4 text-gray-700">
          {/* <Email /> */}
          ایمیل
          <h1 className="px-2 text-xs">{email}</h1>
        </div>
        <div>
          <Link
            to={`/provider/${_id}`}
            className="btn my-7"
            style={{ backgroundColor: "#333" }}
          >
            بیشتر
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Product;
