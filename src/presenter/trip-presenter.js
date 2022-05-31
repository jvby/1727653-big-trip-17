import {render} from '../framework/render.js';
import SortView from '../view/sort-view.js';
import PointPresenter from './point-presenter.js';
import PointsList from '../view/points-list-view.js';
import EmptyPointsListView from '../view/empty-points-list-view.js';
import FilterView from '../view/filter-view.js';
import {updateItem} from '../utils.js';

export default class TripPresenter {

  #tripContainer = null;
  #filterContainer = null;
  #pointsModel = null;
  #tripPoints = [];
  #tripList = new PointsList();
  #pointPresenter = new Map();

  constructor (tripContainer, pointsModel, filterContainer) {
    this.#tripContainer = tripContainer;
    this.#filterContainer = filterContainer;
    this.#pointsModel = pointsModel;
  }

  init = () => {
    this.#tripPoints = [...this.#pointsModel.points];

    this.#renderList();

  };

  #handlePointChange = (updatedPoint) => {
    this.#tripPoints = updateItem(this.#tripPoints, updatedPoint);
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

  #renderList = () => {
    if (this.#tripPoints.length < 1) {
      render(new EmptyPointsListView(), this.#tripContainer);
    } else {
      render(new FilterView(), this.#filterContainer);
      render(new SortView(), this.#tripContainer);
      render(this.#tripList, this.#tripContainer);

      this.#tripPoints.forEach((point) =>  this.#renderPoint(point));
    }
  };

  #clearPointList = () => {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
  };

}
