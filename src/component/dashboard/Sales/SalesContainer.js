import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
//import InvoiceList from './InvoiceList'
import SalesTable from './SalesTable'

class OrderList extends Component {

  render() {
    return (
      <Box color="text.primary" mt={10} ml={3} mr={3}>
        <Paper style={{
            display: 'flex',
            overflow: 'auto',
            flexDirection: 'column',
            minHeight: '90vh', 
            minWidth: '80vw',
            overflowX: "hidden"
          }}>
          {/* <InvoiceList/> */}
          <SalesTable/>
        </Paper>
      </Box>
    );
  }
}

export default OrderList;
