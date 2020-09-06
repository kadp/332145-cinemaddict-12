
import {createElement} from "../utils.js";

const FILM_IN_BASE = `130 291`;

const createFooterStatistics = (value) => {
  return (`<p> ${value} movies inside</p>`);
};

export default class FooterStatistics {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createFooterStatistics(FILM_IN_BASE);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
