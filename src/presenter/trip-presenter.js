import SortView from '../view/sort-view.js';
import PointEditView from '../view/point-edit-view.js';
import PointView from '../view/point-view.js';
import PointsList from '../view/points-list-view.js';
import {render} from '../render.js';

export default class TripPresenter {
  tripList = new PointsList();

  init = (tripContainer) => {
    this.tripContainer = tripContainer;

    render(new SortView(), this.tripContainer);
    render(this.tripList, this.tripContainer);
    render(new PointEditView, this.tripList.getElement());

    for (let i = 0; i < 3; i++) {
      render(new PointView(), this.tripList.getElement());
    }
  };
}
