import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';


import thunk from 'redux-thunk';
import reducers from './reducers/index'
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom'
let store = createStore(reducers, applyMiddleware(thunk))

ReactDOM.render(
 
    <Router>
      <Provider store={store}><App /></Provider>
    </Router>
 

  ,
  document.getElementById('root')
);
serviceWorker.unregister();
