import {createElement} from "../utils.js";

const setWatchList = (value) => `<span class="main-navigation__item-count">${value}</span>`;

export default class WatchList {
  constructor(value) {
    this._value = value;
    this._element = null;
  }

  getTemplate() {
    return setWatchList(this._value);
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
