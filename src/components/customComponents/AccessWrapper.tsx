import { RootState } from "../../app/store";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

interface accessWrapperProps{
Component: React.ComponentType;
roles?: String[];
allowGuest: boolean;
}

export default function AccessWrapper(props: accessWrapperProps) {
  const { Component, roles = [], allowGuest = false } = props;
  const { user } = useSelector((state: RootState) => state.library);

  // Not logged in
  if (!user) {
    return allowGuest ? <Component /> : <Navigate to="/login" replace />;
  }

  // Admin has full access
  if (user.role === "admin") {
    return <Component />;
  }

  // User role: check if allowed
  if (roles.includes(user.role)) {
    return <Component />;
  }

  // User role not allowed → redirect to home
  return <Navigate to="/" replace />;
}
