export enum Lang {
  English = 'en',
  ZhTw = 'zh-TW'
}
export interface LangSelectProps {
  default: Lang;
}

export const LANGUAGE_OPTIONS = [
  {
    id: Lang.English,
    name: 'English'
  },
  {
    id: Lang.ZhTw,
    name: 'ZhTw'
  }
];
