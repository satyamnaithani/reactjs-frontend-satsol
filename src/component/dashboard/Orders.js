import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';

// Generate Order Data
function createData(billNo, billDate, itemName, rate, gstAmount, productAmount, lotMfg, lotExp, quantity) {
  return { billNo, billDate, itemName, rate, gstAmount, productAmount, lotMfg, lotExp, quantity};
}

const rows = [
  createData(0, '16 Mar, 2019', 'Abc', 3500, '12%', 3864.76, '03/19', '11/21', 15),
  createData(1, '16 Mar, 2019', 'Abc', 3500, '12%', 3864.76, '03/19', '11/21', 15),
  createData(2, '16 Mar, 2019', 'Abc', 3500, '12%', 3864.76, '03/19', '11/21', 15),
  createData(3, '16 Mar, 2019', 'Abc', 3500, '12%', 3864.76, '03/19', '11/21', 15),
  createData(4, '16 Mar, 2019', 'Abc', 3500, '12%', 3864.76, '03/19', '11/21', 15),
  createData(5, '16 Mar, 2019', 'Abc', 3500, '12%', 3864.76, '03/19', '11/21', 15),
];

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Orders() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Recent Orders</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Bill No.</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Rate</TableCell>
            <TableCell>GST%</TableCell>
            <TableCell>Product Amount</TableCell>
            <TableCell>Lot Mfg.</TableCell>
            <TableCell>Lot Exp.</TableCell>
            <TableCell align="right">Quantity</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.billNo}>
              <TableCell>{row.billNo}</TableCell>
              <TableCell>{row.billDate}</TableCell>
              <TableCell>{row.itemName}</TableCell>
              <TableCell>{row.rate}</TableCell>
              <TableCell>{row.gstAmount}</TableCell>
              <TableCell>{row.productAmount}</TableCell>
              <TableCell>{row.lotMfg}</TableCell>
              <TableCell>{row.lotExp}</TableCell>
              <TableCell align="right">{row.quantity}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          See more orders
        </Link>
      </div>
    </React.Fragment>
  );
}
