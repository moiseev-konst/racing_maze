import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.js';




const root = ReactDOM.createRoot(document.getElementById('root'));
//const test=root.addEvenListener('keyup', e=>console.log(e))
root.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
);

