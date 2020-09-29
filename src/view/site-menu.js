import AbstractView from "./abstract.js";
import {MenuItem} from "../constants.js";

const createMenuTemplate = () => {
  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        <a href="#${MenuItem.ALL_MOVIES}" class="main-navigation__item main-navigation__item--active">All movies</a>
        <a href="#${MenuItem.WATCHLIST}" class="main-navigation__item">Watchlist </a>
        <a href="#${MenuItem.HISTORY}" class="main-navigation__item">History </a>
        <a href="#${MenuItem.FAVORITES}" class="main-navigation__item">Favorites </a>
      </div>
      <a href="#${MenuItem.STATISTICS}" class="main-navigation__additional">Stats</a>
     </nav>`
  );
};

export default class SiteMenu extends AbstractView {
  constructor() {
    super();

    this._menuClickHandler = this._menuClickHandler.bind(this);
  }

  getTemplate() {
    return createMenuTemplate();
  }

  _menuClickHandler(evt) {
    if (evt.target.tagName !== `A`) {
      return;
    }

    evt.preventDefault();

    const href = evt.target.href.slice(window.location.origin.length + window.location.pathname.length + 1);
    this._callback.menuClick(href);
  }

  setMenuClickHandler(callback) {
    this._callback.menuClick = callback;
    this.getElement().addEventListener(`click`, this._menuClickHandler);
  }
}
