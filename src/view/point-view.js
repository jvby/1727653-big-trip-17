import {humanizePointDate, getEventDuration} from '../utils.js';
import {getOffers} from '../mock/point.js';
import AbstractView from '../framework/view/abstract-view.js';


const createPointTemplate = (point) => {
  const {
    basePrice,
    dateFrom,
    dateTo,
    destination,
    isFavorite,
    offers,
    type
  } = point;

  const pointTypeOffer = getOffers().find((offer) => offer.type === type);
  const offersForRender = offers.map((offerID) => (
    pointTypeOffer.offers.find((offer) => offer.id === offerID)
  ));

  const eventDate = humanizePointDate(dateFrom, 'YYYY-MM-DD');
  const eventDay = humanizePointDate(dateFrom, 'MMM D');
  const eventStartDate = humanizePointDate(dateFrom, 'YYYY-MM-DDTHH:mm');
  const eventStartTime = humanizePointDate(dateFrom, 'HH:mm');
  const eventEndDate = humanizePointDate(dateTo, 'YYYY-MM-DDTHH:mm');
  const eventEndTime = humanizePointDate(dateTo, 'HH:mm');
  const eventDuration = getEventDuration(dateFrom, dateTo);

  const favoritePoint = isFavorite
    ? 'event__favorite-btn--active'
    : '';

  const getEventOffers = () => offersForRender.map((offer) =>
    `<li class="event__offer">
      <span class="event__offer-title">${offer.title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${offer.price}</span>
    </li>`)
    .join('');


  return (
    `<li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="${eventDate}">${eventDay}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${type} ${destination.name}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${eventStartDate}">${eventStartTime}</time>
            &mdash;
            <time class="event__end-time" datetime="${eventEndDate}">${eventEndTime}</time>
          </p>
          <p class="event__duration">${eventDuration}</p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${getEventOffers()}
        </ul>
        <button class="event__favorite-btn ${favoritePoint}" type="button">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
          </svg>
        </button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
};

export default class PointView extends AbstractView {

  #point = null;

  constructor(point) {
    super();
    this.#point = point;
  }

  get template() {
    return createPointTemplate(this.#point);
  }

  setRollupClickHandler = (callback) => {
    this._callback.rollupClick = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#rollupClickHandler);
  };

  setFavoriteClickHandler = (callback) => {
    this._callback.favoriteClick = callback;
    this.element.querySelector('.event__favorite-btn').addEventListener('click', this.#favoriteClickHandler);
  };

  #rollupClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.rollupClick();
  };

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.favoriteClick();
  };
}
