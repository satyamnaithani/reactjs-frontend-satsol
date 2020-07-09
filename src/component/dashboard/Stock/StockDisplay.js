import React from 'react';
import Box from '@material-ui/core/Box';
import Stock from './StockTable';
import Paper from '@material-ui/core/Paper';

  
  
  export default class StockDisplay extends React.Component {
    render() {
      return (
        <Box color="text.primary" mt={10} ml={3} mr={3} style={{minHeight: '100vh'}}>
          <Paper style={{
            display: 'flex',
            overflow: 'auto',
            flexDirection: 'column',
            minHeight: '90vh', 
            minWidth: '80vw'
          }}>
            <Stock/></Paper>
        </Box>
      );
    }
  }