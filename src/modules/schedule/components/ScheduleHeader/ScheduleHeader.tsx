import React, { FunctionComponent } from 'react';

import moment from 'moment-timezone';
import { WithTranslation, withTranslation } from 'react-i18next';

import { ScheduleHeaderProps } from './ScheduleHeader.model';
import style from './ScheduleHeader.module.scss';
const ScheduleHeader: FunctionComponent<ScheduleHeaderProps & WithTranslation> = (props) => {
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
      <div className={style['header-time-zone']}>
        * {props.t('Schedule.Message.TimeZoneTip', { timezone: `GMT${moment.tz(moment.tz.guess()).format('Z')}` })}
      </div>
    </div>
  );
};

export default withTranslation()(ScheduleHeader);
