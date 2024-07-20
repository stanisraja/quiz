import data from './assets/data1.js';

export const getRandomItems = (numberOfItems) => {
  const shuffleArray = (array) => {
    let newArray = array.slice();
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const shuffledData = shuffleArray(data);
  return shuffledData.slice(0, numberOfItems);
};