import React, { Component } from 'react';

import moment from 'moment-timezone';

import { ScheduleState } from './Schedule.model';
import ScheduleHeader from 'src/modules/schedule/components/ScheduleHeader/ScheduleHeader';
import ScheduleContent from 'src/modules/schedule/components/ScheduleContent/ScheduleContent';
import style from './Schedule.module.scss';
export default class Schedule extends Component<{}, ScheduleState> {
  state: ScheduleState = {
    start: this.initStartDate(),
    data: {}
  };

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate() {
    this.fetchData();
  }

  render() {
    return (
      <div className={style.layout}>
        <ScheduleHeader next={() => this.onNext()} prev={() => this.onPrev()} date={this.getSchedulePeriod()} />
        <ScheduleContent data={this.state.data} />
      </div>
    );
  }

  onNext() {
    const startDate = moment(this.state.start).add(7, 'days').format();
    this.setState({
      start: startDate
    });
  }

  onPrev() {
    const startDate = moment(this.state.start).subtract(7, 'days').format();
    this.setState({
      start: startDate
    });
  }

  fetchData() {}

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
}
