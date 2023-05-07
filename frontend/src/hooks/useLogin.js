import { useState } from "react";
import useAuthContext from "./useAuthContext";

export default function useLogin() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { key, dispatch } = useAuthContext();

  async function login(name, password) {
    setIsLoading(false);
    setError(null);

    const response = await fetch("http://localhost:9999/api/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, password }),
    });
    const json = await response.json();

    if (response.ok) {
      localStorage.setItem(key, JSON.stringify(json));
      dispatch({ type: "LOGIN", payload: json });
    } else setError(json.error);
    setIsLoading(false);
  }

  return { login, error, isLoading };
}
