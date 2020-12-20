import { ScheduleItem } from 'src/modules/schedule/containers/Schedule/Schedule.model';
export interface ScheduleContentProps {
  data: Map<string, ScheduleItem[]>;
}

export enum ScheduleDays {
  Sunday = 'Sunday',
  Monday = 'Monday',
  Tuesday = 'Tuesday',
  Wednesday = 'Wednesday',
  Thursday = 'Thursday',
  Friday = 'Friday',
  Saturday = 'Saturday'
}

export const DAYS = [
  ScheduleDays.Sunday,
  ScheduleDays.Monday,
  ScheduleDays.Tuesday,
  ScheduleDays.Wednesday,
  ScheduleDays.Thursday,
  ScheduleDays.Friday,
  ScheduleDays.Saturday
];
