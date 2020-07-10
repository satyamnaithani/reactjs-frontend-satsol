import React from 'react';
import DrawerM from './DrawerM'
import AppBarM from '../common/AppBarM'
import MonthlySaleM from './MonthlySaleM'
import DepositsM from './DepositsM'
export default function DashboardM() {
  

  return (
    <>
    <AppBarM/>
    {/* <p>Dashboard</p> */}
    <DepositsM/>
    <MonthlySaleM/>
    <DrawerM value={0}/>
    </>
  );
}

