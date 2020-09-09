import {createElement} from "../utils.js";

const setHistory = (value) => `<span class="main-navigation__item-count">${value}</span>`;

export default class History {
  constructor(value) {
    this._value = value;
    this._element = null;
  }

  getTemplate() {
    return setHistory(this._value);
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
