import React, { useReducer } from "react";
import { API_URL, API_URL_2 } from "../config";
import { useNavigate, useParams } from "react-router-dom";

const PayButton = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const paymentHandler = async () => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      window.location = "/login";
      throw new Error("No token");
    }

    const payQuery = await fetch(`${API_URL}pay-order/${orderId}/`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Token ${token}`,
      },
    });
    console.log(payQuery);
    if (!payQuery.ok) throw new Error("Could not pay for order");

    const payData = await payQuery.json();

    return navigate(`/payment?token=${payData[0].token}`);
  };

  return (
    <button
      className=" border border-slate-200/20 bg-black/90 text-slate-200 hover:border-[#747bff] "
      onClick={paymentHandler}
    >
      Pay for this order
    </button>
  );
};

export default PayButton;
