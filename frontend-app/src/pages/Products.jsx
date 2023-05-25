import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../config";

const Products = () => {
  const { categoryName } = useParams();
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    if (token === null) {
      console.log(" No token, Please login");
      window.location = "/";
    }
  }, [token]);

  const productQuery = useQuery(
    ["category", "categoryName", categoryName],
    () =>
      fetch(`${API_URL}api/category/${categoryName}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Token ${token}`,
        },
      }).then((res) => res.json()),
    {
      refetchOnWindowFocus: false,
      enabled: !!token && !!categoryName,
    }
  );

  const navigate = useNavigate();

  if (productQuery.isLoading) return <div>Loading...</div>;
  if (productQuery.isError) return <div>Error... {productQuery.error}</div>;
  return (
    <div className="flex h-screen w-full flex-col text-slate-200">
      <h1 className="mb-8 mt-12 text-white ">Products</h1>
      <div
        className=" flex  items-center justify-center gap-4  "
        onClick={(e) => {
          navigate(
            `/categories/${categoryName}/${
              e.target.closest(".is-item").dataset.item
            }`
          );
        }}
      >
        {productQuery?.data.map(
          ({ id, product_name, product_img_url, price }) => {
            return (
              <div
                key={id}
                data-item={id}
                className="font-md is-item group flex h-[150px] w-[150px] cursor-pointer flex-col items-center self-center rounded-lg border border-slate-200/20 p-2  hover:text-white"
              >
                <img
                  className=" max-w-24  object-fit h-[88px]  rounded-lg  object-cover "
                  src={product_img_url}
                  alt={product_name}
                />
                <p className="font-bold">&#36;{price}</p>
                <p className="text-md">{product_name}</p>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
};

export default Products;
