import { showErrorToast } from "../../../helper/ToastHelper";
import {
  reduxGetAllPayments,
  reduxPostCreatePaymentMidtrans,
  reduxPutEditPaymentById,
  reduxGetPaymentsHistory,
} from "../../../services/payments/Payments";
import {
  setPayments,
  setPayment,
  startLoading,
  endLoading,
  setPaymentsHistory,
} from "../../reducer/payments/PaymentsSlice";

export const getAllPaymentsAction = () => async (dispatch) => {
  try {
    dispatch(startLoading());
    const result = await reduxGetAllPayments();
    dispatch(setPayments(result.data.data.payments));
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

export const postCreatePaymentMidtransAction = (input) => async (dispatch) => {
  try {
    dispatch(startLoading());
    await reduxPostCreatePaymentMidtrans(input);
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

export const putEditPaymentByIdAction =
  (input, paymentId) => async (dispatch) => {
    try {
      dispatch(startLoading());
      await reduxPutEditPaymentById(input, paymentId);
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

export const getPaymentsHistoryAction = (query) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const result = await reduxGetPaymentsHistory(query);
    dispatch(setPaymentsHistory(result.data.data.payments));

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
