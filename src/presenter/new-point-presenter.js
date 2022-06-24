import PointEditView from '../view/point-edit-view.js';
import {render, remove, RenderPosition} from '../framework/render.js';
import { UserAction, UpdateType, BLANK_POINT} from '../const.js';

export default class PointNewPresenter {
  #blankPoint = null;
  #pointListContainer = null;
  #changeData = null;

  #offers = null;
  #destinations = null;

  #pointEditComponent = null;
  #destroyCallback = null;

  constructor(pointListContainer, changeData) {
    this.#pointListContainer = pointListContainer;
    this.#changeData = changeData;
  }

  init = (callback, offers, destinations) => {
    this.#blankPoint = {...BLANK_POINT};
    this.#destroyCallback = callback;
    this.#offers = offers;
    this.#destinations = destinations;

    if (this.#pointEditComponent !== null) {
      return;
    }
    this.#pointEditComponent = new PointEditView(this.#blankPoint, this.#offers, this.#destinations);

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

  setSaving = () => {
    this.#pointEditComponent.updateElement({
      isDisabled: true,
      isSaving: true,
    });
  };

  setAborting = () => {
    const resetFormState = () => {
      this.#pointEditComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };
    this.#pointEditComponent.shake(resetFormState);
  };

  #handleSubmitClick = (update) => {
    this.#changeData(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      update,
    );
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
