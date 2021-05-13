import React from 'react';
import axios from 'axios';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import TableSkeleton from '../common/TableSkeletonDashboard';
import {url} from '../../globalVariables';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';


export default class Orders extends React.Component {

  componentDidMount() {
    axios({
      method: 'GET',
      url: url + '/stock',
      headers: {'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token')).token},
    })
      .then(response => this.setState({ data: response.data.items, isLoading: false, open: false }))
      .catch(error => {
           //console.log(error)
           this.setState({error:true})
      })
      
  }
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      data: [],
      token: '',
      error: false
    }
   
  }
  
  
  render() {
    const dateFormatter = (date) => {
      let dateArray = date.split('/');
      return dateArray[1] + '/' + dateArray[0] + '/' + dateArray[2];
  }
  return (
    <React.Fragment>
      <Title>Available Stock</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Vendor</TableCell>
            <TableCell>Rate</TableCell>
            <TableCell>GST%</TableCell>
            <TableCell>Product Amount</TableCell>
            <TableCell>Lot Exp.</TableCell>
            <TableCell>UOM</TableCell>
            <TableCell align="right">Quantity</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            this.state.isLoading ?
            <TableSkeleton/>
            :
          this.state.data.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.data.item}</TableCell>
              <TableCell>{row.data.vendor}</TableCell>
              <TableCell>{row.data.rate}</TableCell>
              <TableCell>{row.data.gst}</TableCell>
              <TableCell>{row.data.purchaseRate === null ?'':row.data.purchaseRate.toFixed(2)}</TableCell>
              <TableCell>{row.data.exp === null ?'': dateFormatter(new Date(row.data.exp).toLocaleDateString())}</TableCell>
              <TableCell>{row.data.uom}</TableCell>
              <TableCell align="right">{row.data.quantity}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Snackbar open={this.state.error}  onClose={()=> this.setState({error: false})} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert elevation={6} variant="filled" onClose={()=> this.setState({error: false})} severity="error">
          Error!
      </Alert>
      </Snackbar>
    </React.Fragment>
  );
}
}
