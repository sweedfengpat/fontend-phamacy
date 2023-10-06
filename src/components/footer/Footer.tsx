import { AboutContext } from "context/aboutContext";
import React from "react";

const Footer = () => {
  
  const [subdistrict, setSubdistrict] = React.useState("");
  const [district, setDistrict] = React.useState("");
  const [province, setProvince] = React.useState("");
  const [zipcode, setZipcode] = React.useState("");
  const [address, setAddress] = React.useState("");

  const { getAbout }: any = React.useContext(AboutContext);
  const aboutData = getAbout();
  return (
    <div className="bg-white/10 text-gray-200 p-6 rounded-t-lg translate-y-3 text-lg">
      <h2 className="mb-2">
      เกี่ยวกับร้าน
      </h2>
      ชื่อร้าน : {aboutData?.name ? aboutData?.name : ""}
      <br />
      เบอร์โทรศัพท์ : {aboutData?.phone ? aboutData?.phone : ""}
      <br />
      ที่อยู่ร้าน :  {aboutData?.address ? aboutData?.address : ""}
    </div>
  );
};

export default Footer;
