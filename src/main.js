import {render} from './render.js';
import FilterView from './view/filter-view.js';
import TripPresenter from './presenter/trip-presenter.js';
import PointsModel from './model/points-model.js';

const siteFilterElement = document.querySelector('.trip-controls__filters');
const siteListElement = document.querySelector('.trip-events');

render(new FilterView(), siteFilterElement);

const pointsModel = new PointsModel();
const tripPresenter = new TripPresenter(siteListElement, pointsModel);

tripPresenter.init();
