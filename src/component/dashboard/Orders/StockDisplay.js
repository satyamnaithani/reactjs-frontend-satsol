import React from 'react';
  //import axios from 'axios';
  //import Grid from '@material-ui/core/Grid';
  import Box from '@material-ui/core/Box';
  // import StockItemCard from './StockItemCard';
  // import Loader from '../../common/Loader';
  import Stock from './StockTable';
  import Paper from '@material-ui/core/Paper';
  //import { url } from '../../../globalVariables';
  
  
  export default class StockDisplay extends React.Component {
  
    // componentDidMount() {
    //   axios({
    //     method: 'GET',
  
    //     url: url + '/stock'
    //   })
    //     .then(response => this.setState({ data: response.data.items, isLoading: false, open: false }))
    //     .catch(error => {
    //       console.log(error)
    //     })
    // }
    // constructor(props) {
    //   super(props);
    //   this.state = {
    //     isLoading: true,
    //     open: true,
    //     data: []
    //   }
    // }
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
          {/*         
          <Grid container spacing={3}>
            {
              this.state.isLoading ?
                <Loader />     
                :
                this.state.data.map((itemData, index) => (
                  <StockItemCard key={index} index={index} itemData={itemData} />
                ))
            }
          </Grid> */}
        </Box>
      );
    }
  }