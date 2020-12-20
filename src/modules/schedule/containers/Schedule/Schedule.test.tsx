import React from 'react';

import user from '@testing-library/user-event';
import { render } from '@testing-library/react';

import { Schedule } from './Schedule';
describe('<Schedule />', () => {
  test('show mask button on init, and click will disappear', () => {
    const { container, getByText } = render(<Schedule />);
    let button = container.querySelector('.box-mask-button');
    getByText(/Schedule.Button.ViewFullSchedule/i);
    expect(button).toBeTruthy();

    user.click(button!);
    button = container.querySelector('.box-mask-button');
    expect(button).toBeNull();
  });

  test('should title to be Schedule.Field.AvailableTimes', () => {
    const { getByText } = render(<Schedule />);
    getByText(/Schedule.Field.AvailableTimes/i);
  });
});
