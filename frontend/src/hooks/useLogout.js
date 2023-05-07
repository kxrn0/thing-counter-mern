import useAuthContext from "./useAuthContext";

export default function useLogout() {
  const { key, dispatch } = useAuthContext();

  function log_out() {
    localStorage.removeItem(key);
    dispatch({ type: "LOGOUT" });
  }
  return log_out;
}
