import React from 'react';
import axios from 'axios';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import TableSkeleton from '../common/TableSkeleton';
import {url} from '../../globalVariables';


export default class Orders extends React.Component {

  componentDidMount() {
    axios({
      method: 'GET',

      url: url + '/stock'
    })
      .then(response => this.setState({ data: response.data.items, isLoading: false, open: false }))
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
              {console.log(row)}
              <TableCell>{row.data.item}</TableCell>
              <TableCell>{row.data.vendor}</TableCell>
              <TableCell>{row.data.rate}</TableCell>
              <TableCell>{row.data.gst}</TableCell>
              <TableCell>{row.data.purchaseRate}</TableCell>
              <TableCell>{row.data.exp}</TableCell>
              <TableCell>{row.data.uom}</TableCell>
              <TableCell align="right">{row.data.quantity}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
}
