import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import { API_URL } from "../config";

const AddToCart = ({ id }) => {
  const queryClient = useQueryClient();

  const addToCartHandler = async () => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      window.location = "/login";
      throw new Error("No token");
    }

    const addQuery = await fetch(`${API_URL}add-to-cart/${id}/`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Token ${token}`,
      },
    });
    if (!addQuery.ok) throw new Error("Could not add to cart");
    console.log("Added to cart");
    queryClient.invalidateQueries({ queryKey: ["shoppingCart"] });

    const addData = await addQuery.json();
    return addData;
  };

  return (
    <button
      className="mt-5 border border-slate-200/20 bg-black/90 text-slate-200 hover:border-[#747bff] "
      onClick={addToCartHandler}
    >
      Add to cart{" "}
    </button>
  );
};

export default AddToCart;
