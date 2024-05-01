import { useState } from "react";
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
import { postForgetPassAction } from "../../../redux/action/users/UsersAction";

// Image
import Logo from "../../../assets/img/TravelesiaLogo.svg";

// Icons
import { IoArrowBack } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";

export const ForgetPassword = () => {
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

  const handleForgetPassword = async (e) => {
    if (e.key === "Enter" || e.type === "click") {
      e.preventDefault();

      if (validateEmail) return showErrorToast(validateEmail);
      if (!inputEmail) return showErrorToast("All fields are required");

      const loadingToastId = showLoadingToast("Loading...");

      const forgetPassword = await dispatch(
        postForgetPassAction({ email: inputEmail }),
      );

      toast.dismiss(loadingToastId);

      if (!forgetPassword) showErrorToast("Send Email Failed");

      if (forgetPassword) {
        showSuccessToast("Email sent successfully!");
      }
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="hidden min-h-screen items-center justify-center gap-2 bg-slate-700 md:flex md:w-1/2 md:flex-col">
        <img
          src={Logo}
          alt="Travelesia Logo"
          width={1}
          height={1}
          className="w-1/3"
        />
        <h1 className="text-neutral-5 font-sans md:text-5xl lg:text-6xl">
          Travelesia
        </h1>
      </div>
      <div className="flex w-full items-center px-[10%] md:w-1/2 md:px-10 lg:px-20 xl:px-[10%]">
        <form
          className="flex w-full flex-col gap-2"
          onKeyDown={handleForgetPassword}
        >
          <button
            className="relative flex w-fit items-center"
            onClick={() => navigate(window.history.back())}
          >
            <IoArrowBack size={25} className="left-0 top-2" />
            <p className="ms-2 text-lg">Back</p>
          </button>
          <h1 className="mb-4 text-2xl font-bold">Forget Password</h1>
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
                <div className="border-alert-red bg-neutral-5 absolute right-4 top-9 rounded-full border-2 p-1">
                  <IoClose size={15} className="text-alert-red" />
                </div>
                <p className="text-alert-red ms-3 text-sm">{validateEmail}</p>
              </>
            ) : (
              inputEmail && (
                <div className="border-alert-green bg-alert-green absolute right-4 top-9 rounded-full border-2 p-1">
                  <FaCheck size={15} className="text-neutral-5" />
                </div>
              )
            )}
          </div>
          <button
            className="bg-neutral-1 text-neutral-5 mt-3 w-full rounded-2xl py-3 text-sm hover:bg-opacity-80"
            onClick={handleForgetPassword}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
