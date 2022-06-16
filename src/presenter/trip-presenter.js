import {render, remove} from '../framework/render.js';
import SortView from '../view/sort-view.js';
import PointPresenter from './point-presenter.js';
import PointNewPresenter from './new-point-presenter.js';
import PointsList from '../view/points-list-view.js';
import EmptyPointsListView from '../view/empty-points-list-view.js';
import {sortPointsByTime, sortPointsByPrice, sortPointsByDate, filter} from '../utils.js';
import {SORT_TYPE, USER_ACTION, UPDATE_TYPE, FILTER_TYPE} from '../const.js';


export default class TripPresenter {

  #tripContainer = null;
  #pointsModel = null;
  #filterModel = null;
  #tripList = new PointsList();
  #pointPresenter = new Map();
  #currentSortType = SORT_TYPE.DEFAULT;
  #filterType = FILTER_TYPE.EVERYTHING;
  #listEmptyComponent= null;
  #pointNewPresenter = null;


  #sortComponent = null;

  constructor (tripContainer, pointsModel, filterModel) {
    this.#tripContainer = tripContainer;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;

    this.#pointNewPresenter = new PointNewPresenter(this.#tripList.element, this.#handleViewAction);

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  init = () => {
    this.#renderList();

  };

  get points() {
    this.#filterType = this.#filterModel.filter;
    const points = this.#pointsModel.points;
    const filteredPoints = filter[this.#filterType](points);

    switch (this.#currentSortType) {
      case SORT_TYPE.TIME:
        return filteredPoints.sort(sortPointsByTime);
      case SORT_TYPE.PRICE:
        return filteredPoints.sort(sortPointsByPrice);
    }
    return filteredPoints.sort(sortPointsByDate);
  }

  createPoint = (callback) => {
    this.#currentSortType = SORT_TYPE.DEFAULT;
    this.#filterModel.setFilter(UPDATE_TYPE.MAJOR, FILTER_TYPE.EVERYTHING);
    this.#pointNewPresenter.init(callback);
  };

  #handleViewAction = (actionType, updateType, update) => {
    // Здесь будем вызывать обновление модели.
    // actionType - действие пользователя, нужно чтобы понять, какой метод модели вызвать
    // updateType - тип изменений, нужно чтобы понять, что после нужно обновить
    // update - обновленные данные
    switch (actionType) {
      case USER_ACTION.UPDATE_POINT:
        this.#pointsModel.updatePoint(updateType, update);
        break;
      case USER_ACTION.ADD_POINT:
        this.#pointsModel.addPoint(updateType, update);
        break;
      case USER_ACTION.DELETE_POINT:
        this.#pointsModel.deletePoint(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    // В зависимости от типа изменений решаем, что делать:
    switch (updateType) {
      case UPDATE_TYPE.PATCH:
        // - обновить часть списка (например, когда поменялось описание)
        this.#pointPresenter.get(data.id).init(data);
        break;
      case UPDATE_TYPE.MINOR:
        // - обновить список (например, когда задача ушла в архив)
        this.#clearList();
        this.#renderList();
        break;
      case UPDATE_TYPE.MAJOR:
        // - обновить всю доску (например, при переключении фильтра)
        this.#clearList({resetSortType: true});
        this.#renderList();
        break;
    }
  };

  #handlePointChange = (updatedPoint) => {
    this.#pointPresenter.get(updatedPoint.id).init(updatedPoint);
  };

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#tripList.element, this.#handleViewAction, this.#handleModeChange);
    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
  };

  #sortPoints = (sortType) => {
    switch (sortType) {
      case SORT_TYPE.TIME:
        break;
      case SORT_TYPE.PRICE:
        break;
      default:
    }

    this.#currentSortType = sortType;
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearList();
    this.#renderList();
  };

  #renderSort = () => {
    this.#sortComponent = new SortView(this.#currentSortType);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
    render(this.#sortComponent, this.#tripContainer);
  };

  #renderListEmpty = () => {
    this.#listEmptyComponent = new EmptyPointsListView(this.#filterType);
    render(this.#listEmptyComponent, this.#tripContainer);
  };

  #renderList = () => {
    const points = this.points;
    const pointsCount = points.length;

    if (pointsCount === 0) {
      this.#renderListEmpty();
    } else {
      this.#renderSort();
      render(this.#tripList, this.#tripContainer);

      this.points.forEach((point) =>  this.#renderPoint(point));
    }
  };

  #clearList = ({resetSortType = false} = {}) => {

    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();

    remove(this.#sortComponent);
    remove(this.#listEmptyComponent);

    if (resetSortType) {
      this.#currentSortType = SORT_TYPE.DAY;
    }
  };

}
