import { reduxUpdateUserProfile } from "../../../services/userProfiles/UserProfiles";
import {
  updateUserProfile,
  startLoading,
  endLoading,
} from "../../reducer/userProfiles/UserProfilesSlice";
import { handleRequestError } from "../../../utils/errorHandler";

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

    await reduxUpdateUserProfile(formDataObject);
    return true;
  } catch (err) {
    handleRequestError(err);
  } finally {
    dispatch(endLoading());
  }
};
