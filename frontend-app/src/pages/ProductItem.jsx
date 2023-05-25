import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import AddToCart from "../comp/AddToCart";
import { API_URL } from "../config";

const ProductItem = () => {
  const { productId } = useParams();

  const token = sessionStorage.getItem("token");

  useEffect(() => {
    if (token === null) {
      console.log(" No token, Please login");
      window.location = "/";
    }
  }, [token]);

  const productItemQuery = useQuery(["product", productId], () =>
    fetch(`${API_URL}api/product/${productId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Token ${token}`,
      },
    }).then((res) => res.json())
  );

  if (productItemQuery.isLoading) return <div>Loading...</div>;
  if (productItemQuery.isError)
    return <div>Error... {productItemQuery.error}</div>;
  return (
    <div className="flex h-screen w-full flex-col text-slate-200">
      <div className="fixed right-0 top-0 m-6  cursor-pointer self-center rounded-full  text-slate-200 hover:animate-bounce hover:text-white"></div>
      <h1 className="mb-8 mt-12 text-white ">
        {productItemQuery?.data[0].product_name}
      </h1>
      <div className=" flex  items-center justify-center gap-1  ">
        {productItemQuery?.data.map(
          ({ id, product_name, product_img_url, price, description }) => {
            return (
              <div key={id} data-item={id} className="  ">
                <div className="font-md is-item text-md group flex h-[264px] w-[600px]  rounded-lg  border border-slate-200/20 bg-bkg-2 p-5 ">
                  <img
                    className=" min-w-52 aspect-3/2 max-h-56 max-w-xs rounded-lg object-cover"
                    src={product_img_url}
                    alt={product_name}
                  />
                  <div className="flex flex-col items-start px-10 text-left">
                    <p className="overflow-hidden pb-2 ">{description}</p>

                    <p className="pt-2 font-bold"> &#36;{price} </p>
                    <AddToCart id={id} />
                  </div>
                </div>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
};

export default ProductItem;
