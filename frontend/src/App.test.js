import { render, screen } from '@testing-library/react';
import Dummy from './dummy'

test('checkExplore', () => {
  const{getByTestId} = render(<Dummy/>);
  
  const temp = getByTestId('test');

  expect(temp.textContent).toBe('dummy');
});
