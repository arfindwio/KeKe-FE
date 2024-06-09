import { showErrorToast } from "../helper/ToastHelper";

export const handleRequestError = (error) => {
  const { response } = error;
  if (response) {
    if (response.status >= 400 && response.status <= 500) {
      showErrorToast(response.data.message);
    } else {
      console.error("Unexpected Error:", error);
    }
  } else {
    console.error("Error without response:", error);
  }
};
