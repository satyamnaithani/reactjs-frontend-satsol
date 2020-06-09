import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from '../Header'
import Drawer from '../Drawer'
import {useStyles} from '../useStyles'
import Form from './Form'
import Grid from '@material-ui/core/Grid';



export default function ItemMaster() {
  const classes = useStyles();

  return (
    <div className={classes.root} style={{height: '100vh'}}>
      <CssBaseline />
      <Header/>
      <Drawer/>
      <Grid style={{paddingLeft: '20px'}}container justify="center" spacing={2}>
      <Grid item xs={4}> <Form/></Grid>
      <Grid item xs={8}></Grid>
      </Grid>

      
    </div>
  );
}

