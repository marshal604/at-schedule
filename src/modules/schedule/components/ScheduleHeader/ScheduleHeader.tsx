import React, { FunctionComponent } from 'react';

import moment from 'moment-timezone';

import { ScheduleHeaderProps } from './ScheduleHeader.model';

const ScheduleHeader: FunctionComponent<ScheduleHeaderProps> = (props) => {
  return (
    <div>
      <div className="date">
        <button onClick={() => props.prev()} disabled={props.disablePrev}>
          {'<'}
        </button>
        <button onClick={() => props.next()} disabled={props.disableNext}>
          {'>'}
        </button>
        <div>{props.date}</div>
      </div>
      <div className="time-zone">*時間以 GMT{moment.tz(moment.tz.guess()).format('Z')} 顯示</div>
    </div>
  );
};

export default ScheduleHeader;
