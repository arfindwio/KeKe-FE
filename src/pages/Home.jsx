import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

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

// Redux Actions
import { getAllProductsAction } from "../redux/action/products/ProductsAction";

// Icons
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { FaStar } from "react-icons/fa";

// Images
import Banner1 from "../assets/img/Banner1.svg";
import Banner2 from "../assets/img/Banner2.svg";
import Banner3 from "../assets/img/Banner3.svg";

// Components
import { Navbar } from "../assets/components/navbar/Navbar";
import { Footer } from "../assets/components/footer/Footer";

export const Home = () => {
  const dispatch = useDispatch();

  const productData = useSelector((state) => state.products.products);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getAllProductsAction());
    };

    fetchData();
  }, []);

  const averageRating = (reviews) => {
    const totalRating = reviews.reduce((acc, curr) => acc + curr.userRating, 0);
    const average = totalRating / reviews.length;

    return average;
  };
  return (
    <>
      <Navbar />
      <div className=" bg-slate-100 px-4 pb-10 pt-24 sm:px-10 md:pb-10 lg:px-20">
        <div className="flex flex-col gap-5 md:gap-10">
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

          <div className="flex flex-col gap-4 border-b border-neutral-4 pb-4">
            <h1 className="w-full text-xl font-bold">Popular Categories</h1>
            <Swiper
              spaceBetween={10}
              slidesPerView={1}
              breakpoints={{
                540: {
                  slidesPerView: 2,
                  spaceBetween: 10,
                },
                960: {
                  slidesPerView: 3,
                  spaceBetween: 10,
                },
                1320: {
                  slidesPerView: 4,
                  spaceBetween: 10,
                },
              }}
              modules={[Mousewheel, Keyboard]}
              className="w-full cursor-grab 2xl:cursor-default"
            >
              <SwiperSlide className="flex w-full justify-between rounded-md border border-neutral-4 bg-neutral-5 p-4">
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
              </SwiperSlide>
              <SwiperSlide className="flex w-full justify-between rounded-md border border-neutral-4 bg-neutral-5 p-4">
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
              </SwiperSlide>
              <SwiperSlide className="flex w-full justify-between rounded-md border border-neutral-4 bg-neutral-5 p-4">
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
              </SwiperSlide>
              <SwiperSlide className="flex w-full justify-between rounded-md border border-neutral-4 bg-neutral-5 p-4">
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
              </SwiperSlide>
            </Swiper>
          </div>
          <div className="flex flex-col gap-4 border-b border-neutral-4 pb-4">
            <h1 className="w-full text-xl font-bold">Recommended For You</h1>
            <Swiper
              spaceBetween={10}
              slidesPerView={1}
              breakpoints={{
                400: {
                  slidesPerView: 2,
                  spaceBetween: 10,
                },
                540: {
                  slidesPerView: 3,
                  spaceBetween: 10,
                },
                800: {
                  slidesPerView: 4,
                  spaceBetween: 10,
                },
                1000: {
                  slidesPerView: 5,
                  spaceBetween: 10,
                },
              }}
              modules={[Mousewheel, Keyboard]}
              className="w-full cursor-grab lg:cursor-default"
            >
              <SwiperSlide className="flex flex-col overflow-hidden rounded-xl border border-neutral-4 bg-neutral-5">
                <img
                  src="https://ik.imagekit.io/arfin07/1714214404069_nRiOO62Aj.png"
                  alt="Product"
                  className="aspect-[16/10] h-full w-full object-cover"
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
                      100 Sold
                    </p>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide className="flex flex-col overflow-hidden rounded-xl border border-neutral-4 bg-neutral-5">
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
                      100 Sold
                    </p>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide className="flex flex-col overflow-hidden rounded-xl border border-neutral-4 bg-neutral-5">
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
                      100 Sold
                    </p>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide className="flex flex-col overflow-hidden rounded-xl border border-neutral-4 bg-neutral-5">
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
                      100 Sold
                    </p>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide className="flex flex-col overflow-hidden rounded-xl border border-neutral-4 bg-neutral-5">
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
                      100 Sold
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
          <div className="flex flex-col gap-4 border-b border-neutral-4 pb-4">
            <h1 className="w-full text-xl font-bold">Special Offer</h1>
            <div className="flex flex-col justify-between gap-4 rounded-md border border-neutral-4 bg-neutral-5 p-4 md:flex-row md:gap-0">
              <img
                src="https://ik.imagekit.io/arfin07/1714214404069_nRiOO62Aj.png"
                alt="Product"
                className="max-h-[15rem] w-full object-contain md:max-h-none md:w-[40%]"
              />
              <div className="flex w-full flex-col gap-2 md:w-[58%]">
                <div className="flex items-center gap-1">
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
                <div className="w-full overflow-hidden rounded-full bg-neutral-4 px-[2px] py-[2px]">
                  <div className="h-full w-1/2 rounded-full border border-neutral-5 bg-neutral-1 py-1"></div>
                </div>
                <p className="text-sm font-medium">HURRY UP! OFFER ENDS IN:</p>
                <div className="flex flex-wrap justify-center gap-4 sm:justify-start">
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
          <div className="flex flex-col gap-4 border-b border-neutral-4 pb-4">
            <h1 className="w-full text-xl font-bold">New Products</h1>
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
              className="w-full cursor-grab text-center lg:cursor-default"
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
            <Swiper
              spaceBetween={10}
              slidesPerView={1}
              breakpoints={{
                400: {
                  slidesPerView: 2,
                  spaceBetween: 10,
                },
                540: {
                  slidesPerView: 3,
                  spaceBetween: 10,
                },
                800: {
                  slidesPerView: 4,
                  spaceBetween: 10,
                },
                1000: {
                  slidesPerView: 5,
                  spaceBetween: 10,
                },
              }}
              modules={[Mousewheel, Keyboard]}
              className="w-full cursor-grab lg:cursor-default"
            >
              {productData.map((product) => (
                <SwiperSlide
                  className={`flex flex-col overflow-hidden rounded-xl border border-neutral-4 bg-neutral-5`}
                  key={product.id}
                >
                  <img
                    src={product.productImage}
                    alt="Product"
                    className="aspect-[16/10] h-full w-full object-cover"
                  />
                  <div
                    className={`${
                      product.review.length === 0 &&
                      product.soldCount === 0 &&
                      "pb-8"
                    } flex flex-col gap-2 p-3`}
                  >
                    <p className="text-sm font-semibold text-neutral-2">
                      {product.category?.categoryName}
                    </p>
                    <p className="text-sm text-neutral-3">
                      {product.productName}
                    </p>
                    <p className="text-base font-bold text-neutral-1">
                      IDR {product.price.toLocaleString()}
                    </p>
                    <div className="flex items-center gap-2">
                      {product.review.length > 0 && (
                        <>
                          <FaStar size={18} className="text-alert-yellow" />
                          <p className="text-sm font-light text-neutral-2">
                            {averageRating(product.review)}
                          </p>
                        </>
                      )}
                      {product.soldCount > 0 && (
                        <p
                          className={`${
                            product.review.length > 0 && "border-l-2 pl-2"
                          } text-sm font-light text-neutral-2`}
                        >
                          {product.soldCount} Sold
                        </p>
                      )}
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};
