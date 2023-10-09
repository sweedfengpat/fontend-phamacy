import { useEffect } from "react";
import React from "react";
import axios from "axios";
import Card from "components/card";
import { notification } from "antd";
import { baseURL, baseURLstatic } from "lib/url";

interface DataInput {
    id: number;
    productCode: string;
    productName: string;
    productPrice: string;
    productAmount: string;
    productImage: string;
    productType: string;
    productDescription: string;
}

function AddProduct() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const id = urlParams.get('id');
  const [initData, setInitData] = React.useState<DataInput>({} as DataInput);
  const [productTypeList, setProductTypeList] = React.useState<any>([]);
  const [productImage, setProductImage] = React.useState<File>();
  const [alertError, setAlertError] = React.useState<number>();

  useEffect(() => {
      if (id) {
          const formData = new FormData();
          formData.append('id', id?.toString()!);
          axios.post(`${baseURL}/get-product`, formData).then((response: any) => {

              setInitData(response.data);
          }).catch((error) => {
              console.log(error);
          });
      }
  }, []);

  useEffect(() => {
      const formData = new FormData();
      axios.post(`${baseURL}/all-category`, formData).then((response: any) => {
          let new_rows: any = [];
          let data = JSON.parse(response.data);

          setProductTypeList(data);
      });

  }, []);

  const handleSubmit = () => {

      if (id) {
          const formData = new FormData();
          if (productImage){
            formData.append('upload', productImage)
            formData.append('imageName',productImage.name);
          }
        //   else{
        //     formData.append('upload', initData.productImage)
        //   }
        // console.log(productImage.name)
          ;
          formData.append('productType', initData.productType);
          formData.append('productName', initData.productName);
          formData.append('productPrice', initData.productPrice);
          formData.append('productDescription', initData.productDescription);
          formData.append('productCode', initData.productCode);
          formData.append('productAmount', initData.productAmount.toString());
          formData.append('id', id?.toString()!);
                   axios.post(`${baseURL}/update-product`, formData, {
              headers: {
                  'Content-Type': 'multipart/form-data',
              },
          }).then((response: any) => {
              if (response.data.code === 200) {
                  notification.success({
                      message: 'แก้ไขข้อมูลสำเร็จ',
                      description:

                          'แก้ไขข้อมูลสำเร็จ',
                  });
                  setTimeout(() => {
                     window.location.href = '/admin/product?id=' + id;
                  }, 2000);
              } else if (response.data.code === 500) {
                notification.error({
                    message: 'เกิดข้อผิดพลาด',
                    description:
                        'Error 500' +
                        response.data.message
                });

              }
          }).catch((error) => {
            notification.error({
                message: 'เกิดข้อผิดพลาด',
                description:
                    'Error 500' +
                    error
            });
          });
      }else{
          const formData = new FormData();
          formData.append('upload', productImage);
          formData.append('productType', initData.productType);
          formData.append('productName', initData.productName);
          formData.append('productPrice', initData.productPrice);
          formData.append('productDescription', initData.productDescription);
          formData.append('productCode', initData.productCode);
          formData.append('productAmount', initData.productAmount);
          axios.post(`${baseURL}/add-product`, formData, {
              headers: {
                  'Content-Type': 'multipart/form-data',
              },
          }).then((response: any) => {
            console.log(response.data);
              if (response.data.code === 200) {
                  notification.success({
                      message: 'เพิ่มข้อมูลสำเร็จ',
                      description:
                          'เพิ่มข้อมูลสำเร็จ',
                  });
                  //countdown 2 sec
                  setTimeout(() => {
                      window.location.href = 'admin/stockphama';
                  }, 3000);

                  // window.location.href = "/admin/product";
              } else if (response.data.code === 500) {
                  notification.error({
                      message: 'เกิดข้อผิดพลาด',
                      description:
                          'Error 500',
                  });
              }
          });
      }
  
  
  };

  return (
 
            <div className="mt-5  h-full grid-cols-1 gap-5 md:grid-cols-2">
                
                <Card extra={"w-full pb-10 p-4 h-full"}>
                    <header className="relative flex items-center justify-between">
                        <div className="text-xl font-bold text-navy-700 dark:text-black">
                            รายการคลังยา
                        </div>
                    </header>

                    <div className="mt-8 overflow-x-scroll xl:overflow-x-hidden">
                        <div className="flex flex-col px-5">
                            {/* upload picture card and  preview upload picture*/}
                            <div className="flex flex-col">
                                <label className="text-2xl font-bold">รูปสินค้า</label>
                                <div className="w-96 h-96 mt-2 border-2 rounded-md shadow-md">
                                    <img
                                        className="object-contain w-full h-full "
                                        src={
                                            productImage
                                                ? URL.createObjectURL(productImage)
                                                : initData.productImage
                                                    ? `${baseURLstatic}/${initData.productImage}`
                                                    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-m7gqrK-fc11svfLdibWGh_U2gD3Rb7HFqg90ZJ0&s"
                                        }
                                        alt=""
                                    />
                                </div>
                                <input
                                    type="file"
                                    className="w-96 h-10 pl-4 mt-2 border-2 rounded-md shadow-md  focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                    onChange={(e) => setProductImage(e.target.files![0])}
                                />
                            </div>


                            <div className="flex flex-row justify-between">
                                <div className="flex flex-col">
                                    <label className="text-2xl font-bold">รหัสสินค้า</label>
                                    <input
                                        className="w-96 h-10 pl-4 mt-2 border-2 dark:!text-[#fff] rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                        placeholder="กรอกรหัสสินค้า"
                                        value={initData.productCode}
                                        onChange={(e) => setInitData({ ...initData, productCode: e.target.value })}
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label className="text-2xl font-bold">ชื่อสินค้า</label>
                                    <input
                                        className="w-96 h-10 pl-4 mt-2 border-2 dark:!text-[#fff] rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                        placeholder="กรอกชื่อสินค้า"
                                        value={initData.productName}
                                        onChange={(e) => setInitData({ ...initData, productName: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-row justify-between">
                                <div className="flex flex-col">
                                    <label className="text-2xl font-bold">ราคาสินค้า</label>
                                    <input
                                        className="w-96 h-10 pl-4 mt-2 border-2 text-[#000] rounded-md dark:!text-[#fff] shadow-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                        placeholder="กรอกราคาสินค้า"
                                        value={initData.productPrice}
                                        onChange={(e) => setInitData({ ...initData, productPrice: e.target.value })}
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label className="text-2xl font-bold">จำนวนสินค้า</label>
                                    <input
                                        className="w-96 h-10 pl-4 mt-2 border-2 rounded-md shadow-md dark:!text-[#fff]  focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                        placeholder="กรอกจำนวนสินค้า"
                                        value={initData.productAmount}
                                        onChange={(e) => setInitData({ ...initData, productAmount: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-row justify-between">
                                <div className="flex flex-col">
                                    <label className="text-2xl font-bold">ประเภทสินค้า</label>
                                    <select
                                        className="w-96 h-10 pl-4 mt-2 border-2 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent dark:!text-[#000]"
                                        placeholder="กรอกประเภทสินค้า"
                                        onChange={(e) => setInitData({ ...initData, productType: e.target.value })}
                                        value={initData.productType}
                                    >
                                        <option value="0">กรุณาเลือกประเภทสินค้า</option>
                                        {productTypeList.map((item: any) => (
                                            <option value={item.name} key={item.name}>{item.name}</option>
                                        ))}
                                    </select>

                                </div>
                            </div>
                            <div className="flex flex-col">
                                <label className="text-2xl font-bold">รายละเอียดสินค้า</label>
                                <textarea
                                    className="w-96 h-40 pl-4 mt-2 border-2 dark:!text-[#000] rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                    placeholder="กรอกรายละเอียดสินค้า"
                                    value={initData.productDescription}
                                    onChange={(e) => setInitData({ ...initData, productDescription: e.target.value })}
                                />
                            </div>




                        </div>
                    </div>
                    {/* submit botton */}
                    <div className="flex flex-row justify-center mt-10">
                        <button
                            className="px-6 py-2 text-lg font-bold text-white transition duration-300 ease-in-out bg-blue-600 rounded-full hover:bg-blue-700 focus:outline-none"
                            onClick={() => handleSubmit()}
                        >
                            บันทึก
                        </button>
                    </div>

                </Card>

            </div>
       
  );
  
}

export default AddProduct
