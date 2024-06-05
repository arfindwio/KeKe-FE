import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// Redux Actions
import { getAllCartsByAuthAction } from "../../../redux/action/carts/CartsAction";

// Components
import { Navbar } from "../../../assets/components/navbar/Navbar";
import { MethodPaymentCard } from "../../../assets/components/card/MethodPaymentCard";
import { PriceDetailCard } from "../../../assets/components/card/PriceDetailCard";
import { Footer } from "../../../assets/components/footer/Footer";

// Icons
import { TbArrowBadgeRightFilled } from "react-icons/tb";
import { IoArrowBack } from "react-icons/io5";

// Cookies
import { CookieStorage, CookiesKeys } from "../../../utils/cookie";

export const Payment = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [timeLeft, setTimeLeft] = useState(3600);

  const cartData = useSelector((state) => state.carts.carts);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(timer);
          navigate("/");
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const token = CookieStorage.get(CookiesKeys.AuthToken);

    if (!token) return navigate("/");
  }, [navigate]);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getAllCartsByAuthAction());
    };

    fetchData();
  }, []);

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <>
      <Navbar />
      <div className="flex w-full flex-col gap-2 border-b bg-neutral-5 pb-4 shadow-md sm:gap-4 sm:px-10 sm:pt-24 lg:px-20">
        <div className="mx-auto w-[92%] rounded-xl bg-alert-red p-3 text-center sm:w-full">
          <p className="text-base font-medium text-neutral-5">
            Complete in {formatTime(timeLeft)}
          </p>
        </div>
      </div>
      <div className="mb-10 mt-8 flex w-full flex-col justify-between px-5 sm:flex-row sm:px-10 lg:px-20">
        <div className="flex w-full flex-col gap-4 lg:w-[67%]">
          <h1 className="text-[20px] font-bold">Choose Payment Method</h1>

          <MethodPaymentCard
            inputPayment={{
              methodPayment: "",
              cardNumber: "",
              cvv: "",
              expiryDate: "",
            }}
            methodPayment={"Credit Card"}
          />
          <MethodPaymentCard
            inputPayment={{
              methodPayment: "",
            }}
            methodPayment={"Gopay"}
          />
          <MethodPaymentCard
            inputPayment={{
              methodPayment: "",
            }}
            methodPayment={"Virtual Account"}
          />
        </div>
        <div className="fixed bottom-14 left-0 z-[1] flex w-full flex-col gap-1 rounded-md border border-neutral-4 bg-neutral-5 px-4 pb-4 pt-2 shadow-sm sm:px-10 md:bottom-0 lg:sticky lg:top-20 lg:h-fit lg:w-[30%] lg:gap-3 lg:px-3 lg:py-4 lg:pb-4 lg:pt-2">
          <PriceDetailCard carts={cartData} />
        </div>
      </div>

      <Footer />
    </>
  );
};
