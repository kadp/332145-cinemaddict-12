import AbstractView from "./abstract.js";

const setFavorite = (value) => `<span class="main-navigation__item-count">${value}</span>`;

export default class Favorite extends AbstractView {
  constructor(value) {
    super();
    this._value = value;
  }

  getTemplate() {
    return setFavorite(this._value);
  }
}
