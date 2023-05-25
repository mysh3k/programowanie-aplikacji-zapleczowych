import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { API_URL } from "../config";

const Orders = () => {
  const token = sessionStorage.getItem("token");

  if (token === null) return <div> Please login</div>;

  const ordersQuery = useQuery(["orders"], async () => {
    const res = await fetch(`${API_URL}show-orders/`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Token ${token}`,
      },
    });
    if (!res.ok) {
      throw new Error("Something went wrong");
    }
    const data = await res.json();
    console.log(data);
    return data;
  });
  console.log(ordersQuery.data);

  if (ordersQuery.isLoading) return <div>Loading...</div>;
  if (ordersQuery.isError) return <div>Error... {ordersQuery.error}</div>;
  return (
    <div className="mt-12 flex w-full flex-col items-center justify-center text-slate-300">
      <div className="max-w-md   ">
        <h1 className="mb-8 mt-12 text-white ">Orders</h1>

        {ordersQuery.isLoading ? (
          <div>Loading...</div>
        ) : ordersQuery.isSuccess ? (
          ordersQuery?.data.map(
            ({ id, done, items, payment_url, total_price, user }) => {
              return (
                <div
                  key={id}
                  className="mt-2 flex flex-col rounded-2xl border   border-slate-200/20 bg-bkg-2 p-5"
                >
                  <div className="flex items-center gap-2">
                    <a
                      className="cursor-pointer text-accent-1"
                      href={`/order/${id}`}
                    >
                      <span className="font-bold"> Order ID </span>

                      {id}
                    </a>

                    {!done ? (
                      <>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="10"
                          height="10"
                          fill="currentColor"
                          viewBox="0 0 256 256"
                        >
                          <path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z"></path>
                        </svg>

                        <span className="mr-auto text-xs">Click here pay</span>
                      </>
                    ) : (
                      <div className="flex-1"></div>
                    )}
                    <div>
                      <span
                        className={`font-bold ${
                          done ? "text-accent-1" : "text-red-500"
                        } `}
                      >
                        {done ? "Paid" : "Not Paid"}
                      </span>
                    </div>
                  </div>
                  <div className=" flex flex-col text-base ">
                    <div className="flex justify-between">
                      <div className="mt-2">
                        <span className="flex gap-2  text-sm">
                          {" "}
                          Total Price
                        </span>
                        <div className="flex gap-2 font-semibold text-white">
                          <span>{total_price} USD</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-2">
                      <span className="flex gap-2  text-sm">Items</span>
                      <div className="flex flex-row flex-wrap gap-2 font-semibold text-white">
                        {items.map((item) => {
                          return (
                            <span key={item.id}>
                              {item.quantity}
                              <span className="text-xs">x</span> {item.name} |
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
          )
        ) : (
          <div>No orders could be fetched</div>
        )}
      </div>
    </div>
  );
};

export default Orders;
