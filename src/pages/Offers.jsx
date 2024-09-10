import React, { useState } from "react";
import { main_url } from "../utils/constants";
import axios from "axios";
import HomeIcon from "../components/HomeIcon";
import { useNavigate } from "react-router-dom";

const Offers = () => {
  const [formData, setFormData] = useState({
    description: "",
    name: "",
    email: "",
    companyName: "",
    materialName: "",
    partName: "",
    phone: undefined,
    volume: undefined,
    quantity: undefined,
  });
  const navigate = useNavigate();
  const [image, setImage] = useState();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      formData.image = image;
      const response = await axios.post(`${main_url}createOffer`, formData);
      alert("Email sent!");
    } catch (error) {
      console.error("Failed to send email", error);
      alert("Failed to send email");
    }
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    setFileToBase(file);
  };

  const setFileToBase = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
    };
  };

  return (
    <>
      <div className="w-full text-center ">
        <HomeIcon />
        <button
          onClick={() => navigate(-1)}
          className=" z-50 bg-white hover:bg-black hover:text-white text-black font-bold py-2 px-4 rounded w-20 absolute left-[5rem] top-[2rem]"
        >
          بازگشت
        </button>
        <h1 className="text-4xl font-bold py-10 bg-black text-white">
          پیشنهادات ویژه خود را وارد کنید
        </h1>
      </div>
      <form
        className="w-full flex flex-wrap  border rounded-xl p-10 mx-auto justify-center"
        onSubmit={handleSubmit}
      >
        <div className="flex w-1/2 flex-wrap -mx-3 mb-6 gap-5 justify-center">
          <div className="w-full md:w-1/2 px-3 border border-slate-400 rounded-xl p-5">
            <input
              className="text-right appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mb-5"
              id="grid-last-name"
              type="text"
              placeholder="نام قطعه"
              onChange={handleChange}
              name="partName"
            />
            <input
              className="text-right appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-last-name"
              type="number"
              placeholder="تعداد"
              onChange={handleChange}
              name="quantity"
            />
          </div>
          <div className="w-full md:w-1/2 px-3 border border-slate-400 rounded-xl p-5">
            <input
              className="text-right appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mb-5"
              id="grid-last-name"
              type="text"
              placeholder="نام ماده"
              onChange={handleChange}
              name="materialName"
            />
            <input
              className="text-right appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-last-name"
              type="number"
              placeholder="تناژ"
              onChange={handleChange}
              name="volume"
            />
          </div>
        </div>

        <div className="flex flex-wrap w-1/2 -mx-3 mb-2 ">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 mt-2">
            <input
              className="text-right appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-city"
              type="text"
              placeholder="نام پیشنهاد دهنده"
              onChange={handleChange}
              required
              name="name"
            />
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 mt-2">
            <input
              className="text-right appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-city"
              type="text"
              placeholder="نام شرکت"
              onChange={handleChange}
              name="companyName"
              required
            />
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 mt-2">
            <input
              className="text-right appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-city"
              type="text"
              placeholder="سمت "
              onChange={handleChange}
              required
              name="position"
            />
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 mt-2">
            <input
              className="text-right appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-city"
              type="email"
              placeholder="ایمیل"
              onChange={handleChange}
              name="email"
              required
            />
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 mt-2">
            <input
              className="text-right appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-city"
              type="number"
              placeholder="شماره تماس"
              onChange={handleChange}
              name="phone"
              required
            />
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 mt-2">
            <label>Image</label>
            <input
              type="file"
              placeholder="Add Image Here"
              onChange={handleImageSelect}
              name="image"
            />
          </div>
        </div>
        <div className="w-full mt-5 ">
          <textarea
            className="w-full bg-slate-100 h-[100px] text-right p-5"
            placeholder="توضیحات"
            onChange={handleChange}
            name="description"
          ></textarea>
        </div>
        <button
          className="bg-green-500 w-full block hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          type="submit"
        >
          ثبت
        </button>
      </form>
    </>
  );
};

export default Offers;
