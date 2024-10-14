import React, { useState } from "react";
import VerificationModal from "./VerificationModal"; // Import the custom modal component
import { userBg } from "../../images";
import HomeIcon from "../../components/HomeIcon";
import { userRegister } from "../../redux/slices/userSlice";
import { useDispatch } from "react-redux";
import { calculateRemainingTime } from "../../utils/helpers";

const UserRegistration = () => {
  const [showVerification, setShowVerification] = useState(false);
  const [errors, setErrors] = useState({});
  const [step, setStep] = useState(1);
  const [image, setImage] = useState();
  const [imagePreview, setImagePreview] = useState(null); // Preview image state
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
    occupation: "",
    age: "",
    sex: "",
  });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const time = calculateRemainingTime();
    if (!validate()) return;
    setShowVerification(true);
    const { repeat_password, ...dataToSubmit } = formData;
    dataToSubmit.role = "user";
    dataToSubmit.username = formData.email;
    if (image) {
      dataToSubmit.image = image;
    }
    if (time) return;
    dispatch(userRegister(dataToSubmit));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          image: "اندازه تصویر نباید بیشتر از 2 مگابایت باشد",
        }));
        return;
      }
      setImagePreview(URL.createObjectURL(file));
      setErrors((prevErrors) => ({
        ...prevErrors,
        image: undefined, // Clear the error if the file size is acceptable
      }));
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
    };
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name) newErrors.name = "نام مورد نیاز است";
    if (!formData.family_name)
      newErrors.family_name = "نام خانوادگی مورد نیاز است";
    if (!formData.age) newErrors.age = "سن مورد نیاز است";
    if (!formData.id_number) newErrors.id_number = "کد ملی مورد نیاز است";
    if (!formData.cellphone) newErrors.cellphone = "شماره همراه  مورد نیاز است";
    if (!formData.sex) newErrors.sex = "لطفا جنسیت را مشخص کنید";
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
        encType="multipart/form-data"
      >
        <div className="mb-5 pt-3">
          <label className="mb-20 block text-base font-semibold text-[#07074D] sm:text-xl">
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

                {/* <div className="w-full px-3 sm:w-1/2">
                  <div className="mb-5">
                    <input
                      type="number"
                      name="age"
                      id="age"
                      placeholder="سن"
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                      onChange={handleChange}
                    />
                    {errors.age && (
                      <p className="text-red-500 text-xs mt-1">{errors.age}</p>
                    )}
                  </div>
                </div> */}

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
                <div className="flex justify-around w-full ">
                  <div className="w-full px-3 sm:w-1/2 ">
                    <div className="relative h-10 w-72 min-w-[200px] mx-auto">
                      <select
                        className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-1 font-sans text-xs font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-gray-900 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                        onChange={handleChange} // Add the onChange event handler
                        value={formData.age} // Dynamically set value from formData
                        name="age"
                      >
                        <option value="">انتخاب</option>
                        <option value="under">زیر 20 سال</option>
                        <option value="20-30">20 - 30</option>
                        <option value="30-40">30 - 40</option>
                        <option value="40-50">40 - 50</option>
                        <option value="above">بالای 50 سال</option>
                        <option value="other">نمیخواهم بگویم</option>
                      </select>

                      <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                        سن
                      </label>
                      {errors.age && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.age}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="w-full px-3 sm:w-1/2">
                    <div className="relative h-10 w-72 min-w-[200px] mx-auto">
                      <select
                        className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-1 font-sans text-xs font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-gray-900 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                        onChange={handleChange} // Add the onChange event handler
                        value={formData.sex} // Dynamically set value from formData
                        name="sex"
                      >
                        <option value="">انتخاب</option>
                        <option value="man">مرد</option>
                        <option value="woman">زن</option>
                        <option value="other">نمیخواهم بگویم</option>
                      </select>

                      <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                        جنسیت
                      </label>
                      {errors.sex && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.sex}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="w-full px-3 sm:w-1/2">
                    <div className="relative h-10 w-72 min-w-[200px] mx-auto">
                      <select
                        className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-1 font-sans text-xs font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-gray-900 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                        onChange={handleChange} // Add the onChange event handler
                        value={formData.occupation} // Dynamically set value from formData
                        name="occupation"
                      >
                        <option value="">انتخاب</option>
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
                      {errors.occupation && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.occupation}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </>
            )}
            {step === 2 && (
              <div className="flex w-full justify-center items-center">
                <div className="w-1/2">
                  <div className="w-full px-3 ">
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
                  <div className="w-full px-3">
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
                  <div className="w-full px-3 ">
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

                <div className="w-1/2 px-3 mb-5">
                  <label className="block text-base font-semibold text-gray-700 sm:text-xl mb-2">
                    بارگزاری تصویر کاربری
                  </label>
                  <div className="flex items-center">
                    <label className="w-full flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue-200">
                      <svg
                        className="w-8 h-8"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M16.88 7.59l-3.3-3.3c-.56-.56-1.4-.56-1.96 0l-3.3 3.3c-.56.56-.56 1.4 0 1.96L10 11l1.88-1.88 4.12-4.12zM10 12l1.88-1.88 4.12 4.12L14.12 16H5v-2h3l2-2zm5-10c.55 0 1 .45 1 1v3h-2V3H3v14h4v2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h14z" />
                      </svg>
                      <input
                        type="file"
                        className="hidden"
                        onChange={handleImageChange}
                      />
                    </label>
                  </div>
                  {imagePreview && (
                    <div className="">
                      <img
                        src={imagePreview}
                        alt="Company logo preview"
                        className="w-[100%] max-h-28 rounded-md object-contain pt-2"
                      />
                    </div>
                  )}
                  {errors.image && (
                    <p className="text-red-500 text-xs mt-1">{errors.image}</p>
                  )}
                </div>
              </div>
              // <div className="flex flex-col w-full justify-center items-center">
              //   <div className="w-1/2 px-3 ">
              //     <div className="mb-5">
              //       <input
              //         type="text"
              //         name="email"
              //         id="email"
              //         placeholder="پست الکترونیک"
              //         className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md text-right"
              //         onChange={handleChange}
              //       />
              //       {errors.email && (
              //         <p className="text-red-500 text-xs mt-1">
              //           {errors.email}
              //         </p>
              //       )}
              //     </div>
              //   </div>
              //   <div className="w-full px-3 sm:w-1/2">
              //     <div className="mb-5">
              //       <input
              //         type="password"
              //         name="password"
              //         id="password"
              //         placeholder="رمز عبور"
              //         className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md text-right"
              //         onChange={handleChange}
              //       />
              //       {errors.password && (
              //         <p className="text-red-500 text-xs mt-1">
              //           {errors.password}
              //         </p>
              //       )}
              //     </div>
              //   </div>
              //   <div className="w-full px-3 sm:w-1/2">
              //     <div className="mb-5">
              //       <input
              //         type="password"
              //         name="repeat_password"
              //         id="repeat-password"
              //         placeholder="تکرار رمز عبور"
              //         className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md text-right"
              //         onChange={handleChange}
              //       />
              //       {errors.repeat_password && (
              //         <p className="text-red-500 text-xs mt-1">
              //           {errors.repeat_password}
              //         </p>
              //       )}
              //     </div>
              //   </div>
              // </div>
            )}
          </div>
        </div>

        <div className="flex justify-between gap-10 w-full  px-5 z-1">
          {step > 1 && (
            <button
              type="button"
              onClick={handlePreviousStep}
              className="absolute left-10 bottom-[20rem] hover:shadow-form w-auto max-w-xs rounded-md bg-[#061b42] py-3 px-8 text-center text-base font-semibold text-white outline-none hover:bg-white hover:text-[#061b42]"
            >
              مرحله قبل
            </button>
          )}
          {step < 2 && (
            <button
              type="button"
              onClick={handleNextStep}
              className="absolute right-10 bottom-[20rem] hover:shadow-form w-auto max-w-xs rounded-md bg-[#061b42] py-3 px-8 text-center text-base  font-semibold text-white outline-none hover:bg-white hover:text-[#061b42]"
            >
              مرحله بعد
            </button>
          )}
          {step === 2 && (
            <button
              type="submit"
              className="absolute right-[2rem] bottom-[20rem] hover:shadow-form w-auto max-w-xs rounded-md bg-green-500 py-3 px-8 text-center text-base font-semibold text-white outline-none hover:bg-green-700"
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
