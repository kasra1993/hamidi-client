import React, { useContext, useState } from "react";
import AuthContext from "../../context/auth_context";
import { useNavigate } from "react-router-dom";
import VerificationModal from "./VerificationModal"; // Import the custom modal component
import { userBg } from "../../images";
import HomeIcon from "../../components/HomeIcon";

const UserRegistration = () => {
  const { userRegister } = useContext(AuthContext);
  const [showVerification, setShowVerification] = useState(false);
  const [errors, setErrors] = useState({});
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    family_name: "",
    address: "",
    id_number: "",
    cellphone: "",
    phone: "",
    role: "",
    password: "",
    repeat_password: "",
    email: "",
    username: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    const { repeat_password, ...dataToSubmit } = formData;
    dataToSubmit.role = "user";
    dataToSubmit.username = formData.email;
    await userRegister(dataToSubmit);
    setShowVerification(true); // Show verification modal
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name) newErrors.name = "نام مورد نیاز است";
    if (!formData.family_name)
      newErrors.family_name = "نام خانوادگی مورد نیاز است";
    if (!formData.address) newErrors.address = "آدرس مورد نیاز است";
    if (!formData.id_number) newErrors.id_number = "کد ملی مورد نیاز است";
    if (!formData.cellphone) newErrors.cellphone = "شماره همراه  مورد نیاز است";
    if (!formData.phone) newErrors.phone = " شماره تماس ثابت مورد نیاز است";
    if (!formData.occupation) newErrors.occupation = "شغل را انتخاب بفرمایید";
    if (!formData.email) {
      newErrors.email = "ایمیل مورد نیاز است";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "ایمیل معتبر نیست";
    }
    if (!formData.password) {
      newErrors.password = "رمز عبور مورد نیاز است";
    } else if (formData.password.length < 8) {
      newErrors.password = "رمز عبور باید حداقل 8 کاراکتر باشد";
    }
    if (formData.password !== formData.repeat_password) {
      newErrors.repeat_password = "رمزهای عبور مطابقت ندارند";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  return (
    <div
      className="flex items-center justify-center p-12 bg-slate-200 h-screen"
      style={{
        backgroundImage: `url(${userBg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <HomeIcon />
      <form
        className="mx-auto w-3/4 h-3/4 bg-white p-10 rounded-2xl"
        onSubmit={handleSubmit}
      >
        <div className="mb-5 pt-3">
          <label className="mb-5 block text-base font-semibold text-[#07074D] sm:text-xl">
            ثبت نام
          </label>
          <div className="-mx-3 flex flex-wrap px-10">
            {step === 1 && (
              <>
                <div className="w-full px-3 sm:w-1/2">
                  <div className="mb-5">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      placeholder="نام"
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                      onChange={handleChange}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                    )}
                  </div>
                </div>
                <div className="w-full px-3 sm:w-1/2">
                  <div className="mb-5">
                    <input
                      type="text"
                      name="family_name"
                      id="family_name"
                      placeholder="نام خانوادگی"
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                      onChange={handleChange}
                    />
                    {errors.family_name && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.family_name}
                      </p>
                    )}
                  </div>
                </div>

                <div className="w-full px-3 sm:w-1/2">
                  <div className="mb-5">
                    <input
                      type="text"
                      name="address"
                      id="address"
                      placeholder="آدرس"
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                      onChange={handleChange}
                    />
                    {errors.address && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.address}
                      </p>
                    )}
                  </div>
                </div>
                <div className="w-full px-3 sm:w-1/2">
                  <div className="mb-5">
                    <input
                      type="number"
                      name="id_number"
                      id="id_number"
                      placeholder="کد ملی"
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                      onChange={handleChange}
                    />
                    {errors.id_number && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.id_number}
                      </p>
                    )}
                  </div>
                </div>
                <div className="w-full px-3 sm:w-1/2">
                  <div className="mb-5">
                    <input
                      type="number"
                      name="cellphone"
                      id="cellphone"
                      placeholder="شماره تماس"
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                      onChange={handleChange}
                    />
                    {errors.cellphone && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.cellphone}
                      </p>
                    )}
                  </div>
                </div>
                <div className="w-full px-3 sm:w-1/2">
                  <div className="mb-5">
                    <input
                      type="number"
                      name="phone"
                      id="phone"
                      placeholder="تلفن ثابت"
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                      onChange={handleChange}
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>
                <div className="w-full px-3 sm:w-1/2">
                  <div className="relative h-10 w-72 min-w-[200px]">
                    <select
                      className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-gray-900 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                      onChange={handleChange} // Add the onChange event handler
                      value="purchase_manager"
                      name="occupation"
                    >
                      <option value="purchase_manager">مسئول خرید</option>
                      <option value="student">دانشجو/ محقق</option>
                      <option value="startup_member">عضو استارت آپ</option>
                      <option value="provider">تامین کننده</option>
                      <option value="analyzer"> تحلیلگر</option>
                      <option value="observer"> ناظر</option>
                      <option value="other">سایر</option>
                    </select>

                    <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                      شغل
                    </label>
                    {errors.occupation && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.occupation}
                      </p>
                    )}
                  </div>
                </div>
              </>
            )}
            {step === 2 && (
              <div className="flex flex-col w-full justify-center items-center">
                <div className="w-1/2 px-3 ">
                  <div className="mb-5">
                    <input
                      type="text"
                      name="email"
                      id="email"
                      placeholder="پست الکترونیک"
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md text-right"
                      onChange={handleChange}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>
                <div className="w-full px-3 sm:w-1/2">
                  <div className="mb-5">
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="رمز عبور"
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md text-right"
                      onChange={handleChange}
                    />
                    {errors.password && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.password}
                      </p>
                    )}
                  </div>
                </div>
                <div className="w-full px-3 sm:w-1/2">
                  <div className="mb-5">
                    <input
                      type="password"
                      name="repeat_password"
                      id="repeat-password"
                      placeholder="تکرار رمز عبور"
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md text-right"
                      onChange={handleChange}
                    />
                    {errors.repeat_password && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.repeat_password}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="absolute right-0 bottom-[10rem] flex justify-center gap-10 w-full ">
          {step > 1 && (
            <button
              type="button"
              onClick={handlePreviousStep}
              className="hover:shadow-form w-full max-w-xs rounded-md bg-gray-500 py-3 px-8 text-center text-base font-semibold text-white outline-none"
            >
              مرحله قبل
            </button>
          )}
          {step < 2 && (
            <button
              type="button"
              onClick={handleNextStep}
              className="hover:shadow-form w-full max-w-xs rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base  font-semibold text-white outline-none"
            >
              مرحله بعد
            </button>
          )}
          {step === 2 && (
            <button
              type="submit"
              className="hover:shadow-form w-full max-w-xs rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
            >
              ثبت نام
            </button>
          )}
        </div>
      </form>
      {showVerification && (
        <VerificationModal
          email={formData.email}
          onClose={() => setShowVerification(false)}
          mode="register"
        />
      )}
    </div>
  );
};

export default UserRegistration;
