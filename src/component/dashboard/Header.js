import React from 'react';
import clsx from 'clsx';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {useStyles} from './useStyles'
import RegisterHeaderItem from './RegisterHeaderItem'


export default function Headers() {
    const classes = useStyles();
    const [open] = React.useState(true);
    return (
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Dashboard
          </Typography>
          <RegisterHeaderItem/>
        </Toolbar>
      </AppBar>
    
    )
}

