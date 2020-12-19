export interface ScheduleHeaderProps {
  next: () => void;
  prev: () => void;
  date: string;
  disablePrev?: boolean;
  disableNext?: boolean;
}
