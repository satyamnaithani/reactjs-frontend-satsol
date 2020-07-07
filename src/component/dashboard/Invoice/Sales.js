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

import TablePagination from '@material-ui/core/TablePagination';
import DateSelector from './DateSeletor'

export default class Orders extends React.Component {

  componentDidMount() {
    axios({
      method: 'GET',

      url: url + '/sales/'+this.state.page+'/'+this.state.rowsPerPage
    })
      .then(response => this.setState({ data: response.data.sales, isLoading: false, open: false, totalSalesCount: response.data.count }))
      .catch(error => console.log(error))
  }
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      data: [],
      page: 0,
      rowsPerPage:10,
      totalSalesCount: 0,
      paginationVisible: true,
    }
  }
  dateSelector = (startDate, endDate) => {
    this.setState({ isLoading: true, paginationVisible: false })
    axios({
      method: 'GET',

      url: url + '/sales/date/' + startDate + '/' + endDate
    })
      .then(response => this.setState({ data: response.data, isLoading: false, open: false, totalSalesCount: response.data.length }))
      .catch(error => console.log(error))
  }
  
  handleChangePage = (event, newPage) => {
    this.setState({page: newPage, isLoading: true})
    axios({
      method: 'GET',

      url: url + '/sales/'+newPage*this.state.rowsPerPage+'/'+this.state.rowsPerPage
    })
      .then(response => this.setState({ data: response.data.sales, isLoading: false, open: false, totalSalesCount: response.data.count }))
      .catch(error => console.log(error))
  }
  handleChangeRowsPerPage=(event) => {
    this.setState({rowsPerPage: parseInt(event.target.value, 10), page: 0, isLoading:true })
    axios({
      method: 'GET',

      url: url + '/sales/'+this.state.page+'/'+event.target.value
    })
      .then(response => this.setState({ data: response.data.sales, isLoading: false, open: false, totalSalesCount: response.data.count }))
      .catch(error => console.log(error))
  }

  render() {
    return (
      <React.Fragment>
        
          <Typography component="h2" variant="h4" color="primary" align='center' gutterBottom>
            Sales
    </Typography><br />
          <DateSelector dateSelector={this.dateSelector} /><br /><br />
          {
            this.state.paginationVisible?  <TablePagination
            component="div"
            count={this.state.totalSalesCount}
            page={this.state.page}
            onChangePage={this.handleChangePage}
            rowsPerPage={this.state.rowsPerPage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
            style={{ backgroundColor: '#ebfeff' }}
          />
          :
          ''
          }
         
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
                  // <p>Loading...</p>
                  :
                  
                  this.state.data.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>{++index}</TableCell>
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

          </Table>
        
      </React.Fragment>
    );
  }
}
