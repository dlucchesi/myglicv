import * as Dayjs from "dayjs" // import dayjs
import 'dayjs/locale/pt-br' // import locale
Dayjs.locale('pt-br') // set locale

export const DATE_FORMAT = "DD/MM/YYYY"
export const TIME_FORMAT = "HH:mm"
export const TIMESTAMP_FORMAT = DATE_FORMAT + " " + TIME_FORMAT

export function getTime(date?: Date) {
  return date != null ? date.getTime() : 0;
}

export function getTimeFromString(date?: string) {
  if (date != null) {
    return Dayjs(date, TIMESTAMP_FORMAT).toDate().getTime()
  } else {
    return 0
  }   
}

export function getTimestampFromStr(date: string, time: string) {
  let finalTimestamp = date + " " + time
  return Dayjs(finalTimestamp, TIMESTAMP_FORMAT).toDate()
}

export function formatDateFromStr(date: Date) {
  return Dayjs(date, DATE_FORMAT).format(DATE_FORMAT)
}

export function formatTimeFromStr(time: Date) {
  return Dayjs(time, TIME_FORMAT).format(TIME_FORMAT)
}

export function formatTimestampFromDate(date: Date): string {
  return Dayjs(date, TIMESTAMP_FORMAT).format(TIMESTAMP_FORMAT).toString()
}