import React, { FunctionComponent } from 'react';

import moment from 'moment-timezone';

import { ScheduleContentProps } from './ScheduleContent.model';

const ScheduleContent: FunctionComponent<ScheduleContentProps> = (props) => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return (
    <div>
      {Array.from(props.data.entries()).map(([key, value], index) => (
        <ul key={key}>
          <li>
            <div>{moment(key).format('DD')}</div>
            <div>{days[index]}</div>
          </li>
          {value.map((time) => (
            <li key={time.start}>{moment(time.start).format('HH:mm')}</li>
          ))}
        </ul>
      ))}
    </div>
  );
};

export default ScheduleContent;
