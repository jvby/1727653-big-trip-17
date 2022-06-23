import dayjs from 'dayjs';

const TRIP_INFO_CITIES_COUNT = 3;

const TYPES = [
  'taxi',
  'bus',
  'train',
  'ship',
  'drive',
  'flight',
  'check-in',
  'sightseeing',
  'restaurant',
];

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

const SortType = {
  DAY: 'day',
  TIME: 'time',
  PRICE: 'price',
};

const EventType = {
  TAXI: 'taxi',
  BUS: 'bus',
  TRIAN: 'train',
  SHIP: 'ship',
  DRIVE: 'drive',
  FLIGHT: 'flight',
  CHECK_IN: 'check-in',
  SIGHTSEEING: 'sightseeing',
  RESTAURANT: 'restaurant',
};

const UserAction = {
  UPDATE_POINT: 'UPDATE_TASK',
  ADD_POINT: 'ADD_TASK',
  DELETE_POINT: 'DELETE_TASK',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',

};

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PAST: 'past',
};

const BLANK_POINT = {
  id: null,
  basePrice: '',
  dateFrom: dayjs().toDate(),
  dateTo: dayjs().toDate(),
  destination: {
    description: '',
    name: '',
    pictures: [
      {
        src:  null,
        description: null,
      },]
  },
  isFavorite: false,
  offers: [],
  type: TYPES[0],
};

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

export {TYPES, Mode, SortType, EventType, UserAction, UpdateType, FilterType, BLANK_POINT, TimeLimit, TRIP_INFO_CITIES_COUNT};
