import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from '../Header'
import Drawer from '../Drawer'
import {useStyles} from '../useStyles'
//import Grid from '@material-ui/core/Grid';
import SalesContainer from './SalesContainer';



export default function Invoice() {
  const classes = useStyles();

  return (
    <div className={classes.root} style={{minHeight: '100vh'}}>
      <CssBaseline />
      <Header/>
      <Drawer/>
      <SalesContainer/>
    </div>
  );
}

