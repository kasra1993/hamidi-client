import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage } from "../../redux/slices/messageSlice";

const Contact = ({ provider }) => {
  const [content, setContent] = useState("");
  const [subject, setSubject] = useState("");
  const [isChecked, setIsChecked] = useState(false); // State to manage checkbox
  const dispatch = useDispatch();
  const { id: recipient } = useParams();
  const { loading, successMessage } = useSelector((state) => state.messages); // Using Redux selector for message
  const { user } = useSelector((state) => state.user);
  const sender = user?._id;
  const defaultImage = "/default-provider-image.png";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (content.trim() && subject.trim()) {
      dispatch(sendMessage({ content, subject, recipient, sender }))
        .unwrap()
        .then(() => {
          setContent(""); // Clear content after sending
          setSubject("");
        })
        .catch((error) => {
          // Handle any errors here
          console.error("Error sending message:", error);
        });
    }
  };

  return (
    <form className="bg-gray-200 h-auto w-full" onSubmit={handleSubmit}>
      {successMessage && <p className="text-green-500">{successMessage}</p>}

      <div className="md:px-20 px-4 py-8 flex justify-between">
        <img
          src={provider?.image?.url || defaultImage}
          alt="logo"
          className="w-[5rem]"
        />
        <div className="flex items-center justify-between text-black text-3xl">
          {provider.name}
        </div>
      </div>

      <div className="w-full flex items-start justify-center ">
        <div className="absolute w-1/2 top-56 bg-white shadow py-8 lg:px-10 px-8 border rounded-3xl border-slate-400">
          <p className="md:text-3xl text-xl font-bold leading-7 text-center text-gray-700"></p>

          <div className="md:flex items-center mt-12">
            <div className="md:w-full flex flex-col md:mt-0 mt-4">
              <label className="text-base font-semibold leading-none text-gray-800">
                موضوع
              </label>
              <input
                tabIndex={0}
                onChange={(e) => setSubject(e.target.value)}
                arial-label="Please input email address"
                type="text"
                className="text-base leading-none text-gray-900 p-3 focus:oultine-none focus:border-indigo-700 mt-4 bg-gray-100 border rounded border-gray-200 placeholder-grey-500 text-right"
                placeholder="تقاضای پیش فاکتور"
                value={subject}
              />
            </div>
          </div>

          <div>
            <div className="w-full flex flex-col mt-8">
              <label className="text-base font-semibold leading-none text-gray-800">
                پیام
              </label>
              <textarea
                tabIndex={0}
                aria-label="leave a message"
                role="textbox"
                type="name"
                className="h-36 text-base leading-none text-gray-900 p-3 focus:oultine-none focus:border-indigo-700 mt-4 bg-gray-100 border rounded border-gray-200 placeholder-gray-100 resize-none text-right"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
          </div>
          {/* Checkbox to accept terms */}
          <div className="flex items-center mt-4 float-right">
            <label
              htmlFor="accept-terms"
              className="text-sm text-gray-700 px-5"
            >
              .شرایط استفاده از خدمات و حریم خصوصی ریرکو را می‌پذیرم
            </label>
            <input
              type="checkbox"
              id="accept-terms"
              checked={isChecked}
              onChange={() => setIsChecked(!isChecked)}
              className="mr-2"
            />
          </div>

          <div className="flex items-center justify-center w-full">
            <button
              type="submit"
              disabled={!isChecked} // Disable the button if checkbox is not checked
              className={`mt-9 text-base font-semibold leading-none text-white py-4 px-10 ${
                isChecked ? "bg-gray-800" : "bg-gray-400"
              } focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 focus:outline-none`}
            >
              {loading ? "در حال ارسال" : "ارسال پیام"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Contact;
