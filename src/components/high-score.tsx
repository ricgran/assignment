import React from 'react'
import { User, Score } from '../app.tsx'
import HighScoreResult from './high-score-result.tsx'
import { Box } from '@chakra-ui/react'

interface HighScoreProps {
  users: User[]
  scores: Score[]
}

interface UserAndAllScores {
  name: string
  scores: number[]
}

function findUsersScores(user: User, userScores: Score[]) {
  const allUsersScore = userScores
    .filter((score) => {
      return score.userId == user._id
    })
    .map((userScore) => userScore.score)
    .sort(sortNumbersDescending)

  return {
    name: user.name,
    scores: allUsersScore
  }
}

function sortNumbersDescending(a: number, b: number) {
  return b - a
}

function sortUserScoresDescending(a: UserAndAllScores, b: UserAndAllScores) {
  return b.scores[0] - a.scores[0]
}

export default function HighScore(props: HighScoreProps) {
  const usersAndScores = props.users
    .map((user) => findUsersScores(user, props.scores))
    .sort(sortUserScoresDescending)

  return (
    <Box>
      {usersAndScores.map((user) => (
        <HighScoreResult
          key={user.name}
          name={user.name}
          scores={user.scores}
        />
      ))}
    </Box>
  )
}
