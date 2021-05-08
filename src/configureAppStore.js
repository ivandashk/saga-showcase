import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { createSlice } from '@reduxjs/toolkit';

export const sagaMonitor = {};

export const sagaMiddleware = createSagaMiddleware({ sagaMonitor });

const rootReducer = {
  stub: createSlice({
      name: 'stub',
      initialState: {},
      reducers: {}
  }).reducer,
};

export const configureAppStore = () => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: [sagaMiddleware, ...getDefaultMiddleware()],
  });

  return store;
};
