import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { Button, Container, IconButton, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import UpdateForm from './UpdateForm';
import Swal from 'sweetalert2'

export default function Users() {
  const [users, setUsers] = React.useState([])
  const [edit, setEdit] = React.useState(false)
  const [oneUser, setOneUser] = React.useState([])
  const [change, setChange] = React.useState(0)

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
  }, [change])

  let editRow = async (editID) => {
    try{
      const response = await axios.get('http://localhost:8000/api/getUser/' + editID)
      if (response) {
        setOneUser(response.data.userData)
        console.log(oneUser);
      setEdit(true)
      setChange(prev => prev + 1)
      console.log(change);
      
    }
  }
    catch{
      alert('something wrong! not able to edit the user')
    }
  }

  let deleteRow = async (delID) => {
    try {
      let result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert user then!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      })
        if (result.isConfirmed) {
          const response = await axios.delete('http://localhost:8000/api/delUser/' + delID)
          Swal.fire({
            title: "Deleted!",
            text: response.data.message,
            icon: "success"
          });
          setChange(prev => prev + 1)
        }
    }
    catch {
      alert('something wrong! not able to delete the user')
    }
  }

  let updateUser = async (e) => {
    e.preventDefault();
    try {
      const formData = {
        name: e.target.name.value,
        email: e.target.email.value,
        phone: e.target.phone.value,
        message: e.target.message.value,
        role: e.target.role.value
      };

      const response = await axios.put('http://localhost:8000/api/updateUser/' + oneUser._id, formData);
      toast.success(response.data.message, {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce
      })
      setEdit(false)
    }
    catch (error) {
      // Handle different error scenarios
      const errorMessage = error.response?.data?.message ||
        error.message ||
        'An unexpected error occurred';

      toast.error(errorMessage, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  }

  return (
    <>
    <TableContainer component={Paper}>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
    
        <TableHead>
          <TableRow>
            <TableCell><strong>Sr No</strong></TableCell>
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
                      <TableCell align="center">
                        <IconButton aria-label="edit" color="primary" onClick={() => editRow(items._id)} className='m-1'>
                          <EditIcon />
                        </IconButton>
                        <IconButton aria-label="delete" color="error" onClick={() => deleteRow(items._id)} className='m-1'>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                      
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

{
  edit ?
  <UpdateForm oneUser={oneUser} updateUser={updateUser} />
    : ''
}
</>
  );
}
