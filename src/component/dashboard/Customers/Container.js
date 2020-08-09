import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Table from './Table'

class OrderList extends Component {

  render() {
    return (
      <Box color="text.primary" mt={10} ml={3} mr={3} mb={5}>
        <Paper style={{
            display: 'flex',
            overflow: 'auto',
            flexDirection: 'column',
            minHeight: '90vh', 
            //minWidth: '80vh',
            //overflowX: "hidden",
            overflowY: 'hidden'
          }}>
            <Table/>
        </Paper>
      </Box>
    );
  }
}

export default OrderList;
