import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

// Redux Actions
import { getUserAuthenticateAction } from "../../../redux/action/users/UsersAction";
import { putUpdateUserProfile } from "../../../redux/action/userProfiles/UserProfilesAction";

// Helper
import {
  showErrorToast,
  showLoadingToast,
  showSuccessToast,
} from "../../../helper/ToastHelper";

// Cookies
import { CookieStorage, CookiesKeys } from "../../../utils/cookie";

// Components
import { Navbar } from "../../../assets/components/navbar/Navbar";
import { SidebarAccount } from "../../../assets/components/sidebar/SidebarAccount";

// Icons
import { IoImageOutline } from "react-icons/io5";

export const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loadingButton, setLoadingButton] = useState(false);
  const [dataImage, setDataImage] = useState("");
  const [inputUserProfile, setInputUserProfile] = useState({
    image: null,
    fullName: "",
    phoneNumber: "",
    email: "",
    address: "",
    city: "",
    country: "",
  });

  const userData = useSelector((state) => state.users.userAuthenticate);

  const isMobile = useMediaQuery({ maxDeviceWidth: 639 });

  useEffect(() => {
    const token = CookieStorage.get(CookiesKeys.AuthToken);

    if (!token) navigate("/");
  }, [navigate]);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getUserAuthenticateAction());
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    setDataImage(userData.userProfile.profilePicture || "");
    setInputUserProfile({
      image: null,
      fullName: userData.userProfile.fullName,
      phoneNumber: userData.userProfile.phoneNumber,
      email: userData.email,
      city: userData.userProfile.city || "",
      address: userData.userProfile.address || "",
      country: userData.userProfile.country || "",
    });
  }, [userData]);

  const handleInputChange = (e, field) => {
    if (field === "image") {
      const files = e.target.files;
      if (files && files.length > 0) {
        const file = files[0];
        const imageUrl = URL.createObjectURL(file);

        setDataImage(imageUrl);
        setInputUserProfile((prevInputUserProfile) => ({
          ...prevInputUserProfile,
          image: file,
        }));
      }
    } else {
      const value = e.target.value;
      setInputUserProfile((prevInputUserProfile) => ({
        ...prevInputUserProfile,
        [field]: value,
      }));
    }
  };

  const handleUserProfile = async (e) => {
    if ((e.key === "Enter" || e.type === "click") && !loadingButton) {
      e.preventDefault();

      if (
        !inputUserProfile.fullName ||
        !inputUserProfile.phoneNumber ||
        !inputUserProfile.email
      )
        return showErrorToast(
          "Please fill in all required fields: Full Name, Phone Number, and Email",
        );

      setLoadingButton(true);

      const loadingToastId = showLoadingToast("Loading...");

      const userProfile = await dispatch(
        putUpdateUserProfile(inputUserProfile),
      );

      toast.dismiss(loadingToastId);

      if (!userProfile) showErrorToast("User profile failed to update");

      if (userProfile) showSuccessToast("User profile successfully updated");
    }
  };

  return (
    <>
      <Navbar />
      <div className="px-6 pb-16 pt-4 sm:px-10 sm:pb-8 sm:pt-24 lg:px-20">
        <div className="flex w-full flex-col justify-between overflow-hidden rounded-xl border-2 border-neutral-2">
          <h3 className="w-full bg-neutral-1 py-3 text-center text-xl text-neutral-5">
            Account Profile
          </h3>
          <div className="flex w-full gap-6 bg-slate-100 p-10 ">
            {!isMobile && (
              <div className="flex w-[40%] flex-col gap-6">
                <SidebarAccount />
              </div>
            )}
            <div className="w-full sm:w-[55%]">
              <form
                className="mx-auto flex w-[90%] flex-col gap-5 sm:w-[70%]"
                onKeyDown={handleUserProfile}
              >
                <div className="mx-auto w-fit">
                  <label
                    htmlFor="image"
                    className="relative w-fit cursor-pointer"
                  >
                    <img
                      src={
                        dataImage
                          ? dataImage
                          : "https://ik.imagekit.io/arfin07/images.png?updatedAt=1706817534316"
                      }
                      alt="profile"
                      width={500}
                      height={500}
                      className="mx-auto h-36 w-36 overflow-hidden rounded-full border-4 border-neutral-2 object-cover"
                    />
                    <div className="absolute bottom-1 right-0 rounded-full bg-neutral-5 p-1 text-neutral-2">
                      <IoImageOutline size={35} />
                    </div>
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    id="image"
                    hidden
                    onChange={(e) => handleInputChange(e, "image")}
                  />
                </div>
                <div className="flex w-full flex-col">
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    className="rounded-2xl border-2 px-4 py-2 outline-none focus:border-neutral-2"
                    placeholder="Budi Cahyono"
                    value={inputUserProfile.fullName}
                    onChange={(e) => handleInputChange(e, "fullName")}
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="phoneNumber">Phone Number</label>
                  <input
                    type="text"
                    id="phoneNumber"
                    className="rounded-2xl border-2 px-4 py-2 outline-none focus:border-neutral-2"
                    placeholder="08123456789"
                    value={inputUserProfile.phoneNumber}
                    onChange={(e) => handleInputChange(e, "phoneNumber")}
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    className="rounded-2xl border-2 px-4 py-2 text-neutral-3 outline-none focus:border-neutral-2"
                    value={inputUserProfile.email}
                    disabled
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="address">Address</label>
                  <input
                    type="text"
                    id="address"
                    className="rounded-2xl border-2 px-4 py-2 outline-none focus:border-neutral-2"
                    placeholder="address"
                    value={inputUserProfile.address}
                    onChange={(e) => handleInputChange(e, "address")}
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="city">City</label>
                  <input
                    type="text"
                    id="city"
                    className="rounded-2xl border-2 px-4 py-2 outline-none focus:border-neutral-2"
                    placeholder="City"
                    value={inputUserProfile.city}
                    onChange={(e) => handleInputChange(e, "city")}
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="country">Country</label>
                  <input
                    type="text"
                    id="country"
                    className="rounded-2xl border-2 px-4 py-2 outline-none focus:border-neutral-2"
                    placeholder="Country"
                    value={inputUserProfile.country}
                    onChange={(e) => handleInputChange(e, "country")}
                  />
                </div>
                <button
                  className="rounded-full bg-neutral-1 py-3 text-base font-bold text-neutral-5 hover:bg-opacity-80"
                  onClick={handleUserProfile}
                >
                  Save
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
