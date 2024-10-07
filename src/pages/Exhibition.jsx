import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { exhibitionBg } from "../images";
import HomeIcon from "../components/HomeIcon";
import { fetchExhibitions } from "../redux/slices/exhibitionSlice";
import { useSelector, useDispatch } from "react-redux";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Loading from "../components/Loading";

export default function Exhibition() {
  const { exhibitions, loading, error } = useSelector(
    (state) => state.exhibitions
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchExhibitions());
  }, [dispatch]);

  return (
    <div
      className="relative pt-52 px-10"
      style={{
        backgroundImage: `url(${exhibitionBg})`,
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
          <HomeIcon />

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
