import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionFailure, loginUser } from "../features/library/librarySlice";
import { useNavigate } from "react-router-dom";
import bgImage from "../images/library.jpg";
import Auth from "../auth/Auth";
import CustomInput from "../components/customComponents/CustomInput";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { user } = useSelector((state) => state.library);
  const [role, setRole] = useState("");
  const dispatch = useDispatch();
  const nav = useNavigate();
  const [showLogin, showLoginForm] = useState(false);

  useEffect(() => {
    if (user) nav("/");
  }, [user, nav]);

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
    dispatch(loginUser({ email, password, role }));
  };

  const onChangeRole = (e) => {
    setRole(e.target.value);
    showLoginForm(true);
  }

  return (
    <div className="login">
      <div className="login-page">
        <div style={{ textAlign: "center" }}>
          <h1>Login</h1>
        </div>
        <div className="role-selection">
          <h4>Select Role:</h4>
          <label>
            <input
              type="radio"
              value="user"
              className="role-radio"
              checked={role === "user"}
              onChange={onChangeRole}
            />
            User
          </label>
          <label style={{ marginLeft: "15px" }}>
            <input
              type="radio"
              value="admin"
              className="role-radio"
              checked={role === "admin"}
              onChange={onChangeRole}
            />
            Admin
          </label>
        </div>

        {showLogin && <>
          <form onSubmit={handleLogin}>
            <CustomInput
              label="Email:"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
            <CustomInput
              label="Password:"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              showPasswordToggle
              onTogglePassword={(e) => setShowPassword(e.target.checked)}
            />

            <div className='role-login-section'>
              <button type="submit" className="btn-submit">
                Login as {role}
              </button>
            </div>
          </form>

          <div style={{ textAlign: "center", margin: "20px 0", color: "#555" }}>
            <p>OR Login with</p>
          </div>

          <Auth role={role} />
        </>}
      </div>
    </div>
  );
}
