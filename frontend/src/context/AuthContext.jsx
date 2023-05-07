import { createContext, useEffect, useReducer } from "react";

export const AuthContext = createContext();

export function auth_reducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
}

export function AuthContextProvider({ children }) {
  const [state, dispatch] = useReducer(auth_reducer, { user: null });
  const key = "_user_key_";

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem(key));

    if (user) dispatch({ type: "LOGIN", payload: user });
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, key, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}
