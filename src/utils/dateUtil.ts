import dayjs from "dayjs";

const DATE_TIME_FORMAT = "YYYY-MM-DD HH:mm:ss";
const DATE_FORMAT = "YYYY-MM-DD";
/* eslint-disable */
export function formatToDateTime(
  date: dayjs.Dayjs | undefined = undefined,
  format = DATE_TIME_FORMAT
): string {
  return dayjs(date).format(format);
}

export function formatToDate(
  date: dayjs.Dayjs | undefined = undefined,
  format = DATE_FORMAT
): string {
  return dayjs(date).format(format);
}

export function getWeek() {
  const week = dayjs().day();
  let currentWeek = "";
  switch (week) {
    case 0:
      currentWeek = "星期日";
      break;
    case 1:
      currentWeek = "星期一";
      break;
    case 2:
      currentWeek = "星期二";
      break;
    case 3:
      currentWeek = "星期三";
      break;
    case 4:
      currentWeek = "星期四";
      break;
    case 5:
      currentWeek = "星期五";
      break;
    case 6:
      currentWeek = "星期六";
      break;
  }
  return currentWeek;
}

export const dateUtil = dayjs;
