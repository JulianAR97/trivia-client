import React, { useState, useEffect } from 'react';
import { Box, Grid, makeStyles, useMediaQuery, useTheme } from '@material-ui/core'
import Question from 'components/Game/Question'
import Answer from 'components/Game/Answer'
import Score from 'components/Game/Score'
import QuestionCount from 'components/Game/QuestionCount'
import { shuffle, sanitizeQuestions, addUserAnswer, organizeQuestions } from 'Helpers'

const TRIVIA_URL = 'https://opentdb.com/api.php'


const useStyles = makeStyles({
  box: {
    display: 'flex',
    justifyContent: 'space-between',
  }
})

const Game = (props) => {
  const [questionCount, setQuestionCount] = useState(0)
  const [score, setScore] = useState(0)
  const [questions, setQuestions] = useState([])
  const classes = useStyles()
  const theme = useTheme()

  // if breakpoint is sm or xs, this will evaluate to true, otherwise false
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'))
  
  const getQuestions = async() => {
    fetch(`${TRIVIA_URL}?amount=20`)
      .then(res => res.json())
      .then(res => res.results)
      // filter out true / false questions
      .then(res => organizeQuestions(res))
      // keep first ten questions
      // .then(res => res.slice(0, 10))
      // .then(res => sanitizeQuestions(res))
      // .then(res => addUserAnswer(res))
      .then(res => setQuestions(res))
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
      <Answer 
        key={i} 
        answer={answer} 
        handleClick={checkAnswer} 
        userAnswer={questions[questionCount].userAnswer}
        correct={questions[questionCount].correct_answer}
      />
    ))
  }

  
  // Event Handlers

  /**
   * @description When answer field is clicked, it calls this function as a callback and passes
   * its answer data as the argument
   * @param {string} answer 
   */
  const checkAnswer = async (answer) => {
 
    if (answer === questions[questionCount].correct_answer) {
      setScore(score => score + 1)
    }
    if (questionCount === questions.length - 1) {
      // render final
    } else {
      setQuestionCount(questionCount => questionCount + 1)
    }
    
  }
  
  return (
    <Grid item xs={12}>

      {questions[0] ?
        <>
          <Box className={classes.box}>
            <Score score={score} />
            {/* add 1 to questionCount to convert from array notation to counting notation */}
            <QuestionCount questionCount={questionCount + 1} totalQuestions={questions.length} />
          </Box>
          
          <Question question={questions[questionCount].question} />
          <Grid container spacing={isSmall ? 2 : 4}>
            { renderAnswers() }
          </Grid>
        </>
      : 
      'loading...'
    }
    
    </Grid>
  )
}

export default Game