import React, { useState } from "react";
import Loading from "../../components/Loading";
import { useDispatch, useSelector } from "react-redux";
import { updateProviderSettings } from "../../redux/slices/providerSlice";

const ProviderSettings = () => {
  const { provider } = useSelector((state) => state.provider);
  const [formData, setFormData] = useState(provider);
  const [message, setMessage] = useState("");
  const [step, setStep] = useState(1);
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.provider);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateProviderSettings({ userId: provider?._id, formData }))
      .unwrap() // Unwraps the response to handle success and error locally
      .then((response) => {
        setMessage("با موفقیت ثبت شد");
      })
      .catch((error) => {
        setMessage(error || "مشکلی پیش آمده است ");
      });
  };

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  if (!provider) {
    return <Loading />;
  }

  return (
    <div className="flex justify-center items-center bg-gray-100 ">
      <div className="bg-white p-8 rounded-lg shadow-lg w-3/4  ">
        <h2 className="text-3xl font-bold mb-6 text-center">
          {" "}
          ویرایش تامین کننده
        </h2>
        {message && (
          <p className="mb-4 text-center text-green-500">{message}</p>
        )}
        <form
          className="mx-auto w-3/4 h-3/4 bg-white p-10 rounded-2xl"
          onSubmit={handleSubmit}
        >
          <div className="mb-5 pt-3">
            <div className="-mx-3 flex flex-wrap px-10 py-5">
              {step === 1 && (
                <>
                  <div className="w-full px-3 sm:w-1/3">
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
                        placeholder={provider?.company_name}
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md text-right"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="w-full px-3 sm:w-1/3">
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
                        placeholder={provider?.ceo_name}
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md text-right"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="w-full px-3 sm:w-1/3">
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
                        placeholder={provider?.website_address}
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md text-right"
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
                        placeholder={provider?.address}
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md text-right"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="w-full px-3 sm:w-1/3">
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
                        placeholder={provider?.country}
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md text-right"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="w-full px-3 sm:w-1/3">
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
                        placeholder={provider?.city}
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
                        placeholder={provider?.form_filler_name}
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
                        سمت پر کننده فرم
                      </label>
                      <input
                        type="text"
                        name="form_filler_position"
                        id="form_filler_position"
                        placeholder={provider?.form_filler_position}
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md text-right"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </>
              )}
              {step === 2 && (
                <>
                  <div className="w-full px-3 sm:w-1/3">
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
                        placeholder={provider?.id_number}
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md text-right"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="w-full px-3 sm:w-1/3">
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
                        placeholder={provider?.cellphone}
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md text-right"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="w-full px-3 sm:w-1/3">
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
                        placeholder={provider?.ceo_cellphone}
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md text-right"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="w-full px-3 sm:w-1/3">
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
                        placeholder={provider?.phone}
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md text-right"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="w-full px-3 sm:w-1/3">
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
                        placeholder={provider?.foundation_year}
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md text-right"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="w-full px-3 sm:w-1/3">
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
                        placeholder={provider?.postal_code}
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md text-right"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="w-full px-3 sm:w-1/3">
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
                        placeholder={provider?.fax_number}
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md text-right"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="w-full px-3 sm:w-1/3">
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
                        placeholder={provider?.economical_number}
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md text-right"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="absolute right-0 bottom-[2rem] flex justify-center gap-10 w-full ">
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
                {loading ? "در حال ثبت" : "ثبت"}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProviderSettings;
