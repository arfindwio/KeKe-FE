import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

// Redux Actions
import { logoutUserAction } from "../../../redux/action/users/UsersAction";

// Material Tailwind
import { Drawer } from "@material-tailwind/react";

// Icons
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";

// Images
import Logo from "../../img/Logo1.svg";

export const AdminNavbar = ({ onOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [open, setOpen] = useState(false);

  const openDrawer = () => {
    setOpen(!open);
    onOpen(!open);
  };
  return (
    <>
      <div className="flex w-full items-center gap-3 bg-slate-300 px-5 py-5 ">
        <div
          className="cursor-pointer p-1 hover:rounded hover:bg-slate-400 lg:hidden"
          onClick={() => openDrawer()}
        >
          <GiHamburgerMenu size={25} />
        </div>
        <h1 className="text-lg font-bold md:text-xl xl:text-2xl">Hi, Admin</h1>
      </div>

      {/* Material Tailwind */}
      <Drawer open={open} onClose={openDrawer}>
        <div className="relative h-screen bg-neutral-2 py-4 text-neutral-5">
          <div
            onClick={openDrawer}
            className="absolute right-2 top-2 cursor-pointer p-1 text-white hover:rounded-full hover:bg-slate-300 hover:bg-opacity-30"
          >
            <IoClose size={30} />
          </div>
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
            <button
              type="button"
              className={`px-6 py-3 text-start text-lg hover:bg-neutral-5 hover:bg-opacity-20`}
              onClick={() => dispatch(logoutUserAction())}
            >
              Logout
            </button>
          </div>
        </div>
      </Drawer>
    </>
  );
};
