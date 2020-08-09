import React, { lazy,Suspense } from 'react';
import DrawerM from './DrawerM'
import AppBarM from '../common/AppBarM'

const MonthlySaleM = lazy(()=> import('./MonthlySaleM'))
const DepositsM = lazy(()=> import('./DepositsM'))
export default function DashboardM() {
  

  return (
    <>
    <AppBarM/>
    {/* <p>Dashboard</p> */}
    <Suspense fallback={<div/>}>
    <DepositsM/>
    <MonthlySaleM/>
    </Suspense>
    <DrawerM value={0}/>
    </>
  );
}

