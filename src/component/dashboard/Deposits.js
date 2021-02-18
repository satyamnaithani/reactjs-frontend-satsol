import React, {useEffect, useState} from 'react';
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
  const [grandTotal, setGrandTotal] = useState('');
  const [date, setDate] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [addedBy, setAddedBy] = useState('');
  const [loading, setLoading] = useState(true)
  const classes = useStyles();
  useEffect(() => {
        axios({
          method: 'GET',
      
          url: url + '/sales/recent',
          headers: {'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token')).token}
      })
      .then(response => {
        if(response.data.length > 0) {
          let {grandTotal, date, customerName, addedBy } = response.data[0];
          setGrandTotal(grandTotal);
          setDate(date);
          setCustomerName(customerName);
          setAddedBy(addedBy);
        }
        setLoading(false)
      })
      .catch(error => {console.log(error)
      alert(error)})
  }, []);
  return (
    <React.Fragment>
      <Title>Recent Sale</Title>
      <Typography component="p" variant="h4">
        {loading?<Skeleton animation="wave" />: '₹'+ grandTotal}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        {loading?<Skeleton animation="wave" />: 'on '+ date.split('T')[0].split('-')[2]+'/'+ date.split('T')[0].split('-')[1]+'/'+ date.split('T')[0].split('-')[0]} 
        <br/>
        {loading?<Skeleton animation="wave" />:'to '+ customerName}
        <br/>
        {loading?<Skeleton animation="wave" />:'by '+ addedBy}
      </Typography>
    </React.Fragment>
  );
}
