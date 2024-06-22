import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

// Redux Actions
import {
  postCreateColorAction,
  putEditColorByIdAction,
  deleteColorByIdAction,
} from "../../../redux/action/colors/ColorsAction";
import { getAllProductsAction } from "../../../redux/action/products/ProductsAction";

// Helper
import {
  showErrorToast,
  showLoadingToast,
  showSuccessToast,
} from "../../../helper/ToastHelper";

// Icons
import { RiDeleteBin5Line } from "react-icons/ri";

export const AdminManageColor = ({
  type,
  color,
  submitProduct,
  completeSubmit,
}) => {
  const dispatch = useDispatch();

  const [inputColor, setInputColor] = useState({
    colorName: "",
    productId: submitProduct?.id,
  });

  useEffect(() => {
    if (type === "edit") {
      setInputColor({
        colorName: color?.colorName,
      });
    }
  }, [type, color, submitProduct]);

  useEffect(() => {
    const handleCreate = async () => {
      const loadingToastId = showLoadingToast("Loading...");

      const createColor = await dispatch(
        postCreateColorAction({ ...inputColor, productId: submitProduct?.id }),
      );

      toast.dismiss(loadingToastId);

      if (!createColor) {
        showErrorToast("Create Color Failed");
      } else {
        completeSubmit(null, "create");
      }
    };

    const handleEdit = async () => {
      const loadingToastId = showLoadingToast("Loading...");

      const editColor = await dispatch(
        putEditColorByIdAction(
          { ...inputColor, productId: submitProduct?.id },
          color?.id,
        ),
      );

      toast.dismiss(loadingToastId);

      if (!editColor) {
        showErrorToast("Edit Color Failed");
      } else {
        completeSubmit(null, "edit");
      }
    };

    if (submitProduct && type === "create") {
      handleCreate();
    }

    if (submitProduct && type === "edit") {
      handleEdit();
    }
  }, [submitProduct]);

  const handleInputChange = (e) => {
    setInputColor((prevInputColor) => ({
      ...prevInputColor,
      [e.target.name]: e.target.value,
    }));
  };

  const handleDelete = async () => {
    const loadingToastId = showLoadingToast("Loading...");

    const deleteColor = await dispatch(deleteColorByIdAction(color?.id));

    toast.dismiss(loadingToastId);

    if (!deleteColor) showErrorToast("Delete Color Failed");

    if (deleteColor) {
      showSuccessToast("Delete Color Successful");
      await dispatch(getAllProductsAction(""));
    }
  };

  return (
    <div className="flex w-full flex-col">
      <label htmlFor="colorName" className="text-neutral-1">
        Color Name
      </label>
      <div className="flex flex-nowrap items-center justify-between">
        <input
          type="text"
          id="colorName"
          name="colorName"
          className="border-1 w-[90%] rounded-2xl border px-4 py-3 text-neutral-2 outline-none"
          placeholder="Input Color Name"
          value={inputColor.colorName}
          onChange={handleInputChange}
        />
        <button
          type="button"
          className="flex h-full w-fit items-center rounded-lg bg-red-600 px-2 text-neutral-5 hover:bg-red-800"
          onClick={() => handleDelete()}
        >
          <RiDeleteBin5Line size={25} />
        </button>
      </div>
    </div>
  );
};
