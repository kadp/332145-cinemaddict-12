import {createElement} from "../utils.js";

const createProfileTemplate = (level) => {
  return level !== false ?
    `<section class="header__profile profile">
      <p class="profile__rating">${level}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>` : ` `;
};

export default class Profile {
  constructor(level) {
    this._level = level;
    this._element = null;
  }

  getTemplate() {
    return createProfileTemplate(this._level);
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
