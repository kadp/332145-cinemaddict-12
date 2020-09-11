import {getRandomInteger} from "../utils.js";

const LEVEL_VALUE = [0, 1, 10, 11, 20, 21];

export const generateLevelProfile = () => {
  let level = LEVEL_VALUE[getRandomInteger(0, LEVEL_VALUE.length - 1)];
  if (!level) {
    return false;
  } else if (level >= 1 && level <= 10) {
    return `novice`;
  } else if (level >= 11 && level <= 20) {
    return `fan`;
  } else if (level >= 21) {
    return `movie buff`;
  } else {
    return ``;
  }
};
