import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import FilledInput from "@mui/material/FilledInput";
import axios from "axios";
import { baseURL, baseURLstatic } from "lib/url";
//import { baseURL, baseURLstatic }from '../../url'
import InputAddress from "react-thailand-address-autocomplete";
//import { AddressComplete } from 'react-thailand-address-complete';

function About() {
  const [alertError, setAlertError] = React.useState(200);
  const [productImage, setProductImage] = React.useState();
  const [address, setAddress] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [name, setName] = React.useState("");
  const [logo, setLogo] = React.useState("");

  const [subdistrict, setSubdistrict] = React.useState("");
  const [district, setDistrict] = React.useState("");
  const [province, setProvince] = React.useState("");
  const [zipcode, setZipcode] = React.useState("");

  React.useEffect(() => {
    axios.post(`${baseURL}/about`).then((response) => {
      let data = response.data;
      setName(data.name);
      setLogo(data.logo);
      const splitAddress = data.address.split(" ");
      console.log(splitAddress);
      setProvince(splitAddress[6]);
      setZipcode(splitAddress[7]);
      setSubdistrict(splitAddress[2]);
      setDistrict(splitAddress[4]);
      setAddress(splitAddress[0]);
      setPhone(data.phone);
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

      formData.append("name", name);
      formData.append("address", newAddress);
      formData.append("email", e);
      formData.append("password", p);
      axios.post(`${baseURL}/update-address`, formData).then((response) => {
        alert("เปลี่ยนข้อมูลเรียบร้อย");
        window.location.href = `/admin/about`;
      });
    } else {
      event.target.value = "รอตรวจสอบ";
    }
  };

  const handleFileChange = async (e) => {
    if (e.target.files) {
      setProductImage(e.target.files[0]);
      console.log(e);
    }
  };

  const handleFileChange2 = () => {
    if (productImage) {
      setProductImage(productImage);
      const formData = new FormData();
      formData.append("upload", productImage);
      console.log(productImage);
      axios
        .post(`${baseURL}/add-about-image`, formData, {})
        .then((response) => {
          console.log(response.data);
          window.location.href = "/admin/about";
        });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    let newAddress = `${address} แขวง ${subdistrict} เขต ${district} จังหวัด ${province} ${zipcode}`;
    formData.append("address", newAddress);
    formData.append("phone", phone);
    formData.append("name", name);
    axios
      .post(`${baseURL}/update-about`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        if (response.data.code === 201) {
          window.location.href = "/admin/about";
        } else if (response.data.code === 500) {
          setAlertError(500);
        } else {
          window.location.href = "/admin/about";
        }
      });
  };

  return (
    <div>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            เกี่ยวกับร้าน
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            {(() => {
              if (alertError !== 200) {
                return (
                  <>
                    <Alert severity="error" sx={{ mb: "1rem" }}>
                      Error!
                    </Alert>
                  </>
                );
              }
            })()}

            <Box sx={{ mt: 5 }}>
              <img
                src={
                  productImage
                    ? URL.createObjectURL(productImage)
                    : logo
                    ? `${baseURLstatic}/${logo}`
                    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-m7gqrK-fc11svfLdibWGh_U2gD3Rb7HFqg90ZJ0&s"
                }
                width={300}
                alt=""
              />
              <form>
                <Grid item xs={12}>
                  <FilledInput
                    type="file"
                    onChange={handleFileChange}
                    fullWidth
                    required
                  />
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="success"
                  onClick={handleFileChange2}
                  sx={{
                    marginTop: "10px",
                    borderRadius: "20px",
                    marginBottom: "10px",
                  }}
                >
                  แก้ไขรูป
                </Button>
              </form>
            </Box>

            <Grid container spacing={2} className="!mt-4">
              <Grid item xs={12} sm={12}>
                <div className="cto-InputAddress1">
                  <TextField
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    fullWidth
                    id="name"
                    label="ชื่อร้าน"
                    name="name"
                    autoComplete="name"
                  />
                </div>
              </Grid>

              <Grid item xs={12} sm={12}>
                <div className="cto-InputAddress1">
                  <TextField
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    fullWidth
                    id="phone"
                    label="เบอร์โทร"
                    name="phone"
                    autoComplete="phone"
                  />
                </div>
              </Grid>
            </Grid>

            <div
              style={{
                width: "100%",
                display: "Grid",
                justifyContent: "center",
              }}
            >
              <Grid container spacing={2} width={500} mt={5} mb={5}>

                <Grid item xs={12}>
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

                <Grid item xs={6} className="!text-white">
                  แขวง / ตำบล
                  <InputAddress
                    style={{ minWidth: "200px", minHeight: "50px" }}
                    address="subdistrict"
                    value={subdistrict}
                    onChange={(e) => setSubdistrict(e.target.value)}
                    onSelect={(value) => onSelect(value)}
                  />
                </Grid>

                <Grid item xs={6} className="!text-white">
                  เขต / อำเภอ
                  <InputAddress
                    style={{ minWidth: "200px", minHeight: "50px" }}
                    address="district"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    onSelect={(value) => onSelect(value)}
                  />
                </Grid>

                <Grid item xs={6} className="!text-white">
                  จังหวัด
                  <InputAddress
                    style={{ minWidth: "200px", minHeight: "50px" }}
                    address="province"
                    value={province}
                    onChange={(e) => setProvince(e.target.value)}
                    onSelect={(value) => onSelect(value)}
                  />
                </Grid>

                <Grid item xs={6} className="!text-white">
                  รหัสไปรษณีย์
                  <InputAddress
                    style={{ minWidth: "200px", minHeight: "50px" }}
                    address="zipcode"
                    value={zipcode}
                    onChange={(e) => setZipcode(e.target.value)}
                    onSelect={(value) => onSelect(value)}
                  />
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    marginTop: "10px",
                    borderRadius: "20px",
                    marginBottom: "10px",
                  }}
                  color="success"
                >
                  แก้ไข
                </Button>
              </Grid>
            </div>
          </Box>
        </Box>
      </Container>
    </div>
  );
}

export default About;
