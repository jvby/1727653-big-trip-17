import AbstractView from '../framework/view/abstract-view.js';
import { humanizePointDate, sortPointsByDate } from '../utils.js';
import {TRIP_INFO_CITIES_COUNT} from '../const.js';

const createTripInfoTitle = (points) => {
  const cities = points.map((point) => point.destination.name);

  if (cities.length >= TRIP_INFO_CITIES_COUNT) {
    return (` ${cities[0]} &mdash; ... &mdash; ${cities.at(-1)} `);
  }

  return cities.join(' &mdash; ');
};

const createTripInfoTemplate = (points, tripInfoPrice) => {
  const tripInfoTitle = createTripInfoTitle(points);

  const starDate = humanizePointDate(points[0].dateFrom, 'MMM D');
  const finishDate = humanizePointDate(points.at(-1).dateTo, 'MMM D');

  return (`<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${tripInfoTitle}</h1>
      <p class="trip-info__dates">${starDate}&nbsp;&mdash;&nbsp;${finishDate}</p>
    </div>
    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${tripInfoPrice}</span>
    </p>
  </section>`);
};

export default class TripInfoView extends AbstractView {
  #points = null;
  #offers = null;
  #totalTripPrice =null;

  constructor(points, offers) {
    super();
    this.#points = points.sort(sortPointsByDate);
    this.#offers = offers;
    this.#totalTripPrice = this.#calculateTripInfoPrice(this.#points, this.#offers);
  }

  get template() {
    return createTripInfoTemplate(this.#points, this.#totalTripPrice);
  }

  #calculateTripInfoPrice = (points, allOffers) => {
    let totalPrice = 0;
    points.forEach((point) => {
      const pointTypeOffer = allOffers.find((offer) => offer.type === point.type).offers;
      let sumOffer = 0;
      pointTypeOffer.forEach((offer) => {
        if (point.offers.includes(offer.id)) {
          sumOffer += offer.price;
        }
        return sumOffer;
      });
      totalPrice += sumOffer + point.basePrice;
    });
    return totalPrice;
  };
}
