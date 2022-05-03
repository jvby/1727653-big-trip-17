import {render} from './render.js';
import FilterView from './view/filter-view.js';
import TripPresenter from './presenter/trip-presenter.js';

const siteFilterElement = document.querySelector('.trip-controls__filters');
const siteListElement = document.querySelector('.trip-events');

render(new FilterView(), siteFilterElement);

const tripPresenter = new TripPresenter();

tripPresenter.init(siteListElement);
