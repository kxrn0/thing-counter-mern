import { Link } from "react-router-dom";
import SCLogin from "./Login.styled";
import useLogin from "../../hooks/useLogin";

export default function Login() {
  const { login, error, isLoading } = useLogin();

  async function handle_login(event) {
    event.preventDefault();

    const name = event.target["user-name"].value;
    const password = event.target["user-password"].value;

    console.log(`name: ${name}, password: ${password}`);
    await login(name, password);
  }

  return (
    <SCLogin onSubmit={handle_login}>
      <h1>Log In</h1>
      <label htmlFor="user-name">
        <span>Name</span>
        <input type="text" id="user-name" />
      </label>
      <label htmlFor="user-password">
        <span>Password</span>
        <input type="password" id="user-password" />
      </label>
      <Link to="/signup">Sign up instead</Link>
      <button disabled={isLoading}>Submit</button>
      {error && <p className="error">ERROR: {error}</p>}
    </SCLogin>
  );
}
