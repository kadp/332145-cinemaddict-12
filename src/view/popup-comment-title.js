import {createElement} from "../utils.js";

const createPopupCommentTitle = (value) => `<span class="film-details__comments-count">${value}</span>`;

export default class PopupCommentTitle {
  constructor(value) {
    this._value = value;
    this._element = null;
  }

  getTemplate() {
    return createPopupCommentTitle(this._value);
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
