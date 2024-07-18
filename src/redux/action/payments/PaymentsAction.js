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
import { handleRequestError } from "../../../utils/errorHandler";

export const getAllPaymentsAction = (query) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const result = await reduxGetAllPayments(query);
    dispatch(setPayments(result.data.data));
    return true;
  } catch (err) {
    handleRequestError(err);
  } finally {
    dispatch(endLoading());
  }
};

export const postCreatePaymentMidtransAction = (input) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const result = await reduxPostCreatePaymentMidtrans(input);
    return result.data.data;
  } catch (err) {
    handleRequestError(err);
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
      handleRequestError(err);
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
    handleRequestError(err);
  } finally {
    dispatch(endLoading());
  }
};
