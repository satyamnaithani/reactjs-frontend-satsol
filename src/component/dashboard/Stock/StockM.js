import React from 'react';
import DrawerM from '../DrawerM'
import AppBarM from '../../common/AppBarM'
import StockCardM from './StockCardM';
export default function StockM() {
  

  return (
    <>
    <AppBarM/>
    <StockCardM/>
    <br/>
    <br/>
    <DrawerM value={1}/>
    </>
  );
}

