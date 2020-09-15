import {getRandomInteger} from "../utils/common.js";

const AGE = [`0+`, `16+`, `18+`];
const ORIGINAL_FILM_NAME = [
  `Созданы друг для друга`,
  `Попай встречает Синдбада`,
  `Тропа полыни`,
  `Дед мороз покоряет марсиан`,
  `Танец Иф`,
  `Большой фламарион`,
  `Человек с золотой рукой`,
  `Созданы друг для друга`,
  `Попай встречает Синдбада`,
  `Тропа полыни`,
  `Дед мороз покоряет марсиан`,
  `Танец Иф`,
  `Большой фламарион`,
  `Человек с золотой рукой`,
];
const DIRECTOR = [`ДЖЕЙ ДЖЕЙ АБРАМС`, `ПАТРИК ДЖЕЙ АДАМС`, `ВУДИ АЛЛЕН`, `БЕН АФФЛЕК`, `Квентин Тарантино`, `Хаяо Миядзаки`, `Алехандро Гонсалес Иньярриту`];
const WRITER = [`Итан Коэн`, `Джоэл Коэн`, `Билли Уайлдер`, `Роберт Таун`];
const ACTOR = [`Алан Рикман`, `Бенедикт Камбербэтч`, `Бенисио Дель Торо`, `Венсан Кассель`, `Вигго Мортенсен`, `Джеймс МакЭвой`, `Джейк Джилленхол`, `Дэниэл Дэй-Льюис`];
const COUNTRY = [`USA`, `USSR`, `Japan`, `Belarus`];
const GENRE = [`Ужасы`, `Комедия`, `Триллер`, `Фантастика`, `Боевик`];

const getAge = () => AGE[getRandomInteger(0, AGE.length - 1)];
const getOriginalFilmName = (i) => ORIGINAL_FILM_NAME[i];
const getDirector = () => DIRECTOR[getRandomInteger(0, DIRECTOR.length - 1)];
const getWriter = () => WRITER[getRandomInteger(0, WRITER.length - 1)];
const getActor = () => ACTOR[getRandomInteger(0, ACTOR.length - 1)];
const getCountry = () => COUNTRY[getRandomInteger(0, COUNTRY.length - 1)];

export const getGenre = () => GENRE[getRandomInteger(0, GENRE.length - 1)];
export const getFilmDetail = () => {
  return {
    age: getAge(),
    originalName: getOriginalFilmName(0),
    director: getDirector(),
    writers: getWriter(),
    actors: getActor(),
    country: getCountry(),
    genre: getGenre(),
  };
};
