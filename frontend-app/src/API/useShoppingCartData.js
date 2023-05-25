import { useQuery } from "@tanstack/react-query";
import { API_URL } from "../config";

export function useShoppingCartData() {
  const token = sessionStorage.getItem("token");

  const shoppingCartQuery = useQuery(
    ["shoppingCart"],
    async () => {
      const res = await fetch(`${API_URL}shopping-cart/`, {
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
      return data;
    },
    { enabled: token !== null }
  );

  return shoppingCartQuery;
}
