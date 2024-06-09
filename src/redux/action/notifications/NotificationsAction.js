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
import { handleRequestError } from "../../../utils/errorHandler";

export const getAllNotificationsAction = () => async (dispatch) => {
  try {
    dispatch(startLoading());
    const result = await reduxGetAllNotifications();
    dispatch(setNotifications(result.data.data.notifications));
    return true;
  } catch (err) {
    handleRequestError(err);
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
    handleRequestError(err);
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
    handleRequestError(err);
  } finally {
    dispatch(endLoading());
  }
};
