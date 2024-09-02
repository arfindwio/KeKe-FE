import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";

// Redux Actions
import {
  getAllCartsByAuthAction,
  putEditCartByIdAction,
  deleteCartByIdAction,
} from "../../../redux/action/carts/CartsAction";

// Components
import { CartCardSkeleton } from "../skeleton/CartCardSkeleton";

// Icons
import { RiDeleteBinLine } from "react-icons/ri";

export const CartCard = ({ cart }) => {
  const dispatch = useDispatch();

  const [isFocused, setIsFocused] = useState(false);
  const prevQuantityRef = useRef(cart.quantity);
  const prevCartIdRef = useRef(cart.id);
  const [inputCart, setInputCart] = useState({
    quantity: cart.quantity,
    note: cart.note || "",
  });
  const filterTimeoutRef = useRef(null);

  const loadingCart = useSelector((state) => state.carts.loading);

  const minWidth370 = useMediaQuery({ minDeviceWidth: 719 });
  const maxWidth1090 = useMediaQuery({ maxDeviceWidth: 1090 });

  useEffect(() => {
    if (
      inputCart.quantity !== prevQuantityRef.current ||
      cart.id !== prevCartIdRef.current
    ) {
      const handleSave = async () => {
        const editCart = await dispatch(
          putEditCartByIdAction(
            {
              quantity: inputCart.quantity,
              note: inputCart.note,
            },
            cart.id,
          ),
        );
        if (editCart) {
          await dispatch(getAllCartsByAuthAction());
        }
      };
      filterTimeoutRef.current = setTimeout(async () => {
        handleSave();
        prevQuantityRef.current = inputCart.quantity;
        prevCartIdRef.current = cart.id;
      }, 2000);
    }
  }, [inputCart.quantity, cart.id]);

  const handleSaveNote = async () => {
    const editCart = await dispatch(putEditCartByIdAction(inputCart, cart.id));

    if (editCart) {
      await dispatch(getAllCartsByAuthAction());
    }
  };

  const handleButtonInput = (type) => {
    if (type === "decrease" && inputCart.quantity > 1) {
      setInputCart((prevInputCart) => ({
        ...prevInputCart,
        quantity: Math.max(1, prevInputCart.quantity - 1),
      }));
    } else if (type === "increase" && inputCart.quantity < cart.product.stock) {
      setInputCart((prevInputCart) => ({
        ...prevInputCart,
        quantity: prevInputCart.quantity + 1,
      }));
    }
  };

  const handleCartInput = (e, field) => {
    const value = e.target.value;

    if (field === "quantity") {
      if (parseInt(value) < 1) {
        setInputCart((prevInputCart) => ({
          ...prevInputCart,
          quantity: 1,
        }));
      } else if (parseInt(value) > cart.product.stock) {
        setInputCart((prevInputCart) => ({
          ...prevInputCart,
          quantity: cart.product.stock,
        }));
      } else {
        setInputCart((prevInputCart) => ({
          ...prevInputCart,
          quantity: parseInt(value),
        }));
      }
    } else {
      setInputCart((prevInputCart) => ({
        ...prevInputCart,
        [field]: value,
      }));
    }
  };

  const handleDeleteCart = async () => {
    const deleteCart = await dispatch(deleteCartByIdAction(cart.id));

    if (deleteCart) {
      await dispatch(getAllCartsByAuthAction());
    }
  };

  const handleNoteSubmit = (e) => {
    if (e.key === "Enter" || e.type === "click") {
      e.preventDefault();
      handleSaveNote();
    }
  };

  return (
    <>
      {loadingCart ? (
        <CartCardSkeleton />
      ) : (
        <>
          {/* <div className={`${!minWidth370 && "pr-[30%]"} flex w-full`}> */}
          <div className={`flex w-full`}>
            {/* <div className="flex h-20 min-h-[5rem] w-20 min-w-[5rem] rounded-md border border-neutral-4 shadow-sm sm:h-24 sm:min-h-[6rem] sm:w-24 sm:min-w-[6rem]"> */}
            <img
              src={cart.product?.image[0]?.image}
              alt="Product"
              className="aspect-square h-fit w-[30%] border border-neutral-4 object-contain sm:w-[20%] lg:w-[15%]"
            />
            {/* </div> */}
            {/* <div
              className={`${!minWidth370 && "pr-3"} ${
                maxWidth1090 && "lg:pr-[20%] xl:pr-0"
              }  flex w-full flex-col gap-1 pl-2 sm:gap-0 lg:flex-row`}
            > */}
            <div
              className={`flex w-[70%] flex-col gap-1 pl-2 sm:w-[80%] sm:gap-0 lg:w-[85%] lg:flex-row`}
            >
              <div className="flex w-full flex-col lg:w-[65%] xl:w-[75%]">
                <h5 className="lg:text-md truncate text-sm font-semibold sm:text-xl xl:text-xl">
                  {cart.product.productName}
                </h5>
                <div className="flex flex-col md:block lg:hidden ">
                  <h5 className="text-sm font-bold sm:text-lg">
                    IDR {cart.product.price.toLocaleString()}
                  </h5>
                  {cart.product.promotion && (
                    <h5 className="text-xs font-bold text-neutral-3 line-through sm:text-sm">
                      IDR{" "}
                      {Math.floor(
                        cart.product.price /
                          (1 - cart.product.promotion.discount),
                      ).toLocaleString()}
                    </h5>
                  )}
                </div>
                <div className="flex flex-wrap gap-1">
                  <p className="w-fit rounded-sm bg-neutral-4 px-1 text-xs font-light text-neutral-5">
                    {cart.color?.colorName}
                  </p>
                  <p className="w-fit rounded-sm bg-neutral-4 px-1 text-xs font-light text-neutral-5">
                    {cart.size?.sizeName}
                  </p>
                </div>
                <p className="w-fit text-xs font-light text-neutral-4 sm:hidden">
                  Stock {cart.product.stock}
                </p>
              </div>
              <div className="flex h-full w-full flex-col items-end justify-end lg:w-[35%] lg:items-center lg:justify-center xl:w-[25%]">
                <div className="hidden pl-[20%] text-center md:hidden lg:flex lg:flex-col lg:flex-nowrap">
                  <h5 className="text-lg font-bold">
                    IDR {cart.product.price.toLocaleString()}
                  </h5>
                  {cart.product.promotion && (
                    <h5 className="text-sm font-bold text-neutral-3 line-through">
                      IDR{" "}
                      {Math.floor(
                        cart.product.price /
                          (1 - cart.product.promotion.discount),
                      ).toLocaleString()}
                    </h5>
                  )}
                </div>
                <p className="hidden text-center text-xs font-light text-neutral-4 sm:block sm:w-[53%] md:w-[43%] lg:hidden">
                  Stock {cart.product.stock}
                </p>
                <div className="flex w-full items-end justify-end gap-[2px] sm:gap-2 lg:items-center lg:justify-center">
                  <RiDeleteBinLine
                    size={25}
                    className="mr-2 scale-90 cursor-pointer text-neutral-2 opacity-70 sm:mr-0 sm:scale-100"
                    onClick={() => handleDeleteCart()}
                  />
                  <button
                    className={`${
                      inputCart.quantity > 1
                        ? "border-neutral-3 hover:bg-neutral-2 hover:text-neutral-5"
                        : "border-neutral-4 text-neutral-4"
                    } rounded-l-full border bg-neutral-5 px-2 py-[1px] text-base font-bold sm:px-3`}
                    onClick={() => handleButtonInput("decrease")}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={inputCart.quantity}
                    className="h-full w-[15%] border border-neutral-3 bg-neutral-5 text-center focus:border-2 focus:border-neutral-2 focus:outline-none sm:w-[25%]"
                    onChange={(e) => handleCartInput(e, "quantity")}
                    onWheel={(e) => e.target.blur()}
                  />
                  <button
                    className={`${
                      inputCart.quantity < cart.product.stock
                        ? "border-neutral-3 hover:bg-neutral-2 hover:text-neutral-5"
                        : "border-neutral-4 text-neutral-4"
                    } rounded-r-full border bg-neutral-5 px-2 py-[1px] text-base font-bold sm:px-3`}
                    onClick={() => handleButtonInput("increase")}
                  >
                    +
                  </button>
                </div>
                <p className="ms-auto hidden w-[83%] text-center text-xs font-light text-neutral-4 lg:block">
                  Stock {cart.product.stock}
                </p>
              </div>
            </div>
          </div>
          <form className="flex w-full flex-col" onKeyDown={handleNoteSubmit}>
            <label htmlFor="note" className="text-sm">
              Note
            </label>
            <div className="relative flex w-full">
              <input
                type="text"
                id="note"
                value={inputCart.note}
                onChange={(e) => handleCartInput(e, "note")}
                onMouseEnter={() => setIsFocused(true)}
                onMouseLeave={() => setIsFocused(false)}
                autoComplete="off"
                className={`${
                  isFocused && "pr-16"
                } w-full border-b-2 pb-2 text-xs font-light text-neutral-3 focus:border-neutral-2 focus:outline-none sm:text-sm`}
              />
              {isFocused && (
                <button
                  type="button"
                  className="absolute right-0 rounded-md border-2 border-neutral-1 bg-neutral-5 px-2 py-[1px] text-sm hover:bg-neutral-1 hover:text-neutral-5"
                  onClick={handleNoteSubmit}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  onMouseEnter={() => setIsFocused(true)}
                  onMouseLeave={() => setIsFocused(false)}
                >
                  Save
                </button>
              )}
            </div>
          </form>
        </>
      )}
    </>
  );
};
