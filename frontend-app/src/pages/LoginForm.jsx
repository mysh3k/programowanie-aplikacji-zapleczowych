import React, { useState } from "react";
import { API_URL } from "../config";

export default function LoginForm({ endpoint }) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loginCallback, setLoginCallback] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      username: name,
      password: password,
    };

    try {
      const response = await fetch(`${API_URL}api/${endpoint}/`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error(`Could not Send ${endpoint} data`);

      console.log(response);
      if (endpoint === "register") return (window.location.href = "/login");

      if (endpoint === "login") {
        const data = await response.json();
        sessionStorage.setItem("token", data.token);
        return (window.location.href = "/categories");
      }
    } catch (error) {
      if (!error?.response) {
        setLoginCallback("No Server Response");
        return setPassword("");
      }

      if (error.response?.status === 404)
        return setLoginCallback("404 - Not Found");

      if (endpoint === "login") {
        return setLoginCallback(`
        Couldn't log in, wrong username or password `);
      }
      if (endpoint === "register") {
        return setLoginCallback(`
        Error, couldn't register user`);
      }
      console.log(error.code);
      setPassword("");
      throw new Error(`Could not send ${endpoint} data`);
    }
  };
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <div className="rounded-2xl border border-slate-200/20 bg-bkg-2 py-5 text-slate-300">
        <h1 className="mb-3 text-3xl ">
          {endpoint === "login" ? "Log in" : "Sign up"}
        </h1>
        <form
          className="flex flex-col px-10 text-left  first:pb-2"
          onSubmit={handleSubmit}
        >
          <label for="" className="">
            <p>Name</p>
          </label>
          <input
            type="text"
            id="login_name"
            name="name"
            className="mb-3 rounded-md border border-slate-200/20"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            required
          />
          <label for="login__password">Password</label>
          <input
            type="password"
            id="login__password"
            name="passowrd"
            className="mb-3 rounded-md border border-slate-200/20"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
          />
          {loginCallback && (
            <p className="mb-3 text-red-500">{loginCallback}</p>
          )}
          <button
            type="submit"
            value="Submit"
            className="border-slate-200/20 bg-black/90"
          >
            Send magic link
          </button>
          <span className="mt-3 px-12 text-center">
            {endpoint === "login" ? (
              <>
                Don't have an account?
                <a
                  href="/register"
                  className="delay-250 text-center font-semibold transition ease-in-out"
                >
                  {" "}
                  <span className="block">Sign up</span>
                </a>
                for free
              </>
            ) : (
              <>
                Already have an account?
                <a
                  href="/login"
                  className="delay-250 text-center font-semibold transition ease-in-out"
                >
                  <span className="block"> Log in </span>
                </a>
              </>
            )}
          </span>
        </form>
      </div>
    </div>
  );
}
