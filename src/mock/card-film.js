import {getRandomInteger, generateRandomText} from "../utils.js";
import {FILM_NAMES, DESCRIPTIONS, POSTERS_URL, MIN_DESCRIPTION, MAX_DESCRIPTION, MAX_RATING, MIN_RATING, FILM_YEAR} from "../constants.js";
import {commentsCount} from "../main.js";
import {getGenre} from "./popup-film-detail.js";

const getFilmName = (i) => FILM_NAMES[i];

const getPoster = (i) => {
  return POSTERS_URL[i];
};

const getRating = () => {
  return getRandomInteger(MIN_RATING, MAX_RATING);
};

const getYear = () => {
  return FILM_YEAR[getRandomInteger(0, FILM_YEAR.length - 1)];
};

const getDuration = () => {
  const time = getRandomInteger(1, 190);
  const minInHour = 60;
  if (time <= minInHour) {
    return time + ` m`;
  } else if (time > minInHour) {
    return Math.floor(time / minInHour) + `h` + ` ` + time % minInHour + `m`;
  } else {
    return ``;
  }
};

const isFilmFavorite = () => Boolean(getRandomInteger(0, 1));

const isWatchList = () => Boolean(getRandomInteger(0, 1));

const isWatched = () => Boolean(getRandomInteger(0, 1));

export const generateCardFilm = (film, i) => {
  const isFavorite = isFilmFavorite();
  const isWatch = isWatchList();
  const isSaw = isWatched();
  return {
    filmName: getFilmName(i),
    poster: getPoster(i),
    description: generateRandomText(MIN_DESCRIPTION, MAX_DESCRIPTION, DESCRIPTIONS),
    rating: getRating(),
    year: getYear(),
    duration: getDuration(),
    genre: getGenre(),
    comments: commentsCount(),
    isFavorite,
    isWatch,
    isSaw,
  };
};
