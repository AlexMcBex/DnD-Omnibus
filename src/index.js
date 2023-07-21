import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './index.css'

// This is the entry point of your application. 
// Here we're wrapping the entire app with the Router component to enable routing.

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);
