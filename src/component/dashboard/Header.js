import React from 'react';
import clsx from 'clsx';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import ExitToApp from '@material-ui/icons/ExitToApp';
//import MenuIcon from '@material-ui/icons/Menu';
import {useStyles} from './useStyles'
import {url} from '../../globalVariables'
import axios from 'axios';
import {Redirect} from 'react-router-dom'



export default function Headers() {
    const classes = useStyles();
    const [open] = React.useState(true);
    const [logout, setLogout] = React.useState(false);
    const handleLogout = () => {
      axios({
        method: 'POST',
        url: url + '/logout/blacklist',
        data: {
          token: JSON.parse(localStorage.getItem('token')).token
        }
       
      })
        .then(response => {
          if(response.status === 200){
          setLogout(true)
          }
          //console.log(response.status) 
        })
        .catch(error => console.log(error))
    }
    if(logout){
      return <Redirect to= '/' exact/>
    }
    return (
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Dashboard
          </Typography>
          <IconButton color="inherit"onClick={handleLogout}>
            <Badge badgeContent={'Logout'} style={{color:'#fff'}}>
              <ExitToApp />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
    
    )
}

