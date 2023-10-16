import { Routes, Route, Navigate } from "react-router-dom";

import RtlLayout from "layouts/rtl";
import AdminLayout from "layouts/admin";
import AuthLayout from "layouts/auth";
import UserLayout from "layouts/user";
import HomeLayout from "layouts/home";
import { useEffect, useState } from "react";
import { AboutProvider } from "context/aboutContext";

import { Modal } from "antd";

const App = () => {

  useEffect(() => {
    const routepath = window.location.pathname;
    const CheckEmail = localStorage.getItem('email') === null;
    const CheckPassword = localStorage.getItem('password') === null;
    const splitURL = routepath.split('/');
    const pathLogin = splitURL[1] === 'admin' || splitURL[1] === 'users'

    if( pathLogin && CheckEmail && CheckPassword){
      window.location.href = '/';
    }


    //tailwind set dark default theme
    document.body.classList.add("dark");
  }
    , []);

  const user = localStorage.getItem('user');

  //string to json
  // const userJson = {Token: 'Admin'};
  const userJson = JSON.parse(user);
  const CheckEmail = localStorage.getItem('email') === null;
    const CheckPassword = localStorage.getItem('password') === null;

  const DefaultLayout = () => {
    if(userJson?.token === "user" && !CheckEmail){
      console.log('user');
      return <Route path="/" element={<Navigate to="/users" replace />} />
    } else if(userJson?.token === "admin"){
      console.log('admin');
      return <Route path="/" element={<Navigate to="/admin" replace />} />
    }else{
      console.log('home');
      return <Route path="/" element={<Navigate to="/home" replace />} />
    }
  }
  return (
    <AboutProvider>
      <Routes>
        <Route path="auth/*" element={<AuthLayout />} />
        <Route path="admin/*" element={<AdminLayout />} />
        <Route path="users/*" element={<UserLayout />} />
        <Route path="rtl/*" element={<RtlLayout />} />
        <Route path="home/*" element={<HomeLayout />} />
        {DefaultLayout()}
      </Routes>
    </AboutProvider>
  );
};

export default App;