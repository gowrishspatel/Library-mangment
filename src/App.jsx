import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import AccessWrapper from "./components/customComponents/AccessWrapper";
import "./styles/styles.css";
import ErrorToast from "./components/customComponents/CustomMessageBar";
import { useSelector } from "react-redux";

const Home = lazy(() => import("./pages/Home"));
const Borrowed = lazy(() => import("./pages/Borrowed"));
const Admin = lazy(() => import("./pages/Admin"));
const Login = lazy(() => import("./pages/Login"));

const routes = [
  { path: "/login", element: Login, isPublic: true },
  { path: "/", element: Home, allowGuest: true , isPublic: true}, // guests can view home in readOnly
  { path: "/borrowed", element: Borrowed, roles: ["user", "admin"] }, // both user and admin allowed
  { path: "/admin", element: Admin, roles: ["admin"] },
];

export function App() {
  const {user} = useSelector((state) => state.library); // to re-render on auth state change
  
  return (
    <BrowserRouter>
      <Navbar />
      <Suspense fallback={<div className="page">Loading...</div>}>
        <Routes>
          {routes.map(({ path, element: PageComponent, isPublic, allowGuest, roles }, idx) => {
            if (isPublic) {
              return <Route key={idx} path={path} element={<PageComponent />} />;
            }
            // for protected or guest-allowed routes use AccessWrapper
            return (
              <Route
                key={idx}
                path={path}
                element={<AccessWrapper Component={PageComponent} roles={roles} allowGuest={!!allowGuest} />}
              />
            );
          })}
        </Routes>
      </Suspense>
      <ErrorToast /> 
    </BrowserRouter>
  );
}

export default App;