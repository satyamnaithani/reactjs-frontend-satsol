import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import {url} from '../../globalVariables'
import Skeleton from '@material-ui/lab/Skeleton';

function preventDefault(event) {
  event.preventDefault();
}

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
  
      url: url + '/sales/recent'
  })
      .then(response => {
          setData(response.data[0])
          setLoading(false)
      })
      .catch(error => console.log(error))
  }, []);
 // console.log(data)
  return (
    <React.Fragment>
      
      <Title>Recent Sale</Title>
      <Typography component="p" variant="h4">
        {loading?<Skeleton animation="wave" />: '₹'+data.grandTotal}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        {loading?<Skeleton animation="wave" />:data.date === undefined ?'':'on '+data.date.split('T')[0].split('-')[2]+'/'+data.date.split('T')[0].split('-')[1]+'/'+data.date.split('T')[0].split('-')[0]} 
        <br/>
        {loading?<Skeleton animation="wave" />:'to '+data.customerName}
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View Total Sale
        </Link>
      </div>
    </React.Fragment>
  );
}
