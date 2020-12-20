import React, { Component } from 'react';

import moment from 'moment-timezone';
import { WithTranslation, withTranslation } from 'react-i18next';

import { ScheduleItem, ScheduleState } from './Schedule.model';
import ScheduleHeader from 'src/modules/schedule/components/ScheduleHeader/ScheduleHeader';
import ScheduleContent from 'src/modules/schedule/components/ScheduleContent/ScheduleContent';
import style from './Schedule.module.scss';
import { getScheduleList } from 'src/api/schedule/schedule';
export class Schedule extends Component<WithTranslation, ScheduleState> {
  state: ScheduleState = {
    start: this.initStartDate(),
    data: new Map<string, ScheduleItem[]>(),
    disablePrev: true,
    viewAllSchedule: false
  };

  componentDidMount() {
    this.fetchData();
  }

  render() {
    return (
      <div className={[style.box].concat(this.state.viewAllSchedule ? style['box--show'] : []).join(' ')}>
        <h3 className={style['box-title']}>{this.props.t('Schedule.Field.AvailableTimes')}</h3>
        <ScheduleHeader
          disablePrev={this.state.disablePrev}
          next={() => this.onNext()}
          prev={() => this.onPrev()}
          date={this.getSchedulePeriod()}
        />
        <div className={style['box-content']}>
          <ScheduleContent data={this.state.data} />
        </div>
        {this.state.viewAllSchedule ? null : (
          <div className={style['box-mask']}>
            <button
              className={[style['box-mask-button'], 'at-button', 'at-button--primary'].join(' ')}
              onClick={() => this.onViewAllSchedule()}
            >
              <span>{this.props.t('Schedule.Button.ViewFullSchedule')}</span>
              <i className="fas fa-chevron-down"></i>
            </button>
          </div>
        )}
      </div>
    );
  }

  onNext() {
    const startDate = moment(this.state.start).add(7, 'days').format();
    this.setState(
      {
        start: startDate,
        disablePrev: false
      },
      () => {
        this.fetchData();
      }
    );
  }

  onPrev() {
    const start = moment(this.state.start).clone().subtract(7, 'days');
    this.setState(
      {
        start: start.format(),
        disablePrev: start.isSame(moment().startOf('weeks'))
      },
      () => {
        this.fetchData();
      }
    );
  }

  onViewAllSchedule() {
    this.setState({
      viewAllSchedule: true
    });
  }

  fetchData() {
    getScheduleList({ start: moment(this.state.start).format('YYYY-MM-DD') }).then((data) => {
      let result = data.available.concat(data.booked.map((item) => ({ ...item, booked: true })));
      this.setState({
        data: this.parseScheduleList(result)
      });
    });
  }

  private initStartDate(): string {
    const date = moment().startOf('weeks').format('YYYY-MM-DD');
    return date;
  }

  private getSchedulePeriod(): string {
    const start = moment(this.state.start);
    let end = moment(this.state.start).clone().add(6, 'days');
    let format = 'DD';
    if (start.year() !== end.year()) {
      format = 'YYYY-MM-DD';
    } else if (start.month() !== end.month()) {
      format = 'MM-DD';
    }
    return `${start.format('YYYY-MM-DD').replace(/-/g, '/')} - ${end.format(format).replace(/-/g, '/')}`;
  }

  private parseScheduleList(data: ScheduleItem[]): Map<string, ScheduleItem[]> {
    const start = moment(this.state.start);
    const result = new Map<string, ScheduleItem[]>(
      Array(7)
        .fill([])
        .map((value, index) => [start.clone().add(index, 'days').format('YYYY-MM-DD'), value])
    );
    data
      .reduce((pre: ScheduleItem[], cur) => pre.concat(this.chunkTime(cur, { interval: 30, unit: 'minutes' })), [])
      .map((item) => this.timezone(item))
      .sort((a, b) => (moment(a.start).isAfter(moment(b.start)) ? 1 : -1))
      .forEach((item) => {
        const [date] = item.start.split('T');
        // avoid time zone cross day
        if (!result.has(date)) {
          return;
        }
        result.set(date, (result.get(date) ?? []).concat(item));
      });
    return result;
  }

  private timezone(data: ScheduleItem): ScheduleItem {
    return {
      ...data,
      start: moment(data.start).format(),
      end: moment(data.end).format()
    };
  }

  private chunkTime(data: ScheduleItem, option: { interval: number; unit: 'minutes' }): ScheduleItem[] {
    const result: ScheduleItem[] = [];
    let start = moment(data.start);
    const end = moment(data.end);
    while (start.isBefore(end)) {
      const clone = start.clone().add(option.interval, option.unit);
      result.push({
        booked: data.booked,
        start: start.format(),
        end: clone.format()
      });
      start = clone;
    }
    return result;
  }
}

export default withTranslation()(Schedule);
