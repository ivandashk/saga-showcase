import { useDispatch } from 'react-redux';
import { useCallback } from 'react';

import { increment } from './reducers/counter';

import logo from './logo.svg';
import './App.css';


export const App = () => {
  const dispatch = useDispatch();

  const handleClick = useCallback(() => {
    dispatch(increment());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button onClick={handleClick}>Hit me</button>
      </header>
    </div>
  );
}
