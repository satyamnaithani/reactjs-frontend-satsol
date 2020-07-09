import './App.css';
import React, { Component } from 'react';
import {
  Switch,
  Route
} from "react-router-dom";
import FormLogin from './component/Form'
import Dashboard from './component/dashboard/Dashboard'
import Stock from './component/dashboard/Stock/Stock'
import Vendors from './component/dashboard/Vendors/Vendors'
import Customer from './component/dashboard/Customers/Customers'
import ItemMaster from './component/dashboard/ItemMaster/ItemMaster'
import Sales from './component/dashboard/Sales/Sales'

class App extends Component {
   render() {
    return (
      <div className='App'>
        <Switch>
          <Route exact path="/">
            <FormLogin />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route exact path="/stock">
            <Stock />
          </Route>
          <Route exact path="/vendors">
            <Vendors />
          </Route>
          <Route exact path="/customers">
            <Customer />
          </Route>
          <Route exact path="/item_master">
            <ItemMaster />
          </Route>
          <Route exact path="/sales">
            <Sales />
          </Route>
          <Route path="*">
            <div>Invalid route</div>
          </Route>
        </Switch>
      </div>
    );
  }
}

export default App;
