export const commentsCount = () => {
  const value = new Array(getRandomInteger(MIN_COMMENTS, MAX_COMMENTS)).fill().map(getComments);
  return value.length;
};

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
import {createPopupCommentTitle} from "./view/create-popup-comment-title.js";
import {render, getRandomInteger} from "./utils.js";
import {generateCardFilm} from "./mock/card-film.js";
import {getComments} from "./mock/comments.js";
import {getFilmDetail, getGenre} from "./mock/popup-film-detail.js";
import {createPopupFilmDetailsGenres} from './view/create-popup-film-details-genres.js';
import {generateLevelProfile} from "./mock/profile.js";
import {setFavorite} from "./view/create-filter.js";
import {MIN_COMMENTS, MAX_COMMENTS, FILM_IN_BASE, CARD_COUNT, CARD_RENDER_STEP, EXTRA_CARD_COUNT} from "./constants.js";

const filmCards = new Array(CARD_COUNT).fill().map(generateCardFilm);
const comments = new Array(getRandomInteger(MIN_COMMENTS, MAX_COMMENTS)).fill().map(getComments);
const filmDetail = new Array(1).fill().map(getFilmDetail);

const siteBodyElement = document.querySelector(`body`);
const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const footerStatisticsElement = document.querySelector(`.footer__statistics`);

const favoriteArray = [];


render(siteHeaderElement, createProfileTemplate(generateLevelProfile()), `beforeend`);
render(siteMainElement, createMenuAndSortTemplate(), `beforeend`);
render(siteMainElement, createFilmsTemplate(), `beforeend`);
render(footerStatisticsElement, createFooterStatistics(FILM_IN_BASE), `beforeend`);
render(siteBodyElement, createPopupFilmDetails(filmDetail[0], filmCards[0]), `beforeend`);
const createPopupFilmDetailsGenre = siteBodyElement.querySelector(`.film-details__row:last-of-type .film-details__cell`);
render(createPopupFilmDetailsGenre, createPopupFilmDetailsGenres(getGenre()), `beforeend`);

const commentsCountTemplate = siteBodyElement.querySelector(`.film-details__comments-title`);
render(commentsCountTemplate, createPopupCommentTitle(comments.length), `beforeend`);

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

const favoriteCount = (filmCard) => {
  if (filmCard.isFavorite) {
    favoriteArray.push(filmCard);
  }

};

filmCards.forEach((filmCard) => favoriteCount(filmCard));

const favoriteCountItem = document.querySelector(`[href='#favorites']`);
render(favoriteCountItem, setFavorite(favoriteArray.length), `beforeend`);

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

