import { showErrorToast } from "../../../helper/ToastHelper";
import { reduxUpdateUserProfile } from "../../../services/userProfiles/UserProfiles";
import {
  updateUserProfile,
  startLoading,
  endLoading,
} from "../../reducer/userProfiles/UserProfilesSlice";

export const putUpdateUserProfile = (formData) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const { fullName, address, phoneNumber, city, country, image } = formData;

    const formDataObject = new FormData();
    formDataObject.append("fullName", fullName);
    formDataObject.append("address", address);
    formDataObject.append("phoneNumber", phoneNumber);
    formDataObject.append("city", city);
    formDataObject.append("country", country);
    formDataObject.append("image", image || "");

    console.log(formDataObject);

    await reduxUpdateUserProfile(formDataObject);
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
