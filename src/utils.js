import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration.js';
dayjs.extend(duration);

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

export {getRandomInteger, humanizePointDate, getEventDuration};