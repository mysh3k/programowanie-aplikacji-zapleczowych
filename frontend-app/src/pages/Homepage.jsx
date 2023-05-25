import React, { useEffect } from "react";
import Login from "./Login";
import Header from "../comp/Header";

const Homepage = () => {
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    if (!token === null) {
      // console.log(token);
      window.location.pathname = "/categories";
    }
  }, [token]);

  return (
    <div className="flex h-screen w-full flex-col">
      <Header />
      <div className="flex flex-col items-center justify-center ">
        <h1>Welcome to our store</h1>
      </div>
    </div>
  );
};

export default Homepage;
