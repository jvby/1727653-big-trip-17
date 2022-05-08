import {getRandomInteger} from '../utils.js';
import {CITYS, DESCRIPTIONS, TYPES, TITLES} from '../const.js';
import dayjs from 'dayjs';

const generateCity = () => {

  const randomIndex = getRandomInteger(0, CITYS.length - 1);

  return CITYS[randomIndex];
};

const generateCityDescription = () => {

  const randomIndex = getRandomInteger(0, DESCRIPTIONS.length - 1);

  return DESCRIPTIONS[randomIndex];
};

const generateTitles = () => {

  const randomIndex = getRandomInteger(0, TITLES.length - 1);

  return TITLES[randomIndex];
};

const generateBasePrice = () => getRandomInteger(100, 2000);


const generateDestination = () => (
  {
    'description': generateCityDescription(),
    'name': generateCity(),
    'pictures': [
      {
        'src': `http://picsum.photos/248/152?r=${getRandomInteger(0,100)}`,
        'description': generateCityDescription(),
      }
    ]
  }
);

const generateType = () => {

  const randomIndex = getRandomInteger(0, TYPES.length - 1);

  return TYPES[randomIndex];
};

const generateOffer = () => {

  const randomOffersNumber = getRandomInteger(1, 5);
  const offers = [];

  for (let i = 1; i <= randomOffersNumber; i++) {
    const offerTemplate = {
      'id': i,
      'title': generateTitles(),
      'price': getRandomInteger(1, 200),
    };
    offers.push(offerTemplate);
  }

  return offers;
};

const generateDateFrom = (id) => {
  const daysGap = id;

  return dayjs().add(daysGap, 'day');
};

const generateDateTo = (startDate) => {

  const minutesGap = getRandomInteger(1, 120);

  return dayjs(startDate).add(minutesGap, 'minute');
};

const generatePoint = (id) => {
  const startDate = generateDateFrom(id);
  const endDate = generateDateTo(startDate);

  return {
    'basePrice': generateBasePrice(),
    'dateFrom': startDate,
    'dateTo': endDate,
    'destination': generateDestination(),
    'id': id,
    'isFavorite': Boolean(getRandomInteger(0, 1)),
    'offers': generateOffer(),
    'type': generateType(),
  };
};

export {generatePoint};
