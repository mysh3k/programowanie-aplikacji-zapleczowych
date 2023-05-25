import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config";

const Category = () => {
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    if (token === null) {
      console.log(" No token, Please login");
      window.location.pathname = "/";
    }
  }, [token]);

  const categoryQuery = useQuery(["category"], () =>
    fetch(`${API_URL}api/categories/?format=json`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Token ${token}`,
      },
    }).then((res) => res.json())
  );

  const navigate = useNavigate();

  if (categoryQuery.isLoading) return <div>Loading...</div>;
  if (categoryQuery.isError) return <div>Error... {categoryQuery.error}</div>;
  return (
    <div className=" flex h-screen w-full flex-col items-center text-slate-200 ">
      <h1 className="mb-8 mt-12 text-white ">Categories</h1>
      <div
        className=" mt-6 flex gap-2 rounded-2xl "
        onClick={(e) => navigate(`/categories/${e.target.innerText}`)}
      >
        {categoryQuery?.data.map((category) => {
          return (
            <a
              key={category.id}
              // href="/category/product/me/"
              className="font-md cursor-pointer rounded-md border border-white/10 bg-bkg-2 px-5 py-3 hover:text-white "
            >
              {category.category_name}
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default Category;
