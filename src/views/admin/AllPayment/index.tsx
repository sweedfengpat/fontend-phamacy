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
    total: string,
    date: string,
    status: string,
    amount: string,
  ) {
    return { id, code, total, date, status, amount};
  }
  

function AllPayment() {

    const [rows, setRows] = React.useState<any>([]);
    const [total, setTotal] = React.useState<any>(0);
    const [month, setMonth] = React.useState<any>(new Date().getFullYear() + '-' + (new Date().getMonth() + 1));

    useEffect(() => {
      const formData = new FormData();
      formData.append('id', "1");

      let getmont = month.split('-');
      //delete 0 in month
      if (getmont[1].charAt(0) === '0') {
        getmont[1] = getmont[1].charAt(1);
      }
      formData.append('month', getmont[1]);
      formData.append('year', getmont[0]);
      axios.post(`${baseURL}/all-order-payment`, formData).then((response: any) => {
        let new_rows:any = [];
        let data = JSON.parse(response.data);
        let total = 0;
        data.forEach((item: any) => {
            
            let date = [];
            date = item.day.split('/');
            let now = new Date();
            if (parseInt(date[2]) === now.getFullYear() && parseInt(date[1]) === (now.getMonth()+1)){
                let amount = [];
                amount = item.listAmount.split(',');
                if (amount.length === 0) {
                    amount = [item.listAmount];
                }
                let total_amount = 0;
                amount.forEach((item1: any) => {
                    total_amount += parseInt(item1);
                })

                new_rows.push(createData(item.id, item.code, item.total, item.day, item.status, total_amount.toString()));
                total += parseInt(item.total);
            }

        })
        setTotal(total);
        setRows(new_rows);
      });
      }
    , [month]);

  
    return (
      <div>
          <div style={{textAlign: 'center'}}>
              <h1>ยอดขายรายเดือน</h1>
              {/* month and year FilledInput */} 
              <input type="month" id="bdaymonth" name="bdaymonth" value={month} onChange={(e) => setMonth(e.target.value)} />
              
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                    <TableCell align="center">ลำดับ</TableCell>
                      <TableCell>รหัสการสั่งซื้อ</TableCell>
                      <TableCell align="center">จำนวน</TableCell>
                      <TableCell align="center">ราคา</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row: any, index: any) => (
                      <TableRow
                        key={row.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell align="center">{index + 1}</TableCell>
                        <TableCell><Link to={'/admin/order/'+row.id}><SearchIcon color='success'></SearchIcon></Link>{row.code}</TableCell>
                        <TableCell align="center">{row.amount}</TableCell>
                        <TableCell align="center">{row.total}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
             </TableContainer>

             <div style={{marginTop: '10px'}}>
                <h4>ราคารวม {total}</h4>
             </div>
          </div>
      </div>
    )
}

export default AllPayment