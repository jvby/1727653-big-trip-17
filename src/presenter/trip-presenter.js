import SortView from '../view/sort-view.js';
import PointEditView from '../view/point-edit-view.js';
import PointView from '../view/point-view.js';
import PointsList from '../view/points-list-view.js';
import {render} from '../render.js';

export default class TripPresenter {
  tripList = new PointsList();

  init = (tripContainer, pointsModel) => {
    this.tripContainer = tripContainer;
    this.pointsModel = pointsModel;
    this.tripPoints = [...this.pointsModel.getPoints()];

    render(new SortView(), this.tripContainer);
    render(this.tripList, this.tripContainer);
    render(new PointEditView(this.tripPoints[0]), this.tripList.getElement());

    for (let i = 1; i < this.tripPoints.length; i++) {
      render(new PointView(this.tripPoints[i]), this.tripList.getElement());
    }
  };
}
