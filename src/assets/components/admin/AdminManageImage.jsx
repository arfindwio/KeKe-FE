import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

// Redux Actions
import {
  postCreateImageAction,
  putEditImageByIdAction,
  deleteImageByIdAction,
} from "../../../redux/action/images/ImagesAction";

// Helper
import {
  showErrorToast,
  showLoadingToast,
  showSuccessToast,
} from "../../../helper/ToastHelper";

// Icons
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaPlus } from "react-icons/fa6";

export const AdminManageImage = ({
  type,
  image,
  afterSubmit,
  completeSubmit,
  count,
}) => {
  const dispatch = useDispatch();

  const [openDeleteMenu, setOpenDeleteMenu] = useState(false);
  const [editDataImage, setEditDataImage] = useState(null);
  const [dataImage, setDataImage] = useState(null);
  const [inputImage, setInputImage] = useState({
    image: "",
    categoryId: afterSubmit?.categoryId,
    productId: afterSubmit?.productId,
  });

  useEffect(() => {
    if (type === "edit") {
      setEditDataImage(image?.image);
    }
  }, [type, image, afterSubmit]);

  useEffect(() => {
    const handleCreate = async () => {
      if (!inputImage.image) return;

      const loadingToastId = showLoadingToast("Loading...");

      const createImage = await dispatch(
        postCreateImageAction({
          ...inputImage,
          categoryId: afterSubmit?.categoryId,
          productId: afterSubmit?.productId,
        }),
      );

      toast.dismiss(loadingToastId);

      if (!createImage) {
        completeSubmit(null, "create");
        showErrorToast("Create Image Failed");
      } else {
        completeSubmit(null, "create");
      }
    };

    const handleEdit = async () => {
      const loadingToastId = showLoadingToast("Loading...");

      const editImage = await dispatch(
        putEditImageByIdAction(
          {
            ...inputImage,
            categoryId: afterSubmit?.categoryId,
            productId: afterSubmit?.productId,
          },
          image?.id,
        ),
      );

      toast.dismiss(loadingToastId);

      if (!editImage) {
        completeSubmit(null, "edit");
        showErrorToast("Edit Image Failed");
      } else {
        completeSubmit(null, "edit");
      }
    };

    if (
      (afterSubmit.categoryId || afterSubmit.productId) &&
      type === "create"
    ) {
      handleCreate();
    }

    if ((afterSubmit.categoryId || afterSubmit.productId) && type === "edit") {
      handleEdit();
    }
  }, [afterSubmit]);

  const handleInputChange = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const imageUrl = URL.createObjectURL(file);

      setDataImage(imageUrl);
      setInputImage((prevInputImage) => ({
        ...prevInputImage,
        image: file,
      }));
    }
  };

  const handleDelete = async () => {
    const loadingToastId = showLoadingToast("Loading...");

    const deleteImage = await dispatch(deleteImageByIdAction(image?.id));

    toast.dismiss(loadingToastId);

    if (!deleteImage) {
      completeSubmit(null, "delete");
      showErrorToast("Delete Image Failed");
    }

    if (deleteImage) {
      showSuccessToast("Delete Image Successful");
      completeSubmit(null, "delete");
    }
  };

  return (
    <>
      <div className="relative w-fit">
        <label
          htmlFor={`image-${count}`}
          className="relative w-fit cursor-pointer"
        >
          {editDataImage && !openDeleteMenu && (
            <img
              onMouseEnter={() => setOpenDeleteMenu(true)}
              src={editDataImage}
              alt="category image"
              width={500}
              height={500}
              className=" h-16 w-16 overflow-hidden rounded-md border border-slate-300 object-cover"
            />
          )}
          {dataImage ? (
            <img
              src={dataImage}
              alt="image"
              width={500}
              height={500}
              className=" h-16 w-16 overflow-hidden rounded-md border border-slate-300 object-cover"
            />
          ) : (
            !editDataImage && (
              <div className="flex h-16 w-16 items-center justify-center rounded-md border border-slate-300 bg-transparent p-3 text-slate-300">
                <FaPlus size={30} />
              </div>
            )
          )}
        </label>
        <input
          type="file"
          accept="image/*"
          id={`image-${count}`}
          name="image"
          hidden
          onChange={handleInputChange}
        />
        {openDeleteMenu && type === "edit" && image?.id && (
          <button
            onMouseLeave={() => setOpenDeleteMenu(false)}
            type="button"
            className="flex h-16 w-16 items-center justify-center rounded-md bg-neutral-1 p-3 text-alert-red opacity-90"
            onClick={() => handleDelete()}
          >
            <RiDeleteBin5Line size={25} />
          </button>
        )}
      </div>
    </>
  );
};
