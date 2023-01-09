import React, { useEffect, useState } from 'react'
import {   Route , Redirect , Switch , useLocation} from 'react-router-dom';
import Home from './components/Home';
import Account from './components/Account';
import { ThemeProvider } from '@emotion/react';
import theme from './theme';
import { auth } from './firebase';
import { CircularProgress , Box} from '@mui/material';
import LinkRedirect from './components/LinkRedirect';

const App = () => {
  const[user,setUser]=useState(null);
  const {pathname} = useLocation();
  const[initialLoad,setInitialLoad]=useState((pathname === '/' || pathname === '/account') ? true : false);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
      setInitialLoad(false);
    });
  }, []);

  if (initialLoad)
    return (
      <Box mt={5} display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    );
    
  return (
    <ThemeProvider theme={theme}>
    
    <Switch>
      <Route exact path="/">
        {user ? <Redirect to="/account"/>:<Home/>}
      </Route>
      <Route path="/account">
        {user ? <Account/>:<Redirect to="/"/>}
      </Route>
        <Route path="/:shortCode">
          <LinkRedirect/>
        </Route>
        </Switch>
    
    </ThemeProvider>
  )
}

export default App
