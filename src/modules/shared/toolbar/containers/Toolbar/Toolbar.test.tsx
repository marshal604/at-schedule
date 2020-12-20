import React from 'react';

import { render } from '@testing-library/react';

import Toolbar from './Toolbar';

describe('<Toolbar />', () => {
  test('render Toolbar', () => {
    render(<Toolbar />);
  });
});
