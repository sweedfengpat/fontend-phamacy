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
import AutorenewIcon from '@mui/icons-material/Autorenew';
import SendIcon from '@mui/icons-material/Send';


function createData(
    id: number,
    code: string,
    price: string,
    date: string,
    status: string,
    track: string,
  ) {
    return { id, code, price, date, status, track};
  }
  


function Shipping() {

    const [rows, setRows] = React.useState<any>([]);

    useEffect(() => {
      document.title = "จัดการสินค้า";
      const formData = new FormData();
      formData.append('id', "1");
      axios.post(`${baseURL}/all-order-pay-success`, formData).then((response: any) => {
        let new_rows:any = [];
        let data = JSON.parse(response.data);
        data.forEach((item: any) => {
          new_rows.push(createData(item.id, item.code, item.total, item.day, item.status, item.track));
        })
        setRows(new_rows);
      });
      }
    , []);
  


    const handleChange = (id: number, event: any) => {
        console.log(event.target.value);
        let r:any = [];
        rows.forEach((item: any) => {
            if (item.id === id) {
                item.status = event.target.value;
            }
            r.push(item);
        });
        setRows(r);
    };

    const getStatus = (id: number) => {
        let status = "";
        rows.forEach((item: any) => {
            if (item.id === id) {
                status = item.status;
            }
        });
        return status;
    }

    const change = (id: number) => {
        let status = getStatus(id);
        let text = "คุณต้องการเปลี่ยนสถานะใช่หรือไม่";
        if (window.confirm(text)) {
            const formData = new FormData();
            formData.append('id', id.toString());
            formData.append('status', status);
            axios.post(`${baseURL}/update-order`, formData).then((response: any) => {
                    alert("เปลี่ยนสถานะเรียบร้อย");
                    window.location.reload();
            });
        }
    }
  
    return (
      <div>
          <div style={{textAlign: 'center'}}>
              <h1>ตรวจสอบการส่งสินค้า</h1>
              <TableContainer component={Paper} sx={{ marginTop: '10px' , bgcolor:'#1b2559'}}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                    <TableCell sx={{color: '#FFFFFF'}} align="center">ลำดับ</TableCell>
                      <TableCell sx={{color: '#FFFFFF'}} align="center">รหัสการสั่งซื้อ</TableCell>
                      <TableCell sx={{color: '#FFFFFF'}} align="center">วันที่ทำรายการ</TableCell>
                      <TableCell sx={{color: '#FFFFFF'}} align="center">สถานะ (จัดส่งแล้ว)</TableCell>
                      <TableCell sx={{color: '#FFFFFF'}} align="center">เปลี่ยนสถานะ</TableCell>
                      <TableCell sx={{color: '#FFFFFF'}} align="center">ส่งข้อมูลขนส่งพัสดุ</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row: any, index: any) => (
                      <TableRow
                        key={row.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell sx={{color: '#FFFFFF'}} align="center">{index + 1}</TableCell>
                        <TableCell sx={{color: '#FFFFFF'}}><Link to={`/admin/order-id?id=${row.id}`}><SearchIcon color='success'></SearchIcon></Link>{row.code}</TableCell>
                        <TableCell sx={{color: '#FFFFFF'}} align="center">{row.date}</TableCell>
                        <TableCell sx={{color: '#FFFFFF'}} align="center">
                        <input type="text" className='form-control' value={row.status} onChange={(event) => handleChange(row.id, event)} />
                        </TableCell>
                        <TableCell sx={{color: '#FFFFFF'}} align="center">
                        <button className='btn btn-primary' onClick={() => change(row.id)}><AutorenewIcon /></button>
                        </TableCell>
                        <TableCell sx={{color: '#FFFFFF'}} align="center">
                          {row.track === null ? <Link to={'/admin/Track'}><button className='btn btn-primary'><SendIcon /></button></Link> : <button className='btn btn-primary' disabled>ส่งข้อมูล</button>}
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

export default Shipping