import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from './Header'
import Drawer from './Drawer'
import Main from './Main';
import {useStyles} from './useStyles'

export default function Dashboard() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header/>
      <Drawer/>
      <Main/>
    </div>
  );
} 

