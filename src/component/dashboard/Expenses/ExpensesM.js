import React from 'react';
import DrawerM from '../DrawerM'

import AppBarM from '../../common/AppBarM'
import Form from './FormM';
export default function ExpensesM() {
  

  return (
    <>
    <AppBarM/>
    <Form/>
    <br/>
    <br/>
    <DrawerM value={3}/>
    </>
  );
}
