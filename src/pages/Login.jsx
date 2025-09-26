import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionFailure, loginUser } from "../features/library/librarySlice";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const {user} = useSelector((state) => state.library);
  const [role, setRole] = useState("user");
  const dispatch = useDispatch();
  const nav = useNavigate();

  useEffect(() => {
    if (user) nav("/");
  },[user, nav]);

  // Basic email validation function
  const isValidEmail = (email) => {
    // simple regex for email check
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      dispatch(actionFailure("Please enter email and password"));
      return;
    }

    if (!isValidEmail(email)) {
      dispatch(actionFailure("Please enter a valid email address"));
      return;
    }
    dispatch(loginUser({ email, password, role}));
  };

  return (
    <div className="page" style={{ maxWidth: "400px", margin: "50px auto" }}>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: "15px" }}>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Password:</label>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
          <div style={{ marginTop: "5px" }}>
            <label>
              <input
                type="checkbox"
                checked={showPassword}
                onChange={(e) => setShowPassword(e.target.checked)}
              />
              Show Password
            </label>
          </div>
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Select Role:</label>
          <div style={{ marginTop: "5px" }}>
            <label>
              <input
                type="radio"
                value="user"
                checked={role === "user"}
                onChange={(e) => setRole(e.target.value)}
              />
              User
            </label>
            <label style={{ marginLeft: "15px" }}>
              <input
                type="radio"
                value="admin"
                checked={role === "admin"}
                onChange={(e) => setRole(e.target.value)}
              />
              Admin
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="btn"
          style={{ padding: "10px 20px" }}
        >
          Login as {role}
        </button>
      </form>
    </div>
  );
}
