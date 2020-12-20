import React from 'react';

import { render } from '@testing-library/react';

import ScheduleContent from 'src/modules/schedule/components/ScheduleContent/ScheduleContent';
import { ScheduleItem } from 'src/modules/schedule/containers/Schedule/Schedule.model';
import { DAYS } from './ScheduleContent.model';

export const mockData = new Map<string, ScheduleItem[]>([
  [
    '2020-12-20',
    [
      {
        start: '2020-12-20T14:00:00+08:00',
        end: '2020-12-20T14:30:00+08:00'
      },
      {
        start: '2020-12-20T16:00:00+08:00',
        end: '2020-12-20T16:30:00+08:00',
        booked: true
      }
    ]
  ],
  [
    '2020/12/21',
    [
      {
        start: '2020-12-21T14:00:00+08:00',
        end: '2020-12-21T14:30:00+08:00'
      },
      {
        start: '2020-12-21T16:00:00+08:00',
        end: '2020-12-21T16:30:00+08:00',
        booked: true
      }
    ]
  ],
  ['2020/12/22', []],
  ['2020/12/23', []],
  ['2020/12/24', []],
  ['2020/12/25', []],
  ['2020/12/26', []]
]);

describe('<ScheduleContent />', () => {
  let data = mockData;

  test('should render Sunday to Saturday', () => {
    const { getByText } = render(<ScheduleContent data={data} />);
    DAYS.forEach((day) => {
      getByText('Schedule.Field.' + day);
    });
  });

  test('should Sunday listed the correct time period', () => {
    const { container } = render(<ScheduleContent data={data} />);
    const list = container.querySelector('ul');
    const expectResult = (data.get('2020-12-20') || []).length;
    expect(list?.querySelectorAll('.col-td').length).toEqual(expectResult);
  });

  test('should Sunday listed the correct time period of booked', () => {
    const { container } = render(<ScheduleContent data={data} />);
    const list = container.querySelector('ul');
    const expectResult = (data.get('2020-12-20') || []).filter((item) => item.booked).length;
    expect(list?.querySelectorAll('.col-td--booked').length).toEqual(expectResult);
  });

  test('should Sunday listed the correct time period of available', () => {
    const { container } = render(<ScheduleContent data={data} />);
    const list = container.querySelector('ul');
    const expectResult = (data.get('2020-12-20') || []).filter((item) => !item.booked).length;
    const bookedCount = list?.querySelectorAll('.col-td--booked').length || 0;
    const periodCount = list?.querySelectorAll('.col-td').length || 0;
    expect(periodCount - bookedCount).toEqual(expectResult);
  });
});
