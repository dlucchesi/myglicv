import * as dayjs from 'dayjs'
import 'dayjs/locale/pt-br' // import locale
dayjs.locale('pt-br') // set locale

export const DATE_FORMAT = "YYYY.MM.DD HH:mm"

export function getTime(date?: Date) {
  return date != null ? date.getTime() : 0;
}

export function getTimeFromString(date?: String) {
  if (date != null) {
    return dayjs(date, DATE_FORMAT).toDate().getTime()
  } else {
    return 0
  }   
}