import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

// Redux Actions
import {
  getAllUsersAction,
  putChangeRoleUserAction,
} from "../../redux/action/users/UsersAction";

// Components
import { AdminSidebar } from "../../assets/components/admin/AdminSidebar";
import { AdminNavbar } from "../../assets/components/admin/AdminNavbar";
import { AdminCard } from "../../assets/components/admin/AdminCard";
import { Pagination } from "../../assets/components/pagination/Pagination";
import { AdminDataSkeleton } from "../../assets/components/skeleton/admin/AdminDataSkeleton";

// Helper
import {
  showErrorToast,
  showLoadingToast,
  showSuccessToast,
} from "../../helper/ToastHelper";

// Icons
import { MdEdit } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";

export const AdminUser = () => {
  const dispatch = useDispatch();

  const [openNavbar, setOpenNavbar] = useState(false);

  const loadingData = useSelector((state) => state.users.loading);
  const userData = useSelector((state) => state.users.users);

  openNavbar
    ? (document.body.style.overflow = "hidden")
    : (document.body.style.overflow = "auto");

  const handleOpenNavbar = (openValue) => setOpenNavbar(openValue);

  const handleEdit = async (e, userId) => {
    const value = e.target.value;
    if (
      value.toLocaleLowerCase() !== "admin" &&
      value.toLocaleLowerCase() !== "user"
    ) {
      showErrorToast("Invalid value");
      return;
    }
    const loadingToastId = showLoadingToast("Loading...");

    const editPayment = await dispatch(putChangeRoleUserAction(value, userId));

    toast.dismiss(loadingToastId);

    if (!editPayment) showErrorToast("Edit User Failed");

    if (editPayment) {
      showSuccessToast("Edit User Successful");
      await dispatch(getAllUsersAction());
    }
  };

  return (
    <>
      <div className="flex">
        <div className="fixed w-[20%]">
          <AdminSidebar />
        </div>
        <div className="ml-auto flex w-full flex-col lg:w-[80%]">
          <AdminNavbar onOpen={handleOpenNavbar} />
          <AdminCard />
          <div className="flex flex-col justify-center gap-1 px-5 pb-16 pt-10">
            <h5 className="mb-2 text-xl font-semibold">Manage Users</h5>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-2 bg-slate-200">
                    <th className="px-2 py-2 text-start text-sm">No</th>
                    <th className="px-2 py-2 text-start text-sm">Full Name</th>
                    <th className="px-2 py-2 text-start text-sm">Email</th>
                    <th className="px-2 py-2 text-start text-sm">
                      Phone Number
                    </th>
                    <th className="px-2 py-2 text-start text-sm">Address</th>
                    <th className="px-2 py-2 text-start text-sm">City</th>
                    <th className="px-2 py-2 text-start text-sm">Country</th>
                    <th className="px-2 py-2 text-start text-sm">Role</th>
                  </tr>
                </thead>
                <tbody>
                  {loadingData ? (
                    Array.from({ length: 5 }).map((_, index) => (
                      <tr key={index} className="animate-pulse">
                        <AdminDataSkeleton tdCount={8} />
                      </tr>
                    ))
                  ) : userData?.length > 0 ? (
                    userData?.map((user, index) => (
                      <tr
                        key={index}
                        className={`${
                          index % 2 === 0 ? "bg-opacity-20" : "bg-opacity-60"
                        } border-b-2 bg-slate-200`}
                      >
                        {/* <td className="px-2 py-1 text-sm">
                          {getPageValue() > 0
                            ? `${getPageValue()}${index + 1}`
                            : `${index + 1}`}
                        </td> */}
                        <td className="px-2 py-1 text-sm">{index + 1}</td>
                        <td className="px-2 py-1 text-sm lg:min-w-0">
                          {user?.userProfile?.fullName}
                        </td>
                        <td className="px-2 py-1 text-sm lg:min-w-0">
                          {user?.email}
                        </td>
                        <td className="px-2 py-1 text-sm lg:min-w-0">
                          {user?.userProfile?.phoneNumber ? (
                            user?.userProfile?.phoneNumber
                          ) : (
                            <p className="font-normal not-italic text-neutral-3 text-opacity-50">
                              null
                            </p>
                          )}
                        </td>
                        <td className="px-2 py-1 text-sm lg:min-w-0">
                          {user?.userProfile?.address ? (
                            user.userProfile?.address
                          ) : (
                            <p className="font-normal not-italic text-neutral-3 text-opacity-50">
                              null
                            </p>
                          )}
                        </td>
                        <td className="px-2 py-1 text-sm lg:min-w-0">
                          {user?.userProfile?.city ? (
                            user?.userProfile?.city
                          ) : (
                            <p className="font-normal not-italic text-neutral-3 text-opacity-50">
                              null
                            </p>
                          )}
                        </td>
                        <td className="px-2 py-1 text-sm lg:min-w-0">
                          {user?.userProfile?.country ? (
                            user?.userProfile?.country
                          ) : (
                            <p className="font-normal not-italic text-neutral-3 text-opacity-50">
                              null
                            </p>
                          )}
                        </td>
                        <td className="px-2 py-1 text-sm lg:min-w-0">
                          <select
                            value={user?.role}
                            className="rounded border border-neutral-1"
                            onChange={(e) => handleEdit(e, user.id)}
                            disabled={user?.role === "Owner"}
                          >
                            <option value="Admin">Admin</option>
                            <option value="User">User</option>
                          </select>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <td
                      className="h-full border-b-2 bg-slate-200 bg-opacity-20 text-center italic text-neutral-4"
                      colSpan={4}
                    >
                      No Category Found
                    </td>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Section */}
            {/* <div className="mx-auto">
              <Pagination
                onQuery={handleQuery}
                type={"categories"}
                nextLink={paginationCategory?.links?.next}
                prevLink={paginationCategory?.links?.prev}
                totalItems={paginationCategory?.total_items}
              />
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};
