import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createTicket } from "../../redux/slices/ticketSlice";
import UserTicketList from "./UserTicketList";
import { showToast } from "../../redux/slices/toastSlice";

const UserTickets = () => {
  const dispatch = useDispatch();
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const { _id: userId } = useSelector((state) => state.user.user);

  const handleSubmit = (e) => {
    e.preventDefault();
    if ((userId, subject, description)) {
      dispatch(createTicket({ user: userId, subject, description }));
    }
    dispatch(
      showToast({
        message: "تیکت با موفقیت ذخیره شد",
        type: "success",
      })
    );
  };

  return (
    <div className="bg-gray-100 h-screen flex w-full">
      {/* <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Subject"
          className="border rounded p-2 w-full"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="border rounded p-2 w-full"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Submit Ticket
        </button>
      </form> */}

      <div className="w-full lg:w-1/2 m-1">
        <form className="w-full bg-white shadow-md p-6" onSubmit={handleSubmit}>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-full px-3 mb-6">
              <label
                className="block uppercase tracking-wide text-gray-700 text-2xl mb-5"
                htmlFor="category_name"
              >
                ثبت تیکت
              </label>
              <input
                className="appearance-none block w-full bg-white text-gray-900  border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-[#98c01d] text-right"
                type="text"
                name="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="موضوع"
                required
              />
            </div>
            <div className="w-full px-3 mb-6">
              <textarea
                textarea
                rows="4"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="appearance-none block w-full bg-white text-gray-900  border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-[#98c01d] text-right"
                type="text"
                name="description"
                required
                placeholder="لطفا درخواست خود را در این قسمت بنویسید"
              >
                {" "}
              </textarea>
            </div>

            <div className="w-full md:w-full px-3 mb-6">
              <button
                className="appearance-none block w-full bg-green-700 text-gray-100 font-bold border border-gray-200 rounded-lg py-3 px-3 leading-tight hover:bg-green-600 focus:outline-none focus:bg-white focus:border-gray-500"
                type="submit"
              >
                ثبت
              </button>
            </div>

            <div className="w-full px-3 mb-8">
              <label
                className="mx-auto cursor-pointer flex w-full max-w-lg flex-col items-center justify-center rounded-xl border-2 border-dashed border-green-400 bg-white p-6 text-center"
                htmlFor="dropzone-file"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-green-800"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>

                <h2 className="mt-4 text-xl font-medium text-gray-700 tracking-wide">
                  ارسال عکس
                </h2>

                <p className="mt-2 text-gray-500 tracking-wide">
                  <h4 className="text-sm text-gray-600">
                    برای بارگذاری بکشید و رها کنید
                    <br />
                    <label
                      htmlFor="chooseFile"
                      className="text-blue-600 cursor-pointer"
                    >
                      یا اینجا را کلیک کنید
                    </label>{" "}
                  </h4>
                </p>

                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  name="category_image"
                  accept="image/png, image/jpeg, image/webp"
                />
              </label>
            </div>
          </div>
        </form>
      </div>
      <UserTicketList userId={userId} />
    </div>
  );
};

export default UserTickets;
