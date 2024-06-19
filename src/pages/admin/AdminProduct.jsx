import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Redux Actions
import { getAllProductsAction } from "../../redux/action/products/ProductsAction";

// Components
import { AdminSidebar } from "../../assets/components/admin/AdminSidebar";
import { AdminNavbar } from "../../assets/components/admin/AdminNavbar";
import { AdminCard } from "../../assets/components/admin/AdminCard";

export const AdminProduct = () => {
  const dispatch = useDispatch();

  const productData = useSelector((state) => state.products.products);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getAllProductsAction(""));
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
                    <th className="px-2 py-2 text-start text-sm">
                      Product Image
                    </th>
                    <th className="px-2 py-2 text-start text-sm">
                      Product Name
                    </th>
                    <th className="px-2 py-2 text-start text-sm">Price</th>
                    <th className="px-2 py-2 text-start text-sm">
                      Description
                    </th>
                    <th className="px-2 py-2 text-start text-sm">Stock</th>
                    <th className="px-2 py-2 text-start text-sm">
                      Product Sold
                    </th>
                    <th className="px-2 py-2 text-start text-sm">Category</th>
                    <th className="px-2 py-2 text-start text-sm">Promotion</th>
                    <th className="px-2 py-2 text-start text-sm">Size</th>
                    <th className="px-2 py-2 text-start text-sm">Color</th>
                    <th className="px-2 py-2 text-start text-sm">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {productData.map((product, index) => (
                    <tr
                      key={index}
                      className={`${
                        index % 2 === 0 ? "bg-opacity-20" : "bg-opacity-60"
                      } border-b-2 bg-slate-200`}
                    >
                      <td className="px-2 py-1 text-sm">{index + 1}</td>
                      <td className="break-all px-2 py-1 text-sm lg:min-w-0">
                        {product.productImage}
                      </td>
                      <td className="px-2 py-1 text-sm lg:min-w-0">
                        {product.productName}
                      </td>
                      <td className="px-2 py-1 text-sm lg:min-w-0">
                        {product.price}
                      </td>
                      <td className="px-2 py-1 text-sm lg:min-w-0">
                        {product.description}
                      </td>
                      <td className="px-2 py-1 text-sm lg:min-w-0">
                        {product.stock}
                      </td>
                      <td className="px-2 py-1 text-sm lg:min-w-0">
                        {product.soldCount}
                      </td>
                      <td className="px-2 py-1 text-sm lg:min-w-0">
                        {product.category.categoryName}
                      </td>
                      <td className="px-2 py-1 text-sm lg:min-w-0">
                        {product.promotion?.discount}
                      </td>
                      <td className="px-2 py-1 text-sm lg:min-w-0">
                        {product.size.map((size, index) => (
                          <React.Fragment key={index}>
                            {size.sizeName}
                            {index < product.size.length - 1 && ", "}
                          </React.Fragment>
                        ))}
                      </td>
                      <td className="px-2 py-1 text-sm lg:min-w-0">
                        {product.color.map((color, index) => (
                          <React.Fragment key={index}>
                            {color.colorName}
                            {index < product.color.length - 1 && ", "}
                          </React.Fragment>
                        ))}
                      </td>
                      <td className="px-2 py-1 text-sm lg:min-w-0">
                        <button
                          type="button"
                          className="mb-1 mr-1 rounded-full bg-orange-400 px-3 py-1 text-white hover:bg-orange-700"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="rounded-full bg-red-600 px-3 py-1 text-white hover:bg-red-800"
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
