import React from 'react';
import DrawerM from './DrawerM'
import AppBarM from '../common/AppBarM'


export default function DashboardM() {
  

  return (
    <>
    <AppBarM/>
    <p>Dashboard</p>
    <DrawerM value={0}/>
    </>
  );
}

