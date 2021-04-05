import React from "react";
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core/styles';
import PendingButton from '@material-ui/icons/ErrorOutlined';
import CompleteButton from '@material-ui/icons/DoneAllOutlined';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import SaleDetails from './SaleDetails';
import Skeleton from "@material-ui/lab/Skeleton";

const SalesRow = ({isLoading, row}) => {
  let totalTransactionAmount = 0;
  let grandTotal = 0;
  let pendingAmount = 0;
  if(row.transaction) {
    row.transaction.forEach((data) => totalTransactionAmount += parseFloat(data.amount));
    grandTotal = parseFloat(row.grandTotal);
    pendingAmount = grandTotal - totalTransactionAmount;
  }
  const tableCell = [<SaleDetails data={row} pendingAmount={pendingAmount}/>, `${row.invoiceNo}`, `${row.date === null ? '' : new Date(row.date).toLocaleDateString()}`, `${row.customerName}`, <ItemDetails orderData= {row.orderData}/>, `₹${row.grandTotal}`, `₹${pendingAmount}`, <TransactionStatus pendingAmount={pendingAmount} grandTotal={grandTotal} />];
  return (
    <TableRow>
        {tableCell.map((data, index) => <TableCell key={index} align="center"> {isLoading ? <Skeleton width={50} animation="wave" /> : data}</TableCell>)}
    </TableRow>
  );
}
const ItemDetails = ({orderData}) => {
    const BorderLessCell= withStyles({
        root: {
          borderBottom: "none"
        }
    })(TableCell);
    return(
        <Table size="small" >
            <TableBody>
                {orderData.map((item, index) => (
                    <TableRow key={index}>
                        <BorderLessCell align="left">{item.item}</BorderLessCell>
                        <BorderLessCell align="right">{item.quantity}</BorderLessCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
const TransactionStatus = ({pendingAmount, grandTotal}) => {
    let halfPending;
    pendingAmount === grandTotal ? halfPending = false : halfPending = true;
    return(
        <>
        {pendingAmount !== 0 ? <PendingButton style={{ color: halfPending ? '#FFF720' :'red' }} /> : <CompleteButton style={{ color: 'green' }} />}
        </>
    );
}

export default SalesRow;