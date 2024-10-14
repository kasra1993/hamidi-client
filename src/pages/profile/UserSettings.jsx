import React, { useState } from "react";
import HomeIcon from "../../components/HomeIcon";
import { useSelector, useDispatch } from "react-redux";
import { updateUserSetting } from "../../redux/slices/userSlice";

const UserSettings = () => {
  const { user, loading } = useSelector((state) => state.user);
  const [formData, setFormData] = useState(user);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("name , value", name, value);
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateUserSetting({ userId: user?._id, formData }))
      .unwrap() // Unwraps the response to handle success and error locally
      .then((response) => {
        setMessage("Settings updated successfully!");
      })
      .catch((error) => {
        setMessage(error || "An error occurred while updating settings.");
      });
  };

  return (
    <div className="flex justify-center items-center h-screen py-10 bg-gray-100 ">
      {/* <HomeIcon color="black" /> */}
      <div className="bg-white p-8 rounded-lg shadow-lg w-4/5 h-full">
        <h2 className="text-3xl font-bold text-center"> ویرایش کاربر</h2>{" "}
        {message && <p className="mb-4 text-center text-red-500">{message}</p>}
        <form
          className="mx-auto w-full bg-white p-10 rounded-2xl"
          onSubmit={handleSubmit}
        >
          <div className="mb-5 pt-3">
            <div className="-mx-3 flex flex-wrap px-10">
              <>
                <div className="w-full px-3 sm:w-1/3">
                  <div className="mb-5">
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium text-gray-700 mb-5"
                    >
                      نام
                    </label>

                    <input
                      type="text"
                      name="name"
                      id="name"
                      placeholder={user?.name}
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="w-full px-3 sm:w-1/3">
                  <div className="mb-5">
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium text-gray-700 mb-5"
                    >
                      نام خانوادگی
                    </label>
                    <input
                      type="text"
                      name="family_name"
                      id="family_name"
                      placeholder={user?.family_name}
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="w-full px-3 sm:w-1/3">
                  <div className="mb-5">
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium text-gray-700 mb-5"
                    >
                      آدرس
                    </label>
                    <input
                      type="text"
                      name="address"
                      id="address"
                      placeholder={user?.address}
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="w-full px-3 sm:w-1/3">
                  <div className="mb-5">
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium text-gray-700 mb-5"
                    >
                      کد ملی
                    </label>
                    <input
                      type="number"
                      name="id_number"
                      id="id_number"
                      placeholder={user?.id_number}
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="w-full px-3 sm:w-1/3">
                  <div className="mb-5">
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium text-gray-700 mb-5"
                    >
                      شماره تماس
                    </label>
                    <input
                      type="number"
                      name="cellphone"
                      id="cellphone"
                      placeholder={user?.cellphone}
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="w-full px-3 sm:w-1/3">
                  <div className="mb-5">
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium text-gray-700 mb-5"
                    >
                      تلفن ثابت
                    </label>
                    <input
                      type="number"
                      name="phone"
                      id="phone"
                      placeholder={user?.phone}
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="w-full px-3 sm:w-1/2">
                  <div className="relative h-15 w-72 min-w-[200px] mt-5">
                    <select
                      className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-gray-900 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                      onChange={handleChange} // Add the onChange event handler
                      value={formData?.occupation || user?.occupation}
                      name="occupation"
                    >
                      <option value="procurement">تدارکات </option>
                      <option value="technical_officer">تکنیکال</option>
                      <option value="quality_control">کنترل کیفی</option>
                      <option value="research_development">
                        تحقیق و توسعه
                      </option>
                      <option value="quality_assurance">تضمین</option>
                      <option value="student">دانشجو/ محقق</option>
                      <option value="startup_member">عضو استارت آپ</option>
                      <option value="other">سایر</option>
                    </select>

                    <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                      شغل
                    </label>
                  </div>
                </div>
              </>
            </div>
          </div>

          <div className="absolute right-0 bottom-[6rem] flex justify-center gap-10 w-full ">
            <button
              type="submit"
              className="hover:shadow-form w-full max-w-xs rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
            >
              {loading ? "در حال ثبت" : "ثبت"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserSettings;
