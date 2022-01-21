import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Autocomplete from './Autocomplete';
import reportWebVitals from './reportWebVitals';
import inputArray from './inputArray';

ReactDOM.render(
  <React.StrictMode>
    <Autocomplete array={inputArray.map(tag => String(tag))}/>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
