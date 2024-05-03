import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

// Icons
import { LuHome } from "react-icons/lu";
import { MdOutlineAirplaneTicket } from "react-icons/md";
import { LiaClipboardListSolid } from "react-icons/lia";
import { FiBell } from "react-icons/fi";
import { PiUserCircle } from "react-icons/pi";
import { FiEdit3 } from "react-icons/fi";
import { TbSettings } from "react-icons/tb";
import { LuLogOut } from "react-icons/lu";

export const NavbarMobile = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [token, setToken] = useState(null);

  const currentPath = location.pathname;

  useEffect(() => {
    const tokenFromLocalStorage = localStorage.getItem("tokenUser");
    if (tokenFromLocalStorage) {
      setToken(tokenFromLocalStorage);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("tokenUser");
    navigate("/login");
  };

  return (
    <>
      <div className="bt-1 fixed bottom-0 z-50 flex w-full items-start justify-between border-t bg-neutral-5 pt-3 shadow-md">
        <Link
          to={"/"}
          className={`${
            currentPath === "/" ? "text-neutral-1" : "text-neutral-3"
          } ${
            token ? " w-[24.5%]" : "w-[33%]"
          } flex flex-col items-center justify-center gap-1 break-all text-center`}
        >
          <LuHome size={25} />
          <p className="text-sm font-medium">Home</p>
        </Link>
        {!token ? (
          <Link
            to={"/flight"}
            className={`${
              currentPath === "/flight" ? "text-neutral-1" : "text-neutral-3"
            } ${
              token ? " w-[24.5%]" : "w-[33%]"
            } flex flex-col items-center justify-center gap-1 break-all text-center`}
          >
            <MdOutlineAirplaneTicket size={25} />
            <p className="text-sm font-medium">Flight</p>
          </Link>
        ) : (
          <>
            <Link
              to={"/history"}
              className={`${
                currentPath === "/history" ? "text-neutral-1" : "text-neutral-3"
              } ${
                token ? " w-[24.5%]" : "w-[33%]"
              } flex flex-col items-center justify-center gap-1 break-all text-center`}
            >
              <LiaClipboardListSolid size={25} />
              <p className="text-sm font-medium">History</p>
            </Link>
            <Link
              to={"/notification"}
              className={`${
                currentPath === "/notification"
                  ? "text-neutral-1"
                  : "text-neutral-3"
              } ${
                token ? " w-[24.5%]" : "w-[33%]"
              } flex flex-col items-center justify-center gap-1 break-all text-center`}
            >
              <FiBell size={25} />
              <p className="text-sm font-medium">Notification</p>
            </Link>
          </>
        )}
        {!token ? (
          <Link
            to={"/login"}
            className={`flex w-[33%] flex-col items-center justify-center gap-1 break-all text-center text-neutral-3`}
          >
            <PiUserCircle size={25} />
            <p className="text-sm font-medium">Login</p>
          </Link>
        ) : (
          <button
            className={`${
              currentPath === "/account/profile"
                ? "text-neutral-1"
                : "text-neutral-3"
            } flex w-[24.5%] flex-col items-center justify-center gap-1 break-all text-center`}
            onClick={() => setOpen(!open)}
          >
            <PiUserCircle size={25} />
            <p className="text-sm font-medium">Account</p>
          </button>
        )}
      </div>
    </>
  );
};
