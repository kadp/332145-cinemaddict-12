import SiteMenuView from "./view/site-menu.js";
import ProfileView from "./view/profile.js";
import FooterStatisticsView from "./view/footer-statistics.js";
import StatisticView from "./view/statistic.js";
import MovieListPresenter from "./presenter/MovieList.js";
import {render, RenderPosition} from "./utils/render.js";
import {generateCardFilm} from "./mock/data.js";
import {generateLevelProfile} from "./mock/profile.js";

import {CARD_COUNT, FILM_IN_BASE, MenuItem} from "./constants.js";

const filmCards = new Array(CARD_COUNT).fill().map(generateCardFilm);

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const footerStatisticsElement = document.querySelector(`.footer__statistics`);

const movieListPresenter = new MovieListPresenter(siteMainElement);

render(siteHeaderElement, new ProfileView(generateLevelProfile()), RenderPosition.BEFORE_END);

function getStatistic() {
  siteMainElement.removeChild(siteMainElement.lastElementChild);
  const statisticContainer = new StatisticView();
  render(siteMainElement, statisticContainer, RenderPosition.BEFORE_END);
}


const siteMenuComponent = new SiteMenuView();
render(siteMainElement, siteMenuComponent, RenderPosition.BEFORE_END);
const statistic = siteMainElement.querySelector(`.main-navigation__additional`);
statistic.addEventListener(`click`, getStatistic);

const handleSiteMenuClick = (menuItem) => {

  switch (menuItem) {
    case MenuItem.ALL_MOVIES:
      movieListPresenter.init(filmCards);
      break;
    case MenuItem.WATCHLIST:
      movieListPresenter.init(filmCards, menuItem);
      break;
    case MenuItem.HISTORY:
      movieListPresenter.init(filmCards, menuItem);
      break;
    case MenuItem.FAVORITES:
      movieListPresenter.init(filmCards, menuItem);
      break;
    case MenuItem.STATISTICS:

      break;
  }
};

siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);

const FooterStatistics = new FooterStatisticsView(FILM_IN_BASE);
render(footerStatisticsElement, FooterStatistics, RenderPosition.BEFORE_END);

movieListPresenter.init(filmCards);


