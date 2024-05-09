import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

// Helper
import {
  showSuccessToast,
  showLoadingToast,
  showErrorToast,
} from "../../../helper/ToastHelper";

// Redux Action
import { putResendOtp } from "../../../redux/action/users/UsersAction";

// Image
import Logo from "../../../assets/img/Logo2.svg";

// Icons
import { IoArrowBack } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";

export const VerifyAccount = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [inputEmail, setInputEmail] = useState("");
  const [validateEmail, setValidateEmail] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputEmail(value);

    const emailValidator = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailValidator.test(value)) {
      setValidateEmail("Invalid email format");
    } else {
      setValidateEmail("");
    }
  };

  const handleVerifyAccount = async (e) => {
    if (e.key === "Enter" || e.type === "click") {
      e.preventDefault();

      if (validateEmail) return showErrorToast(validateEmail);
      if (!inputEmail) return showErrorToast("All fields are required");

      const loadingToastId = showLoadingToast("Loading...");

      const verifyOtp = await dispatch(putResendOtp({ email: inputEmail }));

      toast.dismiss(loadingToastId);

      if (!verifyOtp) showErrorToast("Send OTP Failed");

      if (verifyOtp) {
        showSuccessToast("Email sent successfully!");
        setTimeout(() => {
          navigate(`/otp`, { state: { email: inputEmail } });
        }, 1000);
      }
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="hidden min-h-screen items-center justify-center gap-2 bg-neutral-3 bg-gradient-to-b from-15% via-65% md:flex md:w-1/2 md:flex-col">
        <img
          src={Logo}
          alt="KeKe Logo"
          width={1}
          height={1}
          className="w-1/3"
        />
      </div>
      <div className="flex w-full items-center px-[10%] md:w-1/2 md:px-10 lg:px-20 xl:px-[10%]">
        <form
          className="flex w-full flex-col gap-2"
          onKeyDown={handleVerifyAccount}
        >
          <button
            className="relative flex w-fit items-center"
            onClick={() => navigate(window.history.back())}
          >
            <IoArrowBack size={25} className="left-0 top-2" />
            <p className="ms-2 text-lg">Back</p>
          </button>
          <h1 className="mb-4 text-2xl font-bold">Verify Account</h1>
          <div className="relative flex w-full flex-col">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className={`${
                validateEmail
                  ? "border-alert-red"
                  : inputEmail && "border-alert-green"
              } border-1 w-full rounded-2xl border px-4 py-3 outline-none`}
              placeholder="Example: budi123@mail.com"
              value={inputEmail}
              onChange={handleInputChange}
            />
            {validateEmail ? (
              <>
                <div className="absolute right-4 top-9 rounded-full border-2 border-alert-red bg-neutral-5 p-1">
                  <IoClose size={15} className="text-alert-red" />
                </div>
                <p className="ms-3 text-sm text-alert-red">{validateEmail}</p>
              </>
            ) : (
              inputEmail && (
                <div className="absolute right-4 top-9 rounded-full border-2 border-alert-green bg-alert-green p-1">
                  <FaCheck size={15} className="text-neutral-5" />
                </div>
              )
            )}
          </div>
          <button
            className="mt-3 w-full rounded-2xl bg-neutral-1 py-3 text-sm text-neutral-5 hover:bg-opacity-80"
            onClick={handleVerifyAccount}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
