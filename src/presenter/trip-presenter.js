import {render} from '../framework/render.js';
import SortView from '../view/sort-view.js';
import PointPresenter from './point-presenter.js';
import PointsList from '../view/points-list-view.js';
import EmptyPointsListView from '../view/empty-points-list-view.js';
import FilterView from '../view/filter-view.js';
import {updateItem, sortPointTime, sortPointPrice} from '../utils.js';
import {SORT_TYPE} from '../const.js';


export default class TripPresenter {

  #tripContainer = null;
  #filterContainer = null;
  #pointsModel = null;
  #tripPoints = [];
  #tripList = new PointsList();
  #sortComponent = new SortView();
  #filterComponent = new FilterView();
  #pointPresenter = new Map();
  #currentSortType = SORT_TYPE.DEFAULT;
  #sourcedBoardPoints = [];

  constructor (tripContainer, pointsModel, filterContainer) {
    this.#tripContainer = tripContainer;
    this.#filterContainer = filterContainer;
    this.#pointsModel = pointsModel;
  }

  init = () => {
    this.#tripPoints = [...this.#pointsModel.points];
    this.#sourcedBoardPoints = [...this.#pointsModel.points];

    this.#renderList();

  };

  #handlePointChange = (updatedPoint) => {
    this.#tripPoints = updateItem(this.#tripPoints, updatedPoint);
    this.#sourcedBoardPoints = updateItem(this.#sourcedBoardPoints, updatedPoint);
    this.#pointPresenter.get(updatedPoint.id).init(updatedPoint);
  };

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#tripList.element, this.#handlePointChange, this.#handleModeChange);
    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
  };

  #sortPoints = (sortType) => {
    switch (sortType) {
      case SORT_TYPE.TIME:
        this.#tripPoints.sort(sortPointTime);
        break;
      case SORT_TYPE.PRICE:
        this.#tripPoints.sort(sortPointPrice);
        break;
      default:
        this.#tripPoints = [...this.#sourcedBoardPoints];
    }

    this.#currentSortType = sortType;
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortPoints(sortType);
    this.#clearPointList();
    this.#tripPoints.forEach((point) =>  this.#renderPoint(point));
  };

  #renderSort = () => {
    render(this.#sortComponent, this.#tripContainer);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  };

  #renderFilter = () => {
    render(this.#filterComponent, this.#filterContainer);
  };

  #renderList = () => {
    if (this.#tripPoints.length < 1) {
      render(new EmptyPointsListView(), this.#tripContainer);
    } else {
      this.#renderFilter();
      this.#renderSort();
      render(this.#tripList, this.#tripContainer);

      this.#tripPoints.forEach((point) =>  this.#renderPoint(point));
    }
  };

  #clearPointList = () => {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
  };

}
