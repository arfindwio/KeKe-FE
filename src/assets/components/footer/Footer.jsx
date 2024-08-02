import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

// Images
import Alfamart from "../../img/Alfamart.webp";
import Indomaret from "../../img/Indomaret.webp";
import BNI from "../../img/BNI.webp";
import BRI from "../../img/BRI.webp";
import BCA from "../../img/BCA.webp";
import Mandiri from "../../img/Mandiri.webp";
import Permata from "../../img/Permata.webp";
import amex from "../../img/amex.webp";
import mastercard from "../../img/mastercard.webp";
import visa from "../../img/visa.webp";
import paypal from "../../img/paypal.webp";
import Gopay from "../../img/Gopay.webp";

// Icons
import { IoLocationOutline } from "react-icons/io5";
import { LuPhone } from "react-icons/lu";
import { MdOutlineEmail } from "react-icons/md";

export const Footer = () => {
  const location = useLocation();

  const categoryData = useSelector(
    (state) => state.categories?.categories?.categories,
  );

  const currentPath = location.pathname;

  return (
    <>
      <div
        className={`${
          currentPath === "/cart" || currentPath === "/payment"
            ? "pb-52 md:pb-40 lg:pb-10"
            : "pb-24 md:pb-10"
        } flex w-full flex-col bg-neutral-1 px-4 pt-10 sm:px-10 lg:px-20`}
      >
        <div className="flex w-full flex-col justify-between gap-6 pb-10 md:flex-row md:gap-0">
          <div className="flex w-full flex-col gap-4 md:w-[33%] md:gap-8">
            <h5 className="w-fit border-b pb-2 text-lg font-medium text-neutral-5">
              Popular Categories
            </h5>
            <div className="flex w-fit flex-col gap-2 text-sm">
              {categoryData?.slice(0, 5)?.map((category, index) => (
                <Link
                  to={`/product?c=${category.categoryName}`}
                  className="text-neutral-3 hover:text-neutral-5"
                  key={index}
                >
                  {category.categoryName}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex w-full flex-col gap-4 md:w-[33%] md:gap-8">
            <h5 className="w-fit border-b pb-2 text-lg font-medium text-neutral-5">
              Quick Link
            </h5>
            <div className="flex w-fit flex-col gap-2 text-sm">
              <Link to={"/"} className="text-neutral-3 hover:text-neutral-5">
                Home
              </Link>
              <Link
                to={"/product"}
                className="text-neutral-3 hover:text-neutral-5"
              >
                Products
              </Link>
            </div>
          </div>
          <div className="flex w-full flex-col gap-4 md:w-[33%] md:gap-8">
            <h5 className="w-fit border-b pb-2 text-lg font-medium text-neutral-5">
              Contact
            </h5>
            <ul className="flex w-full flex-col gap-3 text-sm">
              <li className="flex items-start justify-between text-neutral-3">
                <IoLocationOutline size={25} className="w-[6%]" />
                <p className="w-[92%]">
                  Jalan Kebon Bawang IX No.32, RT.008 / RW.012, Kebon Bawang,
                  Kecamatan Tanjung Priok, Jakarta Utara, Daerah Khusus Ibukota
                  Jakarta 14320
                </p>
              </li>
              <li className="flex items-center justify-between text-neutral-3">
                <LuPhone size={25} className="w-[6%]" />
                <p className="w-[92%]">
                  <span className="text-neutral-4">(+62)</span> 822-9891-1144
                </p>
              </li>
              <li className="flex items-center justify-between text-neutral-3">
                <MdOutlineEmail size={25} className="w-[6%]" />
                <p className="w-[92%] break-all">nasutionwithaqsha@gmail.com</p>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex w-full flex-col items-center justify-center gap-3 border-t border-neutral-3 pt-10">
          <div className="flex w-fit flex-wrap justify-center gap-2">
            <div className="h-7 w-16 rounded-sm bg-neutral-5 px-2 py-1">
              <img
                src={Alfamart}
                alt="Alfamart"
                className="h-full w-full object-contain"
              />
            </div>
            <div className="h-7 w-16 rounded-sm bg-neutral-5 px-2 py-1">
              <img
                src={Indomaret}
                alt="Indomaret"
                className="h-full w-full object-contain"
              />
            </div>
            <div className="h-7 w-16 rounded-sm bg-neutral-5 px-2 py-1">
              <img
                src={BCA}
                alt="BCA"
                className="h-full w-full object-contain"
              />
            </div>
            <div className="h-7 w-16 rounded-sm bg-neutral-5 px-2 py-1">
              <img
                src={BNI}
                alt="BNI"
                className="h-full w-full object-contain"
              />
            </div>
            <div className="h-7 w-16 rounded-sm bg-neutral-5 px-2 py-1">
              <img
                src={BRI}
                alt="BRI"
                className="h-full w-full object-contain"
              />
            </div>
            <div className="h-7 w-16 rounded-sm bg-neutral-5 px-2 py-1">
              <img
                src={Mandiri}
                alt="Mandiri"
                className="h-full w-full object-contain"
              />
            </div>
            <div className="h-7 w-16 rounded-sm bg-neutral-5 px-2 py-1">
              <img
                src={Permata}
                alt="Permata"
                className="h-full w-full object-contain"
              />
            </div>
            <div className="h-7 w-16 rounded-sm bg-neutral-5 px-2 py-1">
              <img
                src={amex}
                alt="amex"
                className="h-full w-full object-contain"
              />
            </div>
            <div className="h-7 w-16 rounded-sm bg-neutral-5 px-2 py-1">
              <img
                src={mastercard}
                alt="mastercard"
                className="h-full w-full object-contain"
              />
            </div>
            <div className="h-7 w-16 rounded-sm bg-neutral-5 px-2 py-1">
              <img
                src={visa}
                alt="visa"
                className="h-full w-full object-contain"
              />
            </div>
            <div className="h-7 w-16 rounded-sm bg-neutral-5 px-2 py-1">
              <img
                src={paypal}
                alt="paypal"
                className="h-full w-full object-contain"
              />
            </div>
            <div className="h-7 w-16 rounded-sm bg-neutral-5 px-2 py-1">
              <img
                src={Gopay}
                alt="Gopay"
                className="h-full w-full object-contain"
              />
            </div>
          </div>
          <p className="w-fit text-center text-sm text-neutral-3">
            Copyright © KeKe All Rights Reserved.
          </p>
        </div>
      </div>
    </>
  );
};
