import {humanizePointDate, getRandomInteger} from '../utils.js';
import {getOffers, getRandomArrayElement} from '../mock/point.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import {EVENT_TYPE, DESCRIPTIONS} from '../const.js';
import {sortOffers} from '../utils.js';

const createPointEditTemplate = (point) => {
  const { basePrice, dateFrom, dateTo, destination, offers, type } = point;

  const eventStartDate = humanizePointDate(dateFrom, 'YY/MM/DD HH:mm');

  const eventEndDate = humanizePointDate(dateTo, 'YY/MM/DD HH:mm');

  const getEventOffers = () => {

    const pointTypeOffer = getOffers().find((offer) => offer.type === type);

    return pointTypeOffer.offers.map((offer) => {
      const checked = offers.includes(offer.id) ? 'checked' : '';
      return (
        `<div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden" id="event-offer-${type}-${offer.id}" type="checkbox" name="event-offer-${type}" data-event-offer="${offer.id}" ${checked}>
          <label class="event__offer-label" for="event-offer-${type}-${offer.id}">
            <span class="event__offer-title">${offer.title}</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">${offer.price}</span>
          </label>
        </div>`);
    }).join('');
  };

  return (
    `<li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>

                <div class="event__type-item">
                  <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi" data-event-type="${EVENT_TYPE.TAXI}">
                  <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus" data-event-type="${EVENT_TYPE.BUS}">
                  <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train" data-event-type="${EVENT_TYPE.TRIAN}">
                  <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship" data-event-type="${EVENT_TYPE.SHIP}">
                  <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive" data-event-type="${EVENT_TYPE.DRIVE}">
                  <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" data-event-type="${EVENT_TYPE.FLIGHT}">
                  <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in" data-event-type="${EVENT_TYPE.CHECK_IN}">
                  <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing" data-event-type="${EVENT_TYPE.SIGHTSEEING}">
                  <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant" data-event-type="${EVENT_TYPE.RESTAURANT}">
                  <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
                </div>
              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              ${type}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination.name}" list="destination-list-1">
            <datalist id="destination-list-1">
              <option value="Amsterdam"></option>
              <option value="Geneva"></option>
              <option value="Chamonix"></option>
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${eventStartDate}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${eventEndDate}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Delete</button>
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </header>
        <section class="event__details">
          <section class="event__section  event__section--offers">
            <h3 class="event__section-title  event__section-title--offers">Offers</h3>

            <div class="event__available-offers">
              ${getEventOffers()}
            </div>
          </section>

          <section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            <p class="event__destination-description">${destination.description}</p>
          </section>
        </section>
      </form>
    </li>`
  );
};

export default class PointEditView extends AbstractStatefulView{


  constructor(point) {
    super();
    this._state = point;
    this.element.addEventListener('change', this.#eventTypeChangeHandler);
    this.element.addEventListener('change', this.#offerChangeHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#editDestinationHandler);
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

  _restoreHandlers = () => {
    this.element.addEventListener('change', this.#eventTypeChangeHandler);
    this.element.addEventListener('change', this.#offerChangeHandler);
    this.element.querySelector('form').addEventListener('submit', this.#submitClickHandler);
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#rollupClickHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#editDestinationHandler);
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
    if (!evt.target.matches('.event__offer-checkbox')) {
      return;
    }

    const offerID = parseInt(evt.target.dataset.eventOffer, 10);
    let tempOffers = [];

    if (this._state.offers.includes(offerID)) {
      tempOffers = this._state.offers.filter((offer) => offer !== offerID).sort(sortOffers);
      this._state.offers = [...tempOffers];
      return;
    }

    this._state.offers.push(offerID);
    this._state.offers = this._state.offers.sort(sortOffers);
  };

  #eventTypeChangeHandler = (evt) => {
    if (!evt.target.matches('.event__type-input')) {
      return;
    }

    this.updateElement({
      type: evt.target.dataset.eventType
    });

    this._restoreHandlers();

  };

  #submitClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.submitClick();
  };

}
