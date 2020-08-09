import React, { lazy, Suspense } from 'react';
import DrawerM from '../DrawerM'
import AppBarM from '../../common/AppBarM'
const StockCardM = lazy(()=>import('./StockCardM'))
export default function StockM() {
  return (
    <>
    <AppBarM/>
    <Suspense fallback={<div/>}>
    <StockCardM/>
    </Suspense>
    <br/>
    <br/>
    <DrawerM value={1}/>
    </>
  );
}

