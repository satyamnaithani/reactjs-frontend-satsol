import React,{lazy, Suspense} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from '../Header'
import Drawer from '../Drawer'
import {useStyles} from '../useStyles'
const SalesContainer = lazy(()=> import('./SalesContainer'))


export default function Invoice() {
  const classes = useStyles();

  return (
    <div className={classes.root} style={{minHeight: '100vh'}}>
      
      <CssBaseline />
      <Header/>
      <Drawer/>
      <Suspense fallback={'Loading...'}>
      <SalesContainer/>
      </Suspense>
    </div>
  );
}

