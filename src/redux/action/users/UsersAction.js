import {
  reduxPostRegisterUser,
  reduxPostLoginUser,
  reduxPutOtpUser,
  reduxPutResendOtpUser,
  reduxPostForgetPassword,
  reduxPutUpdatePassword,
  reduxPutChangePassword,
  reduxGetAllUsers,
  reduxGetUserByAuth,
} from "../../../services/users/Users";
import {
  setUsers,
  setUserAuthenticate,
  resetUserAuth,
  startLoading,
  endLoading,
} from "../../reducer/users/UsersSlice";
import { resetCart } from "../../reducer/carts/CartsSlice";
import { resetNotification } from "../../reducer/notifications/NotificationsSlice";
import { showErrorToast } from "../../../helper/ToastHelper";
import { CookiesKeys, CookieStorage } from "../../../utils/cookie";

export const postRegisterUserAction = (input) => async (dispatch) => {
  try {
    dispatch(startLoading());
    await reduxPostRegisterUser(input);
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

export const postLoginUserAction = (input) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const result = await reduxPostLoginUser(input);
    CookieStorage.set(CookiesKeys.AuthToken, result.data.data.token);
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

export const logoutUserAction = () => (dispatch) => {
  try {
    dispatch(resetUserAuth());
    dispatch(resetNotification());
    dispatch(resetCart());
    CookieStorage.remove(CookiesKeys.AuthToken);
  } catch (err) {
    if (err.response) {
      if (err.response.status >= 400 && err.response.status <= 500) {
        showErrorToast(err.response.data.message);
      } else {
        console.error("unexpected Error", err);
      }
    }
  }
};

export const putVerifyOtpAction = (input) => async (dispatch) => {
  try {
    dispatch(startLoading());
    await reduxPutOtpUser(input);
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

export const putResendOtp = (input) => async (dispatch) => {
  try {
    dispatch(startLoading());
    await reduxPutResendOtpUser(input);
    return true;
  } catch (err) {
    if (err.response.status >= 400 && err.response.status <= 500) {
      showErrorToast(err.response.data.message);
    } else {
      console.error("unexpected Error", err);
    }
  } finally {
    dispatch(endLoading());
  }
};

export const putChangePasswordUser = (input) => async (dispatch) => {
  try {
    dispatch(startLoading());
    await reduxPutChangePassword(input);
    return true;
  } catch (err) {
    if (err.response.status >= 400 && err.response.status <= 500) {
      showErrorToast(err.response.data.message);
    } else {
      console.error("unexpected Error", err);
    }
  } finally {
    dispatch(endLoading());
  }
};

export const postForgetPassAction = (input) => async (dispatch) => {
  try {
    dispatch(startLoading());
    await reduxPostForgetPassword(input);
    return true;
  } catch (err) {
    if (err.response.status >= 400 && err.response.status <= 500) {
      showErrorToast(err.response.data.message);
    } else {
      console.error("unexpected Error", err);
    }
  } finally {
    dispatch(endLoading());
  }
};

export const putUpdatePassword = (input, token) => async (dispatch) => {
  try {
    dispatch(startLoading());
    await reduxPutUpdatePassword(input, token);
    return true;
  } catch (err) {
    if (err.response.status >= 400 && err.response.status <= 500) {
      showErrorToast(err.response.data.message);
    } else {
      console.error("unexpected Error", err);
    }
  } finally {
    dispatch(endLoading());
  }
};

export const getUserAuthenticateAction = () => async (dispatch) => {
  try {
    dispatch(startLoading());
    const result = await reduxGetUserByAuth();
    dispatch(setUserAuthenticate(result.data.data.user));
    return true;
  } catch (err) {
    if (err.response.status >= 400 && err.response.status <= 500) {
      showErrorToast(err.response.data.message);
    } else {
      console.error("unexpected Error", err);
    }
  } finally {
    dispatch(endLoading());
  }
};

export const getAllUsersAction = () => async (dispatch) => {
  try {
    dispatch(startLoading());
    const result = await reduxGetAllUsers();
    dispatch(setUsers(result.data.data.users));
    return true;
  } catch (err) {
    if (err.response.status >= 400 && err.response.status <= 500) {
      showErrorToast(err.response.data.message);
    } else {
      console.error("unexpected Error", err);
    }
  } finally {
    dispatch(endLoading());
  }
};
