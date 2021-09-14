import React, { useState, useEffect } from 'react';
import { Box, Grid, makeStyles, useMediaQuery, useTheme } from '@material-ui/core'
import Answer from 'components/Game/Answer'
import Final from 'components/Game/Final'
import Question from 'components/Game/Question'
import QuestionCount from 'components/Game/QuestionCount'
import Score from 'components/Game/Score'
import Timer from 'components/Game/Timer'
import { shuffle, organizeQuestions, addSeconds } from 'Helpers'

const TRIVIA_URL = 'https://opentdb.com/api.php'


const useStyles = makeStyles(theme => ({
  box: {
    display: 'flex',
    justifyContent: 'space-between',
  }
}))

const Game = (props) => {
  const [questionCount, setQuestionCount] = useState(0)
  const [expiryTimestamp, setExpiryTimestamp] = useState(addSeconds(new Date(), 30))
  const [score, setScore] = useState(0)
  const [questions, setQuestions] = useState([])
  const [difficultyCount, setDifficultyCount] = useState(props.difficultyCount)
  const classes = useStyles()
  const theme = useTheme()

  // if breakpoint is sm or xs, this will evaluate to true, otherwise false
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'))
  
  const getQuestions = async() => {
    fetch(`${TRIVIA_URL}?amount=20`)
      .then(res => res.json())
      .then(res => res.results)
      .then(res => organizeQuestions(res))
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
    const difficulty = questions[questionCount].difficulty
    setDifficultyCount(difficultyCount => ({
      ...difficultyCount, 
      [difficulty]: {
        ...difficultyCount[difficulty], 
        seen: difficultyCount[difficulty].seen + 1 
      }
    }))

    if (answer === questions[questionCount].correct_answer) {
      setScore(score => score + 1)
      setDifficultyCount(difficultyCount => ({
        ...difficultyCount, 
        [difficulty]: {
          ...difficultyCount[difficulty], 
          correct: difficultyCount[difficulty].correct + 1
        }
      }))
    }
    
    setQuestionCount(questionCount => questionCount + 1)
    setExpiryTimestamp(() => addSeconds(new Date(), 30))
    
  }
  
 
  return (
    <>

      {questions[questionCount] ?
        <>
          <Box className={classes.box}>
            <Score score={score} />
            <Timer expiryTimestamp={expiryTimestamp} />
            {/* add 1 to questionCount to convert from array notation to counting notation */}
            <QuestionCount questionCount={questionCount + 1} totalQuestions={questions.length} />
          </Box>
          
          <Question question={questions[questionCount].question} />
          <Grid container spacing={isSmall ? 2 : 4}>
            { renderAnswers() }
          </Grid>
        </>
      : 
      
      questionCount === 0 ? 
        'loading' 
      : 
        <Final score={score} questionCount={questionCount} difficultyCount={difficultyCount}/>
      
    }
    
    </>
  )
}

Game.defaultProps = {
  difficultyCount: {
    easy: {
      seen: 0,
      correct: 0
    },
    medium: {
      seen: 0,
      correct: 0
    },
    hard: {
      seen: 0,
      correct: 0
    }
  }
}

export default Game