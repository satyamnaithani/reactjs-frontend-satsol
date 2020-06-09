import React from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import StockItemCard from './StockItemCard'
import Loader from '../../common/Loader'
import {url} from '../../../globalVariables'


export default class StockDisplay extends React.Component {

  

  componentDidMount() {
    axios({
      method: 'GET',

      url: url + '/stock'
    })
      .then(response => this.setState({ data: response.data.items, isLoading: false, open: false }))
      .catch(error => {
        console.log(error) 
      })
  }
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      open: true,
      data: []
    }
  }

  render() {
    return (
      <Box color="text.primary" mt={10} ml={3} mr={3}>
        <Grid container spacing={3}>
          {
            this.state.isLoading ?
              <Loader />     
              :
              this.state.data.map((itemData, index) => (
                <StockItemCard key={index} index={index} itemData={itemData} />
              ))
          }
        </Grid>
      </Box>
    );
  }
}