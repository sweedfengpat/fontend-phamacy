import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

function FollowShipping() {
    return (
        <div style={{marginTop: '10px', padding: '20px'}} className='!text-white'>
            <h1 style={{textAlign: 'center'}}>ติดตามสินค้า</h1>
    <TableContainer component={Paper} sx={{ marginTop: "10px", bgcolor: "#1b2559" }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
              <TableCell sx={{ color: "#FFFFFF" }} align="center">รหัสการสั่งซื้อสินค้า</TableCell >
                <TableCell sx={{ color: "#FFFFFF" }} align="center">จำนวน</TableCell>
                <TableCell sx={{ color: "#FFFFFF" }} align="right">ราคารวม</TableCell>
                <TableCell sx={{ color: "#FFFFFF" }} align="right">สถานะ</TableCell>
                <TableCell sx={{ color: "#FFFFFF" }} align="right">วันที่ทำรายการ</TableCell>
                <TableCell sx={{ color: "#FFFFFF" }} align="right">เลข ems</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell sx={{ color: "#FFFFFF" }} align="center">{row.calories}</TableCell>
                  <TableCell  sx={{ color: "#FFFFFF" }} align="center" component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell sx={{ color: "#FFFFFF" }} align="right">{row.fat}</TableCell>
                  <TableCell sx={{ color: "#FFFFFF" }} align="right">{row.carbs}</TableCell>
                  <TableCell sx={{ color: "#FFFFFF" }} align="right">{row.carbs}</TableCell>
                  <TableCell sx={{ color: "#FFFFFF" }} align="right">{row.carbs}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        </div>
  )
}

export default FollowShipping