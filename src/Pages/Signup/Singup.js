import React, { useState } from 'react'
import Box from '@mui/material/Box';
import { Button, Stack } from '@mui/material';
import TextField from '@mui/material/TextField';

import './Signup.css'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import env from '../../env';
import toast from 'react-hot-toast';

function Singup() {

    const [name, setname] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const navigate = useNavigate()
    
    
    const handlesignup = async () => {
      try {
        let res = await axios.post(`${env.API_URL}/signup`, {
            name,email,password
        })
        if (res.status == 200) {
            navigate('/')
            toast.success(res.data.message)
            setemail("")
            setpassword("")
            setname("")
            console.log(res)
        }
      } catch (error) {
        toast.error(error)
        console.log(error)
      }
    }
    
    return <>
         <div className='signup_wrapper'>
            <Box
                className='form'
      component="form"
      sx={{
        '& > :not(style)': { m:1, width: '32ch' },display:"flex",flexDirection:"column",alignItems:'center',justifyContent:"center"
      }}
      noValidate
                autoComplete="off"

            >    
                <h1 className='signup'>Sign up</h1>
                <TextField id="outlined-basic" label="Enter your name" variant="outlined"  className='input'   onChange={(e)=>setname(e.target.value)} type='text'/>
                <TextField id="outlined-basic" label="Enter your email" variant="outlined"  className='input'  onChange={(e)=>setemail(e.target.value)} type='email'/>
                <TextField id="outlined-basic" label="Enter your password" variant="outlined" className='input' onChange={(e) => setpassword(e.target.value)} type='password' style={{position:"relative"}}/>
              
                <Stack spacing={2}>
                    <Button variant="contained" className=' button' onClick={handlesignup}>Sign up</Button>

                    <p className='signup_link'>Have an account?&nbsp;&nbsp;<Link to={'/'}>Log in</Link></p>
                </Stack>
        </Box>
        </div>
    </>
}

export default Singup
