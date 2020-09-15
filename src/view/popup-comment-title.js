import AbstractView from "./abstract.js";

const createPopupCommentTitle = (value) => `<span class="film-details__comments-count">${value}</span>`;

export default class PopupCommentTitle extends AbstractView {
  constructor(value) {
    super();
    this._value = value;
  }

  getTemplate() {
    return createPopupCommentTitle(this._value);
  }
}
