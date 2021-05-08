import { Provider } from 'react-redux'
import React from 'react';
import ReactDOM from 'react-dom';

import { configureAppStore, sagaMiddleware, sagaMonitor } from './configureAppStore';
import { MonitorInitializer } from './components/monitor-initializer/monitor-initializer';

import './index.css';

const store = configureAppStore();

ReactDOM.render(
  <Provider store={store}>
    <MonitorInitializer sagaMonitor={sagaMonitor} sagaMiddleware={sagaMiddleware} />
  </Provider>,
  document.getElementById('root')
);
