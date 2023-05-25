import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
import PayButton from "../comp/PayButton";

const Order = () => {
  const token = sessionStorage.getItem("token");

  if (token === null) return <div> Please login</div>;
  const { orderId } = useParams();
  const orderQuery = useQuery(["orders"], async () => {
    const res = await fetch(
      `http://192.168.15.115:7777/show-order/${orderId}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Token ${token}`,
        },
      }
    );
    if (!res.ok) {
      throw new Error("Something went wrong");
    }
    const data = await res.json();
    return data;
  });

  if (orderQuery.isLoading) return <div>Loading...</div>;
  if (orderQuery.isError) return <div>Error... {orderQuery.error}</div>;
  return (
    <div className="mt-12 flex w-full flex-col items-center justify-center text-white/80">
      <div className="rounded-2xl border border-slate-200/20 bg-bkg-2 p-5  ">
        <h1 className="mb-3 text-3xl ">Order {orderId}</h1>
        {orderQuery.isLoading ? (
          <div>Loading...</div>
        ) : orderQuery.isSuccess ? (
          orderQuery?.data.map(
            ({ id, done, items, payment_url, total_price, user }, index) => {
              return (
                <div key={index} className="flex flex-col">
                  <div className="mb-5 flex flex-col  border-b border-white/20 pb-2 text-base ">
                    <div className="mt-2">
                      <span className="flex gap-2  text-sm"> Total Price</span>
                      <div className="flex gap-2 font-semibold text-white">
                        <span>{total_price} USD</span>
                      </div>
                    </div>
                    <div className="mt-2">
                      <span className="flex gap-2  text-sm">Items</span>
                      <div className="flex gap-2 font-semibold text-white">
                        {items.map((item) => {
                          return (
                            <span key={item.id}>
                              {item.quantity}x {item.name} |
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  {done ? (
                    <p
                      className={`font-semibold ${
                        done ? "text-accent-1" : "text-red-500"
                      } `}
                    >
                      Paid
                    </p>
                  ) : (
                    <PayButton />
                  )}
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

export default Order;
