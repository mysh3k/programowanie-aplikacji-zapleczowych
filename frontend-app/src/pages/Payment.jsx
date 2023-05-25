import { useQuery } from "@tanstack/react-query";
import React from "react";
import { API_URL_2 } from "../config";

const Payment = () => {
  // const param = window.location.get("token");
  const paymentToken = new URLSearchParams(window.location.search);
  const paymentTokenParam = paymentToken.get("token");

  if (!paymentTokenParam) throw new Error("No payment token");
  const paymentQuery = useQuery(["payment"], async () => {
    try {
      console.log(paymentTokenParam);
      const res = await fetch(`${API_URL_2}pay-order/${paymentTokenParam}/`);
      if (!res.ok) throw new Error("Could not recieve payment key");
      const data = await res.json();

      return data;
    } catch (error) {
      throw new Error("Could not recieve payment key");
    }
  });

  const handlePayment = async () => {
    try {
      const res = await fetch(`${API_URL_2}pay-order/${paymentTokenParam}/`, {
        method: "POST",
      });
      if (!res.ok) throw new Error("Could not recieve payment key");
      const data = await res.json();
      if (data[0].done === true) {
        alert("Payment was successful");
      }

      return (window.location.pathname = `/order/${data[0].id}`);
    } catch (error) {
      alert("Payment was unsuccessful");

      throw new Error("Unsuccessful payment");
    }
  };

  if (paymentQuery.isLoading) return <div>Loading...</div>;

  return (
    <div className=" flex h-screen w-full flex-col items-center text-slate-200 ">
      <h1 className="mb-8 mt-12 text-white ">BLIKOMARCH</h1>
      {paymentQuery?.data.map((payment) => {
        return (
          <div key={payment.id}>
            <h3>{payment.price} USD</h3>
            <button
              type="submit"
              className="mt-5 border border-slate-200/20 bg-black/90 text-slate-200 hover:border-[#747bff] "
              onClick={handlePayment}
            >
              Pay Now
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Payment;
