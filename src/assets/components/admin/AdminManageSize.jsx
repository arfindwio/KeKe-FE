import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

// Redux Actions
import {
  postCreateSizeAction,
  putEditSizeByIdAction,
  deleteSizeByIdAction,
} from "../../../redux/action/sizes/SizesAction";

// Redux Reducer
import {
  // setProducts,
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

export const AdminManageSize = ({
  type,
  size,
  submitProduct,
  completeSubmit,
}) => {
  const dispatch = useDispatch();

  const [inputSize, setInputSize] = useState({
    sizeName: "",
    productId: submitProduct?.id,
  });

  // const productData = useSelector((state) => state.products.products.products);
  // const paginationProduct = useSelector(
  //   (state) => state.products.products.pagination,
  // );
  const filterProduct = useSelector((state) => state.products.filterProduct);

  useEffect(() => {
    if (type === "edit") {
      setInputSize({
        sizeName: size?.sizeName,
      });
    }
  }, [type, size, submitProduct]);

  useEffect(() => {
    const handleCreate = async () => {
      if (!inputSize.sizeName) return;

      // const loadingToastId = showLoadingToast("Loading...");

      const createSize = await dispatch(
        postCreateSizeAction({ ...inputSize, productId: submitProduct?.id }),
      );

      // toast.dismiss(loadingToastId);

      if (!createSize) {
        showErrorToast("Create Size Failed");
      } else {
        // const addedSize = productData.map((product) => {
        //   if (product.id === submitProduct.productId) {
        //     const updatedSizes = product.size ? [...product.size] : [];
        //     updatedSizes.push(createSize);

        //     return {
        //       ...product,
        //       size: updatedSizes,
        //     };
        //   }
        //   return product;
        // });
        // dispatch(
        //   setProducts({
        //     pagination: paginationProduct,
        //     products: [...productData, addedSize],
        //   }),
        // );
        completeSubmit(null, "create");
      }
    };

    const handleEdit = async () => {
      if (!inputSize.sizeName) return;

      // const loadingToastId = showLoadingToast("Loading...");

      const editSize = await dispatch(
        putEditSizeByIdAction(
          { ...inputSize, productId: submitProduct?.id },
          size?.id,
        ),
      );

      // toast.dismiss(loadingToastId);

      if (!editSize) {
        showErrorToast("Edit Size Failed");
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
    setInputSize((prevInputSize) => ({
      ...prevInputSize,
      [e.target.name]: e.target.value,
    }));
  };

  const handleDelete = async () => {
    if (!size.id) return;

    // const loadingToastId = showLoadingToast("Loading...");

    const deleteSize = await dispatch(deleteSizeByIdAction(size?.id));

    // toast.dismiss(loadingToastId);

    if (!deleteSize) showErrorToast("Delete Size Failed");

    if (deleteSize) {
      const filteredProduct = {
        ...filterProduct,
        size: filterProduct.size.filter((item) => item.id !== size?.id),
      };
      dispatch(setFilterProduct(filteredProduct));
      showSuccessToast("Delete Size Successful");
      completeSubmit(null, "delete");
    }
  };

  return (
    <>
      <div className="flex w-full flex-col">
        <label htmlFor="sizeName" className="text-neutral-1">
          Size Name
        </label>
        <div className="flex flex-nowrap items-center justify-between">
          <input
            type="text"
            id="sizeName"
            name="sizeName"
            className={`${
              !size.id ? "w-full" : "w-[90%]"
            } border-1  rounded-2xl border px-4 py-3 text-neutral-2 outline-none`}
            placeholder="Input Size Name"
            value={inputSize.sizeName}
            onChange={handleInputChange}
          />
          {size.id && (
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
    </>
  );
};
