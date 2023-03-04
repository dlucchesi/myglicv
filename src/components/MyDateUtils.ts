import * as dayjs from 'dayjs'
import 'dayjs/locale/pt-br' // import locale
dayjs.locale('pt-br') // set locale

export const DATE_FORMAT = "YYYY.MM.DD"
export const TIME_FORMAT = "HH:mm"
export const TIMESTAMP_FORMAT = DATE_FORMAT + " " + TIME_FORMAT

export function getTime(date?: Date) {
  return date != null ? date.getTime() : 0;
}

export function getTimeFromString(date?: String) {
  if (date != null) {
    return dayjs(date, TIMESTAMP_FORMAT).toDate().getTime()
  } else {
    return 0
  }   
}

export function getTimestampFromStr(date: String, time: String) {
  let finalTimestamp = date + " " + time
  return dayjs(finalTimestamp, TIMESTAMP_FORMAT)
}

export function formatDateFromStr(date: Date) {
  return dayjs(date, DATE_FORMAT).format(DATE_FORMAT)
}

export function formatTimeFromStr(time: Date) {
  return dayjs(time, TIME_FORMAT).format(TIME_FORMAT)
}

export function formatTimestampFromDate(date: Date): String {
  return dayjs(date, TIMESTAMP_FORMAT).format(TIMESTAMP_FORMAT)
}