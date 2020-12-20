export interface ScheduleItem {
  start: string;
  end: string;
  booked?: boolean;
}
export interface ScheduleState {
  start: string;
  data: Map<string, ScheduleItem[]>;
  disablePrev: boolean;
  viewAllSchedule: boolean;
}
