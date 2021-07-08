import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './App';
import {Provider} from 'react-redux'
import configureStore from './store/configureStore'

const store = configureStore()
store.subscribe(() => {
  console.log(store.getState())
})


ReactDOM.render(
  <Provider store={store}> 
    <App />
  </Provider>,
  document.getElementById('root')
);

