import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Page from './container/Page';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';

axios.defaults.baseURL = 'https://js-react-node-default-rtdb.firebaseio.com/layout';

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <Page />
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
