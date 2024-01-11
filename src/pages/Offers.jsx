import React from "react";
import { useNavigate } from "react-router-dom";

const Offers = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="w-full text-center mt-10  ">
        <button
          onClick={() => navigate(-1)}
          className="absolute border top-2 left-2 z-50 bg-white hover:bg-black hover:text-white text-black font-bold py-2 px-4 rounded"
        >
          بازگشت
        </button>
        <h1 className="text-4xl font-bold py-10 bg-slate-700 text-white">
          نمایشگاه بین المللی قطعات و مواد بومی سازی شده
        </h1>
      </div>
      <form className="w-full flex flex-wrap justify-between border rounded-xl p-10">
        <div className="flex w-1/2 flex-wrap -mx-3 mb-6">
          <div className="w-full flex justify-between">
            <div className="w-full md:w-1/2 px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-last-name"
              >
                تناژ
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-last-name"
                type="text"
                placeholder="تناژ"
              />
            </div>
            <div className="flex flex-col gap-2">
              <div class="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
                <label
                  class="inline-block pl-[0.15rem] hover:cursor-pointer"
                  for="checkboxDefault"
                >
                  مواد
                </label>
                <input
                  class="relative float-left -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                  type="checkbox"
                  value=""
                  id="checkboxDefault"
                />
              </div>

              <div class="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
                <label
                  class="inline-block pl-[0.15rem] hover:cursor-pointer"
                  for="checkboxChecked"
                >
                  قطعات
                </label>
                <input
                  class="relative float-left -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                  type="checkbox"
                  value=""
                  id="checkboxChecked"
                  checked
                />
              </div>
            </div>
          </div>

          <div className="w-full mt-5 ">
            <textarea
              className="w-full bg-slate-100 h-[200px] text-right p-5"
              placeholder="توضیحات"
            ></textarea>
          </div>
        </div>

        <div className="flex flex-wrap w-1/2 -mx-3 mb-2 text-left">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 mt-2">
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-city"
              type="text"
              placeholder="نام"
            />
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 mt-2">
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-city"
              type="text"
              placeholder="نام خانوادگی"
            />
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 mt-2">
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-city"
              type="text"
              placeholder="سمت در شرکت "
            />
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 mt-2">
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-city"
              type="text"
              placeholder="نام شرکت"
            />
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 mt-2">
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-city"
              type="text"
              placeholder="شهر "
            />
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 mt-2">
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-city"
              type="text"
              placeholder="استان "
            />
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 mt-2">
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-city"
              type="email"
              placeholder="ایمیل"
            />
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 mt-2">
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-city"
              type="number"
              placeholder="شماره تماس"
            />
          </div>
        </div>
        <button class="bg-green-500 w-full block hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          ثبت
        </button>
      </form>
      <div className="bg-gray-100 p-6">
        <div className="flex flex-col space-y-4">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-bold">John Doe</h3>
            <p className="text-gray-700 text-sm mb-2">
              Posted on April 17, 2023
            </p>
            <p className="text-gray-700">
              This is a sample comment. Lorem ipsum dolor sit amet, consectetur
              adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua.
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-bold">Jane Smith</h3>
            <p className="text-gray-700 text-sm mb-2">
              Posted on April 16, 2023
            </p>
            <p className="text-gray-700">
              I agree with John. Lorem ipsum dolor sit amet, consectetur
              adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua.
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-bold">Bob Johnson</h3>
            <p className="text-gray-700 text-sm mb-2">
              Posted on April 15, 2023
            </p>
            <p className="text-gray-700">
              I have a different opinion. Lorem ipsum dolor sit amet,
              consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
              labore et dolore magna aliqua.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Offers;
