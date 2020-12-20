import React, { Component } from 'react';

import moment from 'moment-timezone';

import { ScheduleItem, ScheduleState } from './Schedule.model';
import ScheduleHeader from 'src/modules/schedule/components/ScheduleHeader/ScheduleHeader';
import ScheduleContent from 'src/modules/schedule/components/ScheduleContent/ScheduleContent';
import style from './Schedule.module.scss';
import { getScheduleList } from 'src/api/schedule/schedule';
export default class Schedule extends Component<{}, ScheduleState> {
  state: ScheduleState = {
    start: this.initStartDate(),
    data: new Map<string, ScheduleItem[]>(),
    disablePrev: true
  };

  componentDidMount() {
    this.fetchData();
  }

  render() {
    return (
      <div className={style.box}>
        <h3 className={style['box-title']}>授課時間</h3>
        <ScheduleHeader
          disablePrev={this.state.disablePrev}
          next={() => this.onNext()}
          prev={() => this.onPrev()}
          date={this.getSchedulePeriod()}
        />
        <div className={style['box-content']}>
          <ScheduleContent data={this.state.data} />
        </div>
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

  fetchData() {
    getScheduleList({ start: moment(this.state.start).format('YYYY/MM/DD') }).then((data) => {
      let result = data.available.concat(data.booked.map((item) => ({ ...item, booked: true })));
      this.setState({
        data: this.parseTime(result)
      });
    });
  }

  private initStartDate(): string {
    const date = moment().startOf('weeks').format();
    return date;
  }

  private getSchedulePeriod(): string {
    const start = moment(this.state.start);
    let end = moment(this.state.start).clone().add(6, 'days');
    let format = 'DD';
    if (start.year() !== end.year()) {
      format = 'YYYY/MM/DD';
    } else if (start.month() !== end.month()) {
      format = 'MM/DD';
    }
    return `${start.format('YYYY/MM/DD')} - ${end.format(format)}`;
  }

  private parseTime(data: ScheduleItem[]): Map<string, ScheduleItem[]> {
    const start = moment(this.state.start);
    const result = new Map<string, ScheduleItem[]>(
      Array(7)
        .fill([])
        .map((value, index) => [start.clone().add(index, 'days').format('YYYY/MM/DD'), value])
    );
    data
      .reduce((pre: ScheduleItem[], cur) => pre.concat(this.chunkTime(cur, { interval: 30, unit: 'minutes' })), [])
      .map((item) => this.timezone(item))
      .sort((a, b) => (moment(a.start).isAfter(moment(b.start)) ? 1 : -1))
      .forEach((item) => {
        const [date] = item.start.replace(/-/g, '/').split('T');
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
