import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionFailure, loginUserRequest } from "../features/library/librarySlice";
import { useNavigate } from "react-router-dom";
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
      dispatch(actionFailure({msg: "Please enter email and password", Type: "error"}));
      return;
    }

    if (!isValidEmail(email)) {
      dispatch(actionFailure({msg: "Please enter a valid email address", type: "error"}));
      return;
    }
    dispatch(loginUserRequest({ email, password, role }));
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
          <CustomInput
            label="User"
            type="radio"
            value="user"
            checked={role === "user"}
            onChange={onChangeRole}
            name="role"
          />
          <CustomInput
            label="Admin"
            type="radio"
            value="admin"
            checked={role === "admin"}
            onChange={onChangeRole}
            name="role"
          />
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
              className="login-input"
            />
            <CustomInput
              label="Password:"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              showPasswordToggle
              className="login-input"
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
