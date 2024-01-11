import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { useNavigate } from "react-router-dom";

const slides = [
  {
    id: 1,
    image: "/exhibition1.jpeg",
    title: "نمایشگاه قطعات و مواد",
    description:
      "در این صفحه می توانید اخبار مربوط به هجدهمین نمایشگاه بین المللی قطعات و مواد ۱۴۰۲، اطلاعات برگزار کننده ،معرفی برندهای برتر و گفت و گو با مدیران این صنعت ، لیست مشارکت کنندگان به همراه راهنمای جامع خدمات نمایشگاهی، غرفه سازی و تاریخچه نمایشگاه بین المللی قطعات و مواد را مشاهده کنید.",
  },
  {
    id: 2,
    image: "/exhibition2.jpeg",
    title: "نمایشگاه قطعات و مواد",
    description:
      "در این صفحه می توانید اخبار مربوط به هجدهمین نمایشگاه بین المللی قطعات و مواد ۱۴۰۲، اطلاعات برگزار کننده ،معرفی برندهای برتر و گفت و گو با مدیران این صنعت ، لیست مشارکت کنندگان به همراه راهنمای جامع خدمات نمایشگاهی، غرفه سازی و تاریخچه نمایشگاه بین المللی قطعات و مواد را مشاهده کنید.",
  },
  {
    id: 3,
    image: "/exhibition3.jpeg",
    title: "نمایشگاه قطعات و مواد",
    description:
      "در این صفحه می توانید اخبار مربوط به هجدهمین نمایشگاه بین المللی قطعات و مواد ۱۴۰۲، اطلاعات برگزار کننده ،معرفی برندهای برتر و گفت و گو با مدیران این صنعت ، لیست مشارکت کنندگان به همراه راهنمای جامع خدمات نمایشگاهی، غرفه سازی و تاریخچه نمایشگاه بین المللی قطعات و مواد را مشاهده کنید.",
  },
];

export default function Exhibition() {
  const navigate = useNavigate();
  return (
    <div className="relative">
      <button
        onClick={() => navigate(-1)}
        className="absolute top-2 left-2 z-50 bg-white hover:bg-black hover:text-white text-black font-bold py-2 px-4 rounded border"
      >
        بازگشت
      </button>
      <div className="w-full text-center pt-20 ">
        <h1 className="text-4xl font-bold py-10 bg-slate-700 text-white">
          نمایشگاه بین المللی قطعات و مواد بومی سازی شده
        </h1>
      </div>
      <div className="w-full h-full">
        <Swiper
          slidesPerView={1}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={10}
          effect="fade"
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 1,
              spaceBetween: 30,
            },
          }}
          className="mySwiper my-10"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="w-1/2 h-screen bg-[#fef2f2] flex justify-center align-middle flex-col px-10">
                <h1 className="font-bold text-center text-[35px] my-10 ">
                  {slide.title}
                </h1>
                <h3 className="text-[18px] leading-10">{slide.description}</h3>
              </div>
              <div className="w-1/2 h-screen">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
