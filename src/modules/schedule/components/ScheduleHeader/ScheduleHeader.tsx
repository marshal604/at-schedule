import React, { FunctionComponent } from 'react';

import moment from 'moment-timezone';

import { ScheduleHeaderProps } from './ScheduleHeader.model';
import style from './ScheduleHeader.module.scss';
const ScheduleHeader: FunctionComponent<ScheduleHeaderProps> = (props) => {
  return (
    <div className={style.header}>
      <div className={style['header-date']}>
        <button className={[style['date-button'], 'at-button'].join(' ')} onClick={() => props.prev()} disabled={props.disablePrev}>
          <i className="fas fa-chevron-left"></i>
        </button>
        <button className={[style['date-button'], 'at-button'].join(' ')} onClick={() => props.next()} disabled={props.disableNext}>
          <i className="fas fa-chevron-right"></i>
        </button>
        <div className={style['date-title']}>{props.date}</div>
      </div>
      <div className={style['header-time-zone']}>* 時間以 GMT{moment.tz(moment.tz.guess()).format('Z')} 顯示</div>
    </div>
  );
};

export default ScheduleHeader;
