import React, { useContext, useState } from "react";
import AuthContext from "../../context/auth_context";
import { useNavigate } from "react-router-dom";
import VerificationModal from "./VerificationModal"; // Import the custom modal component
import { FormContext } from "../../context/Form_Context";
import { providerBg } from "../../images";
import HomeIcon from "../../components/HomeIcon";

const ProviderRegistration = () => {
  const { providerRegister } = useContext(AuthContext);
  const [step, setStep] = useState(1);
  const [showVerification, setShowVerification] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    company_name: "",
    phone: "",
    cellphone: "",
    id_number: "",
    ceo_cellphone: "",
    foundation_year: "",
    postal_code: "",
    fax_number: "",
    economical_number: "",
    email: "",
    ceo_name: "",
    website_address: "",
    country: "",
    city: "",
    form_filler_name: "",
    form_filler_position: "",
    address: "",
    password: "",
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
    dataToSubmit.role = "provider";
    dataToSubmit.username = formData.email;
    await providerRegister(dataToSubmit);
    setShowVerification(true); // Show verification modal
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.company_name)
      newErrors.company_name = "نام کمپانی مورد نیاز است";
    if (!formData.phone) newErrors.phone = " شماره تماس ثابت مورد نیاز است";
    if (!formData.cellphone)
      newErrors.cellphone = " شماره تماس همراه مورد نیاز است";
    if (!formData.id_number) newErrors.id_number = " کد ملی مورد نیاز است";
    if (!formData.ceo_cellphone)
      newErrors.ceo_cellphone = " شماره تماس همراه مدیر شرکت مورد نیاز است";
    if (!formData.foundation_year)
      newErrors.foundation_year = " سال تاسیس مورد نیاز است";
    if (!formData.postal_code) newErrors.postal_code = " کد پستی مورد نیاز است";
    if (!formData.fax_number)
      newErrors.fax_number = "شماره فکس مدیر مورد نیاز است";
    if (!formData.economical_number)
      newErrors.economical_number = " شماره اقتصادی مورد نیاز است";
    if (!formData.ceo_name) newErrors.ceo_name = "نام مدیر مورد نیاز است";
    if (!formData.website_address)
      newErrors.website_address = "نام مدیر مورد نیاز است";
    if (!formData.country) newErrors.country = " نام کشور مورد نیاز است";
    if (!formData.city) newErrors.city = "نام شهر مورد نیاز است";
    if (!formData.form_filler_name)
      newErrors.form_filler_name = "نام تکمیل کننده این فرم مورد نیاز است";
    if (!formData.form_filler_position)
      newErrors.form_filler_position =
        " موقعینت شغلی تکمیل کننده این فرم مورد نیاز است";
    if (!formData.address) newErrors.address = " آدرس مورد نیاز است";
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
        backgroundImage: `url(${providerBg})`,
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
            ثبت نام تامین کننده
          </label>
          <div className="-mx-3 flex flex-wrap px-10 py-5">
            {step === 1 && (
              <>
                <div className="w-full px-3 sm:w-1/2">
                  <div className="mb-5">
                    <input
                      type="text"
                      name="company_name"
                      id="company_name"
                      placeholder="نام کمپانی"
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md text-right"
                      onChange={handleChange}
                    />
                    {errors.company_name && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.company_name}
                      </p>
                    )}
                  </div>
                </div>
                <div className="w-full px-3 sm:w-1/2">
                  <div className="mb-5">
                    <input
                      type="text"
                      name="ceo_name"
                      id="ceo_name"
                      placeholder="نام مدیر"
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md text-right"
                      onChange={handleChange}
                    />
                    {errors.ceo_name && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.ceo_name}
                      </p>
                    )}
                  </div>
                </div>
                <div className="w-full px-3 sm:w-1/2">
                  <div className="mb-5">
                    <input
                      type="text"
                      name="website_address"
                      id="website_address"
                      placeholder="آدرس وبسایت"
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md text-right"
                      onChange={handleChange}
                    />
                    {errors.website_address && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.website_address}
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
                      placeholder="آدرس "
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md text-right"
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
                      type="text"
                      name="country"
                      id="country"
                      placeholder="کشور"
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md text-right"
                      onChange={handleChange}
                    />
                    {errors.country && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.country}
                      </p>
                    )}
                  </div>
                </div>
                <div className="w-full px-3 sm:w-1/2">
                  <div className="mb-5">
                    <input
                      type="text"
                      name="city"
                      id="city"
                      placeholder="شهر"
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md text-right"
                      onChange={handleChange}
                    />
                    {errors.city && (
                      <p className="text-red-500 text-xs mt-1">{errors.city}</p>
                    )}
                  </div>
                </div>
                <div className="w-full px-3 sm:w-1/2">
                  <div className="mb-5">
                    <input
                      type="text"
                      name="form_filler_name"
                      id="form_filler_name"
                      placeholder="نام پر کننده فرم"
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md text-right"
                      onChange={handleChange}
                    />
                    {errors.form_filler_name && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.form_filler_name}
                      </p>
                    )}
                  </div>
                </div>
                <div className="w-full px-3 sm:w-1/2">
                  <div className="mb-5">
                    <input
                      type="text"
                      name="form_filler_position"
                      id="form_filler_position"
                      placeholder="سمت پر کننده فرم"
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md text-right"
                      onChange={handleChange}
                    />
                    {errors.form_filler_position && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.form_filler_position}
                      </p>
                    )}
                  </div>
                </div>
              </>
            )}
            {step === 2 && (
              <>
                <div className="w-full px-3 sm:w-1/2">
                  <div className="mb-5">
                    <input
                      type="number"
                      name="id_number"
                      id="id_number"
                      placeholder="کد ملی"
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md text-right"
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
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md text-right"
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
                      name="ceo_cellphone"
                      id="ceo_cellphone"
                      placeholder=" شماره تماس مدیر"
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md text-right"
                      onChange={handleChange}
                    />
                    {errors.ceo_cellphone && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.ceo_cellphone}
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
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md text-right"
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
                  <div className="mb-5">
                    <input
                      type="number"
                      name="foundation_year"
                      id="foundation_year"
                      placeholder=" سال تاسیس"
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md text-right"
                      onChange={handleChange}
                    />
                    {errors.foundation_year && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.foundation_year}
                      </p>
                    )}
                  </div>
                </div>
                <div className="w-full px-3 sm:w-1/2">
                  <div className="mb-5">
                    <input
                      type="number"
                      name="postal_code"
                      id="postal_code"
                      placeholder="کد پستی"
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md text-right"
                      onChange={handleChange}
                    />
                    {errors.postal_code && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.postal_code}
                      </p>
                    )}
                  </div>
                </div>
                <div className="w-full px-3 sm:w-1/2">
                  <div className="mb-5">
                    <input
                      type="number"
                      name="fax_number"
                      id="fax_number"
                      placeholder="شماره فکس "
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md text-right"
                      onChange={handleChange}
                    />
                    {errors.fax_number && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.fax_number}
                      </p>
                    )}
                  </div>
                </div>
                <div className="w-full px-3 sm:w-1/2">
                  <div className="mb-5">
                    <input
                      type="number"
                      name="economical_number"
                      id="economical_number"
                      placeholder="شماره اقتصادی  "
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md text-right"
                      onChange={handleChange}
                    />
                    {errors.economical_number && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.economical_number}
                      </p>
                    )}
                  </div>
                </div>
              </>
            )}
            {step === 3 && (
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

        <div className="absolute right-0 bottom-[4rem] flex justify-center gap-10 w-full ">
          {step > 1 && (
            <button
              type="button"
              onClick={handlePreviousStep}
              className="hover:shadow-form w-full max-w-xs rounded-md bg-gray-500 py-3 px-8 text-center text-base font-semibold text-white outline-none"
            >
              مرحله قبل
            </button>
          )}
          {step < 3 && (
            <button
              type="button"
              onClick={handleNextStep}
              className="hover:shadow-form w-full max-w-xs rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base  font-semibold text-white outline-none"
            >
              مرحله بعد
            </button>
          )}
          {step === 3 && (
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

export default ProviderRegistration;
