
/** 
 * @description Takes an array and shuffles it
 * @param {array} 
 * @return {array} shuffled array
 * @example shuffle([1, 2, 3]) => [2, 1, 3]
*/

export const shuffle = (array) => {
  let currentIndex = array.length
  let randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]
  } 

  return array
}


export const sanitizeQuestions = (questions) => {
  const dictionary = {
    "&quot;": '"',
    "&#039;": "'",
    "&ntilde:":  "ñ",
    "&amp;": "&",
    "&ldquo;": '"',
    "&rdquo;": '"',
    "&eacute;": 'é',
    "&aacute;": 'á',
    "&lt;": "<",
    "&gt;": ">"

  }

  questions.forEach(q => {
    for (let k in dictionary) {
      q.question = q.question.replaceAll(k, dictionary[k])
      q.correct_answer = q.correct_answer.replace(k, dictionary[k])
      q.incorrect_answers.map(incorret => incorret.replace(k, dictionary[k]))
    }
  })

  return questions

}

export const addUserAnswer = (questions) => {
  questions.forEach(q => q.userAnswer = '')

  return questions
}

export const organizeQuestions = (questions) => {
  questions = questions
    .filter(q => q.type === 'multiple')
    .slice(0, 10)
  
  sanitizeQuestions(questions)
  addUserAnswer(questions)
  console.log(questions)
  return questions
}