import React, { useState } from 'react'
import './Login.css'
import Box from '@mui/material/Box';
import { Button, Stack } from '@mui/material';
import TextField from '@mui/material/TextField';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import env from '../../env';
import toast from 'react-hot-toast';

function Login() {

    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const navigate=useNavigate()
    
    const handlelogin = async () => {
        try {
            let res = await axios.post(`${env.API_URL}/login`, {
                    email,password
            })
            if (res.status == 200) {
                navigate('/dash')
                toast.success(res.data.message)
                setemail("")
                setpassword("")
                console.log(res)
            }
          } catch (error) {
            toast.error(error.response.data.message)
            console.log(error)
          }
    }

    return <>
        <div className='login_wrapper'>
            <Box
                className='form'
      component="form"
      sx={{
        '& > :not(style)': { m:1, width: '32ch' },display:"flex",flexDirection:"column",alignItems:'center',justifyContent:"center"
      }}
      noValidate
                autoComplete="off"
            >       
                            <h1 className='login'>Log in</h1>

                <TextField id="outlined-basic" label="Enter your email" variant="outlined"  className='input'  onChange={(e)=>setemail(e.target.value)}/>
                <TextField id="outlined-basic" label="Enter your password" variant="outlined" className='input'onChange={(e)=>setpassword(e.target.value)}/>
                <Link to={'/forgot'}><p className='forgot'>Forgotten your password?</p></Link>
                <Stack spacing={2}>
                    <Button variant="contained" className=' button' onClick={handlelogin}>Log in</Button>
                    <p className='login_link'>Don't have an account?&nbsp;&nbsp;<Link to={'/signup'}>Sign up</Link></p> 
                </Stack>
        </Box>
        </div>
    </>
}

export default Login
