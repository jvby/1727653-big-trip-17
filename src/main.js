import TripPresenter from './presenter/trip-presenter.js';
import PointsModel from './model/points-model.js';
import FilterModel from './model/filter-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import NewPointButtonView from './view/new-point-button-view.js';
import {render} from './framework/render.js';
import PointsApiService from './points-api-service.js';

const AUTHORIZATION = 'Basic rththgre45yt564523456';
const END_POINT = 'https://17.ecmascript.pages.academy/big-trip';

const tripMainElement = document.querySelector('.trip-main');
const siteFilterElement = document.querySelector('.trip-controls__filters');
const siteListElement = document.querySelector('.trip-events');

const pointsModel = new PointsModel(new PointsApiService(END_POINT, AUTHORIZATION));
const filterModel = new FilterModel();
const tripPresenter = new TripPresenter(siteListElement, pointsModel, filterModel, tripMainElement);
const filterPresenter = new FilterPresenter(siteFilterElement, filterModel, pointsModel);
const newPointButtonComponent = new NewPointButtonView();

const handleNewPointFormClose = () => {
  newPointButtonComponent.element.disabled = false;
};

const handleNewPointButtonClick = () => {
  tripPresenter.createPoint(handleNewPointFormClose);
  newPointButtonComponent.element.disabled = true;
};

render(newPointButtonComponent, tripMainElement);
newPointButtonComponent.setClickHandler(handleNewPointButtonClick);


tripPresenter.init();
pointsModel.init().finally(() => {
  render(newPointButtonComponent, tripMainElement);
  newPointButtonComponent.setClickHandler(handleNewPointButtonClick);
  filterPresenter.init();
});
