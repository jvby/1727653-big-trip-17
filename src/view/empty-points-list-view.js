import {createElement} from '../render.js';

const createEmptyPointsListTemplate = () => '<p class="trip-events__msg">Click New Event to create your first point</p>';

export default class EmptyPointsListView {

  #element = null;

  get template() {
    return createEmptyPointsListTemplate();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
