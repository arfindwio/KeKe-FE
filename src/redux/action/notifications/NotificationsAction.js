import { showErrorToast } from "../../../helper/ToastHelper";
import {
  reduxGetAllNotifications,
  reduxPostCreateNotification,
  reduxPutMarkAsReadNotifications,
} from "../../../services/notifications/Notifications";
import {
  setNotifications,
  startLoading,
  endLoading,
} from "../../reducer/notifications/NotificationsSlice";

export const getAllNotificationsAction = () => async (dispatch) => {
  try {
    dispatch(startLoading());
    const result = await reduxGetAllNotifications();
    dispatch(setNotifications(result.data.data.notifications));
    return true;
  } catch (err) {
    if (err.response) {
      if (err.response.status >= 400 && err.response.status <= 500) {
        showErrorToast(err.response.data.message);
      } else {
        console.error("unexpected Error", err);
      }
    }
  } finally {
    dispatch(endLoading());
  }
};

export const postCreateNotificationAction = (input) => async (dispatch) => {
  try {
    dispatch(startLoading());
    await reduxPostCreateNotification(input);
    return true;
  } catch (err) {
    if (err.response) {
      if (err.response.status >= 400 && err.response.status <= 500) {
        showErrorToast(err.response.data.message);
      } else {
        console.error("unexpected Error", err);
      }
    }
  } finally {
    dispatch(endLoading());
  }
};

export const putMarkAsReadNotificationAction = () => async (dispatch) => {
  try {
    dispatch(startLoading());
    await reduxPutMarkAsReadNotifications();
    return true;
  } catch (err) {
    if (err.response) {
      if (err.response.status >= 400 && err.response.status <= 500) {
        showErrorToast(err.response.data.message);
      } else {
        console.error("unexpected Error", err);
      }
    }
  } finally {
    dispatch(endLoading());
  }
};
