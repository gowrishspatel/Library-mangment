import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionFailure, loginUserRequest } from "../features/library/librarySlice";
import { useNavigate } from "react-router-dom";
import Auth from "../auth/Auth";
import CustomInput from "../components/customComponents/CustomInput";
import { RootState } from "../app/store";

interface LoginState {
  email: string;
  password: string;
  showPassword: boolean;
  role: string;
}

export default function Login() {
  const user = useSelector((state: RootState) => state.library.user)
  const dispatch = useDispatch();
  const nav = useNavigate();
  
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [role, setRole] = useState<string>("");
  const [showLogin, showLoginForm] = useState<boolean>(false);

  useEffect(() => {
    if (user) nav("/");
  }, [user, nav]);

  // Basic email validation function
  const isValidEmail = (email: string) => {
    // simple regex for email check
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      dispatch(actionFailure({msg: "Please enter email and password", type: "error"}));
      return;
    }

    if (!isValidEmail(email)) {
      dispatch(actionFailure({msg: "Please enter a valid email address", type: "error"}));
      return;
    }
    dispatch(loginUserRequest({ email, password, role }));
  };

  const onChangeRole = (e: ChangeEvent<HTMLInputElement>) => {
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
              onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="login-input"
            />
            <CustomInput
              label="Password:"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              showPasswordToggle
              className="login-input"
              onTogglePassword={(e: ChangeEvent<HTMLInputElement>) => setShowPassword(e.target.checked)}
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
