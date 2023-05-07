import { Link } from "react-router-dom";
import SCSignup from "./Signup.styled";
import useSignup from "../../hooks/useSignup";

export default function Signup() {
  const { signup, error, isLoading } = useSignup();

  async function handle_signup(event) {
    event.preventDefault();

    const name = event.target["user-name"].value;
    const password = event.target["user-password"].value;

    await signup(name, password);
  }

  return (
    <SCSignup onSubmit={handle_signup}>
      <h1>Sign Up</h1>
      <label htmlFor="user-name">
        <span>Name</span>
        <input type="text" id="user-name" />
      </label>
      <label htmlFor="user-password">
        <span>Password</span>
        <input type="password" id="user-password" />
      </label>
      <Link to="/login">Log in instead</Link>
      <button disabled={isLoading}>Submit</button>
      {error && <p className="error">{error}</p>}
    </SCSignup>
  );
}
