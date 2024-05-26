import React from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  Navigation,
  Pagination,
  Mousewheel,
  Keyboard,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// Images
import Banner1 from "../../img/Banner1.svg";
import Banner2 from "../../img/Banner2.svg";
import Banner3 from "../../img/Banner3.svg";

// Icons
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

export const BannerCard = () => {
  return (
    <>
      <div className="relative min-h-full w-full">
        <Swiper
          navigation={{
            nextEl: ".button-next",
            prevEl: ".button-prev",
          }}
          pagination={{
            clickable: true,
          }}
          loop={true}
          autoplay={{
            delay: 10000,
            disableOnInteraction: false,
          }}
          modules={[Autoplay, Pagination, Navigation, Mousewheel, Keyboard]}
          className="h-full min-w-full rounded-md border border-neutral-4 border-opacity-50 shadow-sm"
        >
          <SwiperSlide>
            <img
              src={Banner1}
              alt="Banner 1"
              className="h-full w-full object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src={Banner2}
              alt="Banner 2"
              className="h-full w-full object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src={Banner3}
              alt="Banner 2"
              className="h-full w-full object-cover"
            />
          </SwiperSlide>
        </Swiper>
        <button className="button-prev absolute -left-5 bottom-1/2 z-[1] translate-y-1/2 scale-[.65] sm:scale-75 md:scale-100">
          <p className="cursor-pointer rounded-full border border-neutral-4 bg-neutral-5 py-1 pl-[3px] pr-1 text-neutral-3 hover:bg-neutral-1 hover:text-neutral-5">
            <IoIosArrowBack size={40} />
          </p>
        </button>
        <button className="button-next absolute -right-5 bottom-1/2 z-[1] translate-y-1/2 scale-[.65] sm:scale-75 md:scale-100">
          <p className="cursor-pointer rounded-full border border-neutral-4 bg-neutral-5 py-1 pl-1 pr-[3px] text-neutral-3 hover:bg-neutral-1 hover:text-neutral-5">
            <IoIosArrowForward size={40} />
          </p>
        </button>
      </div>
    </>
  );
};
