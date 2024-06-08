import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Redux Actions
import { getAllCategoriesAction } from "../../redux/action/categories/CategoriesAction";

// Components
import { AdminSidebar } from "../../assets/components/admin/AdminSidebar";
import { AdminNavbar } from "../../assets/components/admin/AdminNavbar";
import { AdminCard } from "../../assets/components/admin/AdminCard";

export const AdminCategory = () => {
  const dispatch = useDispatch();

  const categoryData = useSelector((state) => state.categories.categories);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getAllCategoriesAction());
    };

    fetchData();
  }, []);
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
            <div className="overflow-x-auto">
              <table class="w-full">
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
                      <td className="flex flex-col px-2 py-1 text-sm lg:min-w-0">
                        {category.categoryImage}
                      </td>
                      <td className="px-2 py-1 text-sm lg:min-w-0">
                        {category.categoryName}
                      </td>
                      <td className="flex flex-wrap gap-1 px-2 py-1 text-sm lg:min-w-0">
                        <button
                          type="button"
                          className="rounded-full bg-orange-400 px-3 py-1 text-white"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="rounded-full bg-red-600 px-3 py-1 text-white"
                        >
                          Delete
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
    </>
  );
};
