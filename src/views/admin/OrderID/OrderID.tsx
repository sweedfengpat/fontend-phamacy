import React, { useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useParams } from 'react-router-dom';
import axios from "axios";
import { baseURL, baseURLstatic } from 'lib/url';
import {useLocation} from "react-router-dom"

function createData(
    id: number,
    code: string,
    price: string,
    amount: string,
    total: string,
  ) {
    return { id, code, price, amount, total};
  }

function OrderID() {

    const [rows, setRows] = React.useState<any>([]);
    const [code, setCode] = React.useState<string>("");
    const [price, setPrice] = React.useState<string>("");
    const [amount, setAmount] = React.useState<string>("");
    const [total, setTotal] = React.useState<string>("");
    const [date, setDate] = React.useState<string>("");
    const [image, setImage] = React.useState<string>("");
    const [name, setName] = React.useState<string>("");
    const [address, setAddress] = React.useState<string>("");
    const [status, setStatus] = React.useState<string>("");
    const [email, setEmail] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");

    let { orderId } = useParams();

    useEffect(() => {

        let e :any = localStorage.getItem('email');
        let p :any = localStorage.getItem('password');
        setEmail(atob(e));
        setPassword(atob(p));
        const post_data = {
          email: email,
          password: password,
        };
        if (email !== '' && password !== ''){
          axios.post(`${baseURL}/check-login`, post_data)
          .then((response: any) => {
            if (response.data.code === 500){
              localStorage.removeItem("email");
              localStorage.removeItem("password");
              setEmail('');
              setPassword('');
            } else {
              if (response.data.Token !== "admin"){
                  window.location.href = "/";
              }
            }
          });
        }

        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get("id");
        
      // let id: string = orderId?.toString() || "";
      const formData = new FormData();
      formData.append('id', id?.toString());
      axios.post(`${baseURL}/get-order`, formData).then((response: any) => {
            setCode(response.data.code);
            setPrice(response.data.listPrice);
            setAmount(response.data.listAmount);
            setDate(response.data.day);
            setImage(response.data.slipImage);
            setName(response.data.listName);
            setAddress(response.data.address);
            setStatus(response.data.status);

        });
        let new_rows:any = [];
        let listprice = price.split(",");
        let listamount = amount.split(",");
        let listname = name.split(",");
        if (listprice.length === 0){
            listprice = [price];
            listamount = [amount];
            listname = [name];
        }
        let t = 0;
        for (let i = 0; i < listprice.length; i++) {
            let total = parseInt(listprice[i]) * parseInt(listamount[i]);
            new_rows.push(createData(i, listname[i], listprice[i], listamount[i], total.toString()));
            t += total;
        }
        setTotal(t.toString());
        setRows(new_rows);
        
      }
    , [code, price, amount, total, date, image, name, address, status, email, password, orderId]);
  
  
    return (
      <div className='!text-white'>
          <div style={{textAlign: 'center'}}>
              <div className='row' style={{textAlign: 'left'}}>
                <div className='col-6'>
                    <h5>รหัสการสั่งซื้อ : {code}</h5>
                    <h5>วันที่สั่งซื้อ : {date}</h5>
                    <br />
                    <h5>ที่อยู่ : {address}</h5>
                    <br />
                    <h5>ราคารวม : {total}</h5>
                    <h5>สถานะ : {status}</h5>
                </div>
                <div className='col-6'>
                    <img src={baseURLstatic + "/" + image} alt="" />
                </div>

              </div>
              <TableContainer component={Paper} sx={{ marginTop: "10px", bgcolor: "#1b2559" }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ color: "#FFFFFF" }}>ลำดับ</TableCell>
                      <TableCell sx={{ color: "#FFFFFF" }}>รหัส</TableCell>
                      <TableCell sx={{ color: "#FFFFFF" }} align="center">สินค้า</TableCell>
                      <TableCell sx={{ color: "#FFFFFF" }} align="center">ราคา</TableCell>
                      <TableCell sx={{ color: "#FFFFFF" }} align="center">จำนวน</TableCell>
                        <TableCell sx={{ color: "#FFFFFF" }} align="center">รวม</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row:any , index:any) => (
                      <TableRow
                        key={row.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell sx={{ color: "#FFFFFF" }} align="center">{index + 1}</TableCell>
                        <TableCell sx={{ color: "#FFFFFF" }} align="left" width={"40%"}>{row.code}</TableCell>
                        <TableCell sx={{ color: "#FFFFFF" }} align="center">{row.name}</TableCell>
                        <TableCell sx={{ color: "#FFFFFF" }} align="center">{row.price}</TableCell>
                        <TableCell sx={{ color: "#FFFFFF" }} align="center">{row.amount}</TableCell>
                        <TableCell sx={{ color: "#FFFFFF" }} align="center">{row.total}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
             </TableContainer>
             <div style={{textAlign: 'right', marginTop: '10px'}}>
                <h4 style={{color: "#FFFFFF"}}>ราคารวม {total}</h4>
             </div>
          </div>
      </div>
    )
}

export default OrderID