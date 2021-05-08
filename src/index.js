import { Provider } from 'react-redux'
import React from 'react';
import ReactDOM from 'react-dom';

import { configureAppStore, sagaMiddleware, sagaMonitor } from './configureAppStore';
import { MonitorInitializer } from './components/monitor-initializer/monitor-initializer';

import './index.css';

const store = configureAppStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <MonitorInitializer sagaMonitor={sagaMonitor} sagaMiddleware={sagaMiddleware} />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
