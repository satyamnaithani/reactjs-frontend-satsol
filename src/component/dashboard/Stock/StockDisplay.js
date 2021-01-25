import React from 'react';
import Box from '@material-ui/core/Box';
import StockTable from './StockTable';
import Paper from '@material-ui/core/Paper';

  
  
  export default class StockDisplay extends React.Component {
    render() {
      return (
        <Box color="text.primary" mt={10} ml={3} mr={3} mb={5}>
          <Paper style={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '90vh', 
          }}>
            <StockTable/></Paper>
        </Box>
            
      );
    }
  }