import moment from 'moment-timezone';
import { ScheduleListRequest, ScheduleList, ScheduleDateItem } from './schedule.model';

export async function getScheduleList(request: ScheduleListRequest): Promise<ScheduleList> {
  return Promise.resolve(mockData(moment.utc(request.start).format()));
}

export function mockData(start: string): ScheduleList {
  const delay = 6;
  const days = 4;
  const even = Array(6)
    .fill(undefined)
    .map((_, i) => i * 2 + delay);
  const odd = Array(3)
    .fill(undefined)
    .map((_, i) => i * 2 + 1 + delay);
  const setRandomData = (list: ScheduleDateItem[], ref: number[]) => {
    const today = moment.utc(moment().format('YYYY/MM/DD'));
    Array(days)
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
  const available: ScheduleDateItem[] = [];
  const booked: ScheduleDateItem[] = [];
  setRandomData(available, even);
  setRandomData(booked, odd);
  return {
    available,
    booked
  };
}
