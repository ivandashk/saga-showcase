import { useDispatch } from 'react-redux';
import { useCallback } from 'react';

import { increment } from '../../reducers/counter';

export const App = () => {
  const dispatch = useDispatch();

  const handleClick = useCallback(() => {
    dispatch(increment());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
      <button onClick={handleClick}>Hit me</button>
  );
};
