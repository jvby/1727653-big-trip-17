import {today} from './utils.js';

const CITIES = [
  'Chamonix',
  'Moscow',
  'Paris',
  'London',
  'Madrid',
  'Barcelona',
  'Berlin',
  'Prague',
];

const DESCRIPTIONS = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
];

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

const TITLES = [
  'Add luggage',
  'Switch to comfort',
  'Add meal',
  'Choose seats',
  'Travel by train',
  'No smoking',
  'Lunch',
  'Transfer',
  'Switch to business',
];

const MODE = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

const SORT_TYPE = {
  DAY: 'day',
  TIME: 'time',
  PRICE: 'price',
};

const EVENT_TYPE = {
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

const USER_ACTION = {
  UPDATE_POINT: 'UPDATE_TASK',
  ADD_POINT: 'ADD_TASK',
  DELETE_POINT: 'DELETE_TASK',
};

const UPDATE_TYPE = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

const FILTER_TYPE = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PAST: 'past',
};

const BLANC_POINT = {
  id: null,
  basePrice: '',
  dateFrom: today,
  dateTo: today,
  destination: '',
  isFavorite: false,
  offers: [],
  type: TYPES[0],
};

export {TYPES, DESCRIPTIONS, CITIES, TITLES, MODE, SORT_TYPE, EVENT_TYPE, USER_ACTION, UPDATE_TYPE, FILTER_TYPE, BLANC_POINT};
