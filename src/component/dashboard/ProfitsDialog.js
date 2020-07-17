import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import InfoIcon from '@material-ui/icons/Info';
import IconButton from '@material-ui/core/IconButton';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);



const useStyles = makeStyles({
  table: {
    minWidth: 1200,

  },
  dialog: {
    height: 500
  }
})
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  console.log(props.data)

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <IconButton size='small' style={{ float: 'right', transform: 'translate(2px, 0px)' }}>
        <InfoIcon onClick={handleClickOpen} />
      </IconButton>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        maxWidth={'lg'}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        fullScreen

      >
        <DialogTitle id="alert-dialog-slide-title">{"Expenses Details"}</DialogTitle>
        <DialogContent className={classes.dialog}>
          <DialogContentText id="alert-dialog-slide-description">
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>gstReturn</StyledTableCell>
                  <StyledTableCell align="center">netProfit</StyledTableCell>
                  <StyledTableCell align="center">profitsExcludingExpenses</StyledTableCell>
                  <StyledTableCell align="center">totalConsumablesCost</StyledTableCell>
                  <StyledTableCell>totalExpenses</StyledTableCell>
                  <StyledTableCell align="center">totalGoodsExpense</StyledTableCell>
                  <StyledTableCell align="center">totalPurchaseGst</StyledTableCell>
                  <StyledTableCell align="center">totalPurchaseRateIncludingGst</StyledTableCell>
                  <StyledTableCell>totalUtilityCost</StyledTableCell>
                  <StyledTableCell align="center">totalSellingGst</StyledTableCell>
                  <StyledTableCell align="center">totalSellingRateIncludingGst</StyledTableCell>
                  <StyledTableCell align="center">totalTransportationCost</StyledTableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                  <StyledTableRow>
                    <StyledTableCell component="th" scope="row">{props.data.gstReturn}</StyledTableCell>
                    <StyledTableCell align="center">₹{props.data.netProfit}</StyledTableCell>
                    <StyledTableCell align="center">{props.data.profitsExcludingExpenses}</StyledTableCell>
                    <StyledTableCell align="center">{props.data.totalConsumablesCost}</StyledTableCell>
                    <StyledTableCell align="center">{props.data.totalExpenses}</StyledTableCell>
                    <StyledTableCell align="center">₹{props.data.totalGoodsExpense}</StyledTableCell>
                    <StyledTableCell align="center">{props.data.totalPurchaseGst}</StyledTableCell>
                    <StyledTableCell align="center">{props.data.totalPurchaseRateIncludingGst}</StyledTableCell>
                    <StyledTableCell align="center">{props.data.totalUtilityCost}</StyledTableCell>
                    <StyledTableCell align="center">₹{props.data.totalSellingGst}</StyledTableCell>
                    <StyledTableCell align="center">{props.data.totalSellingRateIncludingGst}</StyledTableCell>
                    <StyledTableCell align="center">{props.data.totalTransportationCost}</StyledTableCell>
                  </StyledTableRow>
               
              </TableBody>
            </Table>
          </TableContainer>
           
          </DialogContentText>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>InvoiceNo</StyledTableCell>
                  <StyledTableCell align="center">Customer Name</StyledTableCell>
                  <StyledTableCell align="center">Item
                  <TableHead>
                      <TableRow>
                        <StyledTableCell>Name</StyledTableCell>
                        <StyledTableCell align="center">gst</StyledTableCell>
                        <StyledTableCell align="center">Quantity</StyledTableCell>
                        <StyledTableCell align="center">purchaseRate</StyledTableCell>
                        <StyledTableCell align="center">sellingRate</StyledTableCell>
                        <StyledTableCell align="center">netProfit</StyledTableCell>
                      </TableRow>
                    </TableHead>
                  </StyledTableCell>
                  <StyledTableCell align="center">Date</StyledTableCell>
                  <StyledTableCell align="center">Added By</StyledTableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {props.data.data === undefined || props.data.data === null ? 'Loading...' : props.data.data.map((row, index) => (
                  <StyledTableRow key={row.index}>
                    <StyledTableCell component="th" scope="row">
                      {row.invoiceNo}
                    </StyledTableCell>
                    <StyledTableCell align="center">₹{row.customerName}</StyledTableCell>
                    <StyledTableCell align="center" style={{ minWidth: '120px' }}>


                      <TableBody style={{ minWidth: '120px' }}>
                      {row.itemArr === undefined || row.itemArr === null ? 'Loading...' : row.itemArr.map((row, index) => (
                        <TableRow key={row.index}>
                          <TableCell padding='100px' component="th" scope="row">{row.item}</TableCell>
                          <TableCell align="center">{row.gst}</TableCell>
                          <TableCell align="center">{row.checkoutOuantity}</TableCell>
                          <TableCell align="center">₹{row.purchaseRate}</TableCell>
                          <TableCell align="center">₹{row.sellingRate}</TableCell>
                          <TableCell align="center">₹{row.netProfit}</TableCell>
                        </TableRow>
                      )
                      )}</TableBody>
                    </StyledTableCell>
                    <StyledTableCell align="center">{row.date.split('T')[0].split('-')[2] + '-' + row.date.split('T')[0].split('-')[1] + '-' + row.date.split('T')[0].split('-')[0]}</StyledTableCell>
                    <StyledTableCell align="center">{row.addedBy}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}