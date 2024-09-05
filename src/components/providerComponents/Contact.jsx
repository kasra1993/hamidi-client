import React from "react";

const Contact = ({ provider }) => {
  console.log(provider);
  return (
    <div className="bg-gray-200 h-auto w-full">
      <div className="md:px-20 px-4 py-8 flex justify-between">
        <img src={provider?.image?.url} alt="logo" className="w-[5rem]" />
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
                arial-label="Please input email address"
                type="text"
                className="text-base leading-none text-gray-900 p-3 focus:oultine-none focus:border-indigo-700 mt-4 bg-gray-100 border rounded border-gray-200 placeholder-grey-500 text-right"
                placeholder="تقاضای پیش فاکتور"
              />
            </div>
          </div>

          <div>
            <div className="w-full flex flex-col mt-8">
              <label className="text-base font-semibold leading-none text-gray-800 ">
                پیام
              </label>
              <textarea
                tabIndex={0}
                aria-label="leave a message"
                role="textbox"
                type="name"
                className="h-36 text-base leading-none text-gray-900 p-3 focus:oultine-none focus:border-indigo-700 mt-4 bg-gray-100 border rounded border-gray-200 placeholder-gray-100 resize-none text-right"
                defaultValue={""}
              />
            </div>
          </div>
          <p className="text-مل leading-3 text-gray-600 mt-4">
            .شرایط استفاده از خدمات و حریم خصوصی ریرکو را می‌پذیرم
          </p>
          <div className="flex items-center justify-center w-full">
            <button className="mt-9 text-base font-semibold leading-none text-white py-4 px-10 bg-gray-800 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 focus:outline-none">
              ثبت
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
