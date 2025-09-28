import React, { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "../styles/styles.css";
import { logoutUserRequest } from "../features/library/librarySlice";
import { DropDown } from "./customComponents/DropDown";

export default function Navbar() {
  const user = useSelector((state) => state.library?.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // use ref and state for click-based dropdown
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

  const handleLogout = () => {
    dispatch(logoutUserRequest());
    setProfileOpen(false);
    navigate("/login");
  };

  // close dropdown when clicking outside
  useEffect(() => {
    function onDocClick(e) {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  const isGuest = user == null || user.role === "guest";
  const isAdmin = !!user && user.role === "admin";

  const handleOpen = (e) => {
    e.stopPropagation();
    setProfileOpen((v) => !v);
  }

  const loc = window.location.href.includes('login') === true;

  return (
    <nav
      className="navbar"
      style={{
        background: loc
          ? ''
          : "linear-gradient(45deg, black, transparent)"
      }}
    >
      <h1>📚 Hexad Library</h1>
      <div className="nav-links">
        <NavLink
          to="/"
          end
          className={({ isActive }) => (isActive ? "active" : "nav-link")}
        >
          Home
        </NavLink>

        {/* Borrowed visible only to authenticated non-guest users */}
        {!isGuest && (
          <NavLink
            to="/borrowed"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Borrowed
          </NavLink>
        )}

        {/* Admin only for admin role */}
        {isAdmin && (
          <NavLink
            to="/admin"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Admin
          </NavLink>
        )}

        {user !== null ? (
          <DropDown
            profileRef={profileRef}
            open={profileOpen}
            handleOpen={handleOpen}
            handleLogout={handleLogout}
            label={'Profile'}
            label2={'Logout'}
            name={user?.name}
          />
        ) : (
          <NavLink
            to="/login"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Login
          </NavLink>
        )}
      </div>
    </nav>
  );
}