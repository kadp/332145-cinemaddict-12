import {createMenuAndSortTemplate} from "./view/createmenuandsort.js";
import {createProfileTemplate} from "./view/createprofile.js";
import {createFilmsTemplate} from "./view/createfilms.js";
import {createFooterStatistics} from "./view/createfooterstatistics.js";
import {createPopupFilmDetails} from "./view/createpopupfilmdetails.js";
import {createButtonShowMore} from "./view/createbuttonshowmore.js";
import {createFilmsTopRatedTemplate} from "./view/createfilmstopratedtemplate.js";
import {createFilmsMostCommentedTemplate} from "./view/createfilmsmostcommentedtemplate.js";
import {render} from "./util.js";
import {renderFilmCard} from "./util.js";

const CARD_COUNT = 5;
const EXTRA_CARD_COUNT = 2;

const siteBodyElement = document.querySelector(`body`);
const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const footerStatisticsElement = document.querySelector(`.footer__statistics`);

render(siteHeaderElement, createProfileTemplate(), `beforeend`);
render(siteMainElement, createMenuAndSortTemplate(), `beforeend`);
render(siteMainElement, createFilmsTemplate(), `beforeend`);
render(footerStatisticsElement, createFooterStatistics(), `beforeend`);
render(siteBodyElement, createPopupFilmDetails(), `beforeend`);

const filmDetails = siteBodyElement.querySelector(`.film-details`);
filmDetails.classList.add(`visually-hidden`);
const siteFilmsListTemplate = document.querySelector(`.films-list`);
const siteFilmsElement = document.querySelector(`.films`);
const siteFilmsListContainerTemplate = document.querySelector(`.films-list__container`);

render(siteFilmsListTemplate, createButtonShowMore(), `beforeend`);
render(siteFilmsElement, createFilmsTopRatedTemplate(), `beforeend`);
render(siteFilmsElement, createFilmsMostCommentedTemplate(), `beforeend`);

const filmsTopRated = document.querySelector(`.films-list--extra`);
const topRatedList = filmsTopRated.querySelector(`.films-list__container`);
const filmsMostCommented = document.querySelector(`.films-list--extra:nth-child(3)`);
const mostCommentedList = filmsMostCommented.querySelector(`.films-list__container`);

renderFilmCard(CARD_COUNT, siteFilmsListContainerTemplate);
renderFilmCard(EXTRA_CARD_COUNT, topRatedList);
renderFilmCard(EXTRA_CARD_COUNT, mostCommentedList);
