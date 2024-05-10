"use client";

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

// Redux Action
import { postRegisterUserAction } from "../../../redux/action/users/UsersAction";

// Image
import Logo from "../../../assets/img/Logo2.svg";

// Helper
import {
  showLoadingToast,
  showSuccessToast,
  showErrorToast,
} from "../../../helper/ToastHelper";

// icons
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";
import { FaCheck } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";

export const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [inputRegister, setInputRegister] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
  });
  const [validateRegister, setValidateRegister] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
  });

  const handleInputChange = (e, field) => {
    const value = e.target.value;

    if (field === "fullName") {
      if (value.length > 50) {
        setValidateRegister((prevValidateRegister) => ({
          ...prevValidateRegister,
          fullName:
            "Invalid full name length. It must be at most 50 characters",
        }));
      } else {
        setValidateRegister((prevValidateRegister) => ({
          ...prevValidateRegister,
          fullName: "",
        }));
      }
      setInputRegister((prevInputRegister) => ({
        ...prevInputRegister,
        fullName: value,
      }));
    }

    if (field === "email") {
      const emailValidator = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailValidator.test(value)) {
        setValidateRegister((prevValidateRegister) => ({
          ...prevValidateRegister,
          email: "Invalid email format",
        }));
      } else {
        setValidateRegister((prevValidateRegister) => ({
          ...prevValidateRegister,
          email: "",
        }));
      }
      setInputRegister((prevInputRegister) => ({
        ...prevInputRegister,
        email: value,
      }));
    }

    if (field === "phoneNumber") {
      const phoneNumberValidator = /^\d+$/;
      if (!phoneNumberValidator.test(value)) {
        setValidateRegister((prevValidateRegister) => ({
          ...prevValidateRegister,
          phoneNumber:
            "Invalid phone number format. It must contain only numeric characters",
        }));
      } else if (value.length < 10 || value.length > 12) {
        setValidateRegister((prevValidateRegister) => ({
          ...prevValidateRegister,
          phoneNumber:
            "Invalid phone number length. It must be between 10 and 12 characters",
        }));
      } else {
        setValidateRegister((prevValidateRegister) => ({
          ...prevValidateRegister,
          phoneNumber: "",
        }));
      }
      setInputRegister((prevInputRegister) => ({
        ...prevInputRegister,
        phoneNumber: value,
      }));
    }

    if (field === "password") {
      const passwordValidator =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,12}$/;
      if (!passwordValidator.test(value)) {
        setValidateRegister((prevValidateRegister) => ({
          ...prevValidateRegister,
          password:
            "Invalid password format. It must contain at least 1 lowercase, 1 uppercase, 1 digit number, 1 symbol, and be between 8 and 12 characters long",
        }));
      } else {
        setValidateRegister((prevValidateRegister) => ({
          ...prevValidateRegister,
          password: "",
        }));
      }
      setInputRegister((prevInputRegister) => ({
        ...prevInputRegister,
        password: value,
      }));
    }
  };

  const handleRegister = async (e) => {
    if (e.key === "Enter" || e.type === "click") {
      e.preventDefault();

      if (validateRegister.fullName)
        return showErrorToast(validateRegister.fullName);
      if (validateRegister.email) return showErrorToast(validateRegister.email);
      if (validateRegister.phoneNumber)
        return showErrorToast(validateRegister.phoneNumber);
      if (validateRegister.password)
        return showErrorToast(validateRegister.password);
      if (
        !inputRegister.fullName ||
        !inputRegister.email ||
        !inputRegister.phoneNumber ||
        !inputRegister.password
      )
        return showErrorToast("All fields are required");

      const loadingToastId = showLoadingToast("Loading...");

      const register = await dispatch(postRegisterUserAction(inputRegister));

      toast.dismiss(loadingToastId);

      if (!register) showErrorToast("Registration Failed");

      if (register) {
        showSuccessToast("Verification link has been sent!");
        setTimeout(() => {
          navigate(`/otp`, { state: { email: inputRegister.email } });
        }, 1000);
      }
    }
  };

  return (
    <>
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
            className="flex w-full flex-col gap-4"
            onKeyDown={handleRegister}
          >
            <h5 className="mb-2 text-2xl font-semibold">Register</h5>
            <div className="relative flex w-full flex-col">
              <label htmlFor="fullname">Name</label>
              <input
                type="text"
                id="fullname"
                className={`${
                  validateRegister.fullName
                    ? "border-alert-red"
                    : inputRegister.fullName && "border-alert-green"
                } border-1 w-full rounded-2xl border px-4 py-3 pr-12 outline-none`}
                placeholder="Full Name"
                value={inputRegister.fullName}
                onChange={(e) => handleInputChange(e, "fullName")}
              />
              {validateRegister.fullName ? (
                <>
                  <div className="absolute right-4 top-9 rounded-full border-2 border-alert-red bg-neutral-5 p-1">
                    <IoClose size={15} className="text-alert-red" />
                  </div>
                  <p className="ms-3 text-sm text-alert-red">
                    {validateRegister.fullName}
                  </p>
                </>
              ) : (
                inputRegister.fullName && (
                  <div className="absolute right-4 top-9 rounded-full border-2 border-alert-green bg-alert-green p-1">
                    <FaCheck size={15} className="text-neutral-5" />
                  </div>
                )
              )}
            </div>
            <div className="relative flex w-full flex-col">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                className={`${
                  validateRegister.email
                    ? "border-alert-red"
                    : inputRegister.email && "border-alert-green"
                } border-1 w-full rounded-2xl border px-4 py-3 pr-12 outline-none`}
                placeholder="Example: budi123@gmail.com"
                value={inputRegister.email}
                onChange={(e) => handleInputChange(e, "email")}
              />
              {validateRegister.email ? (
                <>
                  <div className="absolute right-4 top-9 rounded-full border-2 border-alert-red bg-neutral-5 p-1">
                    <IoClose size={15} className="text-alert-red" />
                  </div>
                  <p className="ms-3 text-sm text-alert-red">
                    {validateRegister.email}
                  </p>
                </>
              ) : (
                inputRegister.email && (
                  <div className="absolute right-4 top-9 rounded-full border-2 border-alert-green bg-alert-green p-1">
                    <FaCheck size={15} className="text-neutral-5" />
                  </div>
                )
              )}
            </div>
            <div className="relative flex w-full flex-col">
              <label htmlFor="telepon">Phone Number</label>
              <input
                type="number"
                id="telepon"
                className={`${
                  validateRegister.phoneNumber
                    ? "border-alert-red"
                    : inputRegister.phoneNumber && "border-alert-green"
                } border-1 w-full rounded-2xl border px-4 py-3 pr-12 outline-none`}
                placeholder="+62"
                value={inputRegister.phoneNumber}
                onChange={(e) => handleInputChange(e, "phoneNumber")}
              />
              {validateRegister.phoneNumber ? (
                <>
                  <div className="absolute right-4 top-9 rounded-full border-2 border-alert-red bg-neutral-5 p-1">
                    <IoClose size={15} className="text-alert-red" />
                  </div>
                  <p className="ms-3 text-sm text-alert-red">
                    {validateRegister.phoneNumber}
                  </p>
                </>
              ) : (
                inputRegister.phoneNumber && (
                  <div className="absolute right-4 top-9 rounded-full border-2 border-alert-green bg-alert-green p-1">
                    <FaCheck size={15} className="text-neutral-5" />
                  </div>
                )
              )}
            </div>
            <div className="relative flex w-full flex-col">
              <label htmlFor="password">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className={`${
                    validateRegister.password
                      ? "border-alert-red"
                      : inputRegister.password && "border-alert-green"
                  } border-1 w-full rounded-2xl border px-4 py-3 pr-24 outline-none`}
                  placeholder="Masukkan password"
                  value={inputRegister.password}
                  onChange={(e) => handleInputChange(e, "password")}
                  autoComplete="off"
                />
                {showPassword ? (
                  <FiEye
                    size={27}
                    className={`${
                      validateRegister.password || inputRegister.password
                        ? "right-14"
                        : "right-4"
                    } absolute  top-3 w-8 cursor-pointer text-slate-400`}
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                  />
                ) : (
                  <FiEyeOff
                    size={27}
                    className={`${
                      validateRegister.password || inputRegister.password
                        ? "right-14"
                        : "right-4"
                    } absolute  top-3 w-8 cursor-pointer text-slate-400`}
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                  />
                )}
                {validateRegister.password ? (
                  <>
                    <div className="absolute right-4 top-[13px] rounded-full border-2 border-alert-red bg-neutral-5 p-1">
                      <IoClose size={15} className="text-alert-red" />
                    </div>
                    <p className="ms-3 text-sm text-alert-red">
                      {validateRegister.password}
                    </p>
                  </>
                ) : (
                  inputRegister.password && (
                    <div className="absolute right-4 top-[13px] rounded-full border-2 border-alert-green bg-alert-green p-1">
                      <FaCheck size={15} className="text-neutral-5" />
                    </div>
                  )
                )}
              </div>
            </div>
            <button
              className="mt-3 w-full rounded-2xl bg-neutral-1 py-3 text-sm text-neutral-5 hover:bg-opacity-80"
              onClick={handleRegister}
            >
              Register
            </button>
            <p className="mt-1 text-center text-sm">
              have an account?
              <Link
                to={"/login"}
                className="ms-2 font-bold text-neutral-1 hover:opacity-60"
              >
                Login here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};
