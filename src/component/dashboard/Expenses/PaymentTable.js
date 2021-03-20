import React, {useState} from "react";
import axios from 'axios';
import { url } from '../../../globalVariables'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';


export default function PaymentTable({title}) {
    const classes = useStyles();
    const [purchaseData, setPurchaseData] = useState([]);
    React.useEffect(() => {
        axios({
          method: 'GET',
      
          url: url + '/purchase',
          headers: {'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token')).token}
      })
      .then(response => {
          console.log(response);
          setPurchaseData(response.data)
      })
      .catch(error => {console.log(error)
      alert(error)})
  }, [title]);
  return (
    <div className={classes.root}>
        <h2 className={classes.heading}>{title + ' Transactions'}</h2>
        <TableContainer>
            <Table className={classes.table} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell>Lot</TableCell>
                        <TableCell align="center">{title}</TableCell>
                        <TableCell align="center">Item</TableCell>
                        <TableCell align="center">Date</TableCell>
                        <TableCell align="center">Bill Amount</TableCell>
                        <TableCell align="center">Update Amount</TableCell>
                        <TableCell align="center">Payment Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {purchaseData.map((row) => (
                    <TableRow className="classes.tableBody" key={row._id}>
                    <TableCell component="th" scope="row">
                        {row.lotNo}
                    </TableCell>
                    <TableCell align="center">{row.vendor}</TableCell>
                    <TableCell align="center">{row.item}</TableCell>
                    <TableCell align="center">{new Date(row.billDate).toLocaleDateString()}</TableCell>
                    <TableCell align="left">{parseFloat(row.purchaseRate * row.quantity).toFixed(2)}</TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
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
      marginTop: '100px',
      backgroundColor: '#fff',
      margin: '10px',
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
    },
    tableBody: {
        overFlowY: 'scroll'
    }
  }));