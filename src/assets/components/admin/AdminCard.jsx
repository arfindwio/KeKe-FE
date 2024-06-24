import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Redux Actions
import { getAllUsersAction } from "../../../redux/action/users/UsersAction";
import { getAllCategoriesAdminAction } from "../../../redux/action/categories/CategoriesAction";
import { getAllProductsAdminAction } from "../../../redux/action/products/ProductsAction";

// Icons
import { PiUsersLight } from "react-icons/pi";
import { BiCategoryAlt } from "react-icons/bi";
import { TbShirt } from "react-icons/tb";

export const AdminCard = () => {
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.users.users);
  const categoryData = useSelector((state) => state.categories.categoriesAdmin);
  const productData = useSelector((state) => state.products.productsAdmin);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getAllUsersAction());
      await dispatch(getAllCategoriesAdminAction());
      await dispatch(getAllProductsAdminAction());
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="mx-auto grid grid-cols-1 gap-6 pt-10 sm:grid-cols-2  md:grid-cols-3">
        <div className="flex items-center gap-4 rounded-2xl border bg-slate-600 p-4 shadow-md">
          <div className="rounded-3xl bg-neutral-5 p-3">
            <PiUsersLight size={40} />
          </div>
          <div className="flex flex-col flex-wrap text-neutral-5">
            <h5 className="text-lg font-thin">{userData.length}</h5>
            <h5 className="text-lg font-semibold">Users</h5>
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-2xl border bg-slate-600 p-4 shadow-md">
          <div className="rounded-3xl bg-neutral-5 p-3">
            <BiCategoryAlt size={40} />
          </div>
          <div className="flex flex-col flex-wrap text-neutral-5">
            <h5 className="text-lg font-thin">{categoryData.length}</h5>
            <h5 className="text-lg font-semibold">Category</h5>
          </div>
        </div>
        <div className="col-span-1 flex w-auto items-center gap-4 rounded-2xl border bg-slate-600 p-4 shadow-md sm:col-span-2 sm:mx-auto sm:w-1/2 md:col-span-1 md:mx-0 md:w-auto">
          <div className="rounded-3xl bg-neutral-5 p-3">
            <TbShirt size={40} />
          </div>
          <div className="flex flex-col flex-wrap text-neutral-5">
            <h5 className="text-lg font-thin">{productData.length}</h5>
            <h5 className="text-lg font-semibold">Shirt</h5>
          </div>
        </div>
      </div>
    </>
  );
};
