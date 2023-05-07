import { useState } from "react";
import useAuthContext from "./useAuthContext";

export default function useSignup() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { key, dispatch } = useAuthContext();

  async function signup(name, password) {
    setIsLoading(true);
    setError(null);

    const response = await fetch("http://localhost:9999/api/user/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, password }),
    });
    const json = await response.json();

    console.log("user:");
    console.log(json);
    console.log("-------------");

    if (response.ok) {
      localStorage.setItem(key, JSON.stringify(json));
      dispatch({ type: "LOGIN", payload: json });
    } else setError(json.error);
    setIsLoading(false);
  }

  return { signup, error, isLoading };
}
