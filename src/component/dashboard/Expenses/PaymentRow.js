import React from "react";
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';
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
import InputLabel from '@material-ui/core/InputLabel';
export default function PaymentTable({row}) {
  const classes = useStyles();
  const completed = true;
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <TableRow key={row._id}>
      <TableCell align="center"><OpenIcon className={classes.button} onClick={() => {handleClickOpen()}}/></TableCell>
      <TableCell component="th" scope="row">
          {row.billNo}
      </TableCell>
      <TableCell align="center">{row.vendor}</TableCell>
      <TableCell align="center">{row.item}</TableCell>
      <TableCell align="center">{new Date(row.billDate).toLocaleDateString()}</TableCell>
      <TableCell align="left">{parseFloat(row.purchaseRate * row.quantity).toFixed(2)}</TableCell>
      <TableCell align="center">{parseFloat(row.purchaseRate * row.quantity).toFixed(2)}</TableCell>
      <TableCell align="center">{row.billNo == '0' ? <PendingButton style={{ color: completed ? 'red' :'#FFF720' }} /> : <CompleteButton style={{ color: 'green' }} />}</TableCell>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Transaction Details</DialogTitle>
        <DialogContent className={classes.dailog}>
          <form>
            <Grid container spacing={3}>
              <Grid item xs={12}><TextField label="Payment Amount" fullWidth variant="outlined" /></Grid>
              <Grid item xs={12}></Grid>
              <Grid item xs={12}>
                <TextField label="Payment Date" variant="outlined" fullWidth InputLabelProps={{shrink: true}}type="date"/>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="mode">Payment Mode</InputLabel>{' '}
                  <Select fullWidth variant="outlined" id="mode" label="Payment Mode">
                    <MenuItem value={'Online'}>Online</MenuItem>
                    <MenuItem value={'Cheque'}>Cheque</MenuItem>
                    <MenuItem value={'Cash'}>Cash</MenuItem>
                    <MenuItem value={'Others'}>Others</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField label="Payment Details" fullWidth multiline rows={4} variant="outlined"/>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
      </Dialog>
    </TableRow>
  );
}
const useStyles = makeStyles(() => ({
  button: {
      cursor: 'pointer'
  },
  dailog: {
    overflowY: 'hidden'
  }
}));