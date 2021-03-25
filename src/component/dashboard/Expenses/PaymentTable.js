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
import PaymentRow from './PaymentRow';

export default function PaymentTable({title}) {
    const classes = useStyles();
    const [purchaseData, setPurchaseData] = useState([]);
    const tableHead = ['View', 'Bill No', 'Date', 'Vendor', 'Item / Quantity', 'Bill Amount', 'Pending Amount', 'Status'];
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
            <Table className={classes.table} size="small" >
                <TableHead>
                    <TableRow>
                        {tableHead.map((heading, index) => (<TableCell key={index} align={heading === 'Item / Quantity' ? 'center' : 'left'} children={heading}/>))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {purchaseData.map((row) => (
                        <PaymentRow key={row._id} row={row}/>
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
    }
  }));