
/** 
 * @description Takes an array and shuffles it
 * @param {array} 
 * @return {array} shuffled array
 * @example shuffle([1, 2, 3]) => [2, 1, 3]
*/

export const shuffle = (array) => {
  let currentIndex = array.length
  let randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]
  } 

  return array
}