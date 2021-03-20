import './App.css';
import React, {
  Suspense
} from 'react';
import {
  Switch,
  Route
} from "react-router-dom";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Dashboard from './component/dashboard/Dashboard'
import Stock from './component/dashboard/Stock/Stock'
import Vendors from './component/dashboard/Vendors/Vendors'
import Customer from './component/dashboard/Customers/Customers'
import ItemMaster from './component/dashboard/ItemMaster/ItemMaster'
import Sales from './component/dashboard/Sales/Sales'
import Expenses from './component/dashboard/Expenses/Expenses'
import DashboardM from './component/dashboard/DashboardM';
import StockM from './component/dashboard/Stock/StockM'
import SalesM from './component/dashboard/Sales/SalesM'
import ExpensesM from './component/dashboard/Expenses/ExpensesM'
const FormLogin = React.lazy(() => import('./component/Form'))

export default function App() {

  const matches = useMediaQuery('(min-width:600px)');

  return ( <
    div className = 'App' >
    <Switch >
    <Route exact path = "/" >
    <Suspense fallback = {<div / >} >
    <FormLogin / >
    </Suspense> 
    < /Route > <
    Route path = "/dashboard" > {
      matches ? < Dashboard / > : < DashboardM / >
    } <
    /Route> <
    Route exact path = "/stock" > {
      matches ? < Stock / > : < StockM / >
    } <
    /Route> <
    Route exact path = "/sales" > {
      matches ? < Sales / > : < SalesM / >
    } <
    /Route> <
    Route exact path = "/vendors" >
    <
    Vendors / >
    <
    /Route> <
    Route exact path = "/customers" >
    <
    Customer / >
    <
    /Route> <
    Route exact path = "/item_master" >
    <
    ItemMaster / >
    <
    /Route> <
    Route exact path = "/payments" > {
      matches ? < Expenses / > : < ExpensesM / >
    } <
    /Route> <
    Route path = "*" >
    <
    div > Invalid route < /div> < /
    Route > <
    /Switch> 
    < /
    div >
  );
}