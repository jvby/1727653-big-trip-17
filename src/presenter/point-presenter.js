import PointEditView from '../view/point-edit-view.js';
import PointView from '../view/point-view.js';
import { render, replace, remove } from '../framework/render.js';
import { MODE, USER_ACTION, UPDATE_TYPE } from '../const.js';
import { isDatesEqual } from '../utils.js';

export default class PointPresenter {


  #tripListContainer = null;

  #pointComponent = null;
  #pointEditComponent = null;
  #changeData = null;
  #changeMode = null;
  #mode = MODE.DEFAULT;


  #point = null;
  #offers = null;
  #destinations = null;

  constructor (tripListContainer, changeData, changeMode) {
    this.#tripListContainer = tripListContainer;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
  }

  init (point, offers = this.#offers, destinations = this.#destinations){
    this.#point = point;
    this.#offers = offers;
    this.#destinations = destinations;

    const prevPointComponent = this.#pointComponent;
    const prevPointEditComponent = this.#pointEditComponent;

    this.#pointComponent = new PointView(point, offers);
    this.#pointEditComponent = new PointEditView(point, offers, destinations);

    this.#pointComponent.setRollupClickHandler(this.#handleRollupClick);
    this.#pointEditComponent.setEditSubmitClickHandler(this.#handleSubmitClick);
    this.#pointEditComponent.setEditRollupClickHandler(this.#handleRollupEditClick);
    this.#pointComponent.setFavoriteClickHandler(this.#handleFavoriteClick);
    this.#pointEditComponent.setDeleteClickHandler(this.#handleDeleteClick);

    if (prevPointComponent === null || prevPointEditComponent === null) {
      render(this.#pointComponent, this.#tripListContainer);
      return;
    }

    if (this.#mode === MODE.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#mode === MODE.EDITING) {
      replace(this.#pointEditComponent, prevPointEditComponent);
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);
  }

  destroy = () => {
    remove(this.#pointComponent);
    remove(this.#pointEditComponent);
  };

  resetView = () => {
    if (this.#mode !== MODE.DEFAULT) {
      this.#replaceEditFormToPoint();
    }
  };

  #replacePointToEditForm = () => {
    replace(this.#pointEditComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#onEscKeyDown);
    this.#changeMode();
    this.#mode = MODE.EDITING;
  };

  #replaceEditFormToPoint = () => {
    replace(this.#pointComponent, this.#pointEditComponent);
    document.removeEventListener('keydown', this.#onEscKeyDown);
    this.#mode = MODE.DEFAULT;
  };

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#pointEditComponent.reset(this.#point);
      this.#replaceEditFormToPoint();
    }
  };

  #handleRollupClick = () => {
    this.#replacePointToEditForm();
  };

  #handleSubmitClick = (update) => {

    const isMinorUpdate =
    !isDatesEqual(this.#point.dateFrom, update.dueFrom) ||
    !isDatesEqual(this.#point.dateTo, update.dueTo) ||
    this.#point.basePrice === update.basePrice;

    this.#changeData(
      USER_ACTION.UPDATE_POINT,
      isMinorUpdate ? UPDATE_TYPE.MINOR : UPDATE_TYPE.PATCH,
      update);
    this.#replaceEditFormToPoint();
  };

  #handleRollupEditClick = () => {
    this.#pointEditComponent.reset(this.#point);
    this.#replaceEditFormToPoint();
  };

  #handleDeleteClick = (point) => {
    this.#changeData(
      USER_ACTION.DELETE_POINT,
      UPDATE_TYPE.MINOR,
      point
    );
  };

  #handleFavoriteClick = () => {
    this.#changeData(
      USER_ACTION.UPDATE_POINT,
      UPDATE_TYPE.MINOR,
      {...this.#point, isFavorite: !this.#point.isFavorite});
  };

}
