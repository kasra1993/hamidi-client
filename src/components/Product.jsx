import React from "react";
// import styled from "styled-components";
// import { formatPrice } from "../utils/helpers";
// import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
// import { Email, LinkSharp, Phone } from "@material-ui/icons";

const Product = ({ image, name, _id, email, link, description, phone }) => {
  return (
    <div className="max-w-sm bg-white shadow-xl rounded-lg border overflow-hidden my-2">
      <img
        className="w-full h-56 object-cover object-center"
        src={image.url}
        alt={name}
      />
      <div className="flex items-center px-6 py-3 bg-gray-900">
        {/* <svg className="h-6 w-6 text-white fill-current" viewBox="0 0 512 512">
          <path d="M256 48C150 48 64 136.2 64 245.1v153.3c0 36.3 28.6 65.7 64 65.7h64V288h-85.3v-42.9c0-84.7 66.8-153.3 149.3-153.3s149.3 68.5 149.3 153.3V288H320v176h64c35.4 0 64-29.3 64-65.7V245.1C448 136.2 362 48 256 48z" />
        </svg> */}
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
