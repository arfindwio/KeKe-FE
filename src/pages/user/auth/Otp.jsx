import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

// Redux Action
import {
  putVerifyOtpAction,
  putResendOtp,
} from "../../../redux/action/users/UsersAction";

// Helper
import {
  showSuccessToast,
  showLoadingToast,
  showErrorToast,
} from "../../../helper/ToastHelper";

// Components
import OtpInput from "../../../assets/components/auth/OtpInput";

// icons
import { IoArrowBack } from "react-icons/io5";

// Image
import Logo from "../../../assets/img/Logo2.svg";

export const Otp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const [valueEmail, setValueEmail] = useState(null);
  const [finalOtp, setFinalOtp] = useState("");
  const [countdown, setCountdown] = useState(60);

  useEffect(() => {
    if (!location.state) return navigate(`/register`);
    if (!valueEmail) setValueEmail(location.state.email);
  }, [valueEmail, setValueEmail, location, navigate]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => Math.max(prevCountdown - 1, 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const maskEmail = (email) => {
    const prefix = email.substring(0, email.indexOf("@"));
    const maskedPrefix =
      prefix.length > 1
        ? prefix.charAt(0) + "*".repeat(prefix.length - 1)
        : prefix;
    const maskedEmail = maskedPrefix + email.substring(email.indexOf("@"));

    return maskedEmail;
  };

  const handleVerifyOtp = async (e) => {
    if (e.key === "Enter" || e.type === "click") {
      e.preventDefault();

      const loadingToastId = showLoadingToast("Loading...");
      let verifyOtp = false;

      if (valueEmail && finalOtp)
        verifyOtp = await dispatch(
          putVerifyOtpAction({
            email: valueEmail,
            otp: finalOtp,
          }),
        );

      toast.dismiss(loadingToastId);

      if (!verifyOtp) showErrorToast("Verify OTP Failed");
      if (verifyOtp) {
        showSuccessToast("verify OTP successful");
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      }
    }
  };

  const handleResendOtp = async (e) => {
    if (e.type === "click") {
      e.preventDefault();

      const loadingToastId = showLoadingToast("Loading...");
      let resendOtp = false;

      if (valueEmail)
        resendOtp = await dispatch(putResendOtp({ email: valueEmail }));

      toast.dismiss(loadingToastId);

      if (!resendOtp) showErrorToast("Resend OTP Failed");
      if (resendOtp) {
        showSuccessToast("Resend OTP successful");
        setCountdown(60);
      }
    }
  };

  const handleOtpChange = (otp) => {
    setFinalOtp(otp);
  };

  return (
    <div className="flex min-h-screen">
      <div className="hidden min-h-screen items-center justify-center gap-2 bg-neutral-3 md:flex md:w-1/2 md:flex-col">
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
          onKeyDown={handleVerifyOtp}
        >
          <button
            className="relative flex w-fit items-center"
            onClick={() => navigate(window.history.back())}
          >
            <IoArrowBack size={25} className="left-0 top-2" />
            <p className="ms-2 text-lg">Back</p>
          </button>
          <h1 className="mb-4 text-2xl font-bold">Input OTP</h1>
          <div className="flex flex-col gap-4 text-center">
            <p className="text-sm">
              Type the 6 digit code sent to{" "}
              <span className="font-bold">
                {valueEmail ? maskEmail(valueEmail) : ""}
              </span>
            </p>
            <OtpInput onOtpChange={handleOtpChange} />
            {countdown > 0 ? (
              <p className="text-sm">Resend OTP in {countdown} seconds</p>
            ) : (
              <button
                className="mx-auto w-fit text-base font-semibold text-neutral-3 hover:text-neutral-2"
                onClick={handleResendOtp}
              >
                Resend OTP
              </button>
            )}
          </div>
          <button
            className="mt-10 w-full rounded-2xl bg-neutral-1 py-2 text-neutral-5 hover:bg-opacity-80"
            onClick={handleVerifyOtp}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};
