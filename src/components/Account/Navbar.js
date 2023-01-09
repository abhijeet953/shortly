import React from 'react'
import { Typography , AppBar , Toolbar, Button , Box} from '@mui/material';
import { auth } from '../../firebase';

const Navbar = () => {
  return (
        <AppBar position='static' color='secondary' >
        <Toolbar>
            <Typography variant="h6">Shortly</Typography>
            <Box ml="auto">
                <Button color="inherit">Links</Button>
                <Button onClick={()=>auth.signOut()} color="inherit">Logout</Button>
            </Box>
        </Toolbar> 
    </AppBar>
  )
}

export default Navbar