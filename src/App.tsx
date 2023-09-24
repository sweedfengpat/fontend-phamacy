import { Routes, Route, Navigate } from "react-router-dom";

import RtlLayout from "layouts/rtl";
import AdminLayout from "layouts/admin";
import AuthLayout from "layouts/auth";
import UserLayout from "layouts/user";
import { useEffect, useState } from "react";

const App = () => {

  useEffect(() => {
    const protocol = window.location.protocol;
    const host = window.location.host;
    const CheckURL = window.location.href === `${protocol}//${host}/auth/sign-in` || window.location.href === `${protocol}//${host}/auth/sign-up`;
    const CheckEmail = localStorage.getItem('email') === null;
    const CheckPassword = localStorage.getItem('password') === null;
   
    if(CheckEmail && CheckPassword && !CheckURL){
      window.location.href = '/auth/sign-in';
    }
    //tailwind set dark default theme
    document.body.classList.add("dark");
  }
  , []);

  const user = localStorage.getItem('user');
 
  //string to json
    // const userJson = {Token: 'Admin'};
   const userJson = JSON.parse(user);
   

  const DefaultLayout = userJson?.Token === "user" ? <Route path="/" element={<Navigate to="/users" replace />} /> : <Route path="/" element={<Navigate to="/admin" replace />} />;  
  return (
    <Routes>
      <Route path="auth/*" element={<AuthLayout />} />
      <Route path="admin/*" element={<AdminLayout />} />
      <Route path="users/*" element={<UserLayout />} />
      <Route path="rtl/*" element={<RtlLayout />} />
      {DefaultLayout}
    </Routes>
  );
};

export default App;