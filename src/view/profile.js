import AbstractView from "./abstract.js";

const createProfileTemplate = (level) => {
  return level !== false ?
    `<section class="header__profile profile">
      <p class="profile__rating">${level}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>` : ` `;
};

export default class Profile extends AbstractView {
  constructor(level) {
    super();
    this._level = level;
  }

  getTemplate() {
    return createProfileTemplate(this._level);
  }
}
