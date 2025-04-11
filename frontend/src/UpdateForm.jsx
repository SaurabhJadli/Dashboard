import { Button, TextField } from '@mui/material'
import React from 'react'

export default function UpdateForm(props) {
  return (
    <div className='mt-5 w-75 mx-auto'>
  <hr />
  <form onSubmit={props.updateUser}>
   
      <TextField id="outlined-basic" name='name' defaultValue={props.oneUser.name} variant="outlined" />
      
      <TextField id="outlined-basic" name='email' defaultValue={props.oneUser.email} variant="outlined" />
   
      <TextField id="outlined-basic" name='phone' defaultValue={props.oneUser.phone} variant="outlined" />
     
      <TextField id="outlined-basic" name='message' defaultValue={props.oneUser.message} variant="outlined" />
      
      <TextField id="outlined-basic" name='role' defaultValue={props.oneUser.role} variant="outlined" />
     
     <div>
      <Button variant="contained" type='submit' color="primary" className='mt-1 w-100'>Update</Button>
     </div>
    </form>
    </div>
  )
}
