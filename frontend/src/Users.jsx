import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';

export default function Users() {
  const [users, setUsers] = React.useState([])

  const userData = async () => {
    let res = await axios.get('http://localhost:8000/api/getUser')
    if (res) {
      setUsers(res.data.userData)
      console.log(users);
      
    }
    else {
      setUsers([]);  // empty array if no users found
    }
    }

  React.useEffect(() => {
    userData()
  }, [])
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Sr No</TableCell>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">Email</TableCell>
            <TableCell align="center">Phone</TableCell>
            <TableCell align="center">Message</TableCell>
            <TableCell align="center">Role</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            users.length >= 1 ?
              users.map((items, index) => (
                <TableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell align="center">{items.name}</TableCell>
                  <TableCell align="center">{items.email}</TableCell>
                  <TableCell align="center">{items.phone}</TableCell>
                  <TableCell align="center">{items.message}</TableCell>
                  <TableCell align="center">{items.role}</TableCell>
                </TableRow>
              ))
              : <TableRow
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                <TableCell align="center">users not found</TableCell>
                </TableRow>
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
}
