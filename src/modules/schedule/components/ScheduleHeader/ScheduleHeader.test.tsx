import React from 'react';

import user from '@testing-library/user-event';
import { render } from '@testing-library/react';

import ScheduleHeader from './ScheduleHeader';
describe('<ScheduleHeader />', () => {
  test('should prev button disabled', () => {
    const { container } = render(<ScheduleHeader disablePrev={true} />);
    const button = container.querySelectorAll('.date-button')[0];
    expect(button).toHaveAttribute('disabled');
  });

  test('should trigger parent after click prev button', () => {
    const onPrev = jest.fn();
    const { container } = render(<ScheduleHeader prev={() => onPrev()} />);
    const button = container.querySelectorAll('.date-button')[0];
    user.click(button);
    expect(onPrev).toBeCalled();
  });

  test('should trigger parent after click next button', () => {
    const onNext = jest.fn();
    const { container } = render(<ScheduleHeader next={() => onNext()} />);
    const button = container.querySelectorAll('.date-button')[1];
    user.click(button);
    expect(onNext).toBeCalled();
  });

  test('should next button disabled', () => {
    const { container } = render(<ScheduleHeader disableNext={true} />);
    const button = container.querySelectorAll('.date-button')[1];
    expect(button).toHaveAttribute('disabled');
  });

  test('should schedule title is 2020/12/20 - 26', () => {
    const DATE = '2020/12/20 - 26';
    const { getByText } = render(<ScheduleHeader date={DATE} />);
    getByText(DATE);
  });

  test('should timezone text is Schedule.Message.TimeZoneTip', () => {
    const { getByText } = render(<ScheduleHeader />);
    getByText(/Schedule.Message.TimeZoneTip/i);
  });
});
