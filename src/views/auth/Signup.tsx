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
  tel: string;
  password: string;
  personal_id: string;
  address: string;
  brithday: string;
  gender?: string;
}

export default function SignUp() {

  const [alertError, setAlertError] = React.useState<number>(200);
  const [remember, setRemember] = React.useState<boolean>(false);
  const [dataInput, setDataINput] = React.useState<Data>({
    email: "",
    password: "",
    fristname: "",
    lastname: "",
    tel: "",
    personal_id: "",
    address: "",
    brithday: "",
    gender: "male",
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
    } else if (dataInput.tel === '') {
      notification.error({
        message: 'เกิดข้อผิดพลาด',
        description: 'กรุณากรอกเบอร์โทร',
        placement: 'topRight',
        duration: 2,
      });
      return false;
    } else if (dataInput.personal_id === '') {
      notification.error({
        message: 'เกิดข้อผิดพลาด',
        description: 'กรุณากรอกเลขบัตรประชาชน',
        placement: 'topRight',
        duration: 2,
      });
      return false;
    } else if (dataInput.address === '') {
      notification.error({
        message: 'เกิดข้อผิดพลาด',
        description: 'กรุณากรอกที่อยู่',
        placement: 'topRight',
        duration: 2,
      });
      return false
    } else if (dataInput.brithday === '') {
      notification.error({
        message: 'เกิดข้อผิดพลาด',
        description: 'กรุณากรอกวันเกิด',
        placement: 'topRight',
        duration: 2,
      });
      return false
    }
  }

  const PostAdders = () => {
    
    axios.post(`${baseURL}/add-address`, { address: dataInput.address,name: dataInput.fristname, email: dataInput.email, password: dataInput.password })
      .then((response: any) => {
        console.log(response.data);
        if (response.data.code === 500) {
          setAlertError(500);
          notification.error({
            message: 'เกิดข้อผิดพลาด',
            description: 'ไม่สามารถสมัครสมาชิกได้',
            placement: 'topRight',
            duration: 2,
          });
        } else if (response.data.code === 200) {
          console.log(response.data);
          notification.success({
            message: 'สำเร็จ',
            description: 'สมัครสมาชิกสำเร็จ',
            placement: 'topRight',
            duration: 2,
          });
          window.location.href = '/auth/sign-in';
        }
      });
  }

  const handleSubmit = () => {

    if (!ValidateDataInput()) {
      //delete address from dataInput
      const { address, ...data } = dataInput;
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
              message: 'สำเร็จขั้น 1',
              description: 'สำเร็จขั้น 1',
              placement: 'topRight',
              duration: 2,
            });
            PostAdders()
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
          สมัครสมาชิก
        </h4>
        <p className="mb-9 ml-1 text-base text-gray-600">
          กรุณากรอกข้อมูลเพื่อสมัครสมาชิก
        </p>
        <div className="grid grid-cols-2 gap-5">
          {/* Email */}
          <InputField
            variant="auth"
            extra="mb-3"
            label="Email*"
            placeholder="E-mail address"
            id="email"
            type="text"
            value={dataInput.email}
            onChange={(e: any) => setDataINput({ ...dataInput, email: e.target.value })}
          />
          {/* Password */}
          <InputField
            variant="auth"
            extra="mb-3"
            label="Password*"
            placeholder="Password"
            id="password"
            type="password"
            value={dataInput.password}
            onChange={(e: any) => setDataINput({ ...dataInput, password: e.target.value })}
          />

          {/* ชื่อ */}
          <InputField

            variant="auth"
            extra="mb-3"
            label="ชื่อ*"
            placeholder="ชื่อ"
            id="fristname"
            type="text"
            value={dataInput.fristname}
            onChange={(e: any) => setDataINput({ ...dataInput, fristname: e.target.value })}
          />

          {/* นามสกุล */}
          <InputField
            variant="auth"
            extra="mb-3"
            label="นามสกุล*"
            placeholder="นามสกุล"
            id="lastname"
            type="text"
            value={dataInput.lastname}
            onChange={(e: any) => setDataINput({ ...dataInput, lastname: e.target.value })}
          />

          {/* วันเกิด */}
          <InputField
            variant="auth"
            extra="mb-3"
            label="วันเกิด*"
            placeholder="วันเกิด"
            id="brithday"
            type="date"
            value={dataInput.brithday}
            onChange={(e: any) => setDataINput({ ...dataInput, brithday: e.target.value })}
          />
          {/* เพศ */}
          <div className=" col-span-1">
            <div className="flex flex-col ">
              <p className=" font-medium text-white dark:text-white">
                เพศ
              </p>
              {/* combobox gender */}
              <select
                className="w-full h-12 pl-4 mt-2 border-2 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent dark:!text-[#000] dark:bg-[#fff] dark:border-[#000]"
                placeholder="เพศ"
                onChange={(e) => setDataINput({ ...dataInput, gender: e.target.value })}
                value={dataInput.gender}
              >
                <option value="male">ชาย</option>
                <option value="female">หญิง</option>
              </select>

            </div>
          </div>


          {/* เบอร์โทร */}
          <InputField
            variant="auth"
            extra="mb-3"
            label="เบอร์โทร*"
            placeholder="เบอร์โทร"
            id="tel"
            type="text"
            value={dataInput.tel}
            onChange={(e: any) => setDataINput({ ...dataInput, tel: e.target.value })}
          />
          {/* เลขบัตรประชาชน */}
          <InputField
            variant="auth"
            extra="mb-3"
            label="เลขบัตรประชาชน*"
            placeholder="เลขบัตรประชาชน"
            id="personal_id"
            type="text"
            value={dataInput.personal_id}
            onChange={(e: any) => setDataINput({ ...dataInput, personal_id: e.target.value })}
          />
          <div className=" col-span-2">
            {/* ที่อยู่ */}
            <InputField
              variant="auth"
              extra="mb-3"
              label="ที่อยู่*"
              placeholder="ที่อยู่"
              id="address"
              type="text"
              value={dataInput.address}
              onChange={(e: any) => setDataINput({ ...dataInput, address: e.target.value })}
            />
          </div>
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
