import React, { useEffect } from "react";
import axios from "axios";
import InputField from "components/fields/InputField";
// import { FcGoogle } from "react-icons/fc";
import Checkbox from "components/checkbox";
import { baseURL } from "lib/url";
import { notification } from 'antd';

interface Data {
  email: string;
  fristname?: string;
  lastname?: string;
  password: string;
}

export default function SignUp() {

  const [alertError, setAlertError] = React.useState<number>(200);
  const [remember, setRemember] = React.useState<boolean>(false);
  const [dataInput, setDataINput] = React.useState<Data>({
    email: "",
    password: "",
    fristname: "",
    lastname: "",
  });

  const ValidateDataInput = () => {
    if (dataInput.email === '') {
      notification.error({
        message: 'เกิดข้อผิดพลาด',
        description: 'กรุณากรอกอีเมล',
        placement: 'topRight',
        duration: 2,
      });
      return false;
    } else if (dataInput.password === '') {
      notification.error({
        message: 'เกิดข้อผิดพลาด',
        description: 'กรุณากรอกรหัสผ่าน',
        placement: 'topRight',
        duration: 2,
      });
      return false;
    } else if (dataInput.fristname === '') {
      notification.error({
        message: 'เกิดข้อผิดพลาด',
        description: 'กรุณากรอกชื่อ',
        placement: 'topRight',
        duration: 2,
      });
      return false;
    } else if (dataInput.lastname === '') {
      notification.error({
        message: 'เกิดข้อผิดพลาด',
        description: 'กรุณากรอกนามสกุล',
        placement: 'topRight',
        duration: 2,
      });
      return false;
    }
  }


  const handleSubmit = () => {

    if (!ValidateDataInput()) {
      //delete address from dataInput
      const {...data } = dataInput;
      axios.post(`${baseURL}/sign-up`, { ...data, token: "user" })
        .then((response: any) => {
          if (response.data.code === 500) {
            setAlertError(500);
            notification.error({
              message: 'เกิดข้อผิดพลาด',
              description: 'ไม่สามารถสมัครสมาชิกได้',
              placement: 'topRight',
              duration: 2,
            });
          }
          if (response.data.code === 200) {
            notification.success({
              message: 'สำเร็จ',
              description: 'สมัครสมาชิกสำเร็จ',
              placement: 'topRight',
              duration: 2,
            });
            window.location.href = '/auth/sign-in';
            // PostAdders()
          }
        });
    } 
    else {
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
          สมัครสมาชิก
        </h4>
        <p className="mb-9 ml-1 text-base text-gray-600">
          กรุณากรอกข้อมูลเพื่อสมัครสมาชิก
        </p>
        <div className="grid grid-cols-2 gap-5">

          {/* ชื่อ */}
          <div className="cto-InputCommon">
          <InputField
            variant="auth"
            extra="mb-3"
            label="ชื่อ*"
            placeholder="ชื่อ"
            id="fristname"
            type="text"
            value={dataInput.fristname}
            onChange={(e: any) => setDataINput({ ...dataInput, fristname: e.target.value })}
          /></div>

          {/* นามสกุล */}
          <div className="cto-InputCommon">
          <InputField
            variant="auth"
            extra="mb-3"
            label="นามสกุล*"
            placeholder="นามสกุล"
            id="lastname"
            type="text"
            value={dataInput.lastname}
            onChange={(e: any) => setDataINput({ ...dataInput, lastname: e.target.value })}
          /></div>

          {/* Email */}
          <div className="cto-InputCommon">
          <InputField
            variant="auth"
            extra="mb-3"
            label="Email*"
            placeholder="E-mail address"
            id="email"
            type="text"
            value={dataInput.email}
            onChange={(e: any) => setDataINput({ ...dataInput, email: e.target.value })}
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
            value={dataInput.password}
            onChange={(e: any) => setDataINput({ ...dataInput, password: e.target.value })}
          /></div>
          
        </div>
        <button
          className="linear mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
          onClick={e => handleSubmit()}
        >
          สมัครสมาชิก
        </button>

      </div>
    </div>
  );
}
