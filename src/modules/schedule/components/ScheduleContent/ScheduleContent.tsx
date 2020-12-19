import React, { FunctionComponent } from 'react';

import moment from 'moment-timezone';

import { ScheduleContentProps } from './ScheduleContent.model';

const ScheduleContent: FunctionComponent<ScheduleContentProps> = (props) => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Thursday', 'Friday', 'Saturday'];
  return (
    <div>
      {Object.entries(props.data).map(([key, value], index) => (
        <ul>
          <li>
            <div>{moment(key).date()}</div>
            <div>{days[index]}</div>
          </li>
          {value.map((time) => (
            <li>{time}</li>
          ))}
        </ul>
      ))}
    </div>
  );
};

export default ScheduleContent;
