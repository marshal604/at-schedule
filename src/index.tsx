import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'src/helper/i18n/i18n';
import './index.scss';
ReactDOM.render(
  <React.StrictMode>
    {' '}
    <App />{' '}
  </React.StrictMode>,
  document.getElementById('root')
);
