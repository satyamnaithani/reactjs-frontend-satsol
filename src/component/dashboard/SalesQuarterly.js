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
  
      url: url + '/sales/quarterly',
      headers: {'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token')).token}
  })
      .then(response => {
          setData(response.data)
          setLoading(false)
      })
      .catch(error => console.log(error))
  }, []);

  return (
    <React.Fragment>
      <Title>Total Annual Sales</Title>
      <Typography component="p" variant="h4">
        {loading?<Skeleton animation="wave" />: '₹'+ data.total}
        <p style={{fontSize: '12px'}}>{ data.grandTotalInWords !== undefined ? data.grandTotalInWords.split('And')[0] : '' }</p>
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
      {loading?<Skeleton animation="wave" />:'Total Orders: '+ data.count}
      <br/>
      {loading?<Skeleton animation="wave" />:'Total GST: ₹'+ data.gst} 
      <br/>
      {data.quarterlyMonthStartDate}
      </Typography>
    </React.Fragment>
  );
}
