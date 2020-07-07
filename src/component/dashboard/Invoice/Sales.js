import React from 'react';
import axios from 'axios';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
//import Title from './Title';
import TableSkeleton from '../../common/TableSkeleton';
import { url } from '../../../globalVariables';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';
import DateSelector from './DateSeletor'

export default class Orders extends React.Component {

  componentDidMount() {
    axios({
      method: 'GET',

      url: url + '/sales'
    })
      .then(response => this.setState({ data: response.data, isLoading: false, open: false }))
      .catch(error => console.log(error))
  }
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      data: []
    }
  }
  render() {
    console.log(this.state.data)
    return (
      <React.Fragment>
        <Paper>
          <Typography component="h2" variant="h3" color="primary" align='center' gutterBottom>
            Sales
    </Typography>
    <DateSelector/><br/><br/>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Serial No.</TableCell>
                <TableCell>Customer Name</TableCell>
                <TableCell>Product Details</TableCell>
                <TableCell>Total Rate</TableCell>
                <TableCell>Total GST</TableCell>
                <TableCell>Grand Total</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Invoice Number</TableCell>
                <TableCell align="right">Download Pdf</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                this.state.isLoading ?
                  <TableSkeleton />
                  :
                  this.state.data.map((row, index) => (

                    <TableRow key={index}>
                      <TableCell>{++index}.</TableCell>
                      <TableCell>{row.customerName}</TableCell>
                      <TableCell>
                        {row.orderData.map((item, index) => (
                          <Typography key={index}>{++index}{'.  '}{item.item}<br />({item.checkout + '' + item.uom}) ₹{item.sellingRate}</Typography>
                        ))}
                      </TableCell>
                      <TableCell>{row.totalRate}</TableCell>
                      <TableCell>{row.totalGst}</TableCell>
                      <TableCell>{row.grandTotal}</TableCell>
                      <TableCell>{row.date === null ? '' : row.date.split('T')[0].split('-')[2] + '-' + row.date.split('T')[0].split('-')[1] + '-' + row.date.split('T')[0].split('-')[0]}</TableCell>
                      <TableCell>{row.invoiceNo}</TableCell>
                      <TableCell align="center">{'+'}</TableCell>
                    </TableRow>
                  ))}
              
            </TableBody>
            <TablePagination
                component="div"
                count={100}
                page={2}
                onChangePage={''}
                rowsPerPage={10}
                onChangeRowsPerPage={''}
              />
          </Table>
        </Paper>
      </React.Fragment>
    );
  }
}
