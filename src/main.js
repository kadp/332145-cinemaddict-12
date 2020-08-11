import {createMenuAndSortTemplate} from "./view/create-menu-and-sort.js";
import {createProfileTemplate} from "./view/create-profile.js";
import {createFilmsTemplate} from "./view/create-films.js";
import {createFooterStatistics} from "./view/create-footer-statistics.js";
import {createPopupFilmDetails} from "./view/create-popup-film-details.js";
import {createButtonShowMore} from "./view/create-button-show-more.js";
import {createFilmsTopRatedTemplate} from "./view/create-films-top-rated-template.js";
import {createFilmsMostCommentedTemplate} from "./view/create-films-most-commented-template.js";
import {createFilmCardTemplate} from "./view/create-film-card-template.js";
import {createPopupComment} from "./view/create-popup-comment.js";
import {render, getRandomInteger} from "./utils.js";
import {generateCardFilm} from "./mock/card-film.js";
import {getComments} from "./mock/comments.js";
import {getFilmDetail} from "./mock/popup-film-detail.js";
import {MIN_COMMENTS, MAX_COMMENTS} from "./const.js";

const CARD_COUNT = 14;
const CARD_RENDER_STEP = 5;
const EXTRA_CARD_COUNT = 2;

const filmCards = new Array(CARD_COUNT).fill().map(generateCardFilm);
const comments = new Array(getRandomInteger(MIN_COMMENTS, MAX_COMMENTS)).fill().map(getComments);
const filmDetail = new Array(1).fill().map(getFilmDetail);

const siteBodyElement = document.querySelector(`body`);
const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const footerStatisticsElement = document.querySelector(`.footer__statistics`);

render(siteHeaderElement, createProfileTemplate(), `beforeend`);
render(siteMainElement, createMenuAndSortTemplate(), `beforeend`);
render(siteMainElement, createFilmsTemplate(), `beforeend`);
render(footerStatisticsElement, createFooterStatistics(), `beforeend`);
render(siteBodyElement, createPopupFilmDetails(filmDetail[0], filmCards[0]), `beforeend`);

const commentsCount = siteBodyElement.querySelector(`.film-details__comments-title`);
commentsCount.textContent = `Comments ` + comments.length;

const commentsList = siteBodyElement.querySelector(`.film-details__comments-list`);
comments.forEach((comment) => render(commentsList, createPopupComment(comment), `beforeend`));

const filmDetailsPopup = siteBodyElement.querySelector(`.film-details`);
const closePopupButton = siteBodyElement.querySelector(`.film-details__close-btn`);
const closePopup = () => {
  filmDetailsPopup.classList.add(`visually-hidden`);
  filmDetailsPopup.removeEventListener(`click`, closePopup);
};
closePopupButton.addEventListener(`click`, closePopup);

const siteFilmsListTemplate = document.querySelector(`.films-list`);
const siteFilmsElement = document.querySelector(`.films`);
const siteFilmsListContainerTemplate = document.querySelector(`.films-list__container`);

if (filmCards.length > CARD_RENDER_STEP) {
  let renderedCardCount = CARD_RENDER_STEP;

  render(siteFilmsListTemplate, createButtonShowMore(), `beforeend`);

  const loadMoreButton = siteFilmsListTemplate.querySelector(`.films-list__show-more`);

  loadMoreButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    filmCards
      .slice(renderedCardCount, renderedCardCount + CARD_RENDER_STEP)
      .forEach((filmCard) => render(siteFilmsListContainerTemplate, createFilmCardTemplate(filmCard), `beforeend`));

    renderedCardCount += CARD_RENDER_STEP;

    if (renderedCardCount >= filmCards.length) {
      loadMoreButton.remove();
    }
  });
}

render(siteFilmsElement, createFilmsTopRatedTemplate(), `beforeend`);
render(siteFilmsElement, createFilmsMostCommentedTemplate(), `beforeend`);

const filmsTopRated = document.querySelector(`.films-list--extra`);
const topRatedList = filmsTopRated.querySelector(`.films-list__container`);
const filmsMostCommented = document.querySelector(`.films-list--extra:nth-child(3)`);
const mostCommentedList = filmsMostCommented.querySelector(`.films-list__container`);

const renderFilmCard = (cardCount, filmList) => {
  for (let i = 0; i < cardCount; i++) {
    render(filmList, createFilmCardTemplate(filmCards[i]), `beforeend`);
  }
};

renderFilmCard(CARD_RENDER_STEP, siteFilmsListContainerTemplate);
renderFilmCard(EXTRA_CARD_COUNT, topRatedList);
renderFilmCard(EXTRA_CARD_COUNT, mostCommentedList);

