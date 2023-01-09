import React, { useState } from 'react';
import {Box, Button, Grid,  Typography , Hidden} from '@mui/material';
import AuthModel from './AuthModel';


const Home = () => {
  const[openAuthModel,setOpenAuthModel]=useState(false);

  return (
        <Box display="flex" flexDirection="column" p={3} boxSizing="border-box" height="100vh" bgcolor="#56B7BA" color="#fff">
        
        {openAuthModel && <AuthModel onClose={()=>setOpenAuthModel(false)}/>}

          <Box display='flex' alignItems='center' justifyContent="space-between">
            <Typography variant='h4'>Shortly</Typography>
            <Button onClick={()=>setOpenAuthModel(true)} color='inherit'>Login/Signup</Button>
          </Box>
          
          <Box display='flex' flexGrow={1}  alignItems='center'>
          <Grid container alignItems='center' >
            <Grid item sm={6} >
              <Box>
                <Typography variant='h4'>Short Links,Big Results</Typography>
                <Box my={2}>  <Typography>Powerful link shortener to help you grow your brand</Typography> </Box>
                <Button color='inherit' variant='contained' style={{backgroundColor:'black'}} size='large' disableElevation onClick={()=>setOpenAuthModel(true)}>Get Started</Button>
              </Box>
            </Grid>

            <Hidden only="xs"><Grid item sm={6} >
              <img style={{width:'100%', borderRadius:"10px", boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.1)", }} src="/assets/mockup.png" alt="mockup" />
            </Grid></Hidden>
          </Grid>
          </Box>
        </Box>
  )
}

export default Home


