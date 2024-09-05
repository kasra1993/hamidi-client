import React from "react";

const About = ({ provider }) => {
  const defaultImage = "/default-provider-image.png";
  return (
    <div className="font-sans bg-white">
      <h2 className="text-3xl font-extrabold text-black bg-gray-200 rounded  py-10 ">
        {provider?.name}
      </h2>
      <div className="p-4 lg:max-w-7xl max-w-4xl mx-auto">
        <div className="grid items-start grid-cols-1 lg:grid-cols-7 gap-12 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] p-6 rounded-lg">
          <div className="lg:col-span-3 w-full lg:sticky top-0 text-center">
            <div className="px-4 py-10 rounded-lg shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] relative">
              <img
                src={provider?.image?.url || defaultImage}
                alt="Product"
                className="w-full rounded object-cover mx-auto"
              />
              <button type="button" className="absolute top-4 right-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20px"
                  fill="#ccc"
                  className="mr-1 hover:fill-[#333]"
                  viewBox="0 0 64 64"
                >
                  <path
                    d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z"
                    data-original="#000000"
                  ></path>
                </svg>
              </button>
            </div>
          </div>

          <div className="lg:col-span-4 ">
            <div className="flex flex-wrap justify-between border border-slate-300 px-5 py-1 rounded-xl mt-2">
              <p className="text-gray-500 text-base m-0">{provider?.email}</p>
              <p className="text-gray-400 text-lg m-0">ایمیل</p>
            </div>
            <div className="flex flex-wrap justify-between border border-slate-300 px-5 py-1 rounded-xl mt-2">
              <p className="text-gray-500 text-base m-0">{provider?.address}</p>
              <p className="text-gray-400 text-lg m-0">آدرس</p>
            </div>
            <div className="flex flex-wrap justify-between border border-slate-300 px-5 py-1 rounded-xl mt-2">
              <a href={provider?.link} className="text-gray-500 text-base m-0">
                {provider?.link}
              </a>
              <p className="text-gray-400 text-lg m-0">وبسایت</p>
            </div>
            <div className="flex flex-wrap justify-between border border-slate-300 px-5 py-1 rounded-xl mt-2">
              <p className="text-gray-500 text-base m-0">{provider?.phone}</p>
              <p className="text-gray-400 text-lg m-0">تماس</p>
            </div>
            <div className="flex flex-wrap justify-between border border-slate-300 px-5 py-1 rounded-xl mt-2">
              <p className="text-gray-500 text-base m-0">
                {provider?.establish_year}
              </p>
              <p className="text-gray-400 text-lg m-0">سال تاسیس</p>
            </div>
            <div className="flex flex-wrap justify-between border border-slate-300 px-5 py-1 rounded-xl mt-2">
              <p className="text-gray-500 text-base m-0">
                {provider?.cooperation_length} از سال
              </p>
              <p className="text-gray-400 text-lg m-0"> تاریخچه همکاری</p>
            </div>
            <div className="flex flex-wrap justify-between border border-slate-300 px-5 py-1 rounded-xl mt-2">
              <p className="text-gray-500 text-base m-0">
                {provider?.production_type === "industrial-production"
                  ? " صنعتی"
                  : provider?.production_type === "semi_industrial-production"
                  ? " نیمه صنعتی"
                  : provider?.production_type === "trial-production"
                  ? " آزمایشی"
                  : ""}
              </p>
              <p className="text-gray-400 text-lg m-0">نوع تولید</p>
            </div>
            <div className="flex flex-wrap justify-between border border-slate-300 px-5 py-1 rounded-xl mt-2">
              <p className="text-gray-500 text-base m-0">
                (تن) {provider?.production_volume}
              </p>
              <p className="text-gray-400 text-lg m-0">حجم تولید </p>
            </div>
            <div className="flex flex-wrap justify-between border border-slate-300 px-5 py-1 rounded-xl mt-2">
              <p className="text-gray-500 text-base m-0">{provider?.score}</p>
              <p className="text-gray-400 text-lg m-0"> امتیاز</p>
            </div>
            <div className="flex flex-wrap justify-around  py-1 rounded-xl mt-2">
              <div className="flex flex-wrap justify-between border border-slate-300 px-5 py-1 rounded-xl mt-2 w-1/3">
                <p className="text-gray-500 text-base m-0">
                  {provider?.knowledge_based ? "بله" : "خیر"}
                </p>
                <p className="text-gray-400 text-lg m-0"> دانش بنیان</p>
              </div>
              <div className="flex flex-wrap justify-between border border-slate-300 px-5 py-1 rounded-xl mt-2 w-1/3">
                <p className="text-gray-500 text-base m-0">
                  {provider?.has_export ? "دارد" : "ندارد"}
                </p>
                <p className="text-gray-400 text-lg m-0">صادرات</p>
              </div>
            </div>
            <div className="flex flex-wrap justify-between border border-slate-300 px-5 py-1 rounded-xl mt-2">
              <p className="text-gray-500 text-base m-0">
                {provider?.export_destination}
              </p>
              <p className="text-gray-400 text-lg m-0">مقصد صادرات</p>
            </div>
          </div>
        </div>
        <h2 className="text-2xl font-extrabold text-black bg-gray-200 rounded  py-5 mt-10 ">
          توضیحات
        </h2>
        <div className="mt-16 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] p-6">
          <p>{provider?.description}</p>
        </div>
      </div>
    </div>
  );
};

export default About;
