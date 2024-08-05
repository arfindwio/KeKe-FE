import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useMediaQuery } from "react-responsive";
import toast from "react-hot-toast";

// Redux Actions
import { putChangePasswordUser } from "../../../redux/action/users/UsersAction";

// Helper
import {
  showErrorToast,
  showLoadingToast,
  showSuccessToast,
} from "../../../helper/ToastHelper";

// Components
import { Navbar } from "../../../assets/components/navbar/Navbar";
import { SidebarAccount } from "../../../assets/components/sidebar/SidebarAccount";

// icons
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";
import { FaCheck } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";

export const Setting = () => {
  const dispatch = useDispatch();

  const [loadingButton, setLoadingButton] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const [inputChangePassword, setInputChangePassword] = useState({
    oldPassword: "",
    newPassword: "",
    newPasswordConfirmation: "",
  });
  const [validateChangePassword, setValidateChangePassword] = useState({
    newPassword: "",
    newPasswordConfirmation: "",
  });

  const isMobile = useMediaQuery({ maxDeviceWidth: 719 });

  const handleInputChange = (e, field) => {
    const value = e.target.value;

    if (field === "oldPassword") {
      setInputChangePassword((prevInputChangePassword) => ({
        ...prevInputChangePassword,
        oldPassword: value,
      }));
    }

    if (field === "newPassword") {
      const passwordValidator =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,12}$/;
      if (!passwordValidator.test(value)) {
        setValidateChangePassword((prevValidateChangePassword) => ({
          ...prevValidateChangePassword,
          newPassword:
            "Invalid password format. It must contain at least 1 lowercase, 1 uppercase, 1 digit number, 1 symbol, and be between 8 and 12 characters long",
        }));
      } else {
        setValidateChangePassword((prevValidateChangePassword) => ({
          ...prevValidateChangePassword,
          newPassword: "",
        }));
      }
      setInputChangePassword((prevInputChangePassword) => ({
        ...prevInputChangePassword,
        newPassword: value,
      }));
    }

    if (field === "newPasswordConfirmation") {
      if (inputChangePassword.newPassword !== value) {
        setValidateChangePassword((prevValidateChangePassword) => ({
          ...prevValidateChangePassword,
          newPasswordConfirmation:
            "Please ensure that the password and password confirmation match",
        }));
      } else {
        setValidateChangePassword((prevValidateChangePassword) => ({
          ...prevValidateChangePassword,
          newPasswordConfirmation: "",
        }));
      }
      setInputChangePassword((prevInputChangePassword) => ({
        ...prevInputChangePassword,
        newPasswordConfirmation: value,
      }));
    }
  };

  const handleChangePassword = async (e) => {
    if (e.key === "Enter" || (e.type === "click" && !loadingButton)) {
      e.preventDefault();

      if (validateChangePassword.newPassword)
        return showErrorToast(validateChangePassword.newPassword);
      if (validateChangePassword.newPasswordConfirmation)
        return showErrorToast(validateChangePassword.newPasswordConfirmation);
      if (
        !inputChangePassword.oldPassword ||
        !inputChangePassword.newPassword ||
        !inputChangePassword.newPasswordConfirmation
      )
        return showErrorToast("All fields are required");

      setLoadingButton(true);

      const loadingToastId = showLoadingToast("Loading...");

      const changePassword = await dispatch(
        putChangePasswordUser(inputChangePassword),
      );

      toast.dismiss(loadingToastId);

      if (!changePassword) showErrorToast("Change Password Failed");

      if (changePassword) {
        showSuccessToast("Change Password Successful");
        setInputChangePassword({
          oldPassword: "",
          newPassword: "",
          newPasswordConfirmation: "",
        });
      }
    }
  };
  return (
    <>
      <Navbar />
      <div className="px-4 pb-20 pt-24 sm:px-10 md:pb-4 lg:px-20">
        <div className="flex w-full flex-col justify-between overflow-hidden rounded-xl border-2 border-neutral-2">
          <h3 className="w-full bg-neutral-1 py-3 text-center text-xl text-neutral-5">
            Account Setting
          </h3>
          <div className="flex w-full gap-6 bg-slate-100 p-5 sm:p-10 ">
            {!isMobile && (
              <div className="flex flex-col gap-6 sm:w-[40%]">
                <SidebarAccount />
              </div>
            )}
            <div className="w-full md:w-[55%]">
              <form
                className="mx-auto flex w-[90%] flex-col gap-5 md:w-[70%]"
                onKeyDown={handleChangePassword}
              >
                <h4 className="w-full text-center text-xl font-bold sm:mb-3 sm:text-2xl">
                  Change Password
                </h4>
                <div className="flex w-full flex-col">
                  <label htmlFor="oldPassword">Enter Old Password</label>
                  <div className="relative flex flex-col">
                    <input
                      type={showOldPassword ? "text" : "password"}
                      id="oldPassword"
                      className="rounded-2xl border-2 border-neutral-4 px-4 py-2 pr-14 outline-none focus:border-neutral-2"
                      placeholder="********"
                      value={inputChangePassword.oldPassword}
                      onChange={(e) => handleInputChange(e, "oldPassword")}
                      autoComplete="off"
                    />
                    {showOldPassword ? (
                      <FiEye
                        size={27}
                        className="absolute right-4 top-2 w-8 cursor-pointer text-slate-400"
                        onClick={() => setShowOldPassword(!showOldPassword)}
                      />
                    ) : (
                      <FiEyeOff
                        size={27}
                        className="absolute right-4 top-2 w-8 cursor-pointer text-slate-400"
                        onClick={() => setShowOldPassword(!showOldPassword)}
                      />
                    )}
                  </div>
                </div>
                <div className="flex w-full flex-col">
                  <label htmlFor="newPassword">Enter New Password</label>
                  <div className="relative flex flex-col">
                    <input
                      type={showNewPassword ? "text" : "password"}
                      id="newPassword"
                      className={`${
                        validateChangePassword.newPassword
                          ? "border-alert-red"
                          : inputChangePassword.newPassword
                            ? "border-alert-green focus:border-neutral-2 "
                            : "border-neutral-4"
                      } rounded-2xl border-2 px-4 py-2 pr-24 outline-none `}
                      placeholder="********"
                      value={inputChangePassword.newPassword}
                      onChange={(e) => handleInputChange(e, "newPassword")}
                      autoComplete="off"
                    />
                    {showNewPassword ? (
                      <FiEye
                        size={27}
                        className={`${
                          validateChangePassword.newPassword ||
                          inputChangePassword.newPassword
                            ? "right-14"
                            : "right-4"
                        } absolute top-2 w-8 cursor-pointer text-slate-400`}
                        onClick={() => setShowNewPassword(!showNewPassword)}
                      />
                    ) : (
                      <FiEyeOff
                        size={27}
                        className={`${
                          validateChangePassword.newPassword ||
                          inputChangePassword.newPassword
                            ? "right-14"
                            : "right-4"
                        } absolute top-2 w-8 cursor-pointer text-slate-400`}
                        onClick={() => setShowNewPassword(!showNewPassword)}
                      />
                    )}
                    {validateChangePassword.newPassword ? (
                      <>
                        <div className="absolute right-4 top-2 rounded-full border-2 border-alert-red bg-neutral-5 p-1">
                          <IoClose size={15} className="text-alert-red" />
                        </div>
                        <p className="ms-3 text-sm text-alert-red">
                          {validateChangePassword.newPassword}
                        </p>
                      </>
                    ) : (
                      inputChangePassword.newPassword && (
                        <div className="absolute right-4 top-2 rounded-full border-2 border-alert-green bg-alert-green p-1">
                          <FaCheck size={15} className="text-neutral-5" />
                        </div>
                      )
                    )}
                  </div>
                </div>
                <div className="flex w-full flex-col">
                  <label htmlFor="confirmNewPassword">
                    Confirm New Password
                  </label>
                  <div className="relative flex flex-col">
                    <input
                      type={showConfirmNewPassword ? "text" : "password"}
                      id="confirmNewPassword"
                      className={`${
                        validateChangePassword.newPasswordConfirmation
                          ? "border-alert-red"
                          : inputChangePassword.newPasswordConfirmation
                            ? "border-alert-green focus:border-neutral-2"
                            : "border-neutral-4"
                      } rounded-2xl border-2 px-4 py-2 pr-24 outline-none`}
                      placeholder="********"
                      value={inputChangePassword.newPasswordConfirmation}
                      onChange={(e) =>
                        handleInputChange(e, "newPasswordConfirmation")
                      }
                      autoComplete="off"
                    />
                    {showConfirmNewPassword ? (
                      <FiEye
                        size={27}
                        className={`${
                          validateChangePassword.newPasswordConfirmation ||
                          inputChangePassword.newPasswordConfirmation
                            ? "right-14"
                            : "right-4"
                        } absolute top-2 w-8 cursor-pointer text-slate-400`}
                        onClick={() =>
                          setShowConfirmNewPassword(!showConfirmNewPassword)
                        }
                      />
                    ) : (
                      <FiEyeOff
                        size={27}
                        className={`${
                          validateChangePassword.newPasswordConfirmation ||
                          inputChangePassword.newPasswordConfirmation
                            ? "right-14"
                            : "right-4"
                        } absolute top-2 w-8 cursor-pointer text-slate-400`}
                        onClick={() =>
                          setShowConfirmNewPassword(!showConfirmNewPassword)
                        }
                      />
                    )}
                    {validateChangePassword.newPasswordConfirmation ? (
                      <>
                        <div className="absolute right-4 top-2 rounded-full border-2 border-alert-red bg-neutral-5 p-1">
                          <IoClose size={15} className="text-alert-red" />
                        </div>
                        <p className="ms-3 text-sm text-alert-red">
                          {validateChangePassword.newPasswordConfirmation}
                        </p>
                      </>
                    ) : (
                      inputChangePassword.newPasswordConfirmation && (
                        <div className="absolute right-4 top-2 rounded-full border-2 border-alert-green bg-alert-green p-1">
                          <FaCheck size={15} className="text-neutral-5" />
                        </div>
                      )
                    )}
                  </div>
                </div>
                <button
                  className="rounded-full bg-neutral-1 py-3 text-base font-bold text-neutral-5 hover:bg-opacity-80"
                  onClick={handleChangePassword}
                >
                  Change Password
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
