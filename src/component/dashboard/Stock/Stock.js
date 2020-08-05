import React, { Suspense } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from '../Header'
import Drawer from '../Drawer'
import {useStyles} from '../useStyles'
const StockDisplay = React.lazy(()=> import('./StockDisplay'))



export default function Orders() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header/>
      <Drawer/> 
      <Suspense fallback={<div/>}>
      <StockDisplay/>
      </Suspense>
    </div>
  );
}

