import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from '../Header'
import Drawer from '../Drawer'
import StockDisplay from './StockDisplay'
import {useStyles} from '../useStyles'



export default function Orders() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header/>
      <Drawer/> 
      <StockDisplay/>
    </div>
  );
}

