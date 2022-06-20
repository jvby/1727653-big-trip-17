import AbstractView from '../framework/view/abstract-view.js';
import { humanizePointDate, sortPointsByDate } from '../utils.js';

const createTripInfoTitle = (points) => {
  const startTrip = points[0].destination.name;
  const finishTrip = points[points.length-1].destination.name;
  if (points.length === 1) {
    return (`<h1 class="trip-info__title"> ${startTrip} </h1>`);
  }
  if (points.length === 2) {
    return (`<h1 class="trip-info__title"> ${startTrip} &mdash; ${finishTrip} </h1>`);
  }
  let middleTrip = '...';
  if (points.length === 3) {
    middleTrip = points[1].destination.name;
  }
  return (`<h1 class="trip-info__title"> ${startTrip} &mdash; ${middleTrip} &mdash; ${finishTrip}  </h1>`);
};

const createTripInfoPrice = (points, allOffers) => {
  let totalPrice = 0;
  points.map((point) => {
    const pointTypeOffer = allOffers.find((offer) => offer.type === point.type).offers;
    let sumOffer = 0;
    pointTypeOffer.map((offer) => {
      if (point.offers.includes(offer.id)) {
        sumOffer += offer.price;
      }
      return sumOffer;
    });
    totalPrice += sumOffer + point.basePrice;
  });
  return totalPrice;
};

const createTripInfoTemplate = (points, offers) => {
  const tripInfoTitle = createTripInfoTitle(points);
  const tripInfoPrice = createTripInfoPrice(points, offers);

  const starDate = humanizePointDate(points[0].dateFrom, 'MMM D');
  const finishDate = humanizePointDate(points[points.length-1].dateTo, 'MMM D');

  return (`<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      ${tripInfoTitle}
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

  constructor(points, offers) {
    super();
    this.#points = points.sort(sortPointsByDate);
    this.#offers = offers;
  }

  get template() {
    return createTripInfoTemplate(this.#points, this.#offers);
  }
}
