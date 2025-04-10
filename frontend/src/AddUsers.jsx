import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { Button } from '@mui/material'
import React, { useRef, useState } from 'react'
import axios from "axios";
import { Bounce, ToastContainer, toast } from 'react-toastify';

export default function AddUsers() {
    const formRef = useRef();
    const [role, setRole] = useState('')

    const addUser = async (e) => {
        e.preventDefault();

        try {
            const formData = {
                name: e.target.name.value,
                email: e.target.email.value,
                phone: e.target.phone.value,
                message: e.target.message.value,
                role: role
            };

            const response = await axios.post('http://localhost:8000/api/addUser', formData);

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
            formRef.current.reset();
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
    };
    return (
        <>
            <form onSubmit={addUser} ref={formRef} className='p-5 mt-4 mx-auto border border-2 rounded-4'>
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
                
                <h1>Add User:</h1>
                <TextField
                    id="filled-basic"
                    className='w-100 mx-3'
                    label="Name"
                    name='name'
                    variant="outlined"
                    required
                />

                <TextField
                    id="filled-basic"
                    className='w-100 m-3'
                    label="Email"
                    variant="outlined"
                    type='email'
                    name='email'
                    required
                />

                <TextField
                    id="filled-basic"
                    className='w-100 mx-3'
                    label="Phone"
                    variant="outlined"
                    type='number'
                    name='phone'
                    minLength='10'
                    maxLength='12'
                    required
                />

                <TextField
                    id="filled-basic"
                    className='w-100 m-3'
                    label="Message"
                    name='message'
                    variant="outlined"
                    maxLength='500'
                    required
                />

                <FormControl fullWidth className='w-100 mx-3'>
                    <InputLabel id="demo-simple-select-label">Role</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Role"
                        name='role'
                        value={role}
                        onChange={(e) => setRole(e.target.value)}        >
                        <MenuItem value='User'>User</MenuItem>
                        <MenuItem value='Admin'>Admin</MenuItem>
                    </Select>
                </FormControl>

                <Button variant="contained" className='w-100 m-3' type='submit'>Submit</Button>

            </form>
        </>)
}
