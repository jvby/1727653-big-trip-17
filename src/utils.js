import { FilterType } from './const.js';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration.js';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
dayjs.extend(duration);
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

const today = dayjs().format('DD/MM/YYYY HH-mm');

const filter = {
  [FilterType.EVERYTHING] : (points) => points,
  [FilterType.FUTURE] : (points) => points.filter((point) => dayjs(point.dateFrom).isSameOrAfter(dayjs())),
  [FilterType.PAST] : (points) => points.filter((point) => dayjs(point.dateTo).isSameOrBefore(dayjs())),
};

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const humanizePointDate = (date, format) =>  dayjs(date).format(format);

const getEventDuration = (from, to) => {
  const diff = dayjs(to).diff(dayjs(from));
  const daysCount = dayjs.duration(diff).format('DD');
  const hoursCount = dayjs.duration(diff).format('HH');
  const minutesCount = dayjs.duration(diff).format('mm');

  if (daysCount > 0) {

    return `${daysCount}D ${hoursCount}H ${minutesCount}M`;

  }
  if (hoursCount > 0) {

    return `${hoursCount}H ${minutesCount}M`;

  }

  return `${minutesCount}M`;

};

const sortPointsByTime = (timeA, timeB) => dayjs(timeA.dateFrom).diff(dayjs(timeA.dateTo)) > dayjs(timeB.dateFrom).diff(dayjs(timeB.dateTo)) ? 1 : -1;
const sortPointsByPrice = (priceA, priceB) => priceA.basePrice < priceB.basePrice ? 1 : -1;
const sortPointsByDate = (dateA, dateB) => dateA.dateFrom > dateB.dateFrom ? 1 : -1;

const isDatesEqual = (dateA, dateB) => (dateA === null && dateB === null) || dayjs(dateA).isSame(dateB, 'D');

export {getRandomInteger, humanizePointDate, getEventDuration, sortPointsByTime, sortPointsByPrice, sortPointsByDate, isDatesEqual, filter, today};
