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
import { saveAs } from 'file-saver';
import GetAppIcon from '@material-ui/icons/GetApp';
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';
import IconButton from '@material-ui/core/IconButton';

export default class Orders extends React.Component {

  componentDidMount() {
    axios({
      method: 'GET',

      url: url + '/sales/' + this.state.page + '/' + this.state.rowsPerPage,
      headers: { 'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token')).token },
    })
      .then(response => this.setState({ data: response.data.sales, isLoading: false, open: false, totalSalesCount: response.data.count }))
      .catch(error => {
        alert(error)
        console.log(error)
      })
  }
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      data: [],
      page: 0,
      rowsPerPage: 10,
      totalSalesCount: 0,
      paginationVisible: true,
      isDownloading: false
    }
  }
  dateSelector = (startDate, endDate) => {
    this.setState({ isLoading: true, paginationVisible: false })
    axios({
      method: 'GET',

      url: url + '/sales/date/' + startDate + '/' + endDate,
      headers: { 'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token')).token },
    })
      .then(response => this.setState({ data: response.data, isLoading: false, open: false, totalSalesCount: response.data.length }))
      .catch(error => console.log(error))
  }

  handleChangePage = (event, newPage) => {
    this.setState({ page: newPage, isLoading: true })
    axios({
      method: 'GET',

      url: url + '/sales/' + newPage * this.state.rowsPerPage + '/' + this.state.rowsPerPage,
      headers: { 'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token')).token }
    })
      .then(response => this.setState({ data: response.data.sales, isLoading: false, open: false, totalSalesCount: response.data.count }))
      .catch(error => console.log(error))
  }
  handleChangeRowsPerPage = (event) => {
    this.setState({ rowsPerPage: parseInt(event.target.value, 10), page: 0, isLoading: true })
    axios({
      method: 'GET',

      url: url + '/sales/' + this.state.page + '/' + event.target.value,
      headers: { 'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token')).token }
    })
      .then(response => this.setState({ data: response.data.sales, isLoading: false, open: false, totalSalesCount: response.data.count }))
      .catch(error => console.log(error))
  }



  render() {
    var res = 0;
    const handleRow=(data)=> {
      if(data!==undefined|| data!==null){
      
      res = res + parseFloat(data) 
      console.log(res.toFixed(2))}
    }
    const handleDownloadPdf = (data) => {
      this.setState({isDownloading: true})
      const { orderData,
        challanNo,
        date,
        customer,
        invoiceNo,
        challanDate,
        modeOfPayment,
        orderNumber,
        dispatchThrough,
        destination,
        termsOfDelivery,
        interState,
        grandTotalInWords } = data
      const arr = orderData

      let arrSize = arr.length

      if (arr.length < 10) {
        for (var i = 0; i < 10 - arrSize; i++) {
          arr.push('')
        }
      }
      var dateFormat = date.split('T')[0].split('-')
      var dateString = dateFormat[2] + '-' + dateFormat[1] + '-' + dateFormat[0]
      if (challanDate !== null) {
        var ChallanDateFormat = challanDate.split('T')[0].split('-')
        var ChallanDateString = ChallanDateFormat[2] + '-' + ChallanDateFormat[1] + '-' + ChallanDateFormat[0]
      }
      arr[10] = customer
      arr[11] = invoiceNo
      arr[12] = ChallanDateString
      arr[13] = modeOfPayment
      arr[14] = orderNumber
      arr[15] = dispatchThrough
      arr[16] = destination
      arr[17] = termsOfDelivery
      arr[18] = interState
      arr[19] = grandTotalInWords
      arr[20] = dateString
      arr[21] = challanNo


      axios.post(url + '/pdf/create-pdf', arr)
        .then(() => axios.get(url + '/pdf/fetch-pdf', { responseType: 'blob' }))
        .then((res) => {
          const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
          saveAs(pdfBlob, invoiceNo+'.pdf');
          this.setState({ isPdfLoading: false, dialogOpen: false, isDownloading: false })
        })
        .catch(err => {
          this.setState({isDownloading: false})
          console.log(err)
          alert(err)
        })

  
  }
  return(
      <React.Fragment>

  <Typography component="h2" variant="h4" color="primary" align='center' gutterBottom>
    Sales
    </Typography><br />
  <DateSelector dateSelector={this.dateSelector} /><br /><br />
          {
  this.state.paginationVisible ? <TablePagination
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
             {
               
             handleRow(row.grandTotal)
             }
            <TableCell>{++index}</TableCell>
            <TableCell>{row.customerName}</TableCell>
            <TableCell>
              {row.orderData === null? '':row.orderData.map((item, index) => (
                
                  item===null || item === undefined || item.item === undefined ||item.checkout === undefined?'':
                  <Typography key={index}>{++index}{'.  '}{item.item}<br />({item.checkout + '' + item.uom}) ₹{item.sellingRate}</Typography>
              
                
                ))}
            </TableCell>
            <TableCell>{row.totalRate}</TableCell>
            <TableCell>{row.totalGst}</TableCell>
            <TableCell>{row.grandTotal}</TableCell>
            <TableCell>{row.date === null ? '' : row.date.split('T')[0].split('-')[2] + '-' + row.date.split('T')[0].split('-')[1] + '-' + row.date.split('T')[0].split('-')[0]}</TableCell>
            <TableCell>{row.invoiceNo}</TableCell>
              <TableCell align="center"><IconButton size='small'><GetAppIcon onClick={() => handleDownloadPdf(row)}/></IconButton>
              </TableCell>
          </TableRow>
        ))}

  </TableBody>

</Table>
<Backdrop style={{
    zIndex: 4,
    color: '#fff',
  }} open={this.state.isDownloading}>
  <CircularProgress color="inherit" />
</Backdrop>
        
      </React.Fragment >
    );
  }
}
