import {generatePoint} from '../mock/point.js';

export default class PointsModel {
  points = Array.from({length: 22}, (_, i) => generatePoint(i));

  getPoints = () => this.points;

}
