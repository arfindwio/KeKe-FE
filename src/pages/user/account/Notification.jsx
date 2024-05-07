import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Redux Actions
import {
  getAllNotificationsAction,
  putMarkAsReadNotificationAction,
} from "../../../redux/action/notifications/NotificationsAction";

// Components
import { Navbar } from "../../../assets/components/navbar/Navbar";

// Icons
import { IoMdNotifications } from "react-icons/io";

// Cookies
import { CookieStorage, CookiesKeys } from "../../../utils/cookie";

export const Notification = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const notificationData = useSelector(
    (state) => state.notifications.notifications,
  );

  useEffect(() => {
    const token = CookieStorage.get(CookiesKeys.AuthToken);

    if (!token) return navigate("/");
  }, [navigate]);

  useEffect(() => {
    const delayFetch = setTimeout(async () => {
      await dispatch(putMarkAsReadNotificationAction());
    }, 1000);

    return () => clearTimeout(delayFetch);
  }, [dispatch]);

  const handleClick = async () => {
    await dispatch(getAllNotificationsAction());
    await dispatch(putMarkAsReadNotificationAction());
  };

  return (
    <>
      <Navbar />
      <div className="px-6 pb-20 pt-4 sm:px-10 sm:pb-4 sm:pt-24 lg:px-20">
        <div className="flex min-h-[70vh] w-full flex-col overflow-hidden rounded-xl border-2 border-neutral-2 bg-slate-50 sm:min-h-[60vh]">
          <h3 className="w-full bg-neutral-1 py-3 text-center text-xl text-neutral-5">
            Notification
          </h3>
          {notificationData?.length ? (
            notificationData.map((notification) => (
              <div
                key={notification.id}
                onClick={() => handleClick()}
                className={`${
                  notification.isRead
                    ? "bg-neutral-5 hover:bg-neutral-4"
                    : "bg-neutral-3"
                } group flex h-fit w-full cursor-pointer gap-2 bg-opacity-30 px-2 py-4 hover:bg-opacity-100 sm:gap-3 sm:px-10 sm:py-6`}
              >
                <div className="h-fit w-fit rounded-full bg-neutral-3 p-1">
                  <IoMdNotifications size={20} className="text-neutral-5" />
                </div>
                <div className="flex w-full flex-col gap-1">
                  <div className="flex w-full items-center justify-between">
                    <p className="text-xs font-medium text-neutral-3 group-hover:text-neutral-5 sm:text-sm">
                      {notification.title}
                    </p>
                    <div className="flex items-center gap-2">
                      <p className="text-xs font-medium text-neutral-3 group-hover:text-neutral-5 sm:text-sm">
                        {notification.createdAt}
                      </p>
                      <div
                        className={`${
                          notification.isRead
                            ? "bg-alert-green"
                            : "bg-alert-red"
                        } h-2 w-2 rounded-full `}
                      ></div>
                    </div>
                  </div>
                  <p className="text-sm">{notification.message}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="m-auto text-2xl font-bold italic text-neutral-4">
              - No notifications found -
            </p>
          )}
        </div>
      </div>
    </>
  );
};
