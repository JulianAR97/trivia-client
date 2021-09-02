import React, { useState, useEffect } from 'react';
import { Container, Grid, makeStyles } from '@material-ui/core'
import Question from 'components/Question'
import Answer from 'components/Answer'
import Score from 'components/Score'
import QuestionCount from 'components/QuestionCount'
import { shuffle } from 'Helpers'

const TRIVIA_URL = 'https://opentdb.com/api.php'

const Game = (props) => {
  let [questionCount, setQuestionCount] = useState(0)
  let [score, setScore] = useState(0)
  let [questions, setQuestions] = useState([])
  
  const getQuestions = async() => {
    fetch(`${TRIVIA_URL}?amount=10`)
      .then(res => res.json())
      .then(res => setQuestions(res.results))
      .catch(err => alert(err))
  }

  useEffect(() => {
    getQuestions()
  }, [])


  // Render Functions

  const renderAnswers = () => {
    // add correct answer to incorrect_answers
    let answers = [
      ...questions[questionCount].incorrect_answers, 
      questions[questionCount].correct_answer
    ]

    // Shuffle the answers so that the correct answer is not always last
    let shuffled = shuffle(answers);

    // map the answers to answer components
    return shuffled.map((answer, i) => (
      <Answer key={i} answer={answer} handleClick={checkAnswer}/>
    ))
  }

  // Event Handlers

  /**
   * @description When answer field is clicked, it calls this function as a callback and passes
   * its answer data as the argument
   * @param {string} answer 
   */
  const checkAnswer = (answer) => {
    if (answer === questions[questionCount].correct_answer) {
      setScore(score => score + 1)
    }
    setQuestionCount(questionCount => questionCount + 1)

  }
  
  return (
    <div>
      {questions[0] ? 
        <>
          <Score score={score} />
          
          {/* add 1 to questionCount to convert from array notation to counting notation */}
          <QuestionCount questionCount={questionCount + 1} totalQuestions={questions.length} />
          <Question question={questions[questionCount].question} />
          { renderAnswers() }
        </>
      : 
        'loading...'
      }
    </div>
  )
}

export default Game