import React, { useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
import axios from "axios";
import { baseURL } from 'lib/url';


function createData(
    id: number,
    code: string,
    price: string,
    date: string,
    list_id: string,
    list_amount: string,
  ) {
    return { id, code, price, date, list_id, list_amount};
  }
  

function Order() {

    const [rows, setRows] = React.useState<any>([]);

    useEffect(() => {
      document.title = "จัดการสินค้า";
      const formData = new FormData();
      formData.append('id', "1");
      axios.post(`${baseURL}/all-order`, formData).then((response: any) => {
        let new_rows:any = [];
        let data = JSON.parse(response.data);
        data.forEach((item: any) => {
          new_rows.push(createData(item.id, item.code, item.total, item.day, item.listAmount, item.listId));
        })
        setRows(new_rows);
      });
      }
    , []);
  


    const handleChange = (list_amount:string, list_id:string, id: number, event: any) => {
        console.log(event.target.value);
        let text = "คุณต้องการเปลี่ยนสถานะใช่หรือไม่";
        if (window.confirm(text)) {
            const formData = new FormData();
            formData.append('id', id.toString());
            formData.append('status', event.target.value);
            formData.append('listAmount', list_amount);
            formData.append('listId', list_id);
            axios.post(`${baseURL}/update-order`, formData).then((response: any) => {
                    alert("เปลี่ยนสถานะเรียบร้อย");
                    window.location.reload();
            });
        } else {
            event.target.value = "รอตรวจสอบ";
        }
    };
  
    return (
      <div>
          <div style={{textAlign: 'center'}}>
              <h1>ตรวจสอบการสั่งซื้อ</h1>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">ลำดับ</TableCell>
                      <TableCell align="center">รหัสการสั่งซื้อ</TableCell>
                      <TableCell align="center">ราคารวม</TableCell>
                      <TableCell align="center">วันที่ทำรายการ</TableCell>
                      <TableCell align="center">สถานะ</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row:any, index: any) => (
                      <TableRow
                        key={row.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell align="center">{index + 1}</TableCell>
                        <TableCell><Link to={'/admin/order/'+row.id}><SearchIcon color='success'></SearchIcon></Link>{row.code}</TableCell>
                        <TableCell align="center">{row.price}</TableCell>
                        <TableCell align="center">{row.date}</TableCell>

                        <TableCell align="center">
                        <select className='form-control' onChange={(event) => handleChange(row.list_id, row.list_amount, row.id, event)}>
                            <option value="รอตรวจสอบ">รอตรวจสอบ</option>
                            <option value="ชำระแล้ว">ชำระแล้ว</option>
                            <option value="ล้มเหลว">ล้มเหลว</option>
                        </select>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
             </TableContainer>
          </div>
      </div>
    )
}

export default Order