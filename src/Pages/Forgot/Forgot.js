import React, { useState } from 'react'
import Box from '@mui/material/Box';
import { Button, Stack } from '@mui/material';
import TextField from '@mui/material/TextField';
import './Forgot.css'
import axios from 'axios';
import env from '../../env';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


function Forgot() {

  const [email, setemail] = useState("")
  const navigate=useNavigate()
    
    const forgotpassword = async () => {
        try {
          let res = await axios.post(`${env.API_URL}/forgot`, {email})
          if (res.status == 200) {
              navigate('/')
              toast.success(res.data.message)
              setemail(" ")
              console.log(res)
            }
            
        } catch (error) {
          toast.error(error.response.data.message)
          console.log(error)
        }
      }

    return <>
            <div className='forgot_wrapper'>
            <Box
                className='form'
      component="form"
      sx={{
        '& > :not(style)': { m:1, width: '32ch' },display:"flex",flexDirection:"column",alignItems:'center',justifyContent:"center"
      }}
      noValidate
                autoComplete="off"

            >       
                            <h1 className='forgot_title'>Fogot password</h1>

                <TextField id="outlined-basic" label="Enter your email" variant="outlined"  className='input' onChange={(e)=>setemail(e.target.value)} value={email}/>
                <Stack spacing={2}>
                    <Button variant="contained" className=' button' onClick={forgotpassword}>send login link</Button>
                </Stack>
        </Box>
        </div>
    </>
}

export default Forgot
