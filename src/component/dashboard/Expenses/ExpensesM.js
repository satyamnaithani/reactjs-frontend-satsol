import React, { lazy,Suspense } from 'react';
import DrawerM from '../DrawerM'
import AppBarM from '../../common/AppBarM'
const Form = lazy(()=>import('./FormM'))
export default function ExpensesM() {
  return (
    <>
    <AppBarM/>
    <Suspense fallback={<div/>}>
    <Form/>
    </Suspense>
    <br/>
    <br/>
    <DrawerM value={3}/>
    </>
  );
}
