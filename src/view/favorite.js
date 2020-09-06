import {createElement} from "../utils.js";

const setFavorite = (value) => {

  return (
    `<span class="main-navigation__item-count">${value}</span>`
  );
};

export default class Favorite {
  constructor(value) {
    this._value = value;
    this._element = null;
  }

  getTemplate() {
    return setFavorite(this._value);
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
