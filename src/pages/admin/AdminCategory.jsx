import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

// Redux Actions
import {
  getAllCategoriesAction,
  postCreateCategoryAction,
  putEditCategoryByIdAction,
  deleteCategoryByIdAction,
} from "../../redux/action/categories/CategoriesAction";

// Components
import { AdminSidebar } from "../../assets/components/admin/AdminSidebar";
import { AdminNavbar } from "../../assets/components/admin/AdminNavbar";
import { AdminCard } from "../../assets/components/admin/AdminCard";

// Helper
import {
  showErrorToast,
  showLoadingToast,
  showSuccessToast,
} from "../../helper/ToastHelper";

// Icons
import { MdEdit } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaPlus } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

// Material Tailwind
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

export const AdminCategory = () => {
  const dispatch = useDispatch();

  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [inputCategory, setInputCategory] = useState({
    image: "",
    categoryName: "",
  });
  const [categoryId, setCategoryId] = useState(null);

  const categoryData = useSelector((state) => state.categories.categories);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getAllCategoriesAction());
    };

    fetchData();
  }, []);

  const handleOpen = (type, categoryId) => {
    setCategoryId(categoryId);
    if (type === "delete") {
      setOpenDelete(!openDelete);
    } else if (type === "edit") {
      const filteredData = categoryData.find(
        (category) => category.id === categoryId,
      );
      setInputCategory({
        image: filteredData.categoryImage,
        categoryName: filteredData.categoryName,
      });
      setOpenEdit(!openEdit);
    } else if (type === "create") {
      setInputCategory({
        image: "",
        categoryName: "",
      });
      setOpenCreate(!openCreate);
    }
  };

  const handleInputChange = (e) => {
    if (e.target.name === "image") {
      setInputCategory((prevInputCategory) => ({
        ...prevInputCategory,
        image: e.target.files[0],
      }));
    } else {
      setInputCategory((prevInputCategory) => ({
        ...prevInputCategory,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const handleCreate = async (e) => {
    if (e.key === "Enter" || e.type === "click") {
      e.preventDefault();

      const loadingToastId = showLoadingToast("Loading...");

      const createCategory = await dispatch(
        postCreateCategoryAction(inputCategory, categoryId),
      );

      toast.dismiss(loadingToastId);

      if (!createCategory) showErrorToast("Create Category Failed");

      if (createCategory) {
        showSuccessToast("Create Category Successful");
        await dispatch(getAllCategoriesAction());
        setOpenCreate(false);
      }
    }
  };

  const handleEdit = async (e) => {
    if (e.key === "Enter" || e.type === "click") {
      e.preventDefault();

      const loadingToastId = showLoadingToast("Loading...");

      const editCategory = await dispatch(
        putEditCategoryByIdAction(inputCategory, categoryId),
      );

      toast.dismiss(loadingToastId);

      if (!editCategory) showErrorToast("Edit Category Failed");

      if (editCategory) {
        showSuccessToast("Edit Category Successful");
        await dispatch(getAllCategoriesAction());
        setOpenEdit(false);
      }
    }
  };

  const handleDelete = async () => {
    const loadingToastId = showLoadingToast("Loading...");

    const deleteCategory = await dispatch(deleteCategoryByIdAction(categoryId));

    toast.dismiss(loadingToastId);

    if (!deleteCategory) showErrorToast("Delete Category Failed");

    if (deleteCategory) {
      showSuccessToast("Delete Category Successful");
      await dispatch(getAllCategoriesAction());
      setOpenDelete(false);
    }
  };

  return (
    <>
      <div className="flex">
        <div className="fixed w-[20%]">
          <AdminSidebar />
        </div>
        <div className="ml-auto flex w-[80%] flex-col">
          <AdminNavbar />
          <AdminCard />
          <div className="flex flex-col justify-center gap-1 px-5 pt-10">
            <h5 className="mb-2 text-xl font-semibold">Manage Category</h5>
            <button
              type="button"
              className="flex w-fit items-center gap-1 rounded-md bg-green-600 px-3 py-1 text-neutral-5 hover:bg-green-800"
              onClick={() => handleOpen("create", "")}
            >
              <FaPlus size={20} />
              <p>Create Category</p>
            </button>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-2 bg-slate-200">
                    <th className="px-2 py-2 text-start text-sm">No</th>
                    <th className="px-2 py-2 text-start text-sm">Image</th>
                    <th className="px-2 py-2 text-start text-sm">
                      Category Name
                    </th>
                    <th className="px-2 py-2 text-start text-sm">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {categoryData.map((category, index) => (
                    <tr
                      key={index}
                      className={`${
                        index % 2 === 0 ? "bg-opacity-20" : "bg-opacity-60"
                      } border-b-2 bg-slate-200`}
                    >
                      <td className="px-2 py-1 text-sm">{index + 1}</td>
                      <td className="px-2 py-1 text-sm lg:min-w-0">
                        {category.categoryImage}
                      </td>
                      <td className="px-2 py-1 text-sm lg:min-w-0">
                        {category.categoryName}
                      </td>
                      <td className="px-2 py-1 text-sm lg:min-w-0">
                        <button
                          type="button"
                          className="mb-1 mr-1 flex items-center gap-1 rounded-full bg-orange-400 px-3 py-1 text-neutral-5 hover:bg-orange-700"
                          onClick={() => handleOpen("edit", category.id)}
                        >
                          <MdEdit size={20} />
                          <p>Edit</p>
                        </button>
                        <button
                          type="button"
                          className="flex items-center gap-1 rounded-full bg-red-600 px-3 py-1 text-neutral-5 hover:bg-red-800"
                          onClick={() => handleOpen("delete", category.id)}
                        >
                          <RiDeleteBin5Line size={20} />
                          <p>Delete</p>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Material Tailwind */}
      {/* Modal Create */}
      <Dialog
        open={openCreate}
        size={"md"}
        handler={() => setOpenCreate(!openCreate)}
      >
        <DialogHeader className="flex items-center justify-between">
          <h5 className="text-xl font-bold">Create Category</h5>
          <IoMdClose
            size={30}
            className="cursor-pointer"
            onClick={() => setOpenCreate(false)}
          />
        </DialogHeader>
        <DialogBody>
          <form className="flex flex-col gap-4" onKeyDown={handleCreate}>
            <div className="flex w-full flex-col">
              <label htmlFor="image" className="text-neutral-1">
                Category Image
              </label>
              <input
                type="file"
                accept="image/*"
                id="image"
                name="image"
                className="border-1 rounded-2xl border px-4 py-3 text-neutral-2 outline-none"
                onChange={handleInputChange}
              />
            </div>
            <div className="flex w-full flex-col">
              <label htmlFor="categoryName" className="text-neutral-1">
                Category Name
              </label>
              <input
                type="text"
                id="categoryName"
                name="categoryName"
                className="border-1 rounded-2xl border px-4 py-3 text-neutral-2 outline-none"
                placeholder="Input Category Name"
                value={inputCategory.categoryName}
                onChange={handleInputChange}
              />
            </div>
          </form>
        </DialogBody>
        <DialogFooter className="flex items-center justify-center gap-2">
          <button
            type="button"
            className="flex gap-1 rounded-full border border-neutral-1 px-3 py-1 text-neutral-2 hover:border-neutral-3 hover:text-neutral-3"
            onClick={() => setOpenCreate(false)}
          >
            Cancel
          </button>
          <button
            type="button"
            className="flex gap-1 rounded-full  bg-green-600 px-3 py-1 text-white hover:bg-green-800"
            onClick={handleCreate}
          >
            Create
          </button>
        </DialogFooter>
      </Dialog>

      {/* Modal Edit */}
      <Dialog
        open={openEdit}
        size={"md"}
        handler={() => setOpenEdit(!openEdit)}
      >
        <DialogHeader className="flex items-center justify-between">
          <h5 className="text-xl font-bold">Edit Category</h5>
          <IoMdClose
            size={30}
            className="cursor-pointer"
            onClick={() => setOpenEdit(false)}
          />
        </DialogHeader>
        <DialogBody>
          <form className="flex flex-col gap-4" onKeyDown={handleEdit}>
            <div className="flex w-full flex-col">
              <label htmlFor="image" className="text-neutral-1">
                Category Image
              </label>
              <input
                type="file"
                accept="image/*"
                id="image"
                name="image"
                className="border-1 rounded-2xl border px-4 py-3 text-neutral-2 outline-none"
                onChange={handleInputChange}
              />
            </div>
            <div className="flex w-full flex-col">
              <label htmlFor="categoryName" className="text-neutral-1">
                Category Name
              </label>
              <input
                type="text"
                id="categoryName"
                name="categoryName"
                className="border-1 rounded-2xl border px-4 py-3 text-neutral-2 outline-none"
                placeholder="Input Category Name"
                value={inputCategory.categoryName}
                onChange={handleInputChange}
              />
            </div>
          </form>
        </DialogBody>
        <DialogFooter className="flex items-center justify-center gap-2">
          <button
            type="button"
            className="flex gap-1 rounded-full border border-neutral-1 px-3 py-1 text-neutral-2 hover:border-neutral-3 hover:text-neutral-3"
            onClick={() => setOpenEdit(false)}
          >
            Cancel
          </button>
          <button
            type="button"
            className="flex gap-1 rounded-full  bg-light-blue-600 px-3 py-1 text-white hover:bg-light-blue-800"
            onClick={handleEdit}
          >
            Save
          </button>
        </DialogFooter>
      </Dialog>

      {/* Modal Delete */}
      <Dialog
        open={openDelete}
        size={"md"}
        handler={() => setOpenDelete(!openDelete)}
      >
        <DialogHeader className="flex justify-end">
          <IoMdClose
            size={30}
            className="cursor-pointer"
            onClick={() => setOpenDelete(false)}
          />
        </DialogHeader>
        <DialogBody className="mx-auto flex w-[80%] flex-col items-center justify-center gap-4 text-center text-lg">
          <RiDeleteBin5Line size={100} className="text-red-800" />
          <p>Are you sure you want to delete this Category?</p>
        </DialogBody>
        <DialogFooter className="flex items-center justify-center gap-2">
          <button
            type="button"
            className="flex gap-1 rounded-full border border-neutral-1 px-3 py-1 text-neutral-2 hover:border-neutral-3 hover:text-neutral-3"
            onClick={() => setOpenDelete(false)}
          >
            Cancel
          </button>
          <button
            type="button"
            className="flex gap-1 rounded-full  bg-red-600 px-3 py-1 text-neutral-5 hover:bg-red-800"
            onClick={handleDelete}
          >
            Delete
          </button>
        </DialogFooter>
      </Dialog>
    </>
  );
};
