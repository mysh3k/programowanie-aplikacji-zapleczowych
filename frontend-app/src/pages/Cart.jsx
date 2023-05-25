import { useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useShoppingCartData } from "../API/useShoppingCartData";
import { API_URL } from "../config";

const Cart = () => {
  const token = sessionStorage.getItem("token");
  const queryClient = useQueryClient();
  if (token === null) return <div> Please login</div>;

  const shoppingCartQuery = useShoppingCartData();

  const handleShoppingCart = async (endpoint) => {
    if (token === null) return null;
    try {
      const res = await fetch(`${API_URL}${endpoint}/`, {
        headers: {
          Accept: "application/json",

          Authorization: `Token ${token}`,
        },
      });
      if (!res.ok) {
        throw new Error("Something went wrong");
      }
      console.log("After fetch call");
      queryClient.invalidateQueries({ queryKey: ["shoppingCart"] });

      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="mt-12 flex w-full flex-col items-center justify-center text-slate-300">
      <div className="rounded-2xl border border-slate-200/20 bg-bkg-2 p-5  ">
        <h1 className="mb-3 text-3xl ">Cart</h1>
        {shoppingCartQuery.isLoading ? (
          <div>Loading...</div>
        ) : shoppingCartQuery?.data[0].items.length !== 0 ? (
          <button className=" cursor-pointer text-red-500 hover:text-red-700 ">
            <a
              onClick={() => {
                handleShoppingCart(`clear-cart`);
              }}
            >
              Remove all
            </a>
          </button>
        ) : null}
        <section className="max-h-[400px] space-y-4 overflow-y-scroll border-b border-white/20 bg-bkg-2 p-5  px-7  ">
          {shoppingCartQuery.isLoading ? (
            <div>Loading...</div>
          ) : shoppingCartQuery?.data[0].items.length === 0 ? (
            <p>Your cart is empty add some items</p>
          ) : (
            shoppingCartQuery.isSuccess &&
            shoppingCartQuery?.data[0].items.map(
              ({ name, price, img_url, quantity }, index) => {
                return (
                  <div
                    key={index}
                    className=" .is-item  flex flex-col items-center  gap-1 md:grid  md:grid-cols-5  "
                  >
                    <img
                      className="max-h-20 w-20 rounded-md"
                      src={img_url}
                      alt={name}
                    />

                    <p className="font-semibold text-white ">{name}</p>
                    <div className="flex items-center  gap-2">
                      <button
                        disabled={shoppingCartQuery.isFetching}
                        className=" p-2 disabled:cursor-not-allowed disabled:bg-gray-500 disabled:opacity-50  "
                        onClick={() => {
                          handleShoppingCart(
                            `update-quantity/${index}/${(quantity -= 1)}`
                          );
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          className="cursor-pointer transition duration-300 ease-in-out hover:scale-125 hover:text-red-500"
                          fill="currentColor"
                          viewBox="0 0 256 256"
                        >
                          <path d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128Z"></path>
                        </svg>
                      </button>
                      <span className="px-3">{quantity}</span>
                      <button
                        disabled={shoppingCartQuery.isFetching}
                        className=" p-2 disabled:cursor-not-allowed disabled:bg-gray-500 disabled:opacity-50  "
                        onClick={() => {
                          handleShoppingCart(
                            `update-quantity/${index}/${(quantity += 1)}`
                          );
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          className="cursor-pointer  transition duration-300 ease-in-out   hover:scale-125 hover:text-green-500"
                          fill="currentColor"
                          viewBox="0 0 256 256"
                        >
                          <path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z"></path>
                        </svg>
                      </button>
                    </div>
                    <p className=" text-xl font-semibold">&#36;{price}</p>
                    <button
                      className="max-w-fit "
                      onClick={() => {
                        handleShoppingCart(`delete-product/${index}`);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        viewBox="0 0 256 256"
                        className="cursor-pointer transition duration-300 ease-in-out hover:scale-125 hover:text-red-500 "
                      >
                        <path d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z"></path>
                      </svg>
                    </button>
                  </div>
                );
              }
            )
          )}
        </section>
        {token === null ? (
          <div>
            <p className="text-xl">Please login to create an order</p>
          </div>
        ) : shoppingCartQuery.isSuccess ? (
          shoppingCartQuery?.data[0].items.length !== 0 && (
            <div className="mt-4 flex items-center justify-center gap-4 ">
              <span className="text-xl ">Total </span>{" "}
              <span className=" text-2xl font-semibold">
                &#36;
                {shoppingCartQuery?.data[0]?.items
                  .map(({ price, quantity }) => price * quantity)
                  .reduce((a, b) => a + b, 0)}
              </span>
              <CreateOrder />
            </div>
          )
        ) : null}
      </div>
    </div>
  );
};

export default Cart;

export const CreateOrder = () => {
  const queryClient = useQueryClient();

  const handleOrder = async () => {
    const token = sessionStorage.getItem("token");
    if (token === null) return null;
    try {
      const res = await fetch(`http://192.168.15.115:7777/create-order/`, {
        headers: {
          Accept: "application/json",
          authorization: `Token ${token}`,
        },
      });
      if (!res.ok) {
        throw new Error("Something went wrong");
      }
      console.log("After fetch call");
      queryClient.invalidateQueries({ queryKey: ["shoppingCart"] });

      const data = await res.json();
      window.location.href = "/order-success";
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button className=" align-end bg-black/90" onClick={handleOrder}>
      Checkout
    </button>
  );
};
