import React from "react";
import { Link } from "react-router-dom";

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

// Icons
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";

// Images
import Banner1 from "../assets/img/Banner1.svg";
import Banner2 from "../assets/img/Banner2.svg";
import Banner3 from "../assets/img/Banner3.svg";

// Components
import { Navbar } from "../assets/components/navbar/Navbar";

export const Home = () => {
  return (
    <>
      <Navbar />
      <div className="pt-24">
        <div className="relative h-[32rem]">
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
            className="h-full w-[90%] rounded-md border border-neutral-4 border-opacity-50 shadow-sm"
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
          <button className="button-prev absolute bottom-1/2 left-14 z-[1]">
            <p className="cursor-pointer rounded-full border border-neutral-4 bg-neutral-5 py-1 pl-[3px] pr-1 text-neutral-3 hover:bg-neutral-1 hover:text-neutral-5">
              <IoIosArrowBack size={40} />
            </p>
          </button>
          <button className="button-next absolute bottom-1/2 right-14 z-[1]">
            <p className="cursor-pointer rounded-full border border-neutral-4 bg-neutral-5 py-1 pl-1 pr-[3px] text-neutral-3 hover:bg-neutral-1 hover:text-neutral-5">
              <IoIosArrowForward size={40} />
            </p>
          </button>
        </div>
      </div>
      <div className=" px-4 pb-20 pt-8 sm:px-10 md:pb-10 lg:px-20">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-6">
            <h1 className="w-full border-b pb-2 text-xl font-bold">
              Popular Categories
            </h1>
            <div className="flex items-center justify-between">
              <div className="flex w-[24.5%] justify-between rounded-md border border-neutral-4 p-4">
                <img
                  src="https://ik.imagekit.io/arfin07/1714214404069_nRiOO62Aj.png"
                  alt="Category"
                  className="h-full w-[30%] object-cover"
                />
                <div className="flex w-[68%] flex-col">
                  <div className="flex justify-between">
                    <p className="text-sm font-bold">Ini Categories</p>
                    <p className="text-xs font-medium text-neutral-3">(1000)</p>
                  </div>
                  <Link
                    to={"/"}
                    className="mt-auto w-fit rounded-md bg-neutral-1 px-2 py-1 text-xs text-neutral-5 hover:bg-opacity-80"
                  >
                    Show All
                  </Link>
                </div>
              </div>
              <div className="flex w-[24.5%] justify-between rounded-md border border-neutral-4 p-4">
                <img
                  src="https://ik.imagekit.io/arfin07/1714214404069_nRiOO62Aj.png"
                  alt="Category"
                  className="h-full w-[30%] object-cover"
                />
                <div className="flex w-[68%] flex-col">
                  <div className="flex justify-between">
                    <p className="text-sm font-bold">Ini Categories</p>
                    <p className="text-xs font-medium text-neutral-3">(1000)</p>
                  </div>
                  <Link
                    to={"/"}
                    className="mt-auto w-fit rounded-md bg-neutral-1 px-2 py-1 text-xs text-neutral-5 hover:bg-opacity-80"
                  >
                    Show All
                  </Link>
                </div>
              </div>
              <div className="flex w-[24.5%] justify-between rounded-md border border-neutral-4 p-4">
                <img
                  src="https://ik.imagekit.io/arfin07/1714214404069_nRiOO62Aj.png"
                  alt="Category"
                  className="h-full w-[30%] object-cover"
                />
                <div className="flex w-[68%] flex-col">
                  <div className="flex justify-between">
                    <p className="text-sm font-bold">Ini Categories</p>
                    <p className="text-xs font-medium text-neutral-3">(1000)</p>
                  </div>
                  <Link
                    to={"/"}
                    className="mt-auto w-fit rounded-md bg-neutral-1 px-2 py-1 text-xs text-neutral-5 hover:bg-opacity-80"
                  >
                    Show All
                  </Link>
                </div>
              </div>
              <div className="flex w-[24.5%] justify-between rounded-md border border-neutral-4 p-4">
                <img
                  src="https://ik.imagekit.io/arfin07/1714214404069_nRiOO62Aj.png"
                  alt="Category"
                  className="h-full w-[30%] object-cover"
                />
                <div className="flex w-[68%] flex-col">
                  <div className="flex justify-between">
                    <p className="text-sm font-bold">Ini Categories</p>
                    <p className="text-xs font-medium text-neutral-3">(1000)</p>
                  </div>
                  <Link
                    to={"/"}
                    className="mt-auto w-fit rounded-md bg-neutral-1 px-2 py-1 text-xs text-neutral-5 hover:bg-opacity-80"
                  >
                    Show All
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <h1 className="w-full border-b pb-2 text-xl font-bold">
              Recommended For You
            </h1>
            <div className="grid grid-cols-5 gap-5">
              <div className="flex flex-col overflow-hidden rounded-xl border border-neutral-4 bg-neutral-5">
                <img
                  src="https://ik.imagekit.io/arfin07/1714214404069_nRiOO62Aj.png"
                  alt="Product"
                  className="h-full w-full object-cover"
                />
                <div className="flex flex-col gap-2 p-3">
                  <p className="text-sm font-semibold text-neutral-2">Shirt</p>
                  <p className="text-sm text-neutral-3">Shirt 12345</p>
                  <p className="text-base font-bold text-neutral-1">
                    IDR 250.000
                  </p>
                  <div className="flex items-center gap-2">
                    <FaStar size={18} className="text-alert-yellow" />
                    <p className="text-sm font-light text-neutral-2">2.5</p>
                    <p className="border-l-2 pl-2 text-sm font-light text-neutral-2">
                      100 Items Sold
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col overflow-hidden rounded-xl border border-neutral-4 bg-neutral-5">
                <img
                  src="https://ik.imagekit.io/arfin07/1714214404069_nRiOO62Aj.png"
                  alt="Product"
                  className="h-full w-full object-cover"
                />
                <div className="flex flex-col gap-2 p-3">
                  <p className="text-sm font-semibold text-neutral-2">Shirt</p>
                  <p className="text-sm text-neutral-3">Shirt 12345</p>
                  <p className="text-base font-bold text-neutral-1">
                    IDR 250.000
                  </p>
                  <div className="flex items-center gap-2">
                    <FaStar size={18} className="text-alert-yellow" />
                    <p className="text-sm font-light text-neutral-2">2.5</p>
                    <p className="border-l-2 pl-2 text-sm font-light text-neutral-2">
                      100 Items Sold
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col overflow-hidden rounded-xl border border-neutral-4 bg-neutral-5">
                <img
                  src="https://ik.imagekit.io/arfin07/1714214404069_nRiOO62Aj.png"
                  alt="Product"
                  className="h-full w-full object-cover"
                />
                <div className="flex flex-col gap-2 p-3">
                  <p className="text-sm font-semibold text-neutral-2">Shirt</p>
                  <p className="text-sm text-neutral-3">Shirt 12345</p>
                  <p className="text-base font-bold text-neutral-1">
                    IDR 250.000
                  </p>
                  <div className="flex items-center gap-2">
                    <FaStar size={18} className="text-alert-yellow" />
                    <p className="text-sm font-light text-neutral-2">2.5</p>
                    <p className="border-l-2 pl-2 text-sm font-light text-neutral-2">
                      100 Items Sold
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col overflow-hidden rounded-xl border border-neutral-4 bg-neutral-5">
                <img
                  src="https://ik.imagekit.io/arfin07/1714214404069_nRiOO62Aj.png"
                  alt="Product"
                  className="h-full w-full object-cover"
                />
                <div className="flex flex-col gap-2 p-3">
                  <p className="text-sm font-semibold text-neutral-2">Shirt</p>
                  <p className="text-sm text-neutral-3">Shirt 12345</p>
                  <p className="text-base font-bold text-neutral-1">
                    IDR 250.000
                  </p>
                  <div className="flex items-center gap-2">
                    <FaStar size={18} className="text-alert-yellow" />
                    <p className="text-sm font-light text-neutral-2">2.5</p>
                    <p className="border-l-2 pl-2 text-sm font-light text-neutral-2">
                      100 Items Sold
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col overflow-hidden rounded-xl border border-neutral-4 bg-neutral-5">
                <img
                  src="https://ik.imagekit.io/arfin07/1714214404069_nRiOO62Aj.png"
                  alt="Product"
                  className="h-full w-full object-cover"
                />
                <div className="flex flex-col gap-2 p-3">
                  <p className="text-sm font-semibold text-neutral-2">Shirt</p>
                  <p className="text-sm text-neutral-3">Shirt 12345</p>
                  <p className="text-base font-bold text-neutral-1">
                    IDR 250.000
                  </p>
                  <div className="flex items-center gap-2">
                    <FaStar size={18} className="text-alert-yellow" />
                    <p className="text-sm font-light text-neutral-2">2.5</p>
                    <p className="border-l-2 pl-2 text-sm font-light text-neutral-2">
                      100 Items Sold
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <h1 className="w-full border-b pb-2 text-xl font-bold">
              Special Offer
            </h1>
            <div className="flex justify-between rounded-md border border-neutral-4 bg-neutral-5 p-4">
              <img
                src="https://ik.imagekit.io/arfin07/1714214404069_nRiOO62Aj.png"
                alt="Product"
                className="h-full w-[40%] object-cover"
              />
              <div className="flex w-[58%] flex-col gap-2">
                <div className="flex items-center gap-2">
                  <FaStar size={20} className="text-alert-yellow" />
                  <p className="text-sm font-semibold text-neutral-2">5</p>
                </div>
                <h5 className="text-base font-bold ">INI NAMA PRODUCT</h5>
                <p className="text-sm text-neutral-4 ">
                  Ini Nama Product Ini Nama Product Ini Nama Product Ini Nama
                  Product
                </p>
                <div className="flex gap-3">
                  <h4 className="text-lg font-bold text-alert-red">
                    IDR 500.000
                  </h4>
                  <h4 className="text-lg font-normal text-neutral-3 line-through">
                    IDR 700.000
                  </h4>
                </div>
                <button className="w-fit rounded-lg bg-neutral-1 px-3 py-2 text-neutral-5 hover:bg-opacity-80">
                  ADD TO CART
                </button>
                <div className="flex justify-between">
                  <p className="text-sm text-neutral-2">
                    ALREADY SOLD:
                    <span className="font-semibold text-neutral-1"> 50</span>
                  </p>
                  <p className="text-sm text-neutral-2">
                    AVAILABLE:
                    <span className="font-semibold text-neutral-1"> 50</span>
                  </p>
                </div>
                <div className="w-full overflow-hidden rounded-full bg-neutral-4 px-1 py-1">
                  <div className="h-full w-1/2 rounded-full border border-neutral-5 bg-neutral-1 py-1"></div>
                </div>
                <p className="text-sm font-medium">HURRY UP! OFFER ENDS IN:</p>
                <div className="flex gap-4">
                  <div className="flex flex-col rounded-lg bg-slate-200 px-3 py-2 text-center">
                    <h5 className="text-lg font-medium tracking-wider">360</h5>
                    <p className="text-xs text-neutral-2">Days</p>
                  </div>
                  <div className="flex flex-col rounded-lg bg-slate-200 px-3 py-2 text-center">
                    <h5 className="text-lg font-medium tracking-wider">24</h5>
                    <p className="text-xs text-neutral-2">Hours</p>
                  </div>
                  <div className="flex flex-col rounded-lg bg-slate-200 px-3 py-2 text-center">
                    <h5 className="text-lg font-medium tracking-wider">60</h5>
                    <p className="text-xs text-neutral-2">Min</p>
                  </div>
                  <div className="flex flex-col rounded-lg bg-slate-200 px-3 py-2 text-center">
                    <h5 className="text-lg font-medium tracking-wider">60</h5>
                    <p className="text-xs text-neutral-2">Sec</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <h1 className="w-full border-b pb-2 text-xl font-bold">
              New Products
            </h1>
            <Swiper
              spaceBetween={10}
              slidesPerView={1.5}
              breakpoints={{
                450: {
                  slidesPerView: 3.5,
                  spaceBetween: 10,
                },
              }}
              modules={[Mousewheel, Keyboard]}
              className="w-full text-center"
            >
              <SwiperSlide className="w-fit cursor-pointer rounded-full border border-neutral-3 bg-neutral-1 px-2 py-1 text-neutral-5">
                Show All
              </SwiperSlide>
              <SwiperSlide className="w-fit cursor-pointer break-all rounded-full border border-neutral-3 bg-neutral-4 px-2 py-1 hover:bg-neutral-1 hover:text-neutral-5">
                Categories
              </SwiperSlide>
              <SwiperSlide className="w-fit cursor-pointer break-all rounded-full border border-neutral-3 bg-neutral-4 px-2 py-1 hover:bg-neutral-1 hover:text-neutral-5">
                Categories
              </SwiperSlide>
            </Swiper>
            <div className="grid grid-cols-5 gap-5">
              <div className="flex flex-col overflow-hidden rounded-xl border border-neutral-4 bg-neutral-5">
                <img
                  src="https://ik.imagekit.io/arfin07/1714214404069_nRiOO62Aj.png"
                  alt="Product"
                  className="h-full w-full object-cover"
                />
                <div className="flex flex-col gap-2 p-3">
                  <p className="text-sm font-semibold text-neutral-2">Shirt</p>
                  <p className="text-sm text-neutral-3">Shirt 12345</p>
                  <p className="text-base font-bold text-neutral-1">
                    IDR 250.000
                  </p>
                  <div className="flex items-center gap-2">
                    <FaStar size={18} className="text-alert-yellow" />
                    <p className="text-sm font-light text-neutral-2">2.5</p>
                    <p className="border-l-2 pl-2 text-sm font-light text-neutral-2">
                      100 Items Sold
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col overflow-hidden rounded-xl border border-neutral-4 bg-neutral-5">
                <img
                  src="https://ik.imagekit.io/arfin07/1714214404069_nRiOO62Aj.png"
                  alt="Product"
                  className="h-full w-full object-cover"
                />
                <div className="flex flex-col gap-2 p-3">
                  <p className="text-sm font-semibold text-neutral-2">Shirt</p>
                  <p className="text-sm text-neutral-3">Shirt 12345</p>
                  <p className="text-base font-bold text-neutral-1">
                    IDR 250.000
                  </p>
                  <div className="flex items-center gap-2">
                    <FaStar size={18} className="text-alert-yellow" />
                    <p className="text-sm font-light text-neutral-2">2.5</p>
                    <p className="border-l-2 pl-2 text-sm font-light text-neutral-2">
                      100 Items Sold
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col overflow-hidden rounded-xl border border-neutral-4 bg-neutral-5">
                <img
                  src="https://ik.imagekit.io/arfin07/1714214404069_nRiOO62Aj.png"
                  alt="Product"
                  className="h-full w-full object-cover"
                />
                <div className="flex flex-col gap-2 p-3">
                  <p className="text-sm font-semibold text-neutral-2">Shirt</p>
                  <p className="text-sm text-neutral-3">Shirt 12345</p>
                  <p className="text-base font-bold text-neutral-1">
                    IDR 250.000
                  </p>
                  <div className="flex items-center gap-2">
                    <FaStar size={18} className="text-alert-yellow" />
                    <p className="text-sm font-light text-neutral-2">2.5</p>
                    <p className="border-l-2 pl-2 text-sm font-light text-neutral-2">
                      100 Items Sold
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col overflow-hidden rounded-xl border border-neutral-4 bg-neutral-5">
                <img
                  src="https://ik.imagekit.io/arfin07/1714214404069_nRiOO62Aj.png"
                  alt="Product"
                  className="h-full w-full object-cover"
                />
                <div className="flex flex-col gap-2 p-3">
                  <p className="text-sm font-semibold text-neutral-2">Shirt</p>
                  <p className="text-sm text-neutral-3">Shirt 12345</p>
                  <p className="text-base font-bold text-neutral-1">
                    IDR 250.000
                  </p>
                  <div className="flex items-center gap-2">
                    <FaStar size={18} className="text-alert-yellow" />
                    <p className="text-sm font-light text-neutral-2">2.5</p>
                    <p className="border-l-2 pl-2 text-sm font-light text-neutral-2">
                      100 Items Sold
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col overflow-hidden rounded-xl border border-neutral-4 bg-neutral-5">
                <img
                  src="https://ik.imagekit.io/arfin07/1714214404069_nRiOO62Aj.png"
                  alt="Product"
                  className="h-full w-full object-cover"
                />
                <div className="flex flex-col gap-2 p-3">
                  <p className="text-sm font-semibold text-neutral-2">Shirt</p>
                  <p className="text-sm text-neutral-3">Shirt 12345</p>
                  <p className="text-base font-bold text-neutral-1">
                    IDR 250.000
                  </p>
                  <div className="flex items-center gap-2">
                    <FaStar size={18} className="text-alert-yellow" />
                    <p className="text-sm font-light text-neutral-2">2.5</p>
                    <p className="border-l-2 pl-2 text-sm font-light text-neutral-2">
                      100 Items Sold
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
