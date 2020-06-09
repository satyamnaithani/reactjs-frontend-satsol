import React from 'react';
import clsx from 'clsx';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import ExitToApp from '@material-ui/icons/ExitToApp';

import {useStyles} from './useStyles'



export default function Headers() {
    const classes = useStyles();
    const [open] = React.useState(true);

    return (
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Dashboard
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={'Logout'} style={{color:'#fff'}}>
              <ExitToApp />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
    
    )
}

