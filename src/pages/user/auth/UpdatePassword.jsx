import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

// Helper
import {
  showLoadingToast,
  showSuccessToast,
  showErrorToast,
} from "../../../helper/ToastHelper";

// Redux Action
import { putUpdatePassword } from "../../../redux/action/users/UsersAction";

// Image
import Logo from "../../../assets/img/Logo2.svg";

// icons
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";
import { FaCheck } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";

export const UpdatePassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const tokenValue = queryParams.get("token");

  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [inputUpdatePassword, setInputUpdatePassword] = useState({
    token: "",
    password: "",
    passwordConfirmation: "",
  });
  const [validateUpdatePassword, setValidateUpdatePassword] = useState({
    password: "",
    passwordConfirmation: "",
  });

  useEffect(() => {
    if (tokenValue && !inputUpdatePassword.token) {
      setInputUpdatePassword((prevInputUpdatePassword) => ({
        ...prevInputUpdatePassword,
        token: tokenValue,
      }));
      navigate("/update-password");
    }
  }, [inputUpdatePassword.token, navigate, tokenValue]);

  const handleInputChange = (e, field) => {
    const value = e.target.value;

    if (field === "password") {
      const passwordValidator =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,12}$/;
      if (!passwordValidator.test(value)) {
        setValidateUpdatePassword((prevValidateUpdatePassword) => ({
          ...prevValidateUpdatePassword,
          password:
            "Invalid password format. It must contain at least 1 lowercase, 1 uppercase, 1 digit number, 1 symbol, and be between 8 and 12 characters long",
        }));
      } else {
        setValidateUpdatePassword((prevValidateUpdatePassword) => ({
          ...prevValidateUpdatePassword,
          password: "",
        }));
      }
      setInputUpdatePassword((prevInputUpdatePassword) => ({
        ...prevInputUpdatePassword,
        password: value,
      }));
    }

    if (field === "passwordConfirmation") {
      if (inputUpdatePassword.password !== value) {
        setValidateUpdatePassword((prevValidateUpdatePassword) => ({
          ...prevValidateUpdatePassword,
          passwordConfirmation:
            "Please ensure that the password and password confirmation match",
        }));
      } else {
        setValidateUpdatePassword((prevValidateUpdatePassword) => ({
          ...prevValidateUpdatePassword,
          passwordConfirmation: "",
        }));
      }
      setInputUpdatePassword((prevInputUpdatePassword) => ({
        ...prevInputUpdatePassword,
        passwordConfirmation: value,
      }));
    }
  };

  const handleUpdatePassword = async (e) => {
    if (e.key === "Enter" || e.type === "click") {
      e.preventDefault();

      if (validateUpdatePassword.password)
        return showErrorToast(validateUpdatePassword.password);
      if (validateUpdatePassword.passwordConfirmation)
        return showErrorToast(validateUpdatePassword.passwordConfirmation);
      if (
        !inputUpdatePassword.password ||
        !inputUpdatePassword.passwordConfirmation
      )
        return showErrorToast("All fields are required");

      const loadingToastId = showLoadingToast("Loading...");

      const updatePassword = await dispatch(
        putUpdatePassword(inputUpdatePassword),
      );

      toast.dismiss(loadingToastId);

      if (!updatePassword) showErrorToast("Update Password Failed");

      if (updatePassword) {
        showSuccessToast("Update Password Successful");
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      }
    }
  };

  return (
    <>
      <div className="flex min-h-screen">
        <div className="hidden min-h-screen items-center justify-center gap-2 bg-neutral-3 md:flex  md:w-1/2 md:flex-col">
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
            onKeyDown={handleUpdatePassword}
          >
            <h5 className="mb-2 text-2xl font-semibold">Update Password</h5>
            <div className="flex w-full flex-col">
              <label htmlFor="password">New Password</label>
              <div className="relative">
                <input
                  type={showPassword1 ? "text" : "password"}
                  id="password"
                  className={`${
                    validateUpdatePassword.password
                      ? "border-alert-red"
                      : inputUpdatePassword.password && "border-alert-green"
                  } border-1 w-full rounded-2xl border px-4 py-3 pr-24 outline-none`}
                  placeholder="********"
                  value={inputUpdatePassword.password}
                  onChange={(e) => handleInputChange(e, "password")}
                  autoComplete="off"
                />
                {showPassword1 ? (
                  <FiEye
                    size={27}
                    className={`${
                      validateUpdatePassword.password ||
                      !inputUpdatePassword.password
                        ? "right-14"
                        : "right-4"
                    } absolute top-3 w-8 cursor-pointer text-slate-400`}
                    onClick={() => {
                      setShowPassword1(!showPassword1);
                    }}
                  />
                ) : (
                  <FiEyeOff
                    size={27}
                    className={`${
                      validateUpdatePassword.password ||
                      inputUpdatePassword.password
                        ? "right-14"
                        : "right-4"
                    } absolute top-3 w-8 cursor-pointer text-slate-400`}
                    onClick={() => {
                      setShowPassword1(!showPassword1);
                    }}
                  />
                )}
                {validateUpdatePassword.password ? (
                  <>
                    <div className="absolute right-4 top-[13px] rounded-full border-2 border-alert-red bg-neutral-5 p-1">
                      <IoClose size={15} className="text-alert-red" />
                    </div>
                    <p className="ms-3 text-sm text-alert-red">
                      {validateUpdatePassword.password}
                    </p>
                  </>
                ) : (
                  inputUpdatePassword.password && (
                    <div className="absolute right-4 top-[13px] rounded-full border-2 border-alert-green bg-alert-green p-1">
                      <FaCheck size={15} className="text-neutral-5" />
                    </div>
                  )
                )}
              </div>
            </div>
            <div className="flex w-full flex-col">
              <label htmlFor="passwordConfirmation">Confirm Password</label>
              <div className="relative">
                <input
                  type={showPassword2 ? "text" : "password"}
                  id="passwordConfirmation"
                  className={`${
                    validateUpdatePassword.passwordConfirmation
                      ? "border-alert-red"
                      : inputUpdatePassword.passwordConfirmation &&
                        "border-alert-green"
                  } border-1 w-full rounded-2xl border px-4 py-3 pr-24 outline-none`}
                  placeholder="********"
                  value={inputUpdatePassword.passwordConfirmation}
                  onChange={(e) => handleInputChange(e, "passwordConfirmation")}
                  autoComplete="off"
                />
                {showPassword2 ? (
                  <FiEye
                    size={27}
                    className={`${
                      validateUpdatePassword.passwordConfirmation ||
                      inputUpdatePassword.passwordConfirmation
                        ? "right-14"
                        : "right-4"
                    } absolute  top-3 w-8 cursor-pointer text-slate-400`}
                    onClick={() => {
                      setShowPassword2(!showPassword2);
                    }}
                  />
                ) : (
                  <FiEyeOff
                    size={27}
                    className={`${
                      validateUpdatePassword.passwordConfirmation ||
                      inputUpdatePassword.passwordConfirmation
                        ? "right-14"
                        : "right-4"
                    } absolute  top-3 w-8 cursor-pointer text-slate-400`}
                    onClick={() => {
                      setShowPassword2(!showPassword2);
                    }}
                  />
                )}
                {validateUpdatePassword.passwordConfirmation ? (
                  <>
                    <div className="absolute right-4 top-[13px] rounded-full border-2 border-alert-red bg-neutral-5 p-1">
                      <IoClose size={15} className="text-alert-red" />
                    </div>
                    <p className="ms-3 text-sm text-alert-red">
                      {validateUpdatePassword.passwordConfirmation}
                    </p>
                  </>
                ) : (
                  inputUpdatePassword.passwordConfirmation && (
                    <div className="absolute right-4 top-[13px] rounded-full border-2 border-alert-green bg-alert-green p-1">
                      <FaCheck size={15} className="text-neutral-5" />
                    </div>
                  )
                )}
              </div>
            </div>
            <button
              className="mt-3 w-full rounded-2xl bg-neutral-1 py-3 text-sm text-neutral-5 hover:bg-opacity-80"
              onClick={handleUpdatePassword}
            >
              Update Password
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
