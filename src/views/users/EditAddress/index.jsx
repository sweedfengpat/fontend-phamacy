import React, { useEffect } from "react";
import { TextField } from "@mui/material";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Button from "@mui/material/Button";
import axios from "axios";
import { baseURL } from "lib/url";
import Grid from "@mui/material/Grid";
import InputAddress from "react-thailand-address-autocomplete";

function EditAddress() {
  const [name, setName] = React.useState("");
  const [address, setAddress] = React.useState("");

  const [subdistrict, setSubdistrict] = React.useState("");
  const [district, setDistrict] = React.useState("");
  const [province, setProvince] = React.useState("");
  const [zipcode, setZipcode] = React.useState("");

  useEffect(() => {
    document.title = "แก้ไขที่อยู่";
    const formData = new FormData();
    // get param
    let e = localStorage.getItem("email");
    let p = localStorage.getItem("password");
    e = atob(e);
    p = atob(p);
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    formData.append("email", e);
    formData.append("password", p);
    formData.append("id", id?.toString() || "");
    axios.post(`${baseURL}/get-address`, formData).then((response) => {
      let data = response.data;
      setName(data.name);
      const splitAddress = data?.address?.split(" ");
      if (splitAddress) {
        setProvince(splitAddress[6]);
        setZipcode(splitAddress[7]);
        setSubdistrict(splitAddress[2]);
        setDistrict(splitAddress[4]);
        setAddress(splitAddress[0]);
      }
    });
  }, []);

  function onSelect(fullAddress) {
    const { subdistrict, district, province, zipcode } = fullAddress;
    setSubdistrict(subdistrict);
    setDistrict(district);
    setProvince(province);
    setZipcode(zipcode);
  }

  const handleChange = (event) => {
    let text = "คุณต้องการเปลี่ยนข้อมูลใช่หรือไม่";
    if (window.confirm(text)) {
      let e = localStorage.getItem("email");
      let p = localStorage.getItem("password");
      e = atob(e);
      p = atob(p);
      const formData = new FormData();
      const urlParams = new URLSearchParams(window.location.search);
      let newAddress = `${address} แขวง ${subdistrict} เขต ${district} จังหวัด ${province} ${zipcode}`;
      const id = urlParams.get("id");
      formData.append("id", id?.toString() || "");
      formData.append("name", name);
      formData.append("address", newAddress);
      formData.append("email", e);
      formData.append("password", p);
      axios.post(`${baseURL}/update-address`, formData).then((response) => {
        alert("เปลี่ยนข้อมูลเรียบร้อย");
        window.location.href = `/users/address`;
      });
    } else {
      event.target.value = "รอตรวจสอบ";
    }
  };

  return (
    <div className="!text-white">
      <div style={{ textAlign: "center", marginTop: "10px" }}>
        <h1>แก้ไขข้อมูลที่อยู่</h1>

        <div>
          <div
            style={{ width: "100%", display: "Grid", justifyContent: "center" }}
          >
            <Grid container spacing={2} width={500} mt={5} mb={5}>
              <Grid item xs={6}>
              <div className="cto-InputAddress1">
                <TextField
                  style={{ minWidth: "200px", minHeight: "50px" }}
                  id="outlined-basic"
                  label="ชื่อที่อยู่"
                  variant="outlined"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                </div>
              </Grid>

              <Grid item xs={6}>
              <div className="cto-InputAddress1">
                <TextField
                  style={{ minWidth: "200px", minHeight: "50px" }}
                  id="outlined-basic"
                  label="ที่อยู่"
                  variant="outlined"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                </div>
              </Grid>

              <Grid item xs={6}>
                แขวง / ตำบล
                <div className="cto-InputAddress">
                  <InputAddress
                  style={{ minWidth: "200px", minHeight: "50px" }}
                  address="subdistrict"
                  value={subdistrict}
                  onChange={(e) => setSubdistrict(e.target.value)}
                  onSelect={(value) => onSelect(value)}
                /></div>
                
              </Grid>

              <Grid item xs={6}>
                เขต / อำเภอ
                <div className="cto-InputAddress"> <InputAddress
                  style={{ minWidth: "200px", minHeight: "50px" }}
                  address="district"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  onSelect={(value) => onSelect(value)}
                /></div>
               
              </Grid>

              <Grid item xs={6}>
                จังหวัด
                <div className="cto-InputAddress"><InputAddress
                  style={{ minWidth: "200px", minHeight: "50px" }}
                  address="province"
                  value={province}
                  onChange={(e) => setProvince(e.target.value)}
                  onSelect={(value) => onSelect(value)}
                /></div>
                
              </Grid>

              <Grid item xs={6}>
                รหัสไปรษณีย์
                <div className="cto-InputAddress">
                <InputAddress
                  style={{ minWidth: "200px", minHeight: "50px" }}
                  address="zipcode"
                  value={zipcode}
                  onChange={(e) => setZipcode(e.target.value)}
                  onSelect={(value) => onSelect(value)}
                />
                </div>
                
              </Grid>

              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="success"
                  sx={{
                    marginTop: "10px",
                    borderRadius: "20px",
                    textAlign: "center",
                  }}
                  onClick={handleChange}
                >
                แก้ไขข้อมูล
                </Button>
              </Grid>
              
            </Grid>
          </div>
        </div>

        {/* <div>
            <TextField
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  fullWidth
                  id="categoryName"
                  label="ชื่อที่อยู่"
                  name="categoryName"
                  autoComplete="categoryName"
                />
                                <TextareaAutosize
                    aria-label="Address"
                    minRows={4}
                    placeholder="ที่อยู่"
                    style={{width: '100%', marginTop: '10px', marginBottom: '10px', padding: '10px'}}
                    onChange={(e) => setAddress(e.target.value)}
                    value={address}
                    />
                <Button variant="contained" color='success' sx={{marginTop: '10px' , borderRadius: '20px'}} onClick={handleChange}>แก้ไขข้อมูล</Button>
            </div> */}
      </div>
    </div>
  );
}

export default EditAddress;
