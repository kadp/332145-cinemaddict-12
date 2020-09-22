import AbstractView from "./abstract.js";

const setHistory = (value) => `<span class="main-navigation__item-count">${value}</span>`;

export default class History extends AbstractView {
  constructor(value) {
    super();
    this._value = value;
  }

  getTemplate() {
    return setHistory(this._value);
  }

}
