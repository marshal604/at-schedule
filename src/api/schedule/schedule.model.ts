export interface ScheduleListRequest {
  start: string;
}

export interface ScheduleDateItem {
  start: string;
  end: string;
}

export interface ScheduleList {
  available: ScheduleDateItem[];
  booked: ScheduleDateItem[];
}
