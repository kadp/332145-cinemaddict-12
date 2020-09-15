import AbstractView from "./abstract.js";

const setWatchList = (value) => `<span class="main-navigation__item-count">${value}</span>`;

export default class WatchList extends AbstractView {
  constructor(value) {
    super();
    this._value = value;

  }

  getTemplate() {
    return setWatchList(this._value);
  }
}
