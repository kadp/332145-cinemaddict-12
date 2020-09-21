import SiteMenuView from "./view/site-menu.js";
import SortView from "./view/sort.js";
import ProfileView from "./view/profile.js";
import FooterStatisticsView from "./view/footer-statistics.js";
import FavoriteView from "./view/favorite.js";
import HistoryView from "./view/history.js";
import WatchListView from "./view/watchlist.js";
import {render, RenderPosition} from "./utils/render.js";
import {generateCardFilm} from "./mock/data.js";
import {generateLevelProfile} from "./mock/profile.js";
import MovieListPresenter from "./presenter/MovieList.js";
import {CARD_COUNT, FILM_IN_BASE} from "./constants.js";

const filmCards = new Array(CARD_COUNT).fill().map(generateCardFilm);

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const footerStatisticsElement = document.querySelector(`.footer__statistics`);

const favoriteArray = [];
const historyArray = [];
const watchListArray = [];

const movieListPresenter = new MovieListPresenter(siteMainElement);

render(siteHeaderElement, new ProfileView(generateLevelProfile()), RenderPosition.BEFORE_END);
render(siteMainElement, new SiteMenuView(), RenderPosition.BEFORE_END);
render(siteMainElement, new SortView(), RenderPosition.BEFORE_END);

const FooterStatistics = new FooterStatisticsView(FILM_IN_BASE);
render(footerStatisticsElement, FooterStatistics, RenderPosition.BEFORE_END);

movieListPresenter.init(filmCards);

const favoriteCount = (filmCard) => {
  if (filmCard.isFavorite) {
    favoriteArray.push(filmCard);
  }
};

filmCards.forEach((filmCard) => favoriteCount(filmCard));


const historyCount = (filmCard) => {
  if (filmCard.isSaw) {
    historyArray.push(filmCard);
  }
};

filmCards.forEach((filmCard) => historyCount(filmCard));


const watchlistCount = (filmCard) => {
  if (filmCard.isWatch) {
    watchListArray.push(filmCard);
  }
};

filmCards.forEach((filmCard) => watchlistCount(filmCard));


const favoriteCountItem = document.querySelector(`[href='#favorites']`);
render(favoriteCountItem, new FavoriteView(favoriteArray.length), RenderPosition.BEFORE_END);

const historyCountItem = document.querySelector(`[href='#history']`);
render(historyCountItem, new HistoryView(historyArray.length), RenderPosition.BEFORE_END);

const watchListCountItem = document.querySelector(`[href='#watchlist']`);
render(watchListCountItem, new WatchListView(watchListArray.length), RenderPosition.BEFORE_END);

