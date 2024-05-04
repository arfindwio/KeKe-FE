import React from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

// Redux Actions
import { logoutUserAction } from "../../../redux/action/users/UsersAction";

// Icons
import { FiEdit3 } from "react-icons/fi";
import { TbSettings } from "react-icons/tb";
import { LuLogOut } from "react-icons/lu";

export const SidebarAccount = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentPath = location.pathname;

  const handleLogout = () => {
    dispatch(logoutUserAction());
    navigate("/login");
  };

  return (
    <>
      <Link
        to={"/account-profile"}
        className={`${
          currentPath === "/account-profile"
            ? "border-neutral-2 text-lg font-bold text-neutral-2"
            : "group border-neutral-4 text-base font-normal hover:border-neutral-2 hover:text-neutral-2"
        } flex gap-6 border-b-2 pb-3 `}
      >
        <FiEdit3 size={25} className="text-neutral-2" />
        <p className="group-hover:font-semibold">Profile</p>
      </Link>
      <Link
        to={"/account-setting"}
        className={`${
          currentPath === "/account-setting"
            ? "border-neutral-2 text-lg font-bold text-neutral-2"
            : "group border-neutral-4 text-base font-normal hover:border-neutral-2 hover:text-neutral-2"
        } flex gap-6 border-b-2 pb-3 `}
      >
        <TbSettings size={25} className="text-neutral-2" />
        <p className="group-hover:font-semibold">Setting</p>
      </Link>
      <button
        className="group flex gap-6 border-b-2 border-neutral-4 pb-3 hover:border-neutral-2 hover:text-neutral-2"
        onClick={() => handleLogout()}
      >
        <LuLogOut size={25} className="text-neutral-2" />
        <p className="text-base font-normal group-hover:font-semibold">
          Logout
        </p>
      </button>
    </>
  );
};
