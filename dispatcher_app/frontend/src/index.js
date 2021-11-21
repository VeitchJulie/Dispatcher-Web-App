import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './App';
import Past from './Past'
import CreateCase from './CreateCase'
import {Provider} from 'react-redux'
import configureStore from './store/configureStore'
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"

const store = configureStore()
store.subscribe(() => {
  console.log(store.getState())
})


ReactDOM.render(
  <Provider store = {store}> 
    <Router> 
      <Routes> 
          <Route path = "/" element = {<App />} />
          <Route path = "/past" element = {<Past />} />
          <Route path = "/createCase" element={<CreateCase/>} />
      </Routes>
    </Router>
  </Provider>,
  document.getElementById('root')
);

