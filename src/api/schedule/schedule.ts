import moment from 'moment-timezone';
import { ScheduleListRequest, ScheduleList, ScheduleDateItem } from './schedule.model';

export async function getScheduleList(request: ScheduleListRequest): Promise<ScheduleList> {
  return Promise.resolve(mockData(moment.utc(request.start).format()));
}

export function mockData(start: string): ScheduleList {
  const setRandomData = (list: ScheduleDateItem[], ref: number[]) => {
    const DAY_COUNT = 4;
    const today = moment.utc(moment().format('YYYY/MM/DD'));
    Array(DAY_COUNT)
      .fill(ref)
      .forEach((v: number[], i) => {
        const t = moment(start).clone().add(i, 'days').utc();
        if (t.isBefore(today)) {
          return;
        }
        v.forEach((time) => {
          const k = t.clone().add(time, 'hours').utc();
          list.push({
            start: k.format('YYYY-MM-DDTHH:mm:ss') + 'Z',
            end: k.add(1, 'hours').format('YYYY-MM-DDTHH:mm:ss') + 'Z'
          });
        });
      });
  };

  const DELAY_HOUR = 6;

  const available: ScheduleDateItem[] = [];
  const AVAILABLE_TIME_COUNT = 6;
  const availableTimeList = Array(AVAILABLE_TIME_COUNT)
    .fill(undefined)
    .map((_, i) => i * 2 + DELAY_HOUR);
  setRandomData(available, availableTimeList);

  const booked: ScheduleDateItem[] = [];
  const BOOKED_TIME_COUNT = 3;
  const bookedTimeList = Array(BOOKED_TIME_COUNT)
    .fill(undefined)
    .map((_, i) => i * 2 + 1 + DELAY_HOUR);
  setRandomData(booked, bookedTimeList);
  return {
    available,
    booked
  };
}
