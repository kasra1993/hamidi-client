import React, { useContext, useState } from "react";
import AuthContext from "../../context/auth_context";
import Loading from "../../components/Loading";

const ProviderSettings = () => {
  const { user, setUser } = useContext(AuthContext);
  const [formData, setFormData] = useState(user);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [step, setStep] = useState(1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/users/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        setUser(result.user); // Update the context with new user data
        setMessage("Settings updated successfully!");
      } else {
        setMessage(result.message || "Failed to update settings.");
      }
    } catch (error) {
      setMessage("An error occurred while updating settings.");
    }
    setLoading(false);
  };

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  if (!user) {
    return <Loading />;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 ">
      <div className="bg-white p-8 rounded-lg shadow-lg w-3/4 ">
        <h2 className="text-3xl font-bold mb-6 text-center">
          {" "}
          ویرایش تامین کننده
        </h2>
        {message && <p className="mb-4 text-center text-red-500">{message}</p>}
        <form
          className="mx-auto w-3/4 h-3/4 bg-white p-10 rounded-2xl"
          onSubmit={handleSubmit}
        >
          <div className="mb-5 pt-3">
            <div className="-mx-3 flex flex-wrap px-10 py-5">
              {step === 1 && (
                <>
                  <div className="w-full px-3 sm:w-1/2">
                    <div className="mb-5">
                      <label
                        htmlFor="company_name"
                        className="block text-sm font-medium text-gray-700 mb-5"
                      >
                        نام کمپانی
                      </label>
                      <input
                        type="text"
                        name="company_name"
                        id="company_name"
                        placeholder={user?.company_name}
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md text-right"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="w-full px-3 sm:w-1/2">
                    <div className="mb-5">
                      <label
                        htmlFor="ceo_name"
                        className="block text-sm font-medium text-gray-700 mb-5"
                      >
                        نام مدیر
                      </label>
                      <input
                        type="text"
                        name="ceo_name"
                        id="ceo_name"
                        placeholder={user?.ceo_name}
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md text-right"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="w-full px-3 sm:w-1/2">
                    <div className="mb-5">
                      <label
                        htmlFor="website_address"
                        className="block text-sm font-medium text-gray-700 mb-5"
                      >
                        آدرس وبسایت
                      </label>
                      <input
                        type="text"
                        name="website_address"
                        id="website_address"
                        placeholder={user?.website_address}
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md text-right"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="w-full px-3 sm:w-1/2">
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
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md text-right"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="w-full px-3 sm:w-1/2">
                    <div className="mb-5">
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium text-gray-700 mb-5"
                      >
                        کشور
                      </label>
                      <input
                        type="text"
                        name="country"
                        id="country"
                        placeholder={user?.country}
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md text-right"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="w-full px-3 sm:w-1/2">
                    <div className="mb-5">
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium text-gray-700 mb-5"
                      >
                        شهر
                      </label>
                      <input
                        type="text"
                        name="city"
                        id="city"
                        placeholder={user?.city}
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md text-right"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="w-full px-3 sm:w-1/2">
                    <div className="mb-5">
                      <label
                        htmlFor="form_filler_name"
                        className="block text-sm font-medium text-gray-700 mb-5"
                      >
                        نام پر کننده فرم
                      </label>
                      <input
                        type="text"
                        name="form_filler_name"
                        id="form_filler_name"
                        placeholder={user?.form_filler_name}
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md text-right"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="w-full px-3 sm:w-1/2">
                    <div className="mb-5">
                      <label
                        htmlFor="form_filler_position"
                        className="block text-sm font-medium text-gray-700 mb-5"
                      >
                        جایگاه پر کننده فرم
                      </label>
                      <input
                        type="text"
                        name="form_filler_position"
                        id="form_filler_position"
                        placeholder={user?.form_filler_position}
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md text-right"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </>
              )}
              {step === 2 && (
                <>
                  <div className="w-full px-3 sm:w-1/2">
                    <div className="mb-5">
                      <label
                        htmlFor="id_number"
                        className="block text-sm font-medium text-gray-700 mb-5"
                      >
                        کد ملی
                      </label>
                      <input
                        type="number"
                        name="id_number"
                        id="id_number"
                        placeholder={user?.id_number}
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md text-right"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="w-full px-3 sm:w-1/2">
                    <div className="mb-5">
                      <label
                        htmlFor="cellphone"
                        className="block text-sm font-medium text-gray-700 mb-5"
                      >
                        شماره تماس
                      </label>
                      <input
                        type="number"
                        name="cellphone"
                        id="cellphone"
                        placeholder={user?.cellphone}
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md text-right"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="w-full px-3 sm:w-1/2">
                    <div className="mb-5">
                      <label
                        htmlFor="ceo_cellphone"
                        className="block text-sm font-medium text-gray-700 mb-5"
                      >
                        شماره تماس مدیر
                      </label>
                      <input
                        type="number"
                        name="ceo_cellphone"
                        id="ceo_cellphone"
                        placeholder={user?.ceo_cellphone}
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md text-right"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="w-full px-3 sm:w-1/2">
                    <div className="mb-5">
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700 mb-5"
                      >
                        تلفن ثابت
                      </label>
                      <input
                        type="number"
                        name="phone"
                        id="phone"
                        placeholder={user?.phone}
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md text-right"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="w-full px-3 sm:w-1/2">
                    <div className="mb-5">
                      <label
                        htmlFor="foundation_year"
                        className="block text-sm font-medium text-gray-700 mb-5"
                      >
                        سال تاسیس
                      </label>
                      <input
                        type="number"
                        name="foundation_year"
                        id="foundation_year"
                        placeholder={user?.foundation_year}
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md text-right"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="w-full px-3 sm:w-1/2">
                    <div className="mb-5">
                      <label
                        htmlFor="postal_code"
                        className="block text-sm font-medium text-gray-700 mb-5"
                      >
                        کد پستی
                      </label>
                      <input
                        type="number"
                        name="postal_code"
                        id="postal_code"
                        placeholder={user?.postal_code}
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md text-right"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="w-full px-3 sm:w-1/2">
                    <div className="mb-5">
                      <label
                        htmlFor="fax_number"
                        className="block text-sm font-medium text-gray-700 mb-5"
                      >
                        شماره فکس
                      </label>
                      <input
                        type="number"
                        name="fax_number"
                        id="fax_number"
                        placeholder={user?.fax_number}
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md text-right"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="w-full px-3 sm:w-1/2">
                    <div className="mb-5">
                      <label
                        htmlFor="economical_number"
                        className="block text-sm font-medium text-gray-700 mb-5"
                      >
                        شماره اقتصادی
                      </label>
                      <input
                        type="number"
                        name="economical_number"
                        id="economical_number"
                        placeholder={user?.economical_number}
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md text-right"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </>
              )}
              {/* {step === 3 && (
                <div className="flex flex-col w-full justify-center items-center">
                  <div className="w-1/2 px-3 ">
                    <div className="mb-5">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-5"
                      >
                        پست الکترونیک
                      </label>
                      <input
                        type="text"
                        name="email"
                        id="email"
                        placeholder={formData.email}
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md text-right"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="w-full px-3 sm:w-1/2">
                    <div className="mb-5">
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700 mb-5"
                      >
                        رمز عبور
                      </label>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder={formData.password}
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md text-right"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="w-full px-3 sm:w-1/2">
                    <div className="mb-5">
                      <label
                        htmlFor="repeat_password"
                        className="block text-sm font-medium text-gray-700 mb-5"
                      >
                        تکرار رمز عبور
                      </label>
                      <input
                        type="password"
                        name="repeat_password"
                        id="repeat-password"
                        placeholder={formData.repeat_password}
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md text-right"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              )} */}
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
      </div>
    </div>
  );
};

export default ProviderSettings;
