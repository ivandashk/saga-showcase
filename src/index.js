import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
} from "react-router-dom";

import { configureAppStore, sagaMiddleware, sagaMonitor } from './configureAppStore';
import { examplesConfig } from './examples-config'
import { MonitorInitializer } from './components/monitor-initializer/monitor-initializer';

import './index.css';

const store = configureAppStore();

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <>
        <Switch>
          {examplesConfig.map(({ slug, code, rootSaga } ) => (
            <Route path={`/${slug}`} key={slug}>
              <MonitorInitializer sagaMonitor={sagaMonitor} sagaMiddleware={sagaMiddleware} rootSaga={rootSaga} code={code} />
            </Route>
          ))}
          <Redirect from="/" to={`/${examplesConfig[0].slug}`} />
        </Switch>
      </>
    </Router>
  </Provider>,
  document.getElementById('root')
);
