import React, { useState, useEffect} from 'react';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import {url} from '../../globalVariables'
import Skeleton from '@material-ui/lab/Skeleton';


const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});


export default function Deposits() {
   const [data, setData] = useState('');
   const [loading, setLoading] = useState(true)

  const classes = useStyles();
  useEffect(() => {
    axios({
      method: 'GET',
  
      url: url + '/expense/total',
      headers: {'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token')).token}
  })
      .then(response => {
          setData(response.data)
          setLoading(false)
      })
      .catch(error => console.log(error))
  }, []);
console.log(data)
  return (
    <React.Fragment>
      
      <Title>Monthly Expenses</Title>
      <Typography component="p" variant="h4">
        {loading?<Skeleton animation="wave" />: '₹'+ data.total}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
      {loading?<Skeleton animation="wave" />:'Transportation Expenses: ₹0000'}
      <br/>
      {loading?<Skeleton animation="wave" />:'Utitly Expenses: ₹0000'} 
        <br/>
        {loading?<Skeleton animation="wave" />:'Consumables Expenses: ₹0000'}
      </Typography>
    </React.Fragment>
  );
}
