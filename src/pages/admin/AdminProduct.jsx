import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

// Redux Actions
import {
  getAllProductsAction,
  putEditProductByIdAction,
  deleteProductByIdAction,
  postCreateProductAction,
} from "../../redux/action/products/ProductsAction";
import { getAllPromotionsAdminAction } from "../../redux/action/promotions/PromotionsAction";

// Components
import { AdminSidebar } from "../../assets/components/admin/AdminSidebar";
import { AdminNavbar } from "../../assets/components/admin/AdminNavbar";
import { AdminCard } from "../../assets/components/admin/AdminCard";
import { AdminManageImage } from "../../assets/components/admin/AdminManageImage";
import { AdminManageSize } from "../../assets/components/admin/AdminManageSize";
import { AdminManageColor } from "../../assets/components/admin/AdminManageColor";
import { Pagination } from "../../assets/components/pagination/Pagination";

// Material Tailwind
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

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

export const AdminProduct = () => {
  const dispatch = useDispatch();

  const [openNavbar, setOpenNavbar] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [inputProduct, setInputProduct] = useState({
    productName: "",
    price: null,
    description: "",
    stock: null,
    categoryId: null,
    promotionId: null,
  });
  const [productId, setProductId] = useState(null);
  const [count, setCount] = useState({
    size: 1,
    color: 1,
  });
  const [submitProduct, setSubmitProduct] = useState(null);
  const [products, setProducts] = useState(null);

  const productData = useSelector((state) => state.products.products.products);
  const paginationProduct = useSelector(
    (state) => state.products.products.pagination,
  );
  const categoryData = useSelector((state) => state.categories.categoriesAdmin);
  const promotionData = useSelector(
    (state) => state.promotions.promotionsAdmin,
  );

  openNavbar
    ? (document.body.style.overflow = "hidden")
    : (document.body.style.overflow = "auto");

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getAllProductsAction(""));
      await dispatch(getAllPromotionsAdminAction());
    };

    fetchData();
  }, []);

  const handleOpen = (type, productId) => {
    setProductId(productId);
    if (type === "delete") {
      setOpenDelete(!openDelete);
    } else if (type === "edit") {
      const filteredData = productData.find(
        (product) => product.id === productId,
      );
      setInputProduct({
        productName: filteredData.productName,
        price: filteredData.price,
        description: filteredData.description,
        stock: filteredData.stock,
        categoryId: filteredData.categoryId,
        promotionId: filteredData.promotionId,
      });
      setCount({
        size: 0,
        color: 0,
      });
      setProducts(filteredData);
      setOpenEdit(!openEdit);
    } else if (type === "create") {
      setSubmitProduct(null);
      setCount({
        size: 1,
        color: 1,
      });
      setInputProduct({
        image: "",
        productName: "",
        price: null,
        description: "",
        stock: null,
        categoryId: null,
        promotionId: null,
      });
      setOpenCreate(!openCreate);
    }
  };

  const handleInputChange = (e) => {
    if (e.target.name === "image") {
      setInputProduct((prevInputProduct) => ({
        ...prevInputProduct,
        image: e.target.files[0],
      }));
    } else {
      setInputProduct((prevInputProduct) => ({
        ...prevInputProduct,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const handleCreate = async (e) => {
    if (e.key === "Enter" || e.type === "click") {
      e.preventDefault();

      const loadingToastId = showLoadingToast("Loading...");

      const createProduct = await dispatch(
        postCreateProductAction(inputProduct),
      );

      toast.dismiss(loadingToastId);

      if (!createProduct) showErrorToast("Create Product Failed");

      if (createProduct) {
        showSuccessToast("Create Product Successful");
        setSubmitProduct(createProduct);
      }
    }
  };

  const handleEdit = async (e) => {
    if (e.key === "Enter" || e.type === "click") {
      e.preventDefault();

      const loadingToastId = showLoadingToast("Loading...");

      const editProduct = await dispatch(
        putEditProductByIdAction(inputProduct, productId),
      );

      toast.dismiss(loadingToastId);

      if (!editProduct) showErrorToast("Edit Product Failed");

      if (editProduct) {
        showSuccessToast("Edit Product Successful");
        setSubmitProduct(editProduct);
      }
    }
  };

  const handleDelete = async () => {
    const loadingToastId = showLoadingToast("Loading...");

    const deleteProduct = await dispatch(deleteProductByIdAction(productId));

    toast.dismiss(loadingToastId);

    if (!deleteProduct) showErrorToast("Delete Product Failed");

    if (deleteProduct) {
      showSuccessToast("Delete Product Successful");
      await dispatch(getAllProductsAction(""));
      setOpenDelete(false);
    }
  };

  const handleSubmitProduct = async (completeSubmit, type) => {
    setSubmitProduct(completeSubmit);
    if (type === "create") {
      setOpenCreate(false);
    }
    if (type === "edit" || type === "delete") {
      setOpenEdit(false);
    }
    await dispatch(getAllProductsAction(""));
  };

  const handleOpenNavbar = (openValue) => setOpenNavbar(openValue);

  const handleQuery = (formatLink) => {
    dispatch(getAllProductsAction(formatLink));
  };

  const getPageValue = () => {
    if (paginationProduct?.links?.next) {
      const url = paginationProduct?.links?.next;
      const urlObj = new URL(url);
      return Number(urlObj.searchParams.get("page") - 2);
    } else if (paginationProduct?.links?.prev) {
      const url = paginationProduct?.links?.prev;
      const urlObj = new URL(url);
      return Number(urlObj.searchParams.get("page"));
    } else {
      return 0;
    }
  };

  return (
    <>
      <div className="flex">
        <div className="fixed w-[20%]">
          <AdminSidebar />
        </div>
        <div className="ml-auto flex w-full flex-col lg:w-[80%]">
          <AdminNavbar onOpen={handleOpenNavbar} />
          <AdminCard />
          <div className="flex flex-col justify-center gap-1 px-5 pb-16 pt-10">
            <h5 className="mb-2 text-xl font-semibold">Manage Product</h5>
            <button
              type="button"
              className="flex w-fit items-center gap-1 rounded-md bg-green-600 px-3 py-1 text-neutral-5 hover:bg-green-800"
              onClick={() => handleOpen("create", "")}
            >
              <FaPlus size={20} />
              <p>Create Product</p>
            </button>
            <div className="overflow-x-auto">
              <table className="w-full">
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
                  {productData.length > 0 ? (
                    productData.map((product, index) => (
                      <tr
                        key={index}
                        className={`${
                          index % 2 === 0 ? "bg-opacity-20" : "bg-opacity-60"
                        } border-b-2 bg-slate-200`}
                      >
                        <td className="px-2 py-1 text-sm">
                          {getPageValue() > 0
                            ? `${getPageValue()}${index + 1}`
                            : `${index + 1}`}
                        </td>
                        <td className="flex flex-wrap gap-2 px-2 py-1 text-sm lg:min-w-0">
                          {product.image.map((image, index) => (
                            <img
                              key={index}
                              src={image.image}
                              alt="product image"
                              width={500}
                              height={500}
                              className=" h-16 w-16 overflow-hidden rounded-md border border-slate-300 object-cover"
                            />
                          ))}
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
                        <td className="px-2 py-1 text-sm font-bold italic text-alert-red lg:min-w-0">
                          {product.promotion?.discount ? (
                            `${product.promotion?.discount * 100}%`
                          ) : (
                            <p className="font-normal not-italic text-neutral-3 text-opacity-50">
                              null
                            </p>
                          )}
                        </td>
                        <td className="px-2 py-1 text-sm lg:min-w-0">
                          {product.size.length > 0 ? (
                            product.size.map((size, index) => (
                              <React.Fragment key={index}>
                                {size.sizeName}
                                {index < product.size.length - 1 && ", "}
                              </React.Fragment>
                            ))
                          ) : (
                            <p className="text-neutral-3 text-opacity-50">
                              null
                            </p>
                          )}
                        </td>
                        <td className="px-2 py-1 text-sm lg:min-w-0">
                          {product.color.length > 0 ? (
                            product.color.map((color, index) => (
                              <React.Fragment key={index}>
                                {color.colorName}
                                {index < product.color.length - 1 && ", "}
                              </React.Fragment>
                            ))
                          ) : (
                            <p className="text-neutral-3 text-opacity-50">
                              null
                            </p>
                          )}
                        </td>
                        <td className="px-2 py-1 text-sm lg:min-w-0">
                          <button
                            type="button"
                            className="mb-1 mr-1 flex items-center gap-1 rounded-full bg-orange-400 px-3 py-1 text-neutral-5 hover:bg-orange-700"
                            onClick={() => handleOpen("edit", product.id)}
                          >
                            <MdEdit size={20} />
                          </button>
                          <button
                            type="button"
                            className="flex items-center gap-1 rounded-full bg-red-600 px-3 py-1 text-neutral-5 hover:bg-red-800"
                            onClick={() => handleOpen("delete", product.id)}
                          >
                            <RiDeleteBin5Line size={20} />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <td
                      className="h-full border-b-2 bg-slate-200 bg-opacity-20 text-center italic text-neutral-4"
                      colSpan={12}
                    >
                      No Product Found
                    </td>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Section */}
            <div className="mx-auto">
              <Pagination
                onQuery={handleQuery}
                type={"products"}
                nextLink={paginationProduct?.links?.next}
                prevLink={paginationProduct?.links?.prev}
                totalItems={paginationProduct?.total_items}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Material Tailwind */}
      {/* Modal Create */}
      <Dialog
        open={openCreate}
        size={"xl"}
        handler={() => setOpenCreate(!openCreate)}
        className="h-full overflow-auto"
      >
        <DialogHeader className="flex items-center justify-between">
          <h5 className="text-xl font-bold">Create Product</h5>
          <IoMdClose
            size={30}
            className="cursor-pointer"
            onClick={() => setOpenCreate(false)}
          />
        </DialogHeader>
        <DialogBody className="flex flex-col gap-4">
          <form
            className="flex items-start justify-between"
            onKeyDown={handleCreate}
          >
            <div className="flex w-[49%] flex-col gap-4">
              <div className="flex w-full flex-col">
                <p className="text-neutral-1">Product Image</p>
                <div className="flex flex-wrap gap-2">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <AdminManageImage
                      key={index}
                      type={"create"}
                      image={[]}
                      afterSubmit={{
                        categoryId: null,
                        productId: submitProduct?.id,
                      }}
                      completeSubmit={handleSubmitProduct}
                      count={index}
                    />
                  ))}
                </div>
              </div>
              <div className="flex w-full flex-col">
                <label htmlFor="productName" className="text-neutral-1">
                  Product Name
                </label>
                <input
                  type="text"
                  id="productName"
                  name="productName"
                  className="border-1 rounded-2xl border px-4 py-3 text-neutral-2 outline-none"
                  placeholder="Input Product Name"
                  value={inputProduct.productName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex w-full flex-col">
                <label htmlFor="price" className="text-neutral-1">
                  Price
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  className="border-1 rounded-2xl border px-4 py-3 text-neutral-2 outline-none"
                  placeholder="Input Price"
                  value={inputProduct.price}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex w-full flex-col">
                <label htmlFor="description" className="text-neutral-1">
                  Description
                </label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  className="border-1 rounded-2xl border px-4 py-3 text-neutral-2 outline-none"
                  placeholder="Input Description"
                  value={inputProduct.description}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="flex w-[49%] flex-col gap-4">
              <div className="flex w-full flex-col">
                <label htmlFor="stock" className="text-neutral-1">
                  Stock
                </label>
                <input
                  type="number"
                  id="stock"
                  name="stock"
                  className="border-1 rounded-2xl border px-4 py-3 text-neutral-2 outline-none"
                  placeholder="Input Stock"
                  value={inputProduct.stock}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex w-full flex-col">
                <label htmlFor="categoryId" className="text-neutral-1">
                  Category
                </label>
                <select
                  name="categoryId"
                  value={inputProduct.categoryId}
                  onChange={handleInputChange}
                  className="border-1 rounded-2xl border px-4 py-3 text-neutral-2 outline-none"
                >
                  <option selected hidden>
                    {categoryData?.length > 0 ? "Choose Category" : "null"}
                  </option>
                  {categoryData?.map((category, index) => (
                    <option value={category.id} key={index}>
                      {category.categoryName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex w-full flex-col">
                <label htmlFor="promotionId" className="text-neutral-1">
                  Promotion
                </label>
                <select
                  name="promotionId"
                  value={inputProduct.promotionId}
                  onChange={handleInputChange}
                  className="border-1 rounded-2xl border px-4 py-3 text-neutral-2 outline-none"
                >
                  <option selected hidden>
                    {promotionData?.length > 0 ? "Choose Promotion" : "null"}
                  </option>
                  <option value="null">null</option>
                  {promotionData?.map((promotion, index) => (
                    <option value={promotion.id} key={index}>
                      {promotion.discount * 100}%
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </form>

          <div className="flex flex-col gap-3 pt-4">
            <h5 className="text-xl font-bold text-neutral-1">Create Size</h5>
            <div className="grid grid-cols-2 gap-6">
              {Array.from({ length: count.size }).map((_, index) => (
                <AdminManageSize
                  type={"create"}
                  size={[]}
                  submitProduct={submitProduct}
                  completeSubmit={handleSubmitProduct}
                  key={index}
                />
              ))}
            </div>
            <button
              type="button"
              className="mx-auto flex w-fit items-center gap-1 rounded-lg border px-2 py-1 text-neutral-1 hover:bg-slate-100"
              onClick={() =>
                setCount((prevSize) => ({
                  ...prevSize,
                  size: prevSize.size + 1,
                }))
              }
            >
              <FaPlus size={18} />
              Add Create Form Size
            </button>
          </div>

          <div className="flex flex-col gap-3 pt-4">
            <h5 className="text-xl font-bold text-neutral-1">Create Color</h5>
            <div className="grid grid-cols-2 gap-6">
              {Array.from({ length: count.color }).map((_, index) => (
                <AdminManageColor
                  type={"create"}
                  color={[]}
                  submitProduct={submitProduct}
                  completeSubmit={handleSubmitProduct}
                  key={index}
                />
              ))}
            </div>
            <button
              type="button"
              className="mx-auto flex w-fit items-center gap-1 rounded-lg border px-2 py-1 text-neutral-1 hover:bg-slate-100"
              onClick={() =>
                setCount((prevCount) => ({
                  ...prevCount,
                  color: prevCount.color + 1,
                }))
              }
            >
              <FaPlus size={18} />
              Add Create Form Color
            </button>
          </div>
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
        size={"xl"}
        handler={() => setOpenEdit(!openEdit)}
        className="h-full overflow-auto"
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
          <form
            className="flex items-start justify-between"
            onKeyDown={handleEdit}
          >
            <div className="flex w-[49%] flex-col gap-4">
              <div className="flex w-full flex-col">
                <p className="text-neutral-1">Product Image</p>
                <div className="flex flex-wrap gap-2">
                  {products &&
                    products?.image &&
                    products?.image.map((image, index) => (
                      <AdminManageImage
                        key={index}
                        type={"edit"}
                        image={image}
                        afterSubmit={{
                          categoryId: null,
                          productId: submitProduct?.id,
                        }}
                        completeSubmit={handleSubmitProduct}
                        count={index}
                      />
                    ))}

                  {Array.from({ length: 4 - products?.image?.length }).map(
                    (_, index) => (
                      <AdminManageImage
                        key={index}
                        type={"create"}
                        image={[]}
                        afterSubmit={{
                          categoryId: null,
                          productId: submitProduct?.id,
                        }}
                        completeSubmit={handleSubmitProduct}
                        count={index}
                      />
                    ),
                  )}
                </div>
              </div>
              <div className="flex w-full flex-col">
                <label htmlFor="productName" className="text-neutral-1">
                  Product Name
                </label>
                <input
                  type="text"
                  id="productName"
                  name="productName"
                  className="border-1 rounded-2xl border px-4 py-3 text-neutral-2 outline-none"
                  placeholder="Input Product Name"
                  value={inputProduct.productName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex w-full flex-col">
                <label htmlFor="price" className="text-neutral-1">
                  Price
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  className="border-1 rounded-2xl border px-4 py-3 text-neutral-2 outline-none"
                  placeholder="Input Price"
                  value={inputProduct.price}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex w-full flex-col">
                <label htmlFor="description" className="text-neutral-1">
                  Description
                </label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  className="border-1 rounded-2xl border px-4 py-3 text-neutral-2 outline-none"
                  placeholder="Input Description"
                  value={inputProduct.description}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="flex w-[49%] flex-col gap-4">
              <div className="flex w-full flex-col">
                <label htmlFor="stock" className="text-neutral-1">
                  Stock
                </label>
                <input
                  type="number"
                  id="stock"
                  name="stock"
                  className="border-1 rounded-2xl border px-4 py-3 text-neutral-2 outline-none"
                  placeholder="Input Stock"
                  value={inputProduct.stock}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex w-full flex-col">
                <label htmlFor="categoryId" className="text-neutral-1">
                  Category
                </label>
                <select
                  name="categoryId"
                  value={inputProduct.categoryId}
                  onChange={handleInputChange}
                  className="border-1 rounded-2xl border px-4 py-3 text-neutral-2 outline-none"
                >
                  <option selected hidden>
                    {categoryData?.length > 0 ? "Choose Category" : "null"}
                  </option>
                  {categoryData?.map((category, index) => (
                    <option value={category.id} key={index}>
                      {category.categoryName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex w-full flex-col">
                <label htmlFor="promotionId" className="text-neutral-1">
                  Promotion
                </label>
                <select
                  name="promotionId"
                  value={inputProduct.promotionId}
                  onChange={handleInputChange}
                  className="border-1 rounded-2xl border px-4 py-3 text-neutral-2 outline-none"
                >
                  <option selected hidden>
                    {promotionData?.length > 0 ? "Choose Promotion" : "null"}
                  </option>
                  <option value="null">null</option>
                  {promotionData?.map((promotion, index) => (
                    <option value={promotion.id} key={index}>
                      {promotion.discount * 100}%
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </form>

          <div className="flex flex-col gap-3 pt-4">
            <h5 className="text-xl font-bold text-neutral-1">Edit Size</h5>
            <div className="grid grid-cols-2 gap-6">
              {products &&
                products?.size &&
                products?.size.map((size, index) => (
                  <AdminManageSize
                    type={"edit"}
                    size={size}
                    submitProduct={submitProduct}
                    completeSubmit={handleSubmitProduct}
                    key={index}
                  />
                ))}
              {Array.from({ length: count.size }).map((_, index) => (
                <AdminManageSize
                  type={"create"}
                  size={[]}
                  submitProduct={submitProduct}
                  completeSubmit={handleSubmitProduct}
                  key={index}
                />
              ))}
            </div>
            <button
              type="button"
              className="mx-auto flex w-fit items-center gap-1 rounded-lg border px-2 py-1 text-neutral-1 hover:bg-slate-100"
              onClick={() =>
                setCount((prevSize) => ({
                  ...prevSize,
                  size: prevSize.size + 1,
                }))
              }
            >
              <FaPlus size={18} />
              Add Create Form Size
            </button>
          </div>

          <div className="flex flex-col gap-3 pt-4">
            <h5 className="text-xl font-bold text-neutral-1">Edit Color</h5>
            <div className="grid grid-cols-2 gap-6">
              {products &&
                products?.color &&
                products?.color.map((color, index) => (
                  <AdminManageColor
                    type={"edit"}
                    color={color}
                    submitProduct={submitProduct}
                    completeSubmit={handleSubmitProduct}
                    key={index}
                  />
                ))}
              {Array.from({ length: count.color }).map((_, index) => (
                <AdminManageColor
                  type={"create"}
                  color={[]}
                  submitProduct={submitProduct}
                  completeSubmit={handleSubmitProduct}
                  key={index}
                />
              ))}
            </div>
            <button
              type="button"
              className="mx-auto flex w-fit items-center gap-1 rounded-lg border px-2 py-1 text-neutral-1 hover:bg-slate-100"
              onClick={() =>
                setCount((prevCount) => ({
                  ...prevCount,
                  color: prevCount.color + 1,
                }))
              }
            >
              <FaPlus size={18} />
              Add Create Form Color
            </button>
          </div>
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
          <p>Are you sure you want to delete this Product?</p>
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
