import {render, replace, remove} from '../framework/render.js';
import FilterView from '../view/filter-view.js';
import { UPDATE_TYPE, FILTER_TYPE } from '../const.js';

export default class FilterPresenter {
  #filterContainer = null;
  #filterModel = null;

  #filterComponent = null;

  constructor(filterContainer, filterModel) {
    this.#filterContainer = filterContainer;
    this.#filterModel = filterModel;

    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get filters() {

    return [
      {
        type: FILTER_TYPE.EVERYTHING,
        name: 'Everything',
      },
      {
        type: FILTER_TYPE.FUTURE,
        name: 'Future',
      },
      {
        type: FILTER_TYPE.PAST,
        name: 'Past',
      },
    ];
  }

  init = () => {
    const filters = this.filters;
    const prevFilterComponent = this.#filterComponent;


    this.#filterComponent = new FilterView(filters, this.#filterModel.filter);
    this.#filterComponent.setFilterTypeChangeHandler(this.#handleFilterTypeChange);

    if (prevFilterComponent === null) {
      render(this.#filterComponent, this.#filterContainer);
      return;
    }

    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  };

  #handleModelEvent = () => {
    this.init();
  };

  #handleFilterTypeChange = (filterType) => {
    if (this.#filterModel.filter === filterType) {
      return;
    }

    this.#filterModel.setFilter(UPDATE_TYPE.MAJOR, filterType);
  };
}
