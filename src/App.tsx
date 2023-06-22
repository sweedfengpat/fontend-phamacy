import { Routes, Route, Navigate } from "react-router-dom";

import RtlLayout from "layouts/rtl";
import AdminLayout from "layouts/admin";
import AuthLayout from "layouts/auth";
import { useEffect } from "react";

const App = () => {

  useEffect(() => {
    const protocol = window.location.protocol;
    const host = window.location.host;
    console.log(protocol ,host);
    if(localStorage.getItem('email') === null && localStorage.getItem('password') === null && window.location.href !== `${protocol}//${host}/auth/sign-in`){
      window.location.href = '/auth/sign-in';
    }
    //tailwind set dark default theme
    document.body.classList.add("dark");
  }
  , []);
  return (
    <Routes>
      <Route path="auth/*" element={<AuthLayout />} />
      <Route path="admin/*" element={<AdminLayout />} />
      <Route path="rtl/*" element={<RtlLayout />} />
      <Route path="/" element={<Navigate to="/admin" replace />} />
    </Routes>
  );
};

export default App;
