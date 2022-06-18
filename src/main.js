import TripPresenter from './presenter/trip-presenter.js';
import PointsModel from './model/points-model.js';
import {createOffers} from './mock/point.js';
import FilterModel from './model/filter-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import NewPointButtonView from './view/new-point-button-view.js';
import {render} from './framework/render.js';


const tripMainElement = document.querySelector('.trip-main');
const siteFilterElement = document.querySelector('.trip-controls__filters');
const siteListElement = document.querySelector('.trip-events');
createOffers();

const pointsModel = new PointsModel();
const filterModel = new FilterModel();
const tripPresenter = new TripPresenter(siteListElement, pointsModel, filterModel);

const filterPresenter = new FilterPresenter(siteFilterElement, filterModel);

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

filterPresenter.init();
tripPresenter.init();
