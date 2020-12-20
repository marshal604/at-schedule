## AmazingTalker Schedule

### Overview

可以觀看講師目前的行事曆，提供雙語系(繁中、英文)並支援時區轉換。

### How to use

```
npm start
```

### How to testing

```
npm test
```

### Tech Stack

- React (Typescript)
- React Hook
- Font Awesome 4
- react-i18next
  - 多語系
- moment-timezone
  - 時區轉換

### Feedback

目前線上的產品有一個部分是需要調整的，一個部分是可以更優化的

1. 行事曆上的日期區間不正確，如 **2020/12/20 - 27** 應更正為 **2020/12/20 - 26**
2. 日期區間在跨月或跨年時，可以更嚴謹的標示，如 **2020/12/27 - 02** 調整為 **2020/12/27 - 2021/01/02**， **2021/01/31 - 06** 應該正為 **2021/01/31 - 02/06**
