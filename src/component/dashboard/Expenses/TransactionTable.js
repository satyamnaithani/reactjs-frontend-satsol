import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

export default function PaymentTable({data}) {
    const classes = useStyles();
    const tableHead = ['Paid Amoint', 'Date', 'Mode', 'Details'];
  return (
    <div className={classes.root}>
        <TableContainer>
            <Table className={classes.table} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        {tableHead.map((heading, index) => (<TableCell key={index} children={heading} />))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data === undefined ? '' : data.map((row) => (
                        <TableRow key={row._id}>
                            <TableCell align="center">{row.amount}</TableCell>
                            <TableCell align="center">{row.date}</TableCell>
                            <TableCell align="center">{row.mode}</TableCell>
                            <TableCell align="center">{row.details}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </div>
  );
}
const useStyles = makeStyles(() => ({
    root: {
      backgroundColor: '#fff',
      padding: '1%'
    },
    heading: {
        textAlign: 'center',
    },
    rowHeading: {
        backgroundColor: '#caf7e3',
        textAlign: 'left'
    },
    table: {
        overFlowY: 'scroll'
    },
    row: {
        backgroundColor: '#edffec'
    }
  }));