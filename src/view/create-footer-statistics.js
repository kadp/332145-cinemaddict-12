import {createElement} from "../utils.js";

const createFooterStatistics = (value) => {
  return (`<p> ${value} movies inside</p>`);
};

export default class FooterStatistics {
  constructor(value) {
    this._value = value;
    this._element = null;
  }

  getTemplate() {
    return createFooterStatistics(this._value);
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
