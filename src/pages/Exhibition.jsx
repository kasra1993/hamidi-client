import React, { useState, useEffect } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { main_url as url } from "../utils/constants";
import exhibitionBackground from "/exhibition-bg.png";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";

export default function Exhibition() {
  const [exhibitions, setExhibitions] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  useEffect(() => {
    const fetchExhibitions = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${url}/exhibitions`);
        if (!response.ok) {
          throw new Error("Something went wrong");
        }
        const data = await response.json();
        setExhibitions(data);
      } catch (error) {
        setError(error.message);
      }
      setLoading(false);
    };

    fetchExhibitions();
  }, []); // Dependency array
  return (
    <div
      className="relative pt-52 px-10"
      style={{
        backgroundImage: `url(${exhibitionBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
      }}
    >
      {loading && (
        <div className="w-[85%] relative">
          <Loading />
        </div>
      )}
      {error && <p>Error: {error}</p>}
      {exhibitions && (
        <div className="">
          <button
            onClick={() => navigate(-1)}
            className="absolute top-28 left-10 z-50 hover:bg-black hover:text-white text-black font-bold py-2 px-4 rounded border"
          >
            بازگشت
          </button>

          <div className="w-full h-1/2">
            <Swiper
              slidesPerView={1}
              centeredSlides={true}
              autoplay={{
                delay: 10000,
                disableOnInteraction: true,
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
              className="mySwiper h-full" // Ensure Swiper takes full height of its container
            >
              {exhibitions &&
                exhibitions.map((slide, index) => (
                  <SwiperSlide key={index} className="flex h-full">
                    {" "}
                    {/* Ensure slides take full height */}
                    <div className="w-1/2 h-full flex justify-center align-middle flex-col px-10">
                      <h1 className="font-bold text-center text-[35px] my-10 ">
                        {slide.title}
                      </h1>
                      <h3 className=" text-xs">{slide.description}</h3>
                    </div>
                    <div className="w-1/2 h-[500px]">
                      <img
                        src={slide.image.url}
                        alt={slide.title}
                        className="w-full h-full object-cover "
                      />
                    </div>
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
        </div>
      )}
    </div>
  );
}
