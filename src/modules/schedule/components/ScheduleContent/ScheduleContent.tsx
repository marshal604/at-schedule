import React, { FunctionComponent } from 'react';

import moment from 'moment-timezone';

import { ScheduleContentProps } from './ScheduleContent.model';
import { ScheduleItem } from 'src/modules/schedule/containers/Schedule/Schedule.model';
import style from './ScheduleContent.module.scss';

const ScheduleContent: FunctionComponent<ScheduleContentProps> = (props) => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const hasBooked = (list: ScheduleItem[]): boolean => {
    return list.some((item) => item.booked);
  };
  return (
    <div className={style.box}>
      {Array.from(props.data.entries()).map(([key, value], index) => (
        <ul key={key} className={[style['box-col']].concat(hasBooked(value) ? style['box-col--booked'] : []).join(' ')}>
          <li className={style['col-th']}>
            <div>{days[index]}</div>
            <div>{moment(key).format('DD')}</div>
          </li>
          {value.map((time) => (
            <li className={[style['col-td']].concat(time.booked ? style['col-td--booked'] : []).join(' ')} key={time.start}>
              {moment(time.start).format('HH:mm')}
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
};

export default ScheduleContent;
