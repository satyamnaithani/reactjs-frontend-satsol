import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import { url } from '../../globalVariables'
import Skeleton from '@material-ui/lab/Skeleton';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import ExpensesDialog from './ExpensesDialog'
const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
  formControl: {
    minWidth: 100,
    textDecoration: 'none'
  },
});


export default function Deposits() {
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState('all')
  const classes = useStyles();

  const fetchAll = () => {
    axios({
      method: 'GET',

      url: url + '/expense/total',
      headers: { 'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token')).token }
    })
      .then(response => {
        setData(response.data)
        setLoading(false)
      })
      .catch(error => {
        setLoading(false)
        console.log(error)})
  }

  const fetchUser = (user) => {
    setLoading(true)
    if(user === 'all'){
      fetchAll()
    }
    else {
    axios({
      method: 'GET',

      url: url + '/expense/total/' + user,
      headers: { 'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token')).token }
    })
      .then(response => {
        setData(response.data)
        setLoading(false)
      })
      .catch(error => console.log(error))
    }
  }
  // const handleInfo = () => {
  //  setOpen(true)
  //  console.log(open)
  // }


  useEffect(() => {
    fetchAll()
  }, []);
  return (
    <div style={{ overflow: 'hidden' }}>
      <ExpensesDialog user={user} grandTotal={data.total}/>
      <FormControl style={{ float: 'right', transform: 'translate(-12px, 0px)' }} className={classes.formControl}>
        <InputLabel id="user">User</InputLabel>
        <Select
          labelId="user"
          name="User"
          label="User"
          id="user"
          value={user}
          onChange={e => {
            setUser(e.target.value)
            fetchUser(e.target.value)
          }}
        >
          <MenuItem value={"all"}>All</MenuItem>
          <MenuItem value={"Alok Naithani"}>Alok Naithani</MenuItem>
          <MenuItem value={"Ashish Joshi"}>Ashish Joshi</MenuItem>
          <MenuItem value={"Satyam Naithani"}>Satyam Naithani</MenuItem>
          <MenuItem value={"Test"}>Test</MenuItem>
        </Select>
      </FormControl>
      <Title style={{ float: 'left' }}>Monthly Expenses</Title>
      <Typography component="p" variant="h4">
        {loading ? <Skeleton animation="wave" /> : '₹' + data.total}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        {loading ? <Skeleton animation="wave" /> : 'Transportation Expenses: ₹' + data.transportation.sum}
        <br />
        {loading ? <Skeleton animation="wave" /> : 'Utitly Expenses: ₹' + data.utility.sum}
        <br />
        {loading ? <Skeleton animation="wave" /> : 'Consumables Expenses: ₹' + data.consumables.sum}
      </Typography>
      
    </div>
  );
}

