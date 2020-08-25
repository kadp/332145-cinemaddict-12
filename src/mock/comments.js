import {getRandomInteger, generateRandomText} from "../utils.js";
import {EMOJI_URL, DESCRIPTIONS, MIN_COMMENTS, MAX_COMMENTS, AUTHOR_LIST} from "../constants.js";

const getEmoji = () => EMOJI_URL[getRandomInteger(0, EMOJI_URL.length - 1)];

const getAuthor = () => AUTHOR_LIST[getRandomInteger(0, AUTHOR_LIST.length - 1)];

const setDate = () => new Date();

export const getComments = () => {
  return {
    emoji: getEmoji(),
    text: generateRandomText(MIN_COMMENTS, MAX_COMMENTS, DESCRIPTIONS),
    author: getAuthor(),
    date: setDate(),
  };
};
