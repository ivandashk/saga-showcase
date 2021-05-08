import { Provider } from 'react-redux'
import React from 'react';
import ReactDOM from 'react-dom';

import { App } from './App';
import { configureAppStore } from './configureAppStore';

import './index.css';

const store = configureAppStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);