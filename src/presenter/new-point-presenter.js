import PointEditView from '../view/point-edit-view.js';
import {render, remove, RenderPosition} from '../framework/render.js';
import { USER_ACTION, UPDATE_TYPE } from '../const.js';
import { nanoid } from 'nanoid';

export default class PointNewPresenter {
  #pointListContainer = null;
  #changeData = null;

  #pointEditComponent = null;
  #destroyCallback = null;

  constructor(pointListContainer, changeData) {
    this.#pointListContainer = pointListContainer;
    this.#changeData = changeData;
  }

  init = (callback) => {
    this.#destroyCallback = callback;

    if (this.#pointEditComponent !== null) {
      return;
    }
    this.#pointEditComponent = new PointEditView();

    this.#pointEditComponent.setEditSubmitClickHandler(this.#handleSubmitClick);
    this.#pointEditComponent.setEditRollupClickHandler(this.#handleRollupEditClick);
    this.#pointEditComponent.setDeleteClickHandler(this.#handleDeleteClick);

    render(this.#pointEditComponent, this.#pointListContainer, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);

  };

  destroy = () => {
    if (this.#pointEditComponent === null) {
      return;
    }

    this.#destroyCallback?.();

    remove(this.#pointEditComponent);
    this.#pointEditComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #handleSubmitClick = (update) => {
    this.#changeData(
      USER_ACTION.ADD_POINT,
      UPDATE_TYPE.MINOR,
      {id: nanoid(), ...update},
    );
    this.destroy();
  };

  #handleDeleteClick = () => {
    this.destroy();
  };

  #handleRollupEditClick = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };
}
