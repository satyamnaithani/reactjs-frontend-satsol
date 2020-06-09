import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from '../Header'
import Drawer from '../Drawer'
import Form from './Form'
import StockForm from './StockForm'
import {useStyles} from '../useStyles'
import Grid from '@material-ui/core/Grid';



export default function Vendors() {
  const classes = useStyles();

  return (
    <div className={classes.root} style={{height: '100vh'}}>
      <CssBaseline />
      <Header/>
      <Drawer/>
      <Grid style={{paddingLeft: '20px'}}container justify="center" spacing={2}>
      <Grid item xs={1}></Grid>
      <Grid item xs={4}> <Form/></Grid>
      <Grid item xs={1}></Grid>
      <Grid item xs={5}><StockForm/></Grid>
      <Grid item xs={1}></Grid>
      </Grid> 
    </div>
  );
}

