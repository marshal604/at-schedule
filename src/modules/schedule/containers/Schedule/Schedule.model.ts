export interface ScheduleItem {
  start: string;
  end: string;
  booked?: boolean;
}

export interface ScheduleData {
  [date: string]: ScheduleItem[];
}

export interface ScheduleState {
  start: string;
  data: ScheduleData;
}
