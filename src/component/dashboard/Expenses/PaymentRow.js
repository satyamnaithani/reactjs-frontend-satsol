import React, { useState } from "react";
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import PendingButton from '@material-ui/icons/ErrorOutlined';
import CompleteButton from '@material-ui/icons/DoneAllOutlined';
import OpenIcon from '@material-ui/icons/Launch';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import {url} from '../../../globalVariables'
import axios from 'axios';
import TransactionTable from './TransactionTable'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';

export default function PaymentTable({row}) {
  const BorderLessCell= withStyles({
    root: {
      borderBottom: "none"
    }
  })(TableCell);
  const classes = useStyles();
  const [amount, setAmount] = useState();
  const [date, setDate] = useState();
  const [mode, setMode] = useState();
  const [details, setDetails] = useState();
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const clearForm = () => {
    setAmount();
    setDate();
    setMode();
    setDetails();
  }
  const handleTransactionForm = (e) => {
    e.preventDefault();
    if(amount > pendingAmount) {
      alert('Please enter transaction amount less than or equal to pending amount');
      return;
    }
    let arr;
    row._id.transaction === undefined ? arr = [] : arr = row._id.transaction;
      const newTransaction = {
      amount: amount,
      date: date,
      mode: mode,
      details: details
    };
    let idArray = [];
    row.billDetails.forEach((data) => idArray.push(data._id));
    arr.push(newTransaction);
    console.log(arr);
    axios({
      method: 'PUT',
      url: url + '/purchase/transaction/updateMany',
      headers: {'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token')).token},
      data: {
        transaction: arr,
        idArray: idArray 
      }
    })
    .then(response => {
      if(response.data.message === 'success') {
        alert('Transaction updated!');
        clearForm();
      }
      handleClose();
    })
    .catch(error => {console.log(error)
    alert(error)})
  }
  let billAmount = 0;
  let paidAmount = 0;
  let pendingAmount;
  let halfPending;
  if(row.billDetails) {
    if(row._id.transaction) {
      row._id.transaction.forEach((data) => paidAmount += parseInt(data.amount));
    }
    row.billDetails.forEach((data) => billAmount += data.amount);
    billAmount = parseInt(billAmount.toFixed(2));
    pendingAmount = billAmount - paidAmount;
  }
  pendingAmount === billAmount ? halfPending = false : halfPending = true;
  return (
    <TableRow key={row._id}>
      <TableCell align="left"><OpenIcon className={classes.button} onClick={() => {handleClickOpen()}}/></TableCell>
      <TableCell align="left">{row._id.billNo}</TableCell>
      <TableCell align="left">{new Date(row._id.billDate).toLocaleDateString()}</TableCell>
      <TableCell align="left">{row._id.vendor}</TableCell>
      <TableCell align="left">
        <Table className={classes.table} size="small" >
          <TableBody>
          {row.billDetails.map((data, index) => (
            <TableRow key={index}>
              <BorderLessCell align="left">{data.item}</BorderLessCell>
              <BorderLessCell align="right">{data.quantity}{data.uom}</BorderLessCell>
            </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableCell>
      <TableCell align="left">{billAmount.toString()}</TableCell>
      <TableCell align="left">{pendingAmount.toString()}</TableCell>
      <TableCell align="left">{pendingAmount !== 0 ? <PendingButton style={{ color: halfPending ? '#FFF720' :'red' }} /> : <CompleteButton style={{ color: 'green' }} />}</TableCell>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Transaction Details - {row._id.vendor}({row._id.billNo})</DialogTitle>
        <DialogContent>
          <TransactionTable data={row._id.transaction}/>
          {
            pendingAmount === 0 ? '' : 
            <form onSubmit={handleTransactionForm}>
            <Grid container spacing={3}>
              <Grid item xs={12}><TextField placeholder={pendingAmount} required value={amount} label="Payment Amount" onChange={(e) => {setAmount(e.target.value)}} fullWidth variant="outlined" /></Grid>
              <Grid item xs={12}>
                <TextField required label="Payment Date" value={date} variant="outlined" onChange={(e) => setDate(e.target.value)} fullWidth InputLabelProps={{shrink: true}} type="date"/>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="mode">Payment Mode</InputLabel>{' '}
                  <Select required value={mode} onChange={(e) => setMode(e.target.value)} fullWidth variant="outlined" id="mode" label="Payment Mode">
                    <MenuItem value={'Online'}>Online</MenuItem>
                    <MenuItem value={'Cheque'}>Cheque</MenuItem>
                    <MenuItem value={'Cash'}>Cash</MenuItem>
                    <MenuItem value={'Others'}>Others</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField required value={details} onChange={(e) => setDetails(e.target.value)} label="Payment Details" fullWidth rows={4} variant="outlined"/>
              </Grid>
            </Grid>
            <div style={{display: 'flex', justifyContent: 'space-around', padding: '5px'}}>
              <Button onClick={handleClose} color="secondary">
                Cancel
              </Button>
              <Button type="submit" color="primary">
                Submit
              </Button>
            </div>
          </form>
          }
        </DialogContent>
      </Dialog>
    </TableRow>
  );
}
const useStyles = makeStyles(() => ({
  button: {
      cursor: 'pointer'
  }
}));