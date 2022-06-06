import {getRandomInteger} from '../utils.js';
import {CITIES, DESCRIPTIONS, TYPES, TITLES} from '../const.js';
import dayjs from 'dayjs';

let offersList = [];

//Возвращаем случайный элемент массива
const getRandomArrayElement = (data) => {

  const randomIndex = getRandomInteger(0, data.length - 1);

  return data[randomIndex];
};

//Генерируем случайную стоимость точки маршрута
const generateBasePrice = () => getRandomInteger(100, 2000);

//Генерируем назание и описане точки маршрута
const generateDestination = () => (
  {
    description: getRandomArrayElement(DESCRIPTIONS),
    name: getRandomArrayElement(CITIES),
    pictures: [
      {
        src: `http://picsum.photos/248/152?r=${getRandomInteger(0,100)}`,
        description: getRandomArrayElement(DESCRIPTIONS),
      }
    ]
  }
);

//Генерируем список предложений
const generateOffer = () => {

  const offerCount = 5;
  const offers = [];

  for (let i = 1; i <= offerCount; i++) {
    const offerTemplate = {
      id: i,
      title: getRandomArrayElement(TITLES),
      price: getRandomInteger(1, 200),
    };
    offers.push(offerTemplate);
  }

  return offers;
};

//Отдаем список предложений с привязкой к типам
const getOffers = () => offersList;

const createOffers = () => {
  offersList = TYPES.map((typeName) => (
    {
      type: typeName,
      offers: generateOffer(),
    }));
};


//Генерируем дату начала точки маршрута
const generateDateFrom = (id) => {
  const daysGap = id;

  return dayjs().add(daysGap, 'day').toDate();
};

//Генерируем дату окончания точки маршрута
const generateDateTo = (startDate) => {

  const minutesGap = getRandomInteger(1, 120);

  return dayjs(startDate).add(minutesGap, 'minute').toDate();
};

//Генерируем точку маршрута
const generatePoint = (id) => {
  const startDate = generateDateFrom(id);
  const endDate = generateDateTo(startDate);

  return {
    basePrice: generateBasePrice(),
    dateFrom: startDate,
    dateTo: endDate,
    destination: generateDestination(),
    id: id,
    isFavorite: Boolean(getRandomInteger(0, 1)),
    offers: [1,2,3],
    type: getRandomArrayElement(TYPES),
  };
};

export {generatePoint, getOffers, getRandomArrayElement, createOffers};
