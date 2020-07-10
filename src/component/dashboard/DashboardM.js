import React from 'react';
import DrawerM from './DrawerM'
import AppBarM from '../common/AppBarM'
// import Deposits from './Deposits'
import DepositsM from './DepositsM'
export default function DashboardM() {
  

  return (
    <>
    <AppBarM/>
    {/* <p>Dashboard</p> */}
    <DepositsM/>
    {/* <Deposits/> */}
    <DrawerM value={0}/>
    </>
  );
}

