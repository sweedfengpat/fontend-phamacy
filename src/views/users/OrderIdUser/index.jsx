import React, { useEffect, useRef } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import { useParams } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import axios from "axios";
// import { baseURL, baseURLstatic }from '../../url'
import { baseURL , baseURLstatic } from 'lib/url';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import {useLocation} from "react-router-dom"

function createData(
    id,
    code,
    price,
    amount,
    total,
  ) {
    return { id, code, price, amount, total};
  }

function OrderIDUser() {

    const [rows, setRows] = React.useState([]);
    const [code, setCode] = React.useState("");
    const [price, setPrice] = React.useState("");
    const [amount, setAmount] = React.useState("");
    const [total, setTotal] = React.useState("");
    const [date, setDate] = React.useState("");
    const [image, setImage] = React.useState("");
    const [name, setName] = React.useState("");
    const [address, setAddress] = React.useState("");
    const [status, setStatus] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    let { orderId } = useParams();

    const componentRef = useRef();

    // const path = location.pathname.split("/").slice(-1)

    useEffect(() => {

        let e  = localStorage.getItem('email');
        let p  = localStorage.getItem('password');
        setEmail(atob(e));
        setPassword(atob(p));
        const post_data = {
          email: email,
          password: password,
        };
        if (email !== '' && password !== ''){
          axios.post(`${baseURL}/check-login`, post_data)
          .then((response) => {
            if (response.data.code === 500){
              localStorage.removeItem("email");
              localStorage.removeItem("password");
              setEmail('');
              setPassword('');
              window.location.href = "/";
            }
          });
        }

        
      // console.log({path})
      const urlParams = new URLSearchParams(window.location.search);
      const id = urlParams.get("id");
      const formData = new FormData();
      formData.append("id", id?.toString() || "");
      axios.post(`${baseURL}/get-order`, formData).then((response) => {
            setCode(response.data.code);
            setPrice(response.data.listPrice);
            setAmount(response.data.listAmount);
            setDate(response.data.day);
            setImage(response.data.slipImage);
            setName(response.data.listName);
            setAddress(response.data.address);
            setStatus(response.data.status);

        });
        let new_rows = [];
        let listprice = price?.split(",");
        let listamount = amount?.split(",");
        let listname = name?.split(",");
        if (listprice?.length === 0){
            listprice = [price];
            listamount = [amount];
            listname = [name];
        }
        let t = 0;
        for (let i = 0; i < listprice?.length; i++) {
            let total = parseInt(listprice[i]) * parseInt(listamount[i]);
            new_rows.push(createData(i, listname[i], listprice[i], listamount[i], total?.toString()));
            t += total;
        }
        setTotal(t.toString());
        setRows(new_rows);
        
      }
    , [price, amount, name, orderId, email, password, status]);
  
    const handlePrint = useReactToPrint({
      content: () => componentRef.current,
    });
  
    return (
      <div className='!text-white'>
        <div style={{paddingTop: "1%", textAlign: "right"}}>
        <Button sx={{borderRadius: '20px'}} variant="contained" color='success' onClick={handlePrint}><LocalPrintshopIcon /></Button>
          <div style={{textAlign: 'center', marginTop: '20px'}} ref={componentRef}>
          <Container>

              <h2>ใบสั่งซื้อ</h2>
              <div className='row' style={{textAlign: 'left'}}>
                <div className='col-12'>
                    <h5>รหัสการสั่งซื้อ : {code}</h5>
                    <h5>วันที่สั่งซื้อ : {date}</h5>
                    <br />
                    <h5>ที่อยู่ : {address}</h5>
                    <br />
                    <h5>ราคารวม : {total}</h5>
                    <h5>สถานะ : {status}</h5>
                </div>
                {/* <div className='col-12 text-center'>
                    <img src={baseURLstatic + "/" + image} width={200} height={200} alt="" />
                </div> */}

              </div>
              <TableContainer component={Paper} sx={{ marginTop: "10px", bgcolor: "#1b2559" }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ color: "#FFFFFF" }}>ลำดับ</TableCell>
                      <TableCell sx={{ color: "#FFFFFF" }} align="center">ชื่อสินค้า</TableCell>
                      <TableCell sx={{ color: "#FFFFFF" }} align="center">ราคา</TableCell>
                      <TableCell sx={{ color: "#FFFFFF" }} align="center">จำนวน</TableCell>
                        <TableCell sx={{ color: "#FFFFFF" }} align="center">รวม</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row, index) => (
                      <TableRow
                        key={row.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell sx={{ color: "#FFFFFF" }} align="center">{index + 1}</TableCell>
                        <TableCell sx={{ color: "#FFFFFF" }} align="left" width={"40%"}>{row.code}</TableCell>
                        <TableCell sx={{ color: "#FFFFFF" }} align="center">{row.price}</TableCell>
                        <TableCell sx={{ color: "#FFFFFF" }} align="center">{row.amount}</TableCell>
                        <TableCell sx={{ color: "#FFFFFF" }} align="center">{row.total}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
             </TableContainer>
             <div style={{textAlign: 'right', marginTop: '10px'}}>
                <h2 sx={{ color: "#FFFFFF" }} >ราคารวม {total} บาท</h2>
             </div>
          </Container>
          </div>

      </div>
      </div>
    )
}

export default OrderIDUser