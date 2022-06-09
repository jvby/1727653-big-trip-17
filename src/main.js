import TripPresenter from './presenter/trip-presenter.js';
import PointsModel from './model/points-model.js';
import {createOffers} from './mock/point.js';

const siteFilterElement = document.querySelector('.trip-controls__filters');
const siteListElement = document.querySelector('.trip-events');
createOffers();

const pointsModel = new PointsModel();
const tripPresenter = new TripPresenter(siteListElement, pointsModel, siteFilterElement);

tripPresenter.init();
