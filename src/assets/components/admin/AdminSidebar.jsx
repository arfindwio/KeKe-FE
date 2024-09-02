import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

// Redux Actions
import { logoutUserAction } from "../../../redux/action/users/UsersAction";

// Images
import Logo from "../../img/Logo1.svg";

export const AdminSidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      <div className="fixed hidden h-screen w-1/5 bg-neutral-2 py-4 text-neutral-5 lg:flex lg:flex-col lg:items-center">
        <img
          src={Logo}
          alt="Logo"
          className="mx-auto w-[25%] cursor-pointer"
          onClick={() => navigate("/admin/dashboard")}
        />
        <div className="flex w-full flex-col justify-start pt-6">
          <Link
            to={"/admin/dashboard"}
            className={`${
              location.pathname === "/admin/dashboard"
                ? "bg-neutral-5 bg-opacity-50 font-semibold"
                : "hover:bg-neutral-5 hover:bg-opacity-20"
            } px-6 py-3 text-lg`}
          >
            Dashboard
          </Link>
          <Link
            to={"/admin/user"}
            className={`${
              location.pathname === "/admin/user"
                ? "bg-neutral-5 bg-opacity-50 font-semibold"
                : "hover:bg-neutral-5 hover:bg-opacity-20"
            } px-6 py-3 text-lg`}
          >
            User
          </Link>
          <Link
            to={"/admin/promotion"}
            className={`${
              location.pathname === "/admin/promotion"
                ? "bg-neutral-5 bg-opacity-50 font-semibold"
                : "hover:bg-neutral-5 hover:bg-opacity-20"
            } px-6 py-3 text-lg`}
          >
            Promotion
          </Link>
          <Link
            to={"/admin/category"}
            className={`${
              location.pathname === "/admin/category"
                ? "bg-neutral-5 bg-opacity-50 font-semibold"
                : "hover:bg-neutral-5 hover:bg-opacity-20"
            } px-6 py-3 text-lg`}
          >
            Category
          </Link>
          <Link
            to={"/admin/product"}
            className={`${
              location.pathname === "/admin/product"
                ? "bg-neutral-5 bg-opacity-50 font-semibold"
                : "hover:bg-neutral-5 hover:bg-opacity-20"
            } px-6 py-3 text-lg`}
          >
            Product
          </Link>
          <Link
            to={"/admin/discussion"}
            className={`${
              location.pathname === "/admin/discussion"
                ? "bg-neutral-5 bg-opacity-50 font-semibold"
                : "hover:bg-neutral-5 hover:bg-opacity-20"
            } px-6 py-3 text-lg`}
          >
            Discussion
          </Link>
          <button
            type="button"
            className={`px-6 py-3 text-start text-lg hover:bg-neutral-5 hover:bg-opacity-20`}
            onClick={() => dispatch(logoutUserAction())}
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
};
