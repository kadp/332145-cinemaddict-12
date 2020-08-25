import {getRandomInteger} from "../utils.js";
import {LEVEL_VALUE} from "../constants.js";

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
