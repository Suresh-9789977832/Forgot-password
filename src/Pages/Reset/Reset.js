import React, { useEffect, useState } from 'react'
import axios from 'axios';
import env from '../../env';
import toast from 'react-hot-toast';
import Box from '@mui/material/Box';
import { Button, Stack } from '@mui/material';
import TextField from '@mui/material/TextField';
import './Reset.css'
import { useNavigate, useParams } from 'react-router-dom';


function Reset() {
    let { id, token } = useParams()
  const [password, setpassword] = useState("")
  const navigate=useNavigate()

      useEffect(() => {
        getreset()
      },[])    

  const getreset = async () => {
        try {
          let res = await axios.get(`${env.API_URL}/reset/${token}/${id}`)
          if (res.status == 400) {
              navigate('/')
              toast.error("Invalid reset link please generate new link")
            }
        } catch (error) {
          if (error.response.status == 500) {
            navigate('/')
            toast.error("Invalid reset link please generate new link")
          }
        }
      }

  
      const resetpassword = async () => {
        try {
          let res = await axios.post(`${env.API_URL}/reset/${token}/${id}`, {password})
          if (res.status == 200) {
              navigate('/')
              toast.success(res.data.message)
              setpassword(" ")
              console.log(res)
          }
        } catch (error) {
          if (error.response.status == 500) {
            navigate('/')
            toast.error("Invalid reset link please generate new link")
          }
        }
  }
  
  
    return <>
             <div className='reset_wrapper'>
            <Box
                className='form'
      component="form"
      sx={{
        '& > :not(style)': { m:1, width: '32ch' },display:"flex",flexDirection:"column",alignItems:'center',justifyContent:"center"
      }}
      noValidate
                autoComplete="off"

            >       
                            <h1 className='reset_title'>Reset password</h1>

                <TextField id="outlined-basic" label="Enter your password" variant="outlined"  className='input' onChange={(e)=>setpassword(e.target.value)}/>
                <Stack spacing={2}>
                    <Button variant="contained" className=' button' onClick={resetpassword}>Update password</Button>
                    
                </Stack>
        </Box>
        </div>
    </>
}

export default Reset
