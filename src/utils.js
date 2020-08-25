export const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const generateRandomText = (min, max, dictionary) => {
  const randomArray = [];
  for (let i = 1; i <= getRandomInteger(min, max); i++) {
    randomArray.push(dictionary[getRandomInteger(0, dictionary.length - 1)]);
  }
  return randomArray;
};

