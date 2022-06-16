import {humanizePointDate, getRandomInteger} from '../utils.js';
import {getOffers, getRandomArrayElement} from '../mock/point.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import {DESCRIPTIONS, TYPES, CITIES, BLANC_POINT} from '../const.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';


const createPointEditTemplate = (point) => {
  const { basePrice, dateFrom, dateTo, destination, offers, type } = point;

  const eventStartDate = humanizePointDate(dateFrom, 'YY/MM/DD HH:mm');

  const eventEndDate = humanizePointDate(dateTo, 'YY/MM/DD HH:mm');

  const getDestinations = () => CITIES.map((city) => `<option value="${city}"></option>`).join('');

  const isSubmitDisabled = basePrice >= 0 ? '' : 'disabled';


  const getEventOffers = () => {

    const pointTypeOffer = getOffers().find((offer) => offer.type === type);

    return pointTypeOffer.offers.map((offer) => {
      const checked = offers.includes(offer.id) ? 'checked' : '';
      return (
        `<div class="event__offer-selector">
          <input
            class="event__offer-checkbox  visually-hidden"
            id="event-offer-${type}-${offer.id}"
            type="checkbox"
            name="event-offer-${type}"
            value="${offer.id}"
            ${checked}>
          <label class="event__offer-label" for="event-offer-${type}-${offer.id}">
            <span class="event__offer-title">${offer.title}</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">${offer.price}</span>
          </label>
        </div>`);
    }).join('');
  };

  const getEventType = () => TYPES.map((eventType) => {
    const upperCaseType = eventType[0].toUpperCase() + eventType.slice(1);

    return (
      `<div class="event__type-item">
        <input
          id="event-type-${eventType}-1"
          class="event__type-input  visually-hidden"
          type="radio"
          name="event-type"
          value="${eventType}">
        <label
          class="event__type-label  event__type-label--${eventType}"
          for="event-type-${eventType}-1">
          ${upperCaseType}
        </label>
      </div>`);
  }).join('');

  const hasOffers = offers.length < 0 ? '' : `<div class="event__available-offers">
    ${getEventOffers()}
    </div>`;

  const getDestinationDescription = () => {
    if (destination.name === null) {
      return ('');
    }
    return (` <section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
    <p class="event__destination-description">${destination.description}</p>
  </section>`);
  };


  return (
    `<li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img
                class="event__type-icon"
                width="17"
                height="17"
                src="img/icons/${type}.png"
                alt="Event type icon">
            </label>
            <input
              class="event__type-toggle  visually-hidden"
              id="event-type-toggle-1"
              type="checkbox">

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>
                ${getEventType()}
              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              ${type}
            </label>
            <input
              class="event__input  event__input--destination"
              id="event-destination-1"
              type="text"
              name="event-destination"
              value="${destination.name}"
              list="destination-list-1">
            <datalist id="destination-list-1">
              ${getDestinations()}
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label
              class="visually-hidden"
              for="event-start-time-1">From</label>
            <input
              class="event__input  event__input--time"
              id="event-start-time-1"
              type="text"
              name="event-start-time"
              value="${eventStartDate}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input
              class="event__input  event__input--time"
              id="event-end-time-1"
              type="text"
              name="event-end-time"
              value="${eventEndDate}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input
              class="event__input  event__input--price"
              id="event-price-1"
              type="text"
              name="event-price"
              value="${basePrice}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit" ${isSubmitDisabled}>Save</button>
          <button class="event__reset-btn" type="reset">Delete</button>
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </header>
        <section class="event__details">
          <section class="event__section  event__section--offers">
            <h3 class="event__section-title  event__section-title--offers">Offers</h3>
              ${hasOffers}
          </section>
          ${getDestinationDescription()}
        </section>
      </form>
    </li>`
  );
};

export default class PointEditView extends AbstractStatefulView{
  #startDatepicker = null;
  #endDatepicker = null;

  constructor(point = BLANC_POINT) {
    super();
    this._state = PointEditView.parsePointToState(point);
    this.setInnerHandlers();
    this.#setStartDatepicker();
    this.#setEndDatepicker();
  }

  get template() {
    return createPointEditTemplate(this._state);

  }

  reset = (point) => {
    this.updateElement(point);
    this._restoreHandlers();
  };

  setEditRollupClickHandler = (callback) => {
    this._callback.rollupClick = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#rollupClickHandler);
  };

  #rollupClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.rollupClick();
  };

  setEditSubmitClickHandler = (callback) => {
    this._callback.submitClick = callback;
    this.element.querySelector('form').addEventListener('submit', this.#submitClickHandler);
  };

  setInnerHandlers = () => {
    this.element.querySelector('.event__type-list').addEventListener('change', this.#eventTypeChangeHandler);
    this.element.querySelector('.event__available-offers').addEventListener('change', this.#offerChangeHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#editDestinationHandler);
    this.element.querySelector('.event__input--price').addEventListener('change', this.#editEventPrice);
  };

  _restoreHandlers = () => {
    this.setInnerHandlers();
    this.#setStartDatepicker();
    this.#setEndDatepicker();
    this.element.querySelector('form').addEventListener('submit', this.#submitClickHandler);
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#rollupClickHandler);
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#deleteClickHandler);

  };

  #editEventPrice = (evt) => {
    this.updateElement({
      basePrice: evt.target.value,
    });
  };

  #editDestinationHandler = (evt) => {
    this.updateElement({
      destination: {
        name: evt.target.value,
        description: getRandomArrayElement(DESCRIPTIONS),
        pictures: [
          {
            src: `http://picsum.photos/248/152?r=${getRandomInteger(0,100)}`,
            description: getRandomArrayElement(DESCRIPTIONS),
          }
        ]
      }
    });
    this._restoreHandlers();
  };

  #offerChangeHandler = (evt) => {

    const offerID = parseInt(evt.target.value, 10);

    if (this._state.offers.includes(offerID)) {
      this._state.offers = this._state.offers.filter((offer) => offer !== offerID);
      return;
    }

    this._state.offers.push(offerID);
  };

  #eventTypeChangeHandler = (evt) => {

    this.updateElement({
      type: evt.target.value,
      offers: []
    });

    this._restoreHandlers();

  };

  setDeleteClickHandler = (callback) => {
    this._callback.deleteClick = callback;
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#deleteClickHandler);
  };

  #deleteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.deleteClick(PointEditView.parseStateToPoint(this._state));
  };

  #submitClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.submitClick(PointEditView.parseStateToPoint(this._state));
  };

  #startDateChangeHandler = ([userDate]) => {
    this.updateElement({
      dateFrom: userDate,
    });
  };

  #endDateChangeHandler = ([userDate]) => {
    this.updateElement({
      dateTo: userDate,
    });
  };

  #setStartDatepicker = () => {
    this.#startDatepicker = flatpickr(
      this.element.querySelector('#event-start-time-1'),
      {
        enableTime: true,
        dateFormat: 'd/m/y H:i',
        'time_24hr': true,
        defaultDate: this._state.dateFrom,
        onChange: this.#startDateChangeHandler,
      },
    );
  };

  #setEndDatepicker = () => {
    this.#endDatepicker = flatpickr(
      this.element.querySelector('#event-end-time-1'),
      {
        enableTime: true,
        'time_24hr': true,
        dateFormat: 'd/m/y H:i',
        defaultDate: this._state.dateTo,
        onChange: this.#endDateChangeHandler,
      },
    );
  };

  static parsePointToState = (point) => ({...point});
  static parseStateToPoint = (state) => ({...state});


}
