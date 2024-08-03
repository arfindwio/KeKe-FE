import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

// Redux Actions
import {
  postCreateColorAction,
  putEditColorByIdAction,
  deleteColorByIdAction,
} from "../../../redux/action/colors/ColorsAction";

// Redux Reducer
import {
  setProducts,
  setFilterProduct,
} from "../../../redux/reducer/products/ProductsSlice";

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

  const productData = useSelector((state) => state.products.products.products);
  const paginationProduct = useSelector(
    (state) => state.products.products.pagination,
  );
  const filterProduct = useSelector((state) => state.products.filterProduct);

  useEffect(() => {
    if (type === "edit") {
      setInputColor({
        colorName: color?.colorName,
      });
    }
  }, [type, color, submitProduct]);

  useEffect(() => {
    const handleCreate = async () => {
      // const loadingToastId = showLoadingToast("Loading...");

      const createColor = await dispatch(
        postCreateColorAction({ ...inputColor, productId: submitProduct?.id }),
      );

      // toast.dismiss(loadingToastId);

      if (!createColor) {
        showErrorToast("Create Color Failed");
      } else {
        // const addedColor = productData.map((product) => {
        //   if (product.id === submitProduct.productId) {
        //     return {
        //       ...product,
        //       color: [...product.color, createColor],
        //     };
        //   }
        //   return product;
        // });
        // dispatch(
        //   setProducts({
        //     pagination: paginationProduct,
        //     products: [...productData, addedColor],
        //   }),
        // );
        completeSubmit(null, "create");
      }
    };

    const handleEdit = async () => {
      // const loadingToastId = showLoadingToast("Loading...");

      const editColor = await dispatch(
        putEditColorByIdAction(
          { ...inputColor, productId: submitProduct?.id },
          color?.id,
        ),
      );

      // toast.dismiss(loadingToastId);

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
    // const loadingToastId = showLoadingToast("Loading...");

    const deleteColor = await dispatch(deleteColorByIdAction(color?.id));

    // toast.dismiss(loadingToastId);

    if (!deleteColor) showErrorToast("Delete Color Failed");

    if (deleteColor) {
      const filteredProduct = {
        ...filterProduct,
        color: filterProduct.color.filter((item) => item.id !== color?.id),
      };
      dispatch(setFilterProduct(filteredProduct));
      showSuccessToast("Delete Color Successful");
      completeSubmit(null, "delete");
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
          className={`${
            !color.id ? "w-full" : "w-[90%]"
          } border-1  rounded-2xl border px-4 py-3 text-neutral-2 outline-none`}
          placeholder="Input Color Name"
          value={inputColor.colorName}
          onChange={handleInputChange}
        />
        {color.id && (
          <button
            type="button"
            className="flex h-full w-fit items-center rounded-lg bg-red-600 px-2 text-neutral-5 hover:bg-red-800"
            onClick={() => handleDelete()}
          >
            <RiDeleteBin5Line size={25} />
          </button>
        )}
      </div>
    </div>
  );
};
