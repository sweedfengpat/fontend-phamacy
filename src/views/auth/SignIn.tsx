import React, { useEffect } from "react";
import InputField from "components/fields/InputField";
// import { FcGoogle } from "react-icons/fc";
import Checkbox from "components/checkbox";
import { baseURL } from "lib/url";
import {  notification } from 'antd';
import axios from "axios";

interface Data {
  email: string;
  password: string;
}

export default function SignIn() {

  const [alertError, setAlertError] = React.useState<number>(200);
  const [remember, setRemember] = React.useState<boolean>(false);
  const [dataInput, setDataINput] = React.useState<Data>({
    email: "",
    password: "",
  });

  useEffect(() => {
    if(localStorage.getItem !== null){
      let hash_email = localStorage.getItem("email");
      let hash_password = localStorage.getItem("password");
      let email = atob(hash_email);
      let password = atob(hash_password);
      if (hash_email && hash_password){
      setDataINput({email: email, password: password})
      setRemember(true);
      }
     
    }
  }, []);

  const handleSubmit = () => {

      if (dataInput.email !== '' && dataInput.password !== ''){
        axios.post(`${baseURL}/sign-in`, dataInput)
        .then((response: any) => {
          console.log(response.data)
          if (response.data.code === 500){
            setAlertError(500);
            notification.error({
              message: 'เกิดข้อผิดพลาด',
              description: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง',
              placement: 'topRight',
              duration: 2,
            });
          } else {
            localStorage.setItem("user", JSON.stringify(response.data));
            let e :any = response.data.email
            let p :any = response.data.password
            let hash_email = btoa(e);
            let hash_password = btoa(p);
            localStorage.setItem("email", hash_email);
            localStorage.setItem("password", hash_password);
            window.location.href = '/';
          }
        });
      } else {
        setAlertError(500);
        notification.error({
          message: 'เกิดข้อผิดพลาด',
          description: 'กรุณากรอกข้อมูลให้ครบถ้วน',
          placement: 'topRight',
          duration: 2,
        });
      }
  };


  return (
    <div className="mt-16 mb-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
      {/* Sign in section */}
      <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
        <h4 className="mb-2.5 text-4xl font-bold text-white dark:text-white">
          เข้าสู่ระบบ
        </h4>
        <p className="mb-9 ml-1 text-base text-gray-600">
          กรุณากรอกข้อมูลเพื่อเข้าสู่ระบบ
        </p>
        {/* Email */}
        <div className="cto-InputCommon">
        <InputField
          variant="auth"
          extra="mb-3"
          label="Email*"
          placeholder="E-mail address"
          id="email"
          type="text"
          value = {dataInput.email}
          onChange={(e:any) => setDataINput({ ...dataInput, email: e.target.value })}
        /></div>

        {/* Password */}
        <div className="cto-InputCommon">
        <InputField
          variant="auth"
          extra="mb-3"
          label="Password*"
          placeholder="Password"
          id="password"
          type="password"
          value = {dataInput.password}
          onChange={(e:any) => setDataINput({ ...dataInput, password: e.target.value })}
        /></div>
        
        {/* Checkbox */}
        <div className="mb-4 flex items-center justify-between px-2">
          <div className="flex items-center">
            <Checkbox function={() =>{
              setRemember(!remember);
            }}
            value={remember}
            />
            <p className="ml-2 text-sm font-medium text-white dark:text-white">
              จดจำฉันไว้
            </p>
          </div>
          <a
            className="text-sm font-medium text-white hover:text-brand-600 dark:text-white"
            onClick={() => window.location.href = '/auth/forgot'}
          >
            ลืมรหัสผ่าน?
          </a>
        </div>
        <button 
        className="linear mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
        onClick={(e) => handleSubmit()}
        >
         ลงชื่อเข้าใช้
        </button>
        <div className="mt-4">
          <span className=" text-sm font-medium text-white dark:text-gray-600">
            ยังไม่มีบัญชีใช่ไหม
          </span>
          <a
            onClick={() => window.location.href = '/auth/sign-up'}
            className="ml-1 text-sm font-medium text-white hover:text-brand-600 dark:text-white"
          >
            สมัครสมาชิก
          </a>
        </div>
      </div>
    </div>
  );
}
