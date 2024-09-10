import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

// Redux Actions
import {
  postCreateImageAction,
  putEditImageByIdAction,
  deleteImageByIdAction,
} from "../../../redux/action/images/ImagesAction";
import { getAllCategoriesAction } from "../../../redux/action/categories/CategoriesAction";
import { getAllProductsAction } from "../../../redux/action/products/ProductsAction";

// Redux Reducer
// import { setCategories } from "../../../redux/reducer/categories/CategoriesSlice";
import {
  // setProducts,
  setFilterProduct,
} from "../../../redux/reducer/products/ProductsSlice";
import { setImage } from "../../../redux/reducer/images/ImagesSlice";

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

  const isSubmitted = useRef(false); // Tambah useRef untuk melacak submit status
  const [openDeleteMenu, setOpenDeleteMenu] = useState(false);
  const [editDataImage, setEditDataImage] = useState(null);
  const [dataImage, setDataImage] = useState(null);
  const [inputImage, setInputImage] = useState({
    image: null,
    categoryId: afterSubmit?.categoryId,
    productId: afterSubmit?.productId,
  });

  // const categoryData = useSelector(
  //   (state) => state.categories.categories.categories,
  // );
  // const paginationCategory = useSelector(
  //   (state) => state.categories.categories.pagination,
  // );
  // const productData = useSelector((state) => state.products.products.products);
  // const paginationProduct = useSelector(
  //   (state) => state.products.products.pagination,
  // );
  const filterProduct = useSelector((state) => state.products.filterProduct);

  useEffect(() => {
    if (type === "edit") {
      setEditDataImage(image?.image);
    }
  }, [type, image, afterSubmit]);

  useEffect(() => {
    const handleCreate = async () => {
      if (!inputImage.image || isSubmitted.current) return; // Cek jika isSubmitted adalah true
      isSubmitted.current = true; // Set isSubmitted jadi true

      // const loadingToastId = showLoadingToast("Loading...");

      const createImage = await dispatch(
        postCreateImageAction({
          ...inputImage,
          categoryId: afterSubmit?.categoryId,
          productId: afterSubmit?.productId,
        }),
      );

      // toast.dismiss(loadingToastId);

      if (!createImage) {
        completeSubmit(null, "create");
        isSubmitted.current = false; // Reset isSubmitted
        // showErrorToast("Create Image Failed");
      } else {
        if (afterSubmit.categoryId) {
          // const addedImage = categoryData.map((category) => {
          //   if (category.id === afterSubmit.categoryId) {
          //     return {
          //       ...category,
          //       image: {
          //         id: createImage.id,
          //         image: createImage.image,
          //       },
          //     };
          //   }
          //   return category;
          // });
          // dispatch(
          //   setCategories({
          //     pagination: paginationCategory,
          //     categories: addedImage,
          //   }),
          // );
        } else if (afterSubmit.productId) {
          // const addedImage = productData.map((product) => {
          //   if (product.id === afterSubmit.productId) {
          //     const updatedImages = product.image ? [...product.image] : [];
          //     updatedImages.push({
          //       id: createImage.id,
          //       image: createImage.image,
          //     });

          //     return {
          //       ...product,
          //       image: updatedImages,
          //     };
          //   }
          //   return product;
          // });
          const addImage = {
            ...filterProduct,
            image: [
              ...filterProduct.image,
              {
                id: createImage.id,
                image: createImage.image,
              },
            ],
          };
          dispatch(setFilterProduct(addImage));
          // dispatch(
          //   setProducts({
          //     pagination: paginationProduct,
          //     products: addedImage,
          //   }),
          // );
          isSubmitted.current = false; // Reset isSubmitted
        }
        completeSubmit(null, "create");
      }
    };

    const handleEdit = async () => {
      if (isSubmitted.current) return; // Cek jika isSubmitted adalah true
      isSubmitted.current = true; // Set isSubmitted jadi tru
      // const loadingToastId = showLoadingToast("Loading...");

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

      // toast.dismiss(loadingToastId);

      if (!editImage) {
        isSubmitted.current = false; // Reset isSubmitted
        completeSubmit(null, "edit");
        // showErrorToast("Edit Image Failed");
      } else {
        isSubmitted.current = false; // Reset isSubmitted
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

  const handleDelete = async () => {
    // const loadingToastId = showLoadingToast("Loading...");

    const deleteImage = await dispatch(deleteImageByIdAction(image?.id));

    // toast.dismiss(loadingToastId);

    if (!deleteImage) {
      completeSubmit(null, "delete");
      // showErrorToast("Delete Image Failed");
    }

    if (deleteImage) {
      showSuccessToast("Delete Image Successful");
      if (image.categoryId) {
        // const updatedCategories = categoryData.map((category) => {
        //   if (category.image && category.image.id === image?.id) {
        //     return {
        //       ...category,
        //       image: null,
        //     };
        //   }
        //   return category;
        // });
        setEditDataImage(null);
        dispatch(setImage(null));
        // dispatch(
        //   setCategories({
        //     pagination: paginationCategory,
        //     categories: updatedCategories,
        //   }),
        // );
        await dispatch(getAllCategoriesAction(""));
      } else if (image.productId) {
        // const updatedProducts = productData.map((product) => {
        //   return {
        //     ...product,
        //     image: product.image.filter((img) => img.id !== image?.id),
        //   };
        // });
        const filteredProduct = {
          ...filterProduct,
          image: filterProduct.image.filter((item) => item.id !== image?.id),
        };
        dispatch(setFilterProduct(filteredProduct));
        // dispatch(
        //   setProducts({
        //     pagination: paginationProduct,
        //     products: updatedProducts,
        //   }),
        // );
      }
      await dispatch(getAllProductsAction(""));
      completeSubmit(null, "delete");
    }
  };

  const handleInputChange = (e) => {
    const files = e.target.files;
    if (files && files?.length > 0) {
      const file = files[0];
      const imageUrl = URL.createObjectURL(file);

      setDataImage(imageUrl);
      setInputImage((prevInputImage) => ({
        ...prevInputImage,
        image: file,
      }));
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
              alt="image"
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
